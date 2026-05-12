import { Router } from "express";
import { createCar, getCars } from "../controllers/carController";

const router = Router();

router
    .post('/create', createCar)
    .get('/cars', getCars)


export default router