import { Template } from "../domain/common/template"
import { IIssue } from "./iIssue"
import { Time } from "./common/time"
import { isDefined } from "../function/nullCheck"
import { Bootstrap5 } from "./boostrap5"
import { ElementClass } from "./element/elementClass"
import { ElementId } from "./element/elementId"

/**
 * リスト内の一つの付箋に相当するクラス
 * 付箋のDOM要素とIssueオブジェクトの整合性を保つ
 */
export class StickyNote{
	private dom :Element
	private id :number
	private issue :IIssue
	private available :boolean
	private startDate? :number
	private elapsedTime :number

	constructor(issue: IIssue){
		// テンプレートからひな形となるDOMを生成
		this.dom = Template.createWrappedDom(new ElementId('issue-list-item-template'),'div', new ElementClass('list-group-item'))
		// 付箋のidはissueのidを利用する
		this.id = issue.getId()
		this.issue = issue
		this.available = false
		// 工数カウント用
		this.startDate = undefined
		this.elapsedTime = 0 //ms
		this.set(issue)
	}

	// 初期化
	set(issue :IIssue){
		this.id = issue.getId()
		this.issue = issue
		// Issueクラスの情報をDOM要素へ反映
		const titleDom = this.dom.querySelector(StickyNote.SELECTOR_TITLE())! //Nullチェック
		titleDom.innerHTML = issue.getTitle()
		const spendTimeDom = this.dom.querySelector(StickyNote.SELECTOR_SPEND_TIME())! //Nullチェック
		spendTimeDom.innerHTML = String(Time.secondsToHour(issue.getTimeSpend()))

		const profileAvatarDom: HTMLImageElement = this.dom.querySelector(StickyNote.SELECTOR_PROJILE_AVATAR())! // Nullチェック
		if(isDefined(issue.getAssignee())){
			profileAvatarDom.src = issue.getAssignee()!.getImgPath()
		}
		// 実績に応じてプログレスバーの見た目を更新する
		this.setProgressBar()
		
		// ラベルに応じてバッチの見た目を変える
		const badgeDom = this.dom.querySelector(StickyNote.SELECTOR_BADGE())! // Nullチェック
		if(!issue.isActive()){
			badgeDom.innerHTML = 'closed'
			badgeDom.classList.add(Bootstrap5.CLASS_BG_DARK())
		}
		else{
			badgeDom.innerHTML = issue.getLabels()[0] //FIXME: 複数ラベルに対応したい
			if(issue.getLabels()[0] == 'Doing'){
				badgeDom.classList.add(Bootstrap5.CLASS_BG_SUCCESS())
			}
			else if(issue.getLabels()[0] == 'Waiting'){
				badgeDom.classList.add(Bootstrap5.CLASS_BG_SECOUNDARY())
			}
			else if(issue.getLabels()[0] === '個人ToDo'){
				badgeDom.classList.add(Bootstrap5.CLASS_BG_WARNING())
			}
			else if(issue.getLabels()[0] == 'レビュー待ち'){
				badgeDom.classList.add(Bootstrap5.CLASS_BG_DANGER())
			}
		}
	}

	// 選択状態にする
	select(startDate: number){
		if(!this.available){
			this.available = true
			this.dom.classList.add(StickyNote.CLASS_AVAILABLE())
			// カウントアップを始める
			this.startDate = startDate
		}
	}

	// 非選択状態にする
	unselect(){
		// 経過時間を反映
		if(isDefined(this.startDate)){
			if(this.available){
				this.available = false
				this.dom.classList.remove(StickyNote.CLASS_AVAILABLE())
				this.setElapsedTime(Date.now() - this.startDate!)
			}
		} else {
			new Error("StartDateが未定義です")
		}
	}

	// クリック時のイベントハンドラ登録
	addListenerClickAfter(action: Function){
		this.dom.addEventListener('click', (index)=>{
			action(index)
		})
	}
	
	// 選択状態かを返却
	isAvailable(){
		return this.available
	}

	getDom(){
		return this.dom
	}

	getId(){
		return this.id
	}

