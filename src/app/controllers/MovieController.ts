import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Employee from '../models/Employee';
import Movie from '../models/Movie';
import MovieAuthorized from '../models/MovieAuthorized';

class MovieController {
    async store(req: Request, res: Response) 
    {
        try 
        {
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

            const { name, category } = req.body;

            movie.employeeId = req.employeeId;
            movie.category = category;
            movie.name = name;
            movie.authorized = false;

            const newMovie = await repository.create(movie);
            await repository.save(newMovie);

            return res.json(newMovie);
        } 
        catch (err) 
        {
            return res.json({
                error: err
            });
        }
    }

    async getMovies(req: Request, res: Response) 
    {
        try 
        {
            const repository = getRepository(Movie);

            const movies = await repository.find();

            if (!movies) {
                return res.sendStatus(409);
            }

            return res.json(movies);
        }
        catch (err) 
        {
            return res.json({
                error: err
            });
        }
    }

    async getMoviesAuthorized(req: Request, res: Response) 
    {
        try 
        {
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
        catch (err) 
        {
            return res.json({
                error: err
            });
        }
        
    }

    async authorizedMovie(req: Request, res: Response)
    {
        try 
        {
            const repository = getRepository(MovieAuthorized);
            const repoEmployee = getRepository(Employee);
            const repoMovie = getRepository(Movie);

            const movie = new Movie();
            // id do movie-authorized para realizar a autorização
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
        catch (err) 
        {
            return res.json({
                error: err
            });
        }

        
    }

    async removeMovie(req: Request, res: Response)
    {
        try 
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
        catch(err)
        {
            return res.json({
                error: err
            }); 
        }
    }

}

export default new MovieController();