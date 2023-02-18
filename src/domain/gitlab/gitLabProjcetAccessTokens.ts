export class GitLabProjectAccessTokens {
	private privateToken: string
	private gitlabDomain: string
	private projectId: number

	constructor(privateToken: string, gitlabDomain: string, projectId: number){
		this.privateToken = privateToken
		this.gitlabDomain = gitlabDomain
		this.projectId = projectId
	}

	setPrivateToken(privateToken: string){
		this.privateToken = privateToken
	}

	setGitLabDomain(gitlabDomain: string){
		this.gitlabDomain = gitlabDomain
	}

	setProjectId(projectId: number){
		this.projectId = projectId
	}

	getPrivateToken(){
		return this.privateToken
	}

	getGitLabDomain(){
		return this.gitlabDomain
	}

	getProjectId(){
		return this.projectId
	}
}