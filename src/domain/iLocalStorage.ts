/**
 * ストレージにアクセス手続きをまとめたIF
 */
export interface ILocalStorage{
	/**
	 * オブジェクトとキーのペアを保存する
	 * @param {*} key
	 */
	setObject(key: string, obj: Object, callback?: Function): Promise<any>

	/**
	 * 保存されたオブジェクトをキーから取得する
	 * @param {*} key
	 */
	getObject(key: string) :Promise<any>

	/**
	 * 保存されたオブジェクトを削除する
	 * @param key 
	 */
	deleteObject(key: string) :Promise<any>
}