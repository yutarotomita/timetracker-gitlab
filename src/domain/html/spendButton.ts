import { ElementId } from "../element/elementId"

/**
 * ボタン「Spend」のクラス
 */ 
export class SpendButton{
    private dom: HTMLElement

	constructor(domId: ElementId){
		this.dom = document.querySelector(domId.getSelector())! //FIXME: Nullチェック
	}

	addListenerClickAfter(action: Function){
		this.dom.addEventListener('click', ()=>{
			action()
		})
	}
}