import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Movie from '../models/Movie';

class MovieController {
    async store(req: Request, res: Response) {
        const repository = getRepository(Movie);
        const movie = new Movie();

        const { name, category } = req.body;

        movie.employeeId = req.employeeId;
        movie.category = category;
        movie.name = name;

        console.log(movie)

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