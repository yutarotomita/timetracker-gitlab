import { IIssue } from "../iIssue"
import { GitLabUser } from "./gitLabUser"
import { isDefined } from "../../function/nullCheck"

// Issue単体のクラス
export class GitLabIssue implements IIssue{
    id :number //FIXME: stringの方がいいか？あとidのがいい
    assignee :GitLabUser | undefined
    title :string
    timeEstimate :number //FIXME: RelativeTimeのがいい
    timeSpend :number //FIXME: RelativeTimeのがいい
    // good :number
    // bad :number
    labels :Array<string>
    state :string
    url :string

	constructor(issue :any){
		this.id = issue.iid
		this.assignee = issue.assignee? new GitLabUser(issue.assignee) : undefined
		this.title = issue.title
		this.timeEstimate = issue.time_stats.time_estimate
		this.timeSpend = issue.time_stats.total_time_spent
		// this.good = issue.upvotes
		// this.bad = issue.downvotes
		this.labels = issue.labels
		this.state = issue.state
		this.url = issue.url//web_url
	}

	// 単一のプロジェクトのスコープ内で一意の内部ID。spendなどGitLab上のissueを更新するときにはこっちが必要
	getId(){
		return this.id
	} 

	getAssignee(){
		return this.assignee!
	}

	isAssign(){
		return isDefined(this.assignee) ? true : false
	}

	getTitle(){
		return this.title
	}

	getTimeEstimate(){
		return this.timeEstimate ? this.timeEstimate : 0
	}

	getTimeSpend(){
		return this.timeSpend ? this.timeSpend : 0
	}

	// getGood(){
	// 	return this.good
	// }

	// getBad(){
	// 	return this.bad
	// }

	getLabels(){
		return this.labels
	}

	getUrl(){
		return this.url
	}

	/**
	 * 付箋が閉じているとき: "closed"
	 * 付箋が開いているとき: "opened"
	 */
	isActive(){
		return this.state == "opened" ? true : false 
	}
}