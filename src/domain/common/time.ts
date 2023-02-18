// 時間を任意のフォーマットに変換するクラス
export class Time{
	// 人間が読みやすい表記に変換する ex.1h20m, 3s
	static humanFomatFromMiliseconds(ms: number){
		const totalSeconds = Time.milisecondsToSeconds(ms)
		const hour = Math.floor( totalSeconds / (60*60) )
		const minitue = Math.floor( (totalSeconds - hour*60*60) / 60 )
		const seconds = totalSeconds - hour*60*60 - minitue*60

		let timeForHuman = ""
		if(hour > 0){
			timeForHuman = timeForHuman + hour + "h"
		}
		if(minitue > 0){
			timeForHuman = timeForHuman + minitue + "m"
		}
		if(hour == 0 && minitue == 0){
			timeForHuman = seconds + "s"
		}
		return timeForHuman
	}
	// デジタルクロック表記（00:00）に変換する
	static secondsToclock(ms: number){
		const totalSeconds = Time.milisecondsToSeconds(ms)
		const hour = Math.floor( totalSeconds / (60*60) )
		const minitue = Math.floor( (totalSeconds - hour*60*60) / 60 )
		return hour + ":" + ( '00' + minitue ).slice( -2 ) // 分は2桁でゼロ埋め
	}

	// 秒を時間に変換する
	static secondsToHour(seconds: number){
		return Time.roundOffTwoDecimalPlaces(seconds/ (60 * 60), 3)
	}

	// 秒を分に変換する
	static secondsToMinute(seconds: number){
		return Time.roundOffTwoDecimalPlaces(seconds/ 60, 1)
	}

	// ミリ秒を秒に変換する
	static milisecondsToSeconds(ms: number){
    	return Math.round (ms / 1000)
	}

	// 小数点第〇位を四捨五入する
	static roundOffTwoDecimalPlaces(seconds: number, decimalPlace: number){
		return Math.round(seconds * (10 ** (decimalPlace-1) )) / (10 ** (decimalPlace-1))
	}
}