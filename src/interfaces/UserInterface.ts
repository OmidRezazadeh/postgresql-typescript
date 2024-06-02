export interface UserInterface{
    
    assignRole(role_id:number, user_id:number): Promise<any>
}