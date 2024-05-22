export interface ProfileInterface{
create(userId:number,transaction:any):Promise<any>
}