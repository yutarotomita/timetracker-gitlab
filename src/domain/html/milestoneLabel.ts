import { IMilestone } from "../iMilestone"
import { ElementClass } from "../element/elementClass"

/**
 * マイルストーンを表示する画面要素のクラス
 */
export class MilestoneLabel{
    private labelObj
    private milestone?: IMilestone

	constructor(className: ElementClass){
		this.labelObj = document.querySelector(className.getSelector())!
		this.milestone = undefined
	}

	setMilestone(milestone: IMilestone){
		this.milestone = milestone
		this.labelObj.innerHTML =  milestone.getLabel()
	}

	getMilestone(){
		return this.milestone
	}
}