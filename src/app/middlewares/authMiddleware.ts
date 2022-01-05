import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export default function authMiddleware (
    req: Request, res: Response, next: NextFunction
) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(!token) {    
        res.status(401).send({
            error: 'Acesso restrito!'
        });
    } else {
        jwt.verify(token, process.env.SECRET!, (error: any, decode: any) => {
            if(error) {
                res.status(401).send({
                    error: 'Token inválido'
                });
            } else {
                const data = jwt.verify(token, 'secret');

                const { id } = data as TokenPayload;

                req.employeeId = id;
                next();
            }
        });
    }
}