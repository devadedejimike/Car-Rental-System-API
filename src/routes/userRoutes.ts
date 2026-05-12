import { Router } from "express";
import { getCars } from "../controllers/carController";

const router = Router();

router
    .get('/cars', getCars) //Fetch all cars


export default router;