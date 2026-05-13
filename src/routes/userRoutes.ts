import { Router } from "express";
import { getACar, getCars } from "../controllers/carController";
import { protect } from "../middleware/protect";
import { CreateBooking } from "../controllers/bookingController";

const router = Router();

router
    .get('/cars',protect, getCars) //Fetch all cars
    .get('/cars/:id',protect, getACar)
    .post('/booking', protect, CreateBooking)


export default router;