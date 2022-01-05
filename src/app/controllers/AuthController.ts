import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();

import Employee from '../models/Employee';

class AuthController {
    async authenticate(req: Request, res: Response) 
    {
        try 
        {
            const repository = getRepository(Employee);
            const { email, password } = req.body;
    
            const employee = await repository.findOne({ where: { email } });
    
            if (!employee) {
                return res.sendStatus(401);
            }
    
            const isValidPassword = await bcrypt.compare(password, employee.password);
    
            if (!isValidPassword) {
                return res.sendStatus(401);
            }
    
            const token = jwt.sign({ id: employee.id }, process.env.SECRET!, { expiresIn: '1d' });
    
            // delete employee.password;
            
            return res.json({
                employee,
                token
            });
        }   
        catch(err)
        {
            return res.json({
                error: err
            });
        }
        
    }

}

export default new AuthController();