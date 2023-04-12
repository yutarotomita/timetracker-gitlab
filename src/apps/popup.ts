import { TotalElapsedTime } from "../domain/html/totalElapsedTime"
import { SpendButton } from "../domain/html/spendButton"
import { ElementId } from "../domain/element/elementId"
import { ElementClass } from "../domain/element/elementClass"
import { GitLabProjectAccessTokens } from "../domain/gitlab/gitLabProjcetAccessTokens"
import { GitLabApi } from "../domain/gitlab/gitLabApi"
import { GitLabUser } from "../domain/gitlab/gitLabUser"
import { GitLabIssue } from "../domain/gitlab/gitLabIssue"
import { IUser } from "../domain/iUser"
import { IIssue } from "../domain/iIssue"
import { IssueList } from "../domain/issueList"
import { IssueParam } from "../domain/issueParam"
import { ILocalStorage } from "../domain/iLocalStorage"
// import { LocalStorageChrome } from "../domain/localStorageChrome"
import { LocalStorageWindow } from "../domain/localStorageWindow"
import { WorkingTime } from "../domain/workingTime"
import { WorkingTimeList } from "../domain/workingTimeList"
import { StickyNote } from "../domain/stickyNote"
import { StickyNoteList } from "../domain/stickyNoteList"
import { isDefined } from "../function/nullCheck"
import { WorkingTimeStickyList } from "../domain/workingTimeStickyList"
import { IssueDto } from "../domain/issueDto"
declare let chrome: any;


// プライベートトークン
let PRIVATE_TOKEN: string
let GITLAB_DOMAIN: string
let PROJECT_ID: number

// ローカル保存用のKey
const KEY_SELECT_ISSUE_ID = 'select_issue_id'
	, KEY_START_DATE = 'start_date'
	, KEY_WORKINGTIMES = 'workingtimes'
	, KEY_ISSUE_LIST = 'issue_list'
	, KEY_PRIVATE_TOKEN = 'private_token'
	, KEY_GITLAB_DOMAIN = 'gitlab_domain'
	, KEY_GITLAB_PROJECT_ID = 'gitlab_project_id'
	// , KEY_IS_OUTPUT_JSON_WHEN_SPENT = 'is_output_json_when_spent'

/**------------------------------------- NICE TO HAVE ----------------------------------- //
 * 
 * Vue.jsにしたいよね
 * 閉じて開いたら選択している付箋はelapsedとtoday更新されていてほしい
 * 付箋並び替えたい（人順とか）
 * プロフ写真ローカルに保存したい。取得できなくなってたら取り直すとかもしたい
 * ディレクトリ構造を考えて配置したい
 * ローカルストレージの付箋情報は最新化しておきたい
 * json実績のバックアップを取りたい
 * 
 */ 

// --------------------------------------- 状態一覧 --------------------------------------- //
let loginUser: IUser
let selectIssueId: number | undefined
let startDate: number | undefined
// 仕事をした実績たち
let workingTimeList: WorkingTimeList
// 内部的に持ってるイシューリスト
let issueList: IssueList
// spent時にJSON出力するか
// let isOutputJsonWhenSpent = true
// GitLabから取得した最新のissueたち。prefech処理で格納される
let issuesFetch: Array<IIssue>

// ------------------------------------ 画面項目一覧 ------------------------------------ //
// Spendボタン
let spendButton: SpendButton
// 合計消費時間を示すdiv要素
let totalElapsedTime: TotalElapsedTime
// 付箋一覧
let stickyNoteList: StickyNoteList
// 実績一覧
let workingTimeStickyList : WorkingTimeStickyList

// ------------------------------- 外部接続用クライアント ----------------------------------//
let localStorageClient: ILocalStorage
let gitLabApiClient: GitLabApi

// ------------------------------------- 処理内容 ---------------------------------------- //
localStorageClient = new LocalStorageWindow() //LocalStorageChrome()
const logined = loginCheck()
document.addEventListener("DOMContentLoaded", async function(){
	if(await logined){
		// 先行してAjaxFetch
		const fetch = preFetchAjax()
		// 初期表示
		await initialize()
		await fetch
		// 取得したissueを元に新しい付箋を追加・更新
		addStickeyNotes(issuesFetch)
	}
	else {
		window.location.href = './setting.html'
	}
});

// ------------------------------------- 以下ファンクション ---------------------------------------- //

/**
 * ログインチェックを行う
 */
