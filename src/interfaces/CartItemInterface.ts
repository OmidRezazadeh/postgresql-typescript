export interface CartItemInterface{
    store(cartId:number,transaction:any,cartItemsData:any):Promise<any>
    }
    