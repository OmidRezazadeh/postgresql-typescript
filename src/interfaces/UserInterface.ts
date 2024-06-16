

export interface UserInterface{
    
    assignRole(role_id:number, user_id:number): Promise<any>
    list(data:any): Promise<any>
}