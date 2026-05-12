import { Router } from "express";
import { createCar, getCars, UpdateCar } from "../controllers/carController";

const router = Router();

router
    .post('/create', createCar)
    .get('/cars', getCars)
    .patch('/cars/:id', UpdateCar)


export default router