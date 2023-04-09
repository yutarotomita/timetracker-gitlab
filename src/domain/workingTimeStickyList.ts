import { WorkingTimeSticky } from "./workingTimeSticky"
import { WorkingTimeList } from "./workingTimeList"
import { ElementId } from "./element/elementId"
import { WorkingTime } from "./workingTime"
import { IStickyList } from "./iStickyList"
import { isDefined, isUndefined } from "../function/nullCheck"

export class WorkingTimeStickyList implements IStickyList{
    private dom: HTMLElement
    private workingTimeStickies: Array<WorkingTimeSticky>
    private eventAfterChange: Function = ()=>{}

    constructor(domId: ElementId){
      this.dom = document.getElementById(domId.getString())!
      this.workingTimeStickies = []
    }
    
    /**
     * 作業実績リストからDOM要素を追加
     * @param {WorkingTimeList} WorkingTimeList 
     */
    set(workingTimeList: WorkingTimeList){
        this.workingTimeStickies = []
        this.dom.innerHTML = '' // FIXME: innerHTMLで子要素を削除するのは非推奨。whileで回すかjquery.remove()を使う
        workingTimeList.getAll().forEach((workingTime)=>{
          this.add(workingTime)
        })
    }
    /**
     * 
     * @param workingTime 
     */
    add(workingTime: WorkingTime, isPrepend = false){
      const index: number = this.workingTimeStickies.length
      // 各付箋の要素を生成
      let workingTimeSticky = new WorkingTimeSticky(workingTime, index)
      this.workingTimeStickies.push(workingTimeSticky)
      if(isPrepend){
          this.dom.prepend(workingTimeSticky.getDom())
      } else {
          this.dom.append(workingTimeSticky.getDom())
      }

      // クローズボタンクリック時のイベントハンドラを設定
      const selfId = workingTimeSticky.getId()
      workingTimeSticky.addListenerCloseButtonClickAfter(()=>{
        this.delete(selfId)
        this.eventAfterChange()
      })
      workingTimeSticky.addEventListenerAfterChange(()=>{
        this.eventAfterChange()
      })
      return index
    }

    /**
     * Deleteボタンクリック時のイベントハンドラを設定する
     * @param action(WorkingTimeList)  除外済みのWorkingTimeListを引数としたFunction
     */
    addListenerChangeAfter(action: Function){
      this.eventAfterChange = action
    }

    /**
     * WorkingTimeSticky（実績の付箋）IDからindexを取得する
     * @param id 
     * @returns IDに合致するindex。それ以外の場合は -1 を返します。
     */
    getIndex(id: string){
      return this.workingTimeStickies.findIndex((workingTimeSticky)=>id == workingTimeSticky.getId())
    }

    /**
     * 実績の付箋を削除する
     * @param index インデックス番号
     * @returns 
     */
    delete(id: string){
      const index = this.getIndex(id)
      if(index == -1){
        throw("WorkingTimeStickyDelete:Invalid Index Error")
      } else {
        // 該当する付箋を取り除く
        const deleteWorkingTimeStickiy = this.workingTimeStickies.splice(index,1)[0]
        if(isUndefined(deleteWorkingTimeStickiy)){
          throw("WorkingTimeStickyDelete:Invalid Index Error")
        } else {
          this.updateAllIndex()
        }
      }
    }
    
    /**
     * 全てのWorkingTimeStickyのインデックスを採番し直す。イベントリスナーなどで使うインデックスの整合性を取る
     */
    updateAllIndex(){
      this.workingTimeStickies.forEach((workingTimeSticky, index) => {
        workingTimeSticky.setIndex(index)
      })
    }

    /**
     * WorkingTimeListを取得する。
     */
    getWorkingTimeList(){
      let workingTimeList = new WorkingTimeList() 
        this.workingTimeStickies.forEach((workingTimeStickiey) => {
          if(isDefined(workingTimeStickiey.getWorkingTime())){
            workingTimeList.add(workingTimeStickiey.getWorkingTime()!)
          }
        })
      return workingTimeList;
    }
}