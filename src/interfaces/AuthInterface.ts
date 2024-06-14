export interface AuthIfterface{
    authenticate(): Promise<any>
    findByEmail(email: string): Promise<any>
}