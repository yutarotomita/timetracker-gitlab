import { WorkingTime } from "./workingTime"

/**
 * 作業実績のサービスクラス
 * 作業時間の合計単位は一日になるはず
 */
export class WorkingTimeList{
    private workingTimes: Array<WorkingTime>
    private elapsedTime: number

	constructor(){
		this.workingTimes = []
		this.elapsedTime = 0 //s
	}

	add(workingTime: WorkingTime){
		this.workingTimes.push(workingTime)
		this.elapsedTime = this.elapsedTime + workingTime.getTime()
	}

	remove(workingTimeId: string){
		const targetIndex = this.workingTimes.findIndex(workingTime => workingTime.getWorkingTimeId() == workingTimeId)
		return this.workingTimes.splice( targetIndex, 1 );
	}

	clear(){
		this.workingTimes = []
		this.elapsedTime = 0 //s
	}

	getAll(){
		return this.workingTimes
	}

	getListGroupById(){
		let workingTimesByTask: Array<WorkingTime> = []
		this.workingTimes.forEach((workingTime)=>{
			const sameTaskIndex = workingTimesByTask.findIndex((workingTimeByTask)=>{
				workingTimeByTask.getTaskId() == workingTime.getTaskId()
			})
			// 既に実績があるタスクは
			if(sameTaskIndex != -1){
				// 時間を追加する
				const totalTime = workingTimesByTask[sameTaskIndex].getElapsedTime() + workingTime.getElapsedTime()
				workingTimesByTask[sameTaskIndex].setElapsedTime(totalTime)
				// より最新のStartDateであればそちらを採用する
				if(workingTimesByTask[sameTaskIndex].getStartDate() > workingTime.getStartDate()){
					workingTimesByTask[sameTaskIndex].setStartDate(workingTime.getStartDate())
				}
			}
			// 実績がない場合は保存
			else {
				workingTimesByTask.push(workingTime)
			}
		})
		return workingTimesByTask
	}

	getElapsedTime(){
		return this.elapsedTime
	}
}