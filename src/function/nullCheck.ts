/**
 * 空を表すときはundefinedを一律使用してください。
 * Nullは使用禁止。
 */

/**
 * 変数が定義済みかどうか
 * @param obj 
 * @returns 
 */
export function isDefined(obj :any) :boolean{
    if(obj == null){
        new Error('Invalid Type Error: expected Undefined but Null. 空を表すときはundefinedを一律使用してください。')
    }
    return obj !== void 0
}
/**
 * 変数が未定義かどうか
 * @param obj 
 * @returns 
 */
export function isUndefined(obj :any) :boolean{
    return !isDefined(obj)
}

/**
 * Nullチェック
 * 空を表すときはundefinedを一律使用してください。
 * @param obj 
 * @returns 
 */
export function isNotNull(obj :any) :boolean{
    return obj != null
}