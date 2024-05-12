export interface AuthIfterface{
    authenticate(): Promise<any>
    findbyEmail(email: string): Promise<any>
}