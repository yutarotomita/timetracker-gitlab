import { TotalElapsedTime } from "../domain/html/totalElapsedTime"
import { SpendButton } from "../domain/html/spendButton"
import { MilestoneLabel	} from "../domain/html/milestoneLabel"
import { ElementId } from "../domain/element/elementId"
import { ElementClass } from "../domain/element/elementClass"
import { GitLabProjectAccessTokens } from "../domain/gitlab/gitLabProjcetAccessTokens"
import { GitLabApi } from "../domain/gitlab/gitLabApi"
import { GitLabMilestone } from "../domain/gitlab/gitLabMilestone"
import { GitLabUser } from "../domain/gitlab/gitlabUser"
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
import { WorkingTimeStickyList } from "../domain/WorkingTimeStickyList"


// プライベートトークン
let PRIVATE_TOKEN: string
let GITLAB_DOMAIN: string
let PROJECT_ID: number

// ローカル保存用のKey
const KEY_SELECT_ISSUE_ID = 'select_issue_id'
	, KEY_START_DATE = 'start_date'
	, KEY_WORKINGTIMES = 'workingtimes'
	, KEY_PRIVATE_TOKEN = 'private_token'
	, KEY_GITLAB_DOMAIN = 'gitlab_domain'
	, KEY_GITLAB_PROJECT_ID = 'gitlab_project_id'

/**------------------------------------- NICE TO HAVE ----------------------------------- //
 * 
 * Vue.jsにしたいよね
 * 閉じて開いたら選択している付箋はelapsedとtoday更新されていてほしい
 * 付箋並び替えたい（人順とか）
 * なんか初期表示までが遅い。非同期で初期表示に使う情報を取得したい
 * マイルストーンとか実績とか前回のキャッシュ利用したい
 * プロフ写真ローカルに保存したい。取得できなくなってたら取り直すとかもしたい
 * ディレクトリ構造を考えて配置したい
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

// ------------------------------------ 画面項目一覧 ------------------------------------ //
// Spendボタン
let spendButton: SpendButton
// マイルスト―ンラベル
let milestoneLabel: MilestoneLabel
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
document.addEventListener("DOMContentLoaded", async function(){
	localStorageClient = new LocalStorageWindow() //LocalStorageChrome()
	await loginCheck()
	
	gitLabApiClient = new GitLabApi(new GitLabProjectAccessTokens(PRIVATE_TOKEN, GITLAB_DOMAIN, PROJECT_ID))


	preFetchAjax()
	initialize()

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
	if(isLogin){
		PRIVATE_TOKEN = privateToken
		GITLAB_DOMAIN = gitLabDomain
		PROJECT_ID = gitLabProjectId
	} else {
		window.location.href = './setting.html'
	}
}

/**
 * Ajaxでデータを取得する処理
 * 待機時間取得軽減の為、Ajaxは先に飛ばす
 */
async function preFetchAjax(){
	// ログインユーザーを取得
	gitLabApiClient.getLoginUser((rslt: any)=>{
		// 画面アイコンに適用
		loginUser = new GitLabUser(rslt)
		const avatarElement = document.querySelector('.profile-avatar')! // Nullチェック
		avatarElement.setAttribute('src', loginUser.getImgPath())
	})
}

/**
 * 初期表示
 */
