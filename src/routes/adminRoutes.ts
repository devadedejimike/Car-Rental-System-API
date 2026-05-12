import { Router } from "express";
import { createCar } from "../controllers/carController";

const router = Router();

router
    .post('/create', createCar);


export default router