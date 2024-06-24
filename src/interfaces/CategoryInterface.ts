export interface CategoryInterface{
    store(data:any ):Promise<any>
    findByName(name:any):Promise<any>
    findById(id:number):Promise<any>
    edit(data: any, id: number):Promise<any>
    }