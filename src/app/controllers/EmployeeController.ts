import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Employee from '../models/Employee';

class EmployeeController {
    async store(req: Request, res: Response) {
        const repository = getRepository(Employee);
        const { name, email, password, roles } = req.body;

        const employeeExists = await repository.findOne({ where: { email } });
        console.log(req.body)
        if (employeeExists) {
            return res.sendStatus(409);
        }

        const employee = await repository.create({ name, email, password, roles });
        await repository.save(employee);

        return res.json(employee);
    }

    async getEmployees(req: Request, res: Response) {
        const repository = getRepository(Employee);

        const employees = await repository.find();

        if (!employees) {
            return res.sendStatus(409);
        }

        return res.json(employees);
    }

}

export default new EmployeeController();