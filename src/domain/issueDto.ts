import { isDefined } from "../function/nullCheck";
import { GitLabUser } from "./gitlab/gitLabUser";
import { IIssue } from "./iIssue";
import { IUser } from "./iUser";

/**
 * issueをローカルストレージで保存、復元するためのDto
 * jsのlocalstorageはオブジェクトのfunctionをシリアライズできないため用意した
 */
export class IssueDto implements IIssue{
    id :number
    assignee :GitLabUser | undefined
    title :string
    timeEstimate :number
    timeSpend :number
    labels :Array<string>
    state :string
    url :string
    constructor(issue: IIssue){
		this.id = issue.id
		this.assignee = issue.assignee? new GitLabUserDto(issue.id, issue.assignee.userName, issue.assignee.label, issue.assignee.imgPath, issue.assignee.profilePath) : undefined
		this.title = issue.title
		this.timeEstimate = issue.timeEstimate
		this.timeSpend = issue.timeSpend
		this.labels = issue.labels
		this.state = issue.state
		this.url = issue.url
    }
    getId(): number {
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

class GitLabUserDto implements IUser{
    id :number
    userName :string
    label :string
    imgPath :string
    profilePath :string

	constructor(id :number, userName :string, label :string, imgPath :string, profilePath :string){
		this.id = id
		this.userName = userName
		this.label = label
        this.imgPath = imgPath
		this.profilePath = profilePath
	}

	getId(){
		return this.id
	}

	getUserName(){
		return this.userName
	}

	getLabel(){
		return this.label
	}

    getImgPath(){
        return this.imgPath
    }

    getProfilePath(){
        return this.profilePath
    }
}