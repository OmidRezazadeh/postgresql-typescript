import { ProductInterface } from "../interfaces/ProductInterface";
import Product, { ProductAttributes } from "../models/product";
export class ProductRepository implements ProductInterface{
   
    async store(data:any,userId:number){
        data.user_id = userId;
        return await Product.create(data);
     }
}