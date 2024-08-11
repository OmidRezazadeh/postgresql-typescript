export interface CartInterface{
store(userId: number, cartItems: any,transaction:any):Promise<any>
}
