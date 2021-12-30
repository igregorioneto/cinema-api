import { Router } from "express";
import EmployeeController from "./app/controllers/EmployeeController";
import AuthController from "./app/controllers/AuthController";
import MovieController from "./app/controllers/MovieController";

const router = Router();

router.get('/employee', EmployeeController.getEmployees);
router.post('/employee', EmployeeController.store);

router.post('/movie', MovieController.store);

router.post('/auth', AuthController.authenticate);

export default router;