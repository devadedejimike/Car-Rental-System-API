import { Request, Response } from "express";
import Booking from "../models/bookingModel";
import Car from "../models/carModel"
import { AuthRequest } from "../middleware/protect";


// Create Booking
export const CreateBooking = async (req: AuthRequest, res: Response) => {
    try {
        const {carId, startDate, endDate}  = req.body;
        // Find Car
        const car = await Car.findById(carId);
        if(!car){
            return res.status(404).json({
                success: 'false',
                message: 'Car Not Found'
            })
        }
        // Check Booking Conflict
        const existingBooking = await Booking.findOne({
            car: carId,
            status: 'approved',
            $or: [
                {
                    startDate: {$lte: endDate},
                    endDate: {$gte: startDate}
                }
            ]
        })
        if(existingBooking){
            return res.status(400).json({
                success: 'fail',
                message: 'Car Already Booked' 
            })
        }
        // Calculate Days
        const start = new Date(startDate);
        const end = new Date(endDate);

        const diffTime = end.getTime() - start.getTime();
        const days = Math.ceil(diffTime/(1000 * 60 * 60 * 24))
        // Total Price
        const totalPrice = days * car.pricePerDay
        // Create Booking
        const booking = await Booking.create({
            user: req.user._id,
            car: carId,
            startDate,
            endDate,
            totalPrice
        })
        res.status(201).json({
            status: 'Success',
            booking,
            message: 'Booking Created Successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
        success: false,
        message: "Server Error",
        });
    }
}