async function initialize(){
	// 画面操作用にオブジェクト生成
	spendButton = new SpendButton(new ElementId('spend-button'))
	milestoneLabel = new MilestoneLabel(new ElementClass('milestone-label'))
	totalElapsedTime = new TotalElapsedTime(new ElementClass('total-elapsedTime'))
	stickyNoteList = new StickyNoteList(new ElementId('issue-list'))
	workingTimeList = new WorkingTimeList()
	workingTimeStickyList = new WorkingTimeStickyList(new ElementId('workingTime-sticky-list'))
	issueList = new IssueList()

	// マイルストーン取得
	const lastMileStone = gitLabApiClient.getAjaxMilestone((rslt: any)=>{
		// 最新のマイルストーンを画面要素へセット
		milestoneLabel.setMilestone(new GitLabMilestone(rslt[0]))
	})
	await lastMileStone
	
	
	let temp_issueList: Array<IIssue> = []
	// イシュー取得
	await gitLabApiClient.getAjaxIssue((rslt: any) => {
		rslt.forEach((issue: IIssue)=>{
			temp_issueList.push(new GitLabIssue(issue))
		})
	}, milestoneLabel.getMilestone()!/* Nullチェック */, 1)
	await gitLabApiClient.getAjaxIssue((rslt: any) => {
		rslt.forEach((issue: IIssue)=>{
			temp_issueList.push(new GitLabIssue(issue))
		})
	}, milestoneLabel.getMilestone()!/* Nullチェック */, 2)
	issueList.set(temp_issueList)

	// イシューを絞り込んで表示要素にセット
	const filterParam = new IssueParam()
	if(isDefined(loginUser.getId())){
		filterParam.setUserId(loginUser.getId())
	}
	filterParam.setActive(true)
	filterParam.setLabel('Doing')
	stickyNoteList.set(issueList.filter(filterParam))
	
	setEventListener()
	await revertToBeforeState()
}

/**
 * 以前の操作履歴を復元
 */
async function revertToBeforeState(){
	selectIssueId = await localStorageClient.getObject(KEY_SELECT_ISSUE_ID)

	startDate = await localStorageClient.getObject(KEY_START_DATE)

	let workingTimes: Array<WorkingTime> = await localStorageClient.getObject(KEY_WORKINGTIMES)
	if(workingTimes.length > 0 ){
		workingTimes.forEach((workingTimeObj: any)=>{
			// 内部的な実績に反映
			const workingTime = new WorkingTime(workingTimeObj.startDate, workingTimeObj.elapsedTime, workingTimeObj.taskId, workingTimeObj.taskName)
			workingTimeList.add(workingTime)
		})

		// 以前実績を入れたイシューがDoingから変わった場合は手動で追加(Deleteされていたらもちろん拾えない)
		workingTimeList.getListGroupById().forEach((workingTime) => {
			const wasteIssueId = workingTime.getTaskId()
			if(!stickyNoteList.existById(wasteIssueId)){
				if(issueList.getById(wasteIssueId)){ //FIXME: 存在チェックダサいのでうまいこと出来ないか（そもそもissueListにも無い状況ってDeleteされてるくらい？）
					const issue = issueList.getById(wasteIssueId)
					if(isDefined(issue)){
						stickyNoteList.add(issue!)
					}
				}
			}
		})
		// 見た目に反映
		stickyNoteList.update(workingTimeList.getListGroupById())
		totalElapsedTime.set(workingTimeList.getElapsedTime())
		workingTimeStickyList.set(workingTimeList)
	}
	// 以前選択していたイシューが消えた（裏でcloseされている等）場合は手動で追加
	if(isDefined(selectIssueId)){
		if(!stickyNoteList.existById(selectIssueId!)){
			if(issueList.getById(selectIssueId!)){ //FIXME: 存在チェックダサいのでry
				const te = issueList.getById(selectIssueId!)
				if(isDefined(te)){
					stickyNoteList.add(te!)
				}
			}
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

}

/**
 * イベントリスナーの設定
 */
function setEventListener(){
	// Spendボタン押下時のイベントハンドラを設定
	spendButton.addListenerClickAfter(()=>{
		// スペントする？
		const spentOk = confirm('WorkingTime spent ok????')
		if(spentOk){
			workingTimeList.getAll().forEach((workingTime)=>{
				gitLabApiClient.postAjaxSpentIssue(()=>{}, workingTime.getTaskId(), workingTime.getTime())
			})
		}
		// ローカルの実績クリアする？
		const deleteOk = confirm('WorkingTime delete ok????')
		if(deleteOk){
			stickyNoteList.clearAll()
			workingTimeList.clear()
			totalElapsedTime.set(0)
			localStorageClient.setObject(KEY_WORKINGTIMES, {})
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
		navigator.clipboard.writeText(jsonText).then(()=>alert('クリップボードにJSON形式でコピーしました。')).catch(e=>alert('コピー時にエラー！ '+e.message));
	})
}