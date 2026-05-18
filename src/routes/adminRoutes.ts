import { Router } from "express";
import { createCar, deleteCar, getCars, UpdateCar } from "../controllers/carController";
import { ApproveBooking, CancelBooking, confirmPayment, getAllBooking, getDashboardStats } from "../controllers/bookingController";
import { protect } from "../middleware/protect";
import { isAdmin } from "../middleware/adminMiddleware";

import upload from "../config/multer";

const router = Router();
router
    .post("/cars",protect, isAdmin, upload.single("image"), createCar)
    .get("/cars", getCars)
    .put("/cars/:id", protect, isAdmin, upload.single("image"), UpdateCar)
    .delete("/cars/:id", protect, isAdmin, deleteCar)
    .get("/booking", protect, isAdmin, getAllBooking)
    .patch("/booking/:id/approve", protect,  isAdmin,  ApproveBooking)  
    .patch("/booking/:id/cancel", protect, isAdmin, CancelBooking)
    .patch("/booking/:id/pay", protect, isAdmin, confirmPayment)
    .get("/dashboard-stats", protect, isAdmin, getDashboardStats)

export default router;