async function loginCheck(){
	const privateToken = await localStorageClient.getObject(KEY_PRIVATE_TOKEN)
	const gitLabDomain = await localStorageClient.getObject(KEY_GITLAB_DOMAIN)
	const gitLabProjectId = await localStorageClient.getObject(KEY_GITLAB_PROJECT_ID)
	const isLogin = isDefined(privateToken) && isDefined(gitLabDomain) && isDefined(gitLabProjectId)
	// // 設定フラグ
	// isOutputJsonWhenSpent = await localStorageClient.getObject(KEY_IS_OUTPUT_JSON_WHEN_SPENT) == true
	if(isLogin){
		PRIVATE_TOKEN = privateToken
		GITLAB_DOMAIN = gitLabDomain
		PROJECT_ID = gitLabProjectId
		gitLabApiClient = new GitLabApi(new GitLabProjectAccessTokens(PRIVATE_TOKEN, GITLAB_DOMAIN, PROJECT_ID))
		return true
	} else {
		return false
	}
}

/**
 * Ajaxでデータを取得する処理
 * 待機時間取得軽減の為、Ajaxは先に飛ばす
 */
async function preFetchAjax(){
	// ログインユーザーを取得
	await gitLabApiClient.getLoginUser((rslt: any)=>{
		// 画面アイコンに適用
		loginUser = new GitLabUser(rslt)
		const avatarElement = document.querySelector('.profile-avatar')! // Nullチェック
		avatarElement.setAttribute('src', loginUser.getImgPath())
	})

	// issueを最新300コまで取得
	const issuesPage1 = gitLabApiClient.getIssueByMax(100,1)
		, issuesPage2 = gitLabApiClient.getIssueByMax(100,2)
		, issuesPage3 = gitLabApiClient.getIssueByMax(100,3)
	issuesFetch = (await issuesPage1).concat(await issuesPage2).concat(await issuesPage3)

	return Promise.resolve()
}

/**
 * 初期表示
 */
async function initialize(){
	// 画面操作用にオブジェクト生成
	spendButton = new SpendButton(new ElementId('spend-button'))
	totalElapsedTime = new TotalElapsedTime(new ElementClass('total-elapsedTime'))
	stickyNoteList = new StickyNoteList(new ElementId('issue-list'))
	workingTimeList = new WorkingTimeList()
	workingTimeStickyList = new WorkingTimeStickyList(new ElementId('workingTime-sticky-list'))
	issueList = new IssueList()

	// もし以前付箋を開いたことがある場合、ローカルキャッシュから一覧を生成する
	let savedIssueList: Array<IIssue> | undefined = await localStorageClient.getObject(KEY_ISSUE_LIST)
	if(isDefined(savedIssueList) && savedIssueList!.length > 0){
		// 付箋として追加
		let gitLabIssue: Array<GitLabIssue> = []
		savedIssueList!.forEach(iissue => {
			gitLabIssue.push(new IssueDto(iissue))
		})
		issueList.set(gitLabIssue)
		stickyNoteList.set(issueList)
	}
	setEventListener()
	revertToBeforeState()
}

/**
 * 以前の操作履歴を復元
 */
async function revertToBeforeState(){
	selectIssueId = await localStorageClient.getObject(KEY_SELECT_ISSUE_ID)

	startDate = await localStorageClient.getObject(KEY_START_DATE)

	let workingTimes: Array<WorkingTime> | undefined = await localStorageClient.getObject(KEY_WORKINGTIMES)
	if(isDefined(workingTimes) && workingTimes!.length > 0){
		workingTimes!.forEach((workingTimeObj: any)=>{
			// 内部的な実績に反映
			const workingTime = new WorkingTime(workingTimeObj.startDate, workingTimeObj.elapsedTime, workingTimeObj.taskId, workingTimeObj.taskName)
			workingTimeList.add(workingTime)
		})
		// 見た目に反映
		stickyNoteList.update(workingTimeList.getListGroupById())
		totalElapsedTime.set(workingTimeList.getElapsedTime())
		workingTimeStickyList.set(workingTimeList)
	}

	// 付箋リストの見た目を、内部的に保持している状態に更新する
	const selectIssueIndex = stickyNoteList.getIndexById(selectIssueId!)
	// 選択してるイシューがリストにあれば
	if(selectIssueIndex != -1){
		// 選択する
		if(startDate){
			stickyNoteList.selectByIndex(selectIssueIndex, startDate)
		}
	}

}

/**
 * イベントリスナーの設定
 */
