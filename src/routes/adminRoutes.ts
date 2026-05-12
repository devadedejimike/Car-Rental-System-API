import { Router } from "express";
import { createCar, deleteCar, getCars, UpdateCar } from "../controllers/carController";

const router = Router();

router
    .post('/create', createCar)
    .get('/cars', getCars)
    .patch('/cars/:id', UpdateCar)
    .delete('/cars/:id', deleteCar)

export default router