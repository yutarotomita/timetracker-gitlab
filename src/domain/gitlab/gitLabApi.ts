import { IMilestone } from "../iMilestone"
import { GitLabProjectAccessTokens } from "./gitLabProjcetAccessTokens"
import { Time } from "../common/time"
import { isUndefined } from "../../function/nullCheck"

export class GitLabApi{
    private privateToken :string
    private projectId :number
    private domain : string

	constructor(gitLabProjectAccessTokens: GitLabProjectAccessTokens){
        this.domain = gitLabProjectAccessTokens.getGitLabDomain()
		this.privateToken = gitLabProjectAccessTokens.getPrivateToken()
		this.projectId = gitLabProjectAccessTokens.getProjectId()
	}

	getProjectId(){
		return this.projectId
	}

	// ログインユーザー情報取得
	async getLoginUser(callback: Function){
		let url = this.createBaseUrl()
		url.pathname = url.pathname + '/user/'
		await this.getAjax(url, callback)
	}

	/**
	 * GET /projects/:id/milestones
	 * @param {*} callback 
	 */
	// async getAjaxMilestone(callback: Function){
	// 	let url = this.createBaseUrl()
	// 	url.pathname = url.pathname + '/projects/' + this.getProjectId() + '/milestones'
	// 	await this.getAjax(url, callback)
	// }

	/**
	 * GET /projects/:id/issues
	 * @param {*} callback 
	 * @param {*} milestone 
	 */
	async getAjaxIssue(callback: Function, perPage: number, page: number){
		let url = this.createBaseUrl()
		url.pathname = url.pathname + '/projects/' + this.getProjectId() + '/issues'
		url.search = '?per_page=' + perPage + '&page=' + page
		await this.getAjax(url, callback)
	}

	/**
	 * 
	 * @param {*} url 
	 * @param {*} callback 
	 */
	async getAjax(url: URL, callback: Function){
		console.log('GET AjaxStart: ' + url)
		await fetch(url.toString(), {
			method: 'GET',
			mode: 'cors',
			headers: {
			  'Content-Type': 'application/json',
			  'PRIVATE-TOKEN': this.privateToken
			},
		  })
		  .then(response => {
			if (!response.ok) {
				throw new Error('下記のリクエストに失敗しているので、メッセージをご確認ください');
			}
			return response.json();
			})
			.then((rslt) => {
				callback(rslt)
			})
			.catch(error => {
				console.error(error);
			});
		console.log('GET AjaxEnd: ' + url)
	}

	/**
	 * POST /projects/:id/issues/:issue_iid/add_spent_time
	 * @param {*} callback 
	 * @param {*} issueIid 
	 * @param {*} spentTime ミリ秒
	 */
	postAjaxSpentIssue(callback: Function, issueIid: number, spentTime: number){
		let url = this.createBaseUrl()
		url.pathname = url.pathname + '/projects/' + this.getProjectId() + '/issues/' + issueIid + '/add_spent_time'
		url.search = '?duration=' + Time.milisecondsToSeconds(spentTime) +'s'
		this.postAjax(url, callback)
	}

	/**
	 * 
	 * @param {*} url 
	 * @param {*} callback 
	 */
	async postAjax(url: URL, callback: Function){
		console.log('POST AjaxStart: ' + url)
		await fetch(url.toString(), {
			method: 'POST',
			mode: 'cors',
			headers: {
			  'Content-Type': 'application/json',
			  'PRIVATE-TOKEN': this.privateToken
			},
		  })
		  .then(response => {	
			if (!response.ok) {
				throw new Error('下記のリクエストに失敗しているので、メッセージをご確認ください');
			}
			return response.json();
			})
			.then((rslt) => {
				callback(rslt)
			})
			.catch(error => {
				console.error(error);
			});
		console.log('POST AjaxEnd: ' + url)
	}

	createBaseUrl(){
		return new URL('https://' + this.getDomain() + '/api/v4')
	}

	getDomain(){
		return this.domain
	}
}