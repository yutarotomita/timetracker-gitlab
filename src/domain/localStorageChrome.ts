import {ILocalStorage} from "./iLocalStorage"
import { isDefined } from "../function/nullCheck"
declare const chrome: any

/**
 * chromeAPIを利用したlocalStorageClient
 */
export class LocalStorageChrome implements ILocalStorage{
	/**
	 * オブジェクトとキーのペアを保存する
	 * プリミティブ値は、期待どおりに保存されるが
	 * Objectとfunctionは、通常、{}に保存される。
	 * ただし、Array（期待どおりにシリアル化）、Date、およびRegex（文字列表現を使用してシリアル化）は例外。
	 * https://developer.chrome.com/docs/extensions/reference/storage/#type-StorageArea
	 * @param {String} key 
	 * @param {Object} obj 
	 * @param {function} callback
	 */
	async setObject(key: string, obj: Object, callback?: Function){
		const items = {
			[key]: obj
		}
		if(isDefined(callback)){
			await chrome.storage.local.set(items, callback!())
		}
		await chrome.storage.local.set(items)
		
	}

	/**
	 * 保存されたオブジェクトをキーから取得する
	 * @param {*} key 
	 * @param {*} callback 
	 */
	async getObject(key :string){
		return new Promise((resolve) => {
			chrome.storage.local.get([key], (data: any) => {
				resolve(data[key])
			});
		});
	}

	/**
	 * 保存されたオブジェクトを削除する
	 * @param {*} key 
	 */
	async deleteObject(key :string){
		const items = {
			[key]: null
		}
		await chrome.storage.local.set(items)
	}
}