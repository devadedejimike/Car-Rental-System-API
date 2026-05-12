import { Router } from "express";
import { getACar, getCars } from "../controllers/carController";

const router = Router();

router
    .get('/cars', getCars) //Fetch all cars
    .get('/cars/:id', getACar)


export default router;