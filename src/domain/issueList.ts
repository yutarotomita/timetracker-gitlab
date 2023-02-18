import { IIssue } from "./IIssue"
import { IUser } from "./iUser"
import { IssueParam } from "./issueParam"
import { isDefined } from "../function/nullCheck"

/**
 * 付箋リストのクラス
 */
export class IssueList{
    private issueList :Array<IIssue>

	constructor(){
		this.issueList = []
	}

	/**
	 * issueの配列をセット
	 * @param {Array[Issue]} issues 
	 */
	set(issues:Array<IIssue>){
		this.issueList = issues
	}

	getById(id: number){
		return this.issueList.find(issue=> issue.getId() == id)
	}

	/**
	 * Issueの配列を返却する
	 * @returns Array[Issue]
	 */
	getIssueList(){
		return this.issueList
	}

	// リストに含まれるユーザーを配列形式で返却する
	getUserList(){
		let assigneeInIssueList :Array<IUser> = []
		this.issueList.forEach((issue)=>{
            if(issue.isAssign()){
                assigneeInIssueList.push(issue.getAssignee()!)
            }
		})
		return assigneeInIssueList
	}

	/**
	 * 任意条件でリストを絞り込むメソッド
	 * @param {IssueParam} issueParam 
	 */
	filter(issueParam :IssueParam){
		let filteredIssueList = this.issueList
		if(isDefined(issueParam.getUserId())){
			filteredIssueList = filteredIssueList.filter(issue => issue.isAssign() && (issue.getAssignee()!.getId() == issueParam.getUserId()))
		}
		// labelが複数指定されている場合はand検索
		if(issueParam.getLabels().length > 0){
			issueParam.getLabels().forEach(label =>{
				filteredIssueList = filteredIssueList.filter(issue =>
					issue.getLabels().includes(label)
				)
			})
		}
		if(issueParam.isActive() != null){
			filteredIssueList = filteredIssueList.filter(issue => issue.isActive() == issueParam.isActive())
		}

		let newIssueList = new IssueList()
		newIssueList.set(filteredIssueList)
		return newIssueList
	}

	// 総Issue数を返却する
	getCountAll(){
		return this.issueList.length
	}

	// 総見積もり時間[秒]を返却する
	getTotalEstimateTime(){
		let totalEstimate = 0
		this.issueList.forEach((issue)=> {
			totalEstimate = totalEstimate + issue.getTimeEstimate()
		})
		return totalEstimate
	}

	// 総消費時間[秒]を返却する
	getTotalSpentTime(){
		let totalSpend = 0
		this.issueList.forEach((issue)=> {
			totalSpend = totalSpend + issue.getTimeSpend()
		})
		return totalSpend
	}

	// 総グッド数を返却する
	// getCountGood(){
	// 	let countGood = 0
	// 	this.issueList.forEach((issue)=> {
	// 		countGood = countGood + issue.getGood()
	// 	})
	// 	return countGood
	// }

	// // 総バッド数を返却する
	// getCountBad(){
	// 	let countBad = 0
	// 	this.issueList.forEach((issue)=> {
	// 		countBad = countBad + issue.getBad()
	// 	})
	// 	return countBad
	// }
}