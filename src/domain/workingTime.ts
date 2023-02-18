/**
 * 作業実績を示すドメインクラス
 * 実績の最小単位で、作業中のタスクを切り替える・完了すると、このクラスが1つ出来るはず
 */
export class WorkingTime{
	private workingTimeId: string
    private startDate: number
    private elapsedTime: number
    private taskId: number
    private taskName: string

	constructor(startDate: number, elapsedTime: number, taskId: number, taskName: string){
		this.workingTimeId = taskId + "_" + startDate
		this.startDate = startDate
		this.elapsedTime = elapsedTime //s
		this.taskId = taskId
		this.taskName = taskName
	}

	getWorkingTimeId(){
		return this.workingTimeId
	}

	getStartDate(){
		return this.startDate
	}

	setStartDate(date: number){
		this.startDate = date
	}

	setElapsedTime(seconds: number){
		this.elapsedTime = seconds
	}

	getElapsedTime(){
		return this.elapsedTime
	}
	
	getTime(){
		return this.elapsedTime
	}

	getTaskId(){
		return this.taskId
	}

	setTaskName(taskName: string){
		this.taskName = taskName
	}

	getTaskName(){
		return this.taskName
	}
}