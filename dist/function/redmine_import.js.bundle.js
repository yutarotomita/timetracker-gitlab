/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!****************************************!*\
  !*** ./src/function/redmine_import.js ***!
  \****************************************/

var timeInputTable

$(document).ready(() => {
	timeInputTable = new TimeInputTable('time_input_table')
	insertTextArea()
	addEventListener()
})

async function inputWorkingTime(issueId, spendHour, comment){
	let targetRow = timeInputTable.findAvailableRow(issueId)
	if(targetRow == -1){
		// 行自体が無かった時の処理
		await RedmineClient.ajaxInsertTickets(issueId)
		timeInputTable.refresh()
		targetRow = timeInputTable.findAvailableRow(issueId)
	}
	if(targetRow.isInputed()){
		// 行はあるが既に入力されているので、行を新しく追加し入力するときの処理
		const dup_id = new RowId(targetRow.getId())
		// FIXME: Redmineと通信する用のクラスを作成したのでそちらに寄せる
		const url = '/work_time/ajax_add_tickets_insert' + location.search
		await targetRow.dup_ticket(url, dup_id.toString(), dup_id.getIssueId())

		const dupRowElm = document.querySelector('#' + dup_id.toStringNextIndex())
			, dupRow = new TimeInputTableRow(dupRowElm)
		dupRow.addSpendTime(spendHour)
		dupRow.addComment(comment)
		timeInputTable.add(dupRow)

	} else {
		// 入れれるとき
		targetRow.addSpendTime(spendHour)
		targetRow.addComment(comment)
	}
	
}

function insertTextArea(){
	// 可読性優先でベタ書き
	const memo = `
		<div><textarea id="autoInputTextArea" rows="10" style="width:100%"></textarea>
		<br>
		<input id="autoInputButton" type="button" value="自動入力＾＾"></input>
		</div>
	`
	jQuery('#time_input_table').before(memo)
	
	// 以下テスト用
	const workingTimes = `
		{
			"issueId" : "157608",
			"spendTime" : 1,
			"comment" : "テスト追加1"
		},
		{
			"issueId" : "157608",
			"spendTime" : 2,
			"comment" : "テスト追加2"
		}
	`
	jQuery('#autoInputTextArea').val(workingTimes)
}

function input(jsons){
	let promise = Promise.resolve()
	jsons.forEach((json) => {
		const issueId = json.issueId
			, spendTime = json.spendTime
			, comment = json.comment
		promise = promise.then(inputWorkingTime.bind(this, issueId, spendTime, comment))
	})
}

function addEventListener(){
	jQuery('#autoInputButton').on('click', () =>  {
		const inputText = jQuery('#autoInputTextArea').val()
		if(inputText != ""){
			input(JSON.parse(inputText))
		}
	  })
}

/**
 * 行のIDを表すドメイン
 * ルールにのっとってるっぽいのでこちらで表現
 */
 class RowId{
	constructor(string){
		const splited = string.match(/^time_entry_pos(\d+)_(\d+)$/)
		this.issueId = splited[1]
		this.index = Number(splited[2])
	}

	getIssueId(){
		return this.issueId
	}

	getIndex(){
		return this.index
	}

	// ex. time_entry_pos157608_0
	toString(){
		return RowId.PREFIX() + this.issueId + '_' + this.index
	}

	// ex. time_entry_pos157608_1
	toStringNextIndex(){
		const nextIndex = Number(this.index) + 1
		return RowId.PREFIX() + this.issueId + '_' + nextIndex
	}

	// ex. new_time_entry_157608_0_hours
	spentTimeId(){
		return 'new_time_entry_' + this.issueId + '_' + this.index +  '_hours'
	}

	// ex. new_time_entry_157608_0_comments
	commentId(){
		return 'new_time_entry_' + this.issueId + '_' + this.index +  '_comments'
	}

	static PREFIX(){
		return 'time_entry_pos'
	}
}

class TimeInputTable{
	constructor(id){
		this.id = id
		this.dom = null
		this.rows = []
		this.refresh()
	}

	/**
	 * 行を追加する
	 * @param {*} timeInputTableRow
	 */
	add(timeInputTableRow){
		this.rows.push(timeInputTableRow)
	}

	/**
	 * チケット番号で行を検索する(複数あったらIndex最大のものを返す)
	 * 無い場合は-1が返る
	 * @param {number} issueId 
	 */
	findAvailableRow(issueId){
		let maxIndexRows = -1
		const filterdRows = this.rows.filter(row => row.getIssueId() == issueId)
		if(filterdRows.length){
			maxIndexRows = filterdRows[0];
			filterdRows.forEach((row) => {
				if(row.getIndex() > maxIndexRows.getIndex()){
					maxIndexRows = row
				}
			})
		}
		return maxIndexRows
	}

	refresh(){
		this.dom = document.getElementById(this.id)
		this.rows = []
		const rowId = `[id^='` + RowId.PREFIX() + `']`
		const rowElements = this.dom.querySelectorAll(rowId);
		rowElements.forEach((e) => {
			this.add(new TimeInputTableRow(e))
		})
	}

	/**
	 * 行を新規追加する
	 */
	async tickets_insert()
	{
		//TODO
	}
}

class TimeInputTableRow{
	constructor(dom){
		this.dom = dom
		const domId = dom.getAttribute('id') // time_entry_pos157608_0
		this.ids = new RowId(domId)
		this.spendTimeid = '#' + this.ids.spentTimeId()
		this.commentid = '#' + this.ids.commentId()
	}

	getId(){
		return this.ids.toString()
	}

	getIssueId(){
		return this.ids.getIssueId()
	}

	getIndex(){
		return this.ids.getIndex()
	}

	/**
	 * 入力済みかどうか
	 */
	isInputed(){
		const commented = this.dom.querySelector(this.commentid).value != ""
		, spented = this.dom.querySelector(this.spendTimeid).value != ""
		return commented || spented
	}

	/**
	 * 工数を入力する
	 * @param {Number} hour 
	 */
	addSpendTime(hour){
		this.dom.querySelector(this.spendTimeid).value = hour
	}

	/**
	 * コメントを入力する
	 * @param {string} comment 
	 */
	addComment(comment){
		this.dom.querySelector(this.commentid).value = comment
	}

	/**
	 * 行を複製する（＋ボタン押したのと同じ動き）
	 * redmine純正のメソッド。仕様変更されたら使えない
	 */ 
	 async dup_ticket(ajax_url, insert_pos, id)
	 {
		 const add_ticket_count = this.ids.getIndex() + 1
		 await jQuery.ajax({
			 url:ajax_url+"&add_issue="+id+"&count="+add_ticket_count,
			 data:{asynchronous:true, method:'get'},
			 success:function(response){
				 jQuery('#'+insert_pos).after(response);
			 }
		 });
	 }
}

/**
 * 時間を表すドメイン
 */
class Time{
	constructor(second){
		this.s = second
	}

	getSecond(){
		return this.s / (60*60)
	}

	getHour(){
		return this.s / (60*60)
	}

	getMinute(){
		return this.s / 60
	}
}

/**
 * RedmineAPIとのやりとりを担当するクラス
 * Redmine側の仕様変更があってもここを修正すれば対応できるはず
 */
class RedmineClient{

	static canInputTicket = false
	static add_ticket_count = 1

	/**
	 * 新規チケット追加フォームを開く
	 * FIXME: 開かなくてもチケット新規追加出来たっぽい。消す
	 */
	static async ajaxAddTicketsInput(){
		const ajax_url = '/work_time/ajax_add_tickets_input'
		await jQuery.ajax({
			url: ajax_url,
			data:{asynchronous:true, method:'get'},
			success: function(response){
				jQuery('#add_ticket_area').replaceWith(response);
				}
		});
	}

	/**
	 * チケットを新規追加する
	 * @param {*} issueId
	 * @returns 
	 */
	// 純正メソッド参考: function tickets_insert(ajax_url, tickets)
	static async ajaxInsertTickets(issueId){
		const ajax_url = '/work_time/ajax_add_tickets_insert' + location.search
		await jQuery.ajax({
			url:ajax_url+"&add_issue="+issueId+"&count="+RedmineClient.add_ticket_count,
			data:{asynchronous:true, method:'get'},
			success:function(response){
			jQuery('#time_input_table_bottom').before(response);
			}
		});
		RedmineClient.add_ticket_count ++;
	}
}
/******/ })()
;
//# sourceMappingURL=redmine_import.js.bundle.js.map