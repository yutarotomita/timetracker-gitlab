import { IMilestone } from "../iMilestone"

export class GitLabMilestone implements IMilestone{
    id: number
    title: string

	constructor(milestone: IMilestone){
		this.id = milestone.id
		this.title = milestone.title
	}

	getId(){
		return this.id
	}

	getLabel(){
		return this.title
	}
}