function setEventListener(){
	// Spendボタン押下時のイベントハンドラを設定
	spendButton.addListenerClickAfter(()=>{
		// スペントする？
		const spentOk = confirm('実績がクリアされます。\r\nGitLabに実績を送信してよろしいですか？\r\n Are you want to spend on GitLab?')
		if(spentOk){
			workingTimeList.getAll().forEach((workingTime)=>{
				gitLabApiClient.postAjaxSpentIssue(()=>{}, workingTime.getTaskId(), workingTime.getTime())
			})
			stickyNoteList.clearAll()
			workingTimeList.clear()
			totalElapsedTime.set(0)
			localStorageClient.deleteObject(KEY_WORKINGTIMES)
			localStorageClient.deleteObject(KEY_ISSUE_LIST)
			localStorageClient.deleteObject(KEY_SELECT_ISSUE_ID)
			localStorageClient.deleteObject(KEY_START_DATE)
			iconBadgeToggle(false)
		}
	})

	// 付箋選択時のイベントハンドラを設定
	stickyNoteList.addListenerClickAfter((stickyNote: StickyNote) => {
		const endDate = Date.now()
		// 選択された付箋が選択状態であれば
		if(stickyNote.isAvailable()){
			// 前に選択されていたタスクの実績を記録する
			if(isDefined(selectIssueId)){
				const beforeStickyNote = stickyNoteList.getById(selectIssueId!)
				const workingTime = new WorkingTime(beforeStickyNote.getStartDate()!, endDate - beforeStickyNote.getStartDate()!, beforeStickyNote.getId(), beforeStickyNote.getName())
				workingTimeList.add(workingTime)
			}
			// 選択された付箋IDを状態変数に保持
			selectIssueId = stickyNote.getId()
			startDate = Date.now()
			// 初期表示用にローカルストレージにも保存
			localStorageClient.setObject(KEY_SELECT_ISSUE_ID, selectIssueId)
			localStorageClient.setObject(KEY_START_DATE, startDate)
		}
		else {
			// 選択を外されたタスクの実績を記録する
			const workingTime = new WorkingTime(stickyNote.getStartDate()!, endDate - stickyNote.getStartDate()!, stickyNote.getId(), stickyNote.getName())
			workingTimeList.add(workingTime)

			// 状態変数を初期化
			selectIssueId = undefined
			startDate = undefined
			// ローカルストレージも初期化
			localStorageClient.deleteObject(KEY_SELECT_ISSUE_ID)
			localStorageClient.deleteObject(KEY_START_DATE)
		}
		workingTimeStickyList.set(workingTimeList)
		totalElapsedTime.set(workingTimeList.getElapsedTime())
		const saveWorkingTimes = workingTimeList.getAll()
		localStorageClient.setObject(KEY_WORKINGTIMES, saveWorkingTimes)

		// 付箋の選択状態に応じてアイコンのバッジを切り替える
		iconBadgeToggle(stickyNote.isAvailable())
	})
	
	// 付箋リスト変更時のイベントハンドラを設定
	workingTimeStickyList.addListenerChangeAfter(()=>{
		workingTimeList = workingTimeStickyList.getWorkingTimeList()
		totalElapsedTime.set(workingTimeList.getElapsedTime())
		localStorageClient.setObject(KEY_WORKINGTIMES, workingTimeList.getAll())
	})

	// Export JSON
	document.querySelector('.export-json')!.addEventListener('click', ()=>{
		const jsonText = JSON.stringify(workingTimeList.getAll())
		navigator.clipboard.writeText(jsonText).then(()=>alert('クリップボードにコピーしました。')).catch(e=>alert('コピー時にエラー！ '+e.message));
	})
}

/**
 * アイコンのバッジをON/OFFさせる
 */
function iconBadgeToggle(isStart: boolean){
	const text = isStart? "▶️" : "■"
	, color = isStart? "#00CC66" : "#FF0000"
	chrome.action.setBadgeText({"text" : text})
	chrome.action.setBadgeBackgroundColor({"color" : color})
	chrome.action.setBadgeTextColor({"color" : "#FFFFFF"})
}

/**
 * issueを付箋に追加する。既に付箋があるissueの場合は情報を更新する
 * @param issues 
 */
function addStickeyNotes(issues: Array<IIssue>){
	let tempIssues: Array<IIssue> = []
	issues.forEach((issue: IIssue)=>{
		tempIssues.push(new GitLabIssue(issue))
	})
	let tempIssueList = new IssueList()
	tempIssueList.set(tempIssues)
	const filterParam = new IssueParam()
	if(isDefined(loginUser) && isDefined(loginUser.getId())){
		filterParam.setUserId(loginUser.getId())
	}
	filterParam.setActive(true)
	filterParam.setLabel('Doing')
	const issueIds = issueList.getAllIds()
	tempIssueList.filter(filterParam).getIssueList().forEach(issue => {
		// ローカルストレージにある付箋の場合
		if(isDefined(issueIds.find(id => id == issue.id))){
			// FIXME: 付箋情報の更新
		} else {
		// ローカルストレージにない、新しい付箋の場合
			issueList.add(issue)
			stickyNoteList.add(issue, true)
		}
	});
	localStorageClient.setObject(KEY_ISSUE_LIST, issueList.getIssueList())
}