/**
 * htmlのclass属性を表すオブジェクト
 */
export class ElementClass{
    private className: string

    constructor(id: string){
        this.className = id
    }

    getSelector(){
        return '.' + this.className
    }

    getString(){
        return this.className
    }
}