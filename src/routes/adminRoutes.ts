import { Router } from "express";
import { createCar, deleteCar, getCars, UpdateCar } from "../controllers/carController";
import { protect } from "../middleware/protect";
import { isAdmin } from "../middleware/adminMiddleware";

const router = Router();

router
    .post('/create', protect, isAdmin, createCar)
    .get('/cars', getCars)
    .patch('/cars/:id',protect, isAdmin, UpdateCar)
    .delete('/cars/:id', protect, isAdmin, deleteCar)

export default router