	setId(id:number){
		this.id = id
	}

	getName(){
		return this.issue.getTitle()
	}

	getStartDate(){
		return this.startDate
	}

	setStartDate(date:number){
		this.startDate = date
	}

	getElapsedTime(){
		return this.elapsedTime
	}

	// 経過時間をクラス内部の変数に保持し、見た目に反映する
	setElapsedTime(time: number){
		this.elapsedTime = this.elapsedTime + time
		const elapsedTimeDom = this.dom.querySelector(StickyNote.SELECTOR_ELAPSED_TIME())! // Nullチェック
		elapsedTimeDom.innerHTML = Time.humanFomatFromMiliseconds(this.elapsedTime)
		this.setProgressBar()
	}

	// プログレスバー1,2の見た目を更新する
	setProgressBar(){
		const estimatedTime = this.issue.getTimeEstimate()
		, spendTime = this.issue.getTimeSpend()
		, addTime = Time.milisecondsToSeconds(this.elapsedTime)

		let progressBarDom1 = this.dom.querySelector(StickyNote.SELECTOR_PROGRESS_BAR1())! // Nullチェック
		, progressBarDom2 = this.dom.querySelector(StickyNote.SELECTOR_PROGRESS_BAR2())! // Nullチェック
		
		let progressPer1
		, progressPer2
		if(estimatedTime > 0){
			progressPer1 = Math.floor((spendTime / estimatedTime) * 100)
			progressPer2 = Math.floor((addTime / estimatedTime) * 100)
		} else if(spendTime + addTime > 0) {
			progressPer1 = Math.floor(spendTime / (spendTime + addTime)) * 100
			progressPer2 = Math.floor(addTime / (spendTime + addTime)) * 100
		} else {
			progressPer1 = 0
			progressPer2 = 0
		}
		// 1割以下だと追加時間が見えない。最低1割を確保する
		if(addTime > 0 && progressPer2 < 10){
			progressPer2 = 10
		}
		if(spendTime > 0 && progressPer1 < 10){
			progressPer1 = 10
		}

		progressBarDom1.setAttribute("style", "width: " + String(progressPer1) + '%' + ";")
		progressBarDom2.setAttribute("style", "width: " + String(progressPer2) + '%' + ";")

		progressBarDom1.classList.remove(Bootstrap5.CLASS_BG_DANGER(), Bootstrap5.CLASS_BG_WARNING())
		progressBarDom2.classList.remove(Bootstrap5.CLASS_BG_DANGER(), Bootstrap5.CLASS_BG_WARNING())
		if(progressPer1 + progressPer2 > 200){
			progressBarDom1.classList.add(Bootstrap5.CLASS_BG_DANGER())
			progressBarDom2.classList.add(Bootstrap5.CLASS_BG_DANGER())
		}
		else if(progressPer1 + progressPer2 > 100){
			progressBarDom1.classList.add(Bootstrap5.CLASS_BG_WARNING())
			progressBarDom2.classList.add(Bootstrap5.CLASS_BG_WARNING())
		}
	}

	static SELECTOR_TITLE(){
		return ".stickyNote-title"
	}

	static SELECTOR_SPEND_TIME(){
		return ".stickyNote-spendTime"
	}

	static SELECTOR_ELAPSED_TIME(){
		return ".stickyNote-elapsedTime"
	}

	static SELECTOR_EST_TIME(){
		return ".stickyNote-estTime"
	}

	static SELECTOR_PROJILE_AVATAR(){
		return '.stickyNote-profile-avatar'
	}

	static SELECTOR_PROGRESS_BAR1(){
		return '.stickyNote-progress-bar-1'
	}

	static SELECTOR_PROGRESS_BAR2(){
		return '.stickyNote-progress-bar-2'
	}

	static SELECTOR_BADGE(){
		return '.stickyNote-badge'
	}

	// 活性状態を表すクラス
	static CLASS_AVAILABLE(){
		// Bootstrapのコンテクストクラスを利用している
		// https://getbootstrap.jp/docs/5.0/components/list-group/#contextual-classes
		return "list-group-item-primary"
	}

}