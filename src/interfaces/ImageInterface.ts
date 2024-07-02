export interface ImageInterface{
    create(name:string,profileId:number):Promise<any>  
    update(imageUrl: string, profileId: number):Promise<any>
};