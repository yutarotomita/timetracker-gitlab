import { Template } from "./common/template"
import { WorkingTime } from "./workingTime"
import { ElementClass } from "./element/elementClass"
import { ElementId } from "./element/elementId"
import { Time } from "./common/time"

/**
 * 工数リスト内の一つの付箋に相当するクラス
 * 付箋のDOM要素とWorkingTimeオブジェクトの整合性を保つ
 */
export class WorkingTimeSticky{
	private dom :Element
	private id :string
	private index :number
	private workingTime?: WorkingTime
	private selected :Boolean = false
    private eventAfterChange: Function = ()=>{}

    constructor(workingTime: WorkingTime, index :number){
		// テンプレートからひな形となるDOMを生成
		this.dom = Template.createWrappedDom(new ElementId('workingTime-list-item-template'),'div', new ElementClass('list-item'))
		// 付箋のidはworkingTimeのidを利用する
		this.workingTime = workingTime
		this.id = workingTime.getWorkingTimeId()
		this.index = index
		this.set(workingTime)
	}

	/**
	 * 付箋が選択状態か
	 * @returns 
	 */
	isSelected(){
		return this.selected
	}

	/**
	 * 選択状態を切り替える
	 * @returns 切替後の選択状態
	 */
	switchSelect(){
		const elemTitle = this.dom.querySelector(WorkingTimeSticky.SELECTOR_TITLE())
		const elemEditArea = this.dom.querySelector(WorkingTimeSticky.SELECTOR_BODY())
		if(this.selected){
			elemTitle!.classList.add('text-truncate');
			elemEditArea!.classList.add(WorkingTimeSticky.CLASSNAME_HIDE());
		} else {
			elemTitle!.classList.remove('text-truncate');
			elemEditArea!.classList.remove(WorkingTimeSticky.CLASSNAME_HIDE());
		}
		this.selected = !this.selected
		return this.selected
	}

    /**
     * 初期化
     * @param workingTime 
     */
    set(workingTime :WorkingTime){
		this.workingTime = workingTime
		this.id = workingTime.getWorkingTimeId()
		// WorkingTimeクラスの情報をDOM要素へ反映
		
		// 初期表示設定
		const titleDom = this.dom.querySelector(WorkingTimeSticky.SELECTOR_TITLE())! //Nullチェック
		titleDom.innerHTML = workingTime.getTaskName()
		const spendTimeDom = this.dom.querySelector(WorkingTimeSticky.SELECTOR_SPEND_TIME())! //Nullチェック
		spendTimeDom.innerHTML = String(Time.secondsToclock(workingTime.getElapsedTime()))
		const elapsedTimeDom: HTMLInputElement = this.dom.querySelector(WorkingTimeSticky.SELECTOR_ELAPSEDTIME())! //Nullチェック
			, elapsedTimeValue = workingTime.getElapsedTime()
		elapsedTimeDom.setAttribute('value', String(Time.secondsToMinute(Time.milisecondsToSeconds(elapsedTimeValue))))
		
		// elapsedTimeが変更された時のイベント登録
		elapsedTimeDom.addEventListener('change', () => {
			spendTimeDom.innerHTML = String(Time.secondsToclock(Time.minuteToMiliSeconds(Number(elapsedTimeDom.value))))
			this.workingTime!.setElapsedTime(Time.minuteToMiliSeconds(Number(elapsedTimeDom.value)))
			this.eventAfterChange()
		}) 

		// addボタンがクリックされたときのイベント登録
		const addDoms: NodeListOf<HTMLElement> = this.dom.querySelectorAll(WorkingTimeSticky.SELECTOR_ADD())! //Nullチェック
		addDoms.forEach((addDom)=>{
			addDom.addEventListener('click', () => {
				const dataMinutes = addDom.dataset.minitue
				const elappsedTime = Number(elapsedTimeDom.value) + Number(dataMinutes)
				elapsedTimeDom.value = String(elappsedTime)
				this.workingTime!.setElapsedTime(Time.minuteToMiliSeconds(elappsedTime))
				spendTimeDom.innerHTML = String(Time.secondsToclock(Time.minuteToMiliSeconds(elappsedTime)))
				this.eventAfterChange()
			})
		})
		// subボタンがクリックされたときのイベント登録
		const subDoms: NodeListOf<HTMLElement> =  this.dom.querySelectorAll(WorkingTimeSticky.SELECTOR_SUB())! //Nullチェック
		subDoms.forEach((subDom)=>{
			subDom.addEventListener('click', () => {
				const dataMinutes = subDom.dataset.minitue
				const elappsedTime = Number(elapsedTimeDom.value) - Number(dataMinutes) < 0 ? 0 : Number(elapsedTimeDom.value) - Number(dataMinutes) 
				elapsedTimeDom.value = String(elappsedTime)
				this.workingTime!.setElapsedTime(Time.minuteToMiliSeconds(elappsedTime))
				spendTimeDom.innerHTML = String(Time.secondsToclock(Time.minuteToMiliSeconds(elappsedTime)))
				this.eventAfterChange()
			})

		})

		const headerDom = this.dom.querySelector(WorkingTimeSticky.SELECTOR_HEADER())! //Nullチェック
		headerDom.addEventListener('click', () => {
			this.switchSelect()
		})
    }

	/**
	 * DOM要素を初期化する
	 */
	clear(){
		this.dom.remove()
		this.workingTime = undefined
		this.id = ''
		this.index = 0
	}

	/**
	 * 値が変更されたときの振る舞いをセット
	 */
	addEventListenerAfterChange(func :Function){
		this.eventAfterChange = func
	}

	/**
	 * 閉じるボタンを押下したときの振る舞い
	 * @param clickAfterFunc 
	 */
    addListenerCloseButtonClickAfter(clickAfterFunc :Function){
        const elemCloseButton = this.dom.querySelector(WorkingTimeSticky.SELECTOR_DELETE_BUTTON())
		elemCloseButton!.addEventListener('click', () => {
			clickAfterFunc(this.index)
			this.clear()
		})
    }

	getWorkingTime(){
		return this.workingTime
	}

    getDom(){
        return this.dom
    }

	getId(){
		return this.id
	}
	setIndex(index: number){
		this.index = index
	}
	
	getIndex(){
		return this.index
	}

	static SELECTOR_HEADER(){
		return ".workingTime-header"
	}

	static SELECTOR_TITLE(){
		return ".workingTime-title"
	}

	static SELECTOR_SPEND_TIME(){
		return ".workingTime-spendTime"
	}

	static SELECTOR_BODY(){
		return ".workingTime-body"
	}

	static SELECTOR_ADD(){
		return ".workingTime-add"
	}

	static SELECTOR_SUB(){
		return ".workingTime-sub"
	}

	static SELECTOR_ELAPSEDTIME(){
		return ".workingTime-elapsedTime"
	}

	static SELECTOR_DELETE_BUTTON(){
		return ".workingTime-deleteButton"
	}

	static CLASSNAME_HIDE(){
		return "hide"
	}

	static CLASSNAME_READONLY(){
		return "readonly"
	}
}