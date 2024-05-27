export interface ProfileInterface{
    create(name:string):Promise<any>  
    edit(name:string, id:number):Promise<any>
      

}