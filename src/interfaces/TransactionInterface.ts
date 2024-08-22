export interface TransactionInterface {
    store(userId:number, response:any,cart:any):Promise<any>

    find(paymentCode:string):Promise<any>
}