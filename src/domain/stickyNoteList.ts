import { ElementId } from "./element/elementId"
import { IssueList } from "./issueList"
import { StickyNote } from "./stickyNote"
import { WorkingTime } from "./workingTime"
import { IIssue } from "./iIssue"
import { isDefined } from "../function/nullCheck"

// 表示されているリストのオブジェクト
export class StickyNoteList{
    private dom: HTMLElement
    private selectedId?: number
    private selectedIndex?: number
    private stickyNotes: Array<StickyNote>
    private eventAfterClick: Function
    private issueList?: IssueList

    constructor(domId: ElementId){
      this.dom = document.getElementById(domId.getString())!
      this.selectedId = undefined //選択中の付箋ID
      this.selectedIndex = undefined //選択中の付箋index
      this.stickyNotes = []

      this.eventAfterClick = () => {}
    }
  
    /**
     * 付箋リストからDOM要素を追加
     * @param {IssueList} issueList 
     */
    set(issueList: IssueList){
      this.selectedId = undefined
      this.selectedIndex = undefined
      this.issueList = issueList
      this.stickyNotes = [] // FIXME: 現状setするとStickyNoteを再生成しているため内部的にも保持されない。どっかで保持して再利用したい
      this.dom.innerHTML = '' // FIXME: innerHTMLで子要素を削除するのは非推奨。whileで回すかjquery.remove()を使う
      issueList.getIssueList().forEach((issue)=>{
        this.add(issue)
      })
    }
  
    /**
     * WorkingTimeListの実績をStickyNoteの実績に反映する
     * @param {*} workingTimes 
     */
    update(workingTimes: Array<WorkingTime>){
      // 合計したWorkingTimeでStickyNoteに反映
      workingTimes.forEach((workingTime)=>{
          const targetIndex = this.getIndexById(workingTime.getTaskId())
          if(targetIndex != -1){
              this.stickyNotes[targetIndex].setStartDate(workingTime.getStartDate())
              this.stickyNotes[targetIndex].setElapsedTime(workingTime.getElapsedTime())
          }
      })
    }
  
    /**
     * リストに新しく付箋を追加
     * @param {Issue} issue 
     * @returns index
     */
    add(issue: IIssue, isPrepend = false){
      const index = this.stickyNotes.length
      // 各付箋の要素を生成
      let stickyNote = new StickyNote(issue)
      // クリック時のイベントハンドラを設定
      stickyNote.addListenerClickAfter(()=>{
        this.selectByIndex(index)
        this.eventAfterClick(stickyNote)
      })
      this.stickyNotes.push(stickyNote)
      if(isPrepend){
          this.dom.prepend(stickyNote.getDom())
      } else {
          this.dom.append(stickyNote.getDom())
      }
      return index
    }
  
    /**
     * 任意のindexの付箋を選択状態にする
     * @param {Number} index
     * @param {Number} startDate? <opt> 開始時刻。デフォルトは現在時刻
     */
    selectByIndex(index: number, startDate?: number){
      if(index != this.selectedIndex){
        this.unselectAll()
        this.selectedIndex = index
        this.selectedId = this.stickyNotes[index].getId()
        // 開始時間が指定されていれば、その時刻から選択した状態に
        startDate = isDefined(startDate)? startDate! : Date.now()
        this.stickyNotes[index].select(startDate)
      }
      else{
        this.unselectAll()
      }
    }
  
    getAll(){
        return this.stickyNotes
    }
  
    /**
     * 任意のidからindexを検索する
     * @param {*} id 
     * @returns idに対応するIssueのindex、なければ-1
     */
    getIndexById(id: number){
      return this.stickyNotes.findIndex(stickyNote => stickyNote.getId() == id)
    }
  
    /**
     * 任意のidが存在するか
     */
    existById(id: number){
        return this.getIndexById(id) != -1
    }
  
    /**
     * 任意のidからStickeyNoteを検索する
     * @param {Number} id
     * @returns idに対応するStickyNote
     */
    getById(id: number){
      return this.stickyNotes[this.getIndexById(id)]
    }
  
    /**
     * 選択中の付箋idを返却する
     * @returns {Number} id
     */
    getSelectedId(){
        return this.selectedId
    }
  
    /**
     * 全ての付箋を非選択状態にする
     */
    unselectAll(){
      this.selectedId = undefined
      this.selectedIndex = undefined
      this.stickyNotes.forEach((stickyNote) => {
        stickyNote.unselect()
      })
    }
  
    /**
     * 工数など全て初期化する
     */
    clearAll(){
    if(isDefined(this.issueList)){
        this.set(this.issueList!)
    }
     
    }
  
    /**
     * クリック時のイベントハンドラを設定する
     */
    addListenerClickAfter(action: Function){
      this.eventAfterClick = action
    }
  }