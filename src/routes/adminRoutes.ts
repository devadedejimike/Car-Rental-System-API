import { Router } from "express";
import { createCar, deleteCar, getCars, UpdateCar } from "../controllers/carController";
import { protect } from "../middleware/protect";
import { isAdmin } from "../middleware/adminMiddleware";
import { ApproveBooking, CancelBooking, getAllBooking, getDashboardStats } from "../controllers/bookingController";

const router = Router();

router
    .post('/create', protect, isAdmin, createCar)
    .get('/cars', getCars)
    .patch('/cars/:id',protect, isAdmin, UpdateCar)
    .delete('/cars/:id', protect, isAdmin, deleteCar)
    .get('/booking', protect, isAdmin, getAllBooking)
    .patch('/booking/:id/approve', protect, isAdmin, ApproveBooking )
    .patch('/booking/:id/cancel', protect, isAdmin, CancelBooking)
    .get("/dashboard-stats", protect, isAdmin, getDashboardStats );

export default router