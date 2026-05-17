import { Router } from "express";
import { createCar, deleteCar, getCars, UpdateCar} from "../controllers/carController";
import {
  ApproveBooking,
  CancelBooking,
  getAllBooking,
  getDashboardStats,
} from "../controllers/bookingController";

import { protect } from "../middleware/protect";
import { isAdmin } from "../middleware/adminMiddleware";

import upload from "../config/multer";

const router = Router();

// CARS
router.post(
  "/cars",
  protect,
  isAdmin,
  upload.single("image"),
  createCar
);

router.get(
  "/cars",
  getCars
);

router.put(
  "/cars/:id",
  protect,
  isAdmin,
  upload.single("image"),
  UpdateCar
);

router.delete(
  "/cars/:id",
  protect,
  isAdmin,
  deleteCar
);

// BOOKINGS
router.get(
  "/booking",
  protect,
  isAdmin,
  getAllBooking
);

router.patch(
  "/booking/:id/approve",
  protect,
  isAdmin,
  ApproveBooking
);

router.patch(
  "/booking/:id/cancel",
  protect,
  isAdmin,
  CancelBooking
);

// DASHBOARD
router.get(
  "/dashboard-stats",
  protect,
  isAdmin,
  getDashboardStats
);

export default router;