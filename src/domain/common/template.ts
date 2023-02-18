import { ElementClass } from "../element/elementClass";
import { ElementId } from "../element/elementId";
/**
 * htmlのTemplate要素を扱うためのクラス
 */
export class Template{
    /**
     * templateから指定した要素で包まれたdom要素を生成する
     * 
     * @param {string} templateIdName 
     * @param {string} wrappedDomName 
     * @param {string} innerClassName 
     * @returns templateから生成したdom要素
     */
    static createWrappedDom(templateIdName: ElementId, wrappedDomName: string, innerClassName: ElementClass){
        const template = document.getElementById(templateIdName.getString())!; //FIXME: Nullチェック
        
        const node = ((temp: HTMLElement) => {
            let element = document.createElement(wrappedDomName);
            element.innerHTML = temp.innerHTML;
            return element;
        });
        return node(template).querySelector(innerClassName.getSelector())!;
    } 
}