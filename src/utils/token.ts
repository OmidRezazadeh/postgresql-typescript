import jwt from 'jsonwebtoken';

export const getDecodedToken = (authorization:any) => {
    const authHeader =authorization;
    const token = authHeader.split(' ')[1];
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decodedToken;
}