
import { GitLabApi } from "../domain/gitlab/gitLabApi"
import { GitLabProjectAccessTokens } from "../domain/gitlab/gitLabProjcetAccessTokens"
import { ILocalStorage } from "../domain/iLocalStorage"
// import { LocalStorageChrome } from "../domain/localStorageChrome"
import { LocalStorageWindow } from "../domain/localStorageWindow"
import { isDefined } from "../function/nullCheck"

let localStorageClient: ILocalStorage= new LocalStorageWindow() //LocalStorageChrome()
// storageKeyで共通化したい
const KEY_SELECT_ISSUE_ID = 'select_issue_id'
    , KEY_START_DATE = 'start_date'
    , KEY_WORKINGTIMES = 'workingtimes'
    , KEY_PRIVATE_TOKEN = 'private_token'
    , KEY_GITLAB_DOMAIN = 'gitlab_domain'
    , KEY_GITLAB_PROJECT_ID = 'gitlab_project_id'

document.addEventListener("DOMContentLoaded", function(){
    initialize()
    addEventListener()
});

async function initialize(){
    const gitLabDomain = await localStorageClient.getObject(KEY_GITLAB_DOMAIN)
        , privateToken = await localStorageClient.getObject(KEY_PRIVATE_TOKEN)
        , keyGitLabProjectId = await localStorageClient.getObject(KEY_GITLAB_PROJECT_ID)
    const forms = document.forms[0]
        , elemGitLabDomain: HTMLInputElement = forms.gitLabDomain
        , elemPrivateToken: HTMLInputElement = forms.privateToken
        , elemProjectId: HTMLInputElement = forms.projectId
    if(isDefined(gitLabDomain))elemGitLabDomain.setAttribute("value", gitLabDomain)
    if(isDefined(privateToken))elemPrivateToken.setAttribute("value", privateToken)
    if(isDefined(keyGitLabProjectId))elemProjectId.setAttribute("value", keyGitLabProjectId)
}

function addEventListener(){
    const elemSubmitButton = document.querySelector('.submit-button')!
    elemSubmitButton.addEventListener('click', function(){
        const forms = document.forms[0]
            , gitLabDomain: string = forms.gitLabDomain.value
            , privateToken: string = forms.privateToken.value
            , projectId: number = forms.projectId.value
        // const gitLabApi = new GitLabApi(new GitLabProjectAccessTokens(privateToken, gitLabDomain, projectId))
        // gitLabApi.getLoginUser()
        const isAccess = true
        if(isAccess){
            localStorageClient.setObject(KEY_GITLAB_DOMAIN, forms.gitLabDomain.value)
            localStorageClient.setObject(KEY_PRIVATE_TOKEN, forms.privateToken.value)
            localStorageClient.setObject(KEY_GITLAB_PROJECT_ID, forms.projectId.value)
		    window.location.href = './popup.html'
        }
    })
}