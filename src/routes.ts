import { Router } from "express";
import EmployeeController from "./app/controllers/EmployeeController";
import AuthController from "./app/controllers/AuthController";
import MovieController from "./app/controllers/MovieController";
import authMiddleware from "./app/middlewares/authMiddleware";

const router = Router();

router.get('/employee', EmployeeController.getEmployees);
router.post('/employee', EmployeeController.store);

router.post('/movie', authMiddleware, MovieController.store);
router.get('/movie', authMiddleware, MovieController.getMovies);
router.delete('/movie/:id', authMiddleware, MovieController.removeMovie);

router.post('/movie-authorized/:id', authMiddleware, MovieController.authorizedMovie);
router.get('/movie-authorized', authMiddleware, MovieController.getMoviesAuthorized);

router.post('/auth', AuthController.authenticate);

export default router;