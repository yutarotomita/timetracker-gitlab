/**
 * htmlのid属性を表すオブジェクト
 */
export class ElementId{
    private id: string

    constructor(id: string){
        this.id = id
    }

    getSelector(){
        return '#' + this.id
    }

    getString(){
        return this.id
    }
}