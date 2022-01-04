import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Employee from '../models/Employee';
import Movie from '../models/Movie';

class MovieController {
    async store(req: Request, res: Response) {
        const repository = getRepository(Movie);
        const repoEmployee = getRepository(Employee);
        const movie = new Movie();

        const employee = await repoEmployee.findOne(
            { where:
                { id: req.employeeId }
            }
        );

        if (employee?.roles !== 'creator')
        {
            return res.json({ message: 'Employee has to be the creator type.' });
        }

        const { name, category, authorized } = req.body;

        movie.employeeId = req.employeeId;
        movie.category = category;
        movie.name = name;
        movie.authorized = authorized;

        const newMovie = await repository.create(movie);
        await repository.save(newMovie);

        return res.json(newMovie);
    }

    async getEmployees(req: Request, res: Response) {
        const repository = getRepository(Movie);

        const movies = await repository.find();

        if (!movies) {
            return res.sendStatus(409);
        }

        return res.json(movies);
    }

}

export default new MovieController();