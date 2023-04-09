
import { ILocalStorage } from "../domain/iLocalStorage"
// import { LocalStorageChrome } from "../domain/localStorageChrome"
import { LocalStorageWindow } from "../domain/localStorageWindow"
import { isDefined } from "../function/nullCheck"

let localStorageClient: ILocalStorage= new LocalStorageWindow() //LocalStorageChrome()
// storageKeyはpopup.tsと共通化してください。不要なものも一律コピペする運用
const KEY_SELECT_ISSUE_ID = 'select_issue_id'
, KEY_START_DATE = 'start_date'
, KEY_WORKINGTIMES = 'workingtimes'
, KEY_ISSUE_LIST = 'issue_list'
, KEY_PRIVATE_TOKEN = 'private_token'
, KEY_GITLAB_DOMAIN = 'gitlab_domain'
, KEY_GITLAB_PROJECT_ID = 'gitlab_project_id'
, KEY_IS_OUTPUT_JSON_WHEN_SPENT = 'is_output_json_when_spent'

document.addEventListener("DOMContentLoaded", function(){
    initialize()
    addEventListener()
});

async function initialize(){
    const gitLabDomain = await localStorageClient.getObject(KEY_GITLAB_DOMAIN)
        , privateToken = await localStorageClient.getObject(KEY_PRIVATE_TOKEN)
        , keyGitLabProjectId = await localStorageClient.getObject(KEY_GITLAB_PROJECT_ID)
        // , isOutputJsonWhenSpent = await localStorageClient.getObject(KEY_IS_OUTPUT_JSON_WHEN_SPENT)
    const forms = document.forms[0]
        , elemGitLabDomain: HTMLInputElement = forms.gitLabDomain
        , elemPrivateToken: HTMLInputElement = forms.privateToken
        , elemProjectId: HTMLInputElement = forms.projectId
        // , elemIsOutputJsonWhenSpent: HTMLInputElement = forms.isOutputJsonWhenSpent
    if(isDefined(gitLabDomain))elemGitLabDomain.setAttribute("value", gitLabDomain)
    if(isDefined(privateToken))elemPrivateToken.setAttribute("value", privateToken)
    if(isDefined(keyGitLabProjectId))elemProjectId.setAttribute("value", keyGitLabProjectId)
    // if(isDefined(isOutputJsonWhenSpent))elemIsOutputJsonWhenSpent.checked = isOutputJsonWhenSpent
}

function addEventListener(){
    const elemSubmitButton = document.querySelector('.submit-button')!
    elemSubmitButton.addEventListener('click', function(){
        const forms = document.forms[0]
            , gitLabDomain: string = forms.gitLabDomain.value
            , privateToken: string = forms.privateToken.value
            , projectId: number = forms.projectId.value
            // , isOutputJsonWhenSpent: boolean = forms.isOutputJsonWhenSpent.checked == true
        const isAccess = true
        if(isAccess){
            localStorageClient.setObject(KEY_GITLAB_DOMAIN, gitLabDomain)
            localStorageClient.setObject(KEY_PRIVATE_TOKEN, privateToken)
            localStorageClient.setObject(KEY_GITLAB_PROJECT_ID, projectId)
            // localStorageClient.setObject(KEY_IS_OUTPUT_JSON_WHEN_SPENT, isOutputJsonWhenSpent)
            
		    window.location.href = './popup.html'
        }
    })
}