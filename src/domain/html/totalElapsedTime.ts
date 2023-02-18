import { Time } from "../common/time"
import { ElementClass } from "../element/elementClass"
/**
 * 合計消費時間を表す要素のクラス
 */
export class TotalElapsedTime{
    private dom: Element
    private totalElapsedTime: number

	constructor(className: ElementClass){
		this.dom = document.querySelector(className.getSelector())! //FIXME: Nullチェック
		this.totalElapsedTime = 0 //s
	}

    /**
     * 合計消費時間をDOM要素へ反映する
     */
    set(milisec: number){
        this.totalElapsedTime = milisec
        this.dom.innerHTML = String(Time.secondsToclock(this.totalElapsedTime))
    }
}