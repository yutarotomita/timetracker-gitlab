/**
 * Issue検索・抽出用のパラメータ
 */
export class IssueParam{
    private userId?: number
    private activeFlg? :boolean
    private labels :Array<string>

	constructor(){
		this.userId = undefined
		this.labels = []
		this.activeFlg = undefined
	}

	setUserId(id: number){
		this.userId = id
	}

	getUserId(){
		return this.userId
	}

	setLabel(label: string){
		this.labels.push(label)
	}

	getLabels(){
		return this.labels
	}

	setActive(flg: boolean){
		this.activeFlg = flg ? true : false
	}

	isActive(){
		return this.activeFlg
	}

}