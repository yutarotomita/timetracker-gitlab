import "./unitTime"

/**
 * ある絶対時間を基準として、相対的な経過時間を表すドメイン
 */
export class RelativeTime{
    private milliseconds: number

    constructor(relativeTime: number, unit: UnitTime){
        if(relativeTime < 0){
            new Error("Invalid time!!!! not minus.")
        }
        this.milliseconds = relativeTime * unit
    }

    toHumanString(){
        return String(this.milliseconds / UnitTime.HOUR)
    }

    toMillisecond(){
        return this.milliseconds
    }

    toHour(){
        return this.milliseconds / UnitTime.HOUR
    }

    add(relativeTime: number, unit: UnitTime){
        this.milliseconds += relativeTime * unit
    }
}