import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Employee from '../models/Employee';
import Movie from '../models/Movie';
import MovieAuthorized from '../models/MovieAuthorized';

class MovieController {
    async store(req: Request, res: Response) {
        const repository = getRepository(MovieAuthorized);
        const repoEmployee = getRepository(Employee);
        const movie = new MovieAuthorized();

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

    async getMovies(req: Request, res: Response) {
        const repository = getRepository(Movie);

        const movies = await repository.find();

        if (!movies) {
            return res.sendStatus(409);
        }

        return res.json(movies);
    }

    async getMoviesAuthorized(req: Request, res: Response) {
        const repository = getRepository(MovieAuthorized);
        const repoEmployee = getRepository(Employee);

        const employee = await repoEmployee.findOne(
            { where:
                { id: req.employeeId }
            }
        );

        if (employee?.roles !== 'authorizer')
        {
            return res.json({ message: 'Employee has to be the authorizer type.' });
        }

        const movies = await repository.find();

        if (!movies) {
            return res.sendStatus(409);
        }

        return res.json(movies);
    }

    async authorizedMovie(req: Request, res: Response)
    {
        const repository = getRepository(MovieAuthorized);
        const repoEmployee = getRepository(Employee);
        const repoMovie = getRepository(Movie);

        const movie = new Movie();

        const { id } = req.params;

        const employee = await repoEmployee.findOne(
            { where:
                { id: req.employeeId }
            }
        );

        if (employee?.roles !== 'authorizer')
        {
            return res.json({ message: 'Employee has to be the authorizer type.' });
        }

        const movieAuthorized = await repository.findOne(
            {
                where: {
                    id
                }
            }
        );

        movie.authorized = true;
        movie.category = movieAuthorized?.category!;
        movie.name = movieAuthorized?.name!;
        movie.employeeId = movieAuthorized?.employeeId!;
        movie.id = movieAuthorized?.id!;

        const newMovie = await repoMovie.create(movie);
        await repoMovie.save(newMovie);

        await repository.delete({id: movieAuthorized?.id});

        return res.json({ message: 'Movie authorized' });
    }

    async removeMovie(req: Request, res: Response)
    {
        const repoEmployee = getRepository(Employee);
        const repoMovie = getRepository(Movie);

        const { id } = req.params;

        const employee = await repoEmployee.findOne(
            { where:
                { id: req.employeeId }
            }
        );

        if (employee?.roles !== 'manager')
        {
            return res.json({ message: 'Employee has to be the manager type.' });
        }

        const movie = await repoMovie.findOne({
            where: {
                id
            }
        });

        if (!movie)
        {
            return res.json({ message: 'Movie not found' });
        }

        await repoMovie.delete({id: movie.id});

        return res.json({ message: 'Successfully deleted Movie' });

    }

}

export default new MovieController();