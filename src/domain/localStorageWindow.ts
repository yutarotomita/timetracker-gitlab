import { ILocalStorage } from "./iLocalStorage"
import { isDefined } from "../function/nullCheck"

/**
 *  ブラウザ用モック
 */
export class LocalStorageWindow implements ILocalStorage{

	async setObject(key :string, obj: Object, callback? :Function ){
		localStorage.setItem(key, JSON.stringify(obj))
		if(isDefined(callback)){
			callback!()
		}
		
	}

	async getObject(key :string){
        const rslt = localStorage.getItem(key)
        if(rslt != null){
            return JSON.parse(rslt)
        }
		return undefined
	}

	async deleteObject(key :string){
		localStorage.removeItem(key)
	}
}