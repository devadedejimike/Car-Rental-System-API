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
// Get All Bookings
export const getAllBooking = async (req: Request, res: Response) => {
    try {
        const booking = await Booking.find()
            .populate("car")
            .populate("user")
        res.status(200).json({
            status: 'Success',
            length: booking.length,
            booking,
            message: 'All Bookings Fetched Successfully'
        })
    } catch (error) {
        console.log('Error Fetching All User: ', error)
        res.status(400).json({
            status: 'Fail',
            message: 'Error Fetching All User: ', 
            error
        })
    }
}
// Get All User's booking
export const getUserBooking = async (req: AuthRequest, res: Response) => {
    try {
        const booking = await Booking.find({user: req.user!.id})
            .populate("car")
            .sort({createdAt: -1});
        res.status(200).json({
            status: 'Success',
            length: booking.length,
            booking,
            message: 'All User Bookings Fetched Successfully'
        })
    } catch (error) {
        console.log("Error Fetching All User Bookings: ", error)
        res.status(400).json({
            status: 'Fail',
            message: 'Error Fetching All User Bookings',
            error
        })
    }
}
// Approve Bookings 
export const ApproveBooking = async (req: AuthRequest, res: Response) => {
    try {
        const booking = await Booking.findById(req.params.id)
        // Check if project exist
        if(!booking){
            return res.status(404).json({
                status: 'Fail',
                message: 'Booking Not Found'
            })
        }
        // Check if Booking is approved already
        if(booking.status === 'approved'){
            return res.status(400).json({
                status: 'Fail',
                message: 'Booking Approved Already'
            })
        }
        // Approve Booking
        booking.status = 'approved'
        await booking.save()

        // Change car availbility status to false
        const car = await Car.findById(booking.car)
        if(car){
            car.available = false
            await car.save();
        }
        res.status(200).json({
            status: 'Success',
            booking,
            message: 'Booking Approved Successfully'
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: 'Error Approving Booking',
            error
        })
        console.log("Error Approving Booking", error)
    }
}
// Cancel Booking
export const CancelBooking = async (req: AuthRequest, res: Response) => {
    try {
        const booking =  await Booking.findById(req.params.id)
        // check if booking exist
        if(!booking){
            return res.status(404).json({
                status: 'Fail',
                message: 'Booking Not Found'
            })
        }
        // Check if booking is cancelled already
        if(booking.status === 'cancelled'){
            return res.status(400).json({
                status: 'Fail',
                message: 'Booking Cancalled Already'
            })
        }
        // Cancel Booking
        booking.status = 'cancelled'
        await booking.save()
        res.status(200).json({
            status: 'Success',
            booking,
            message: 'Booking Cancelled Successfully'
        })
    } catch (error) {
        console.log('Error Cancelling Booking', error)
        res.status(400).json({
            status: 'Fail',
            message: 'Error Cancelling Booking',
            error
        })
    }
}

// Stats for Admin Dashboard
export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {
    const totalCars = await Car.countDocuments();

    const totalBookings =
      await Booking.countDocuments();

    const approved =
      await Booking.countDocuments({
        status: "approved",
      });

    const pending =
      await Booking.countDocuments({
        status: "pending",
      });

    const cancelled =
      await Booking.countDocuments({
        status: "cancelled",
      });

    res.status(200).json({
      success: true,
      stats: {
        totalCars,
        totalBookings,
        approved,
        pending,
        cancelled,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard stats",
    });
  }
};

// Accept Payment
export const confirmPayment = async (req: AuthRequest, res: Response) => {
    try {
        const booking = await Booking.findById(req.params.id)
        // check if booking exist
        if(!booking){
            return res.status(404).json({message: "Booking Not Found"})
        }
        // check if payment has been confirmed already
        if(booking.status === "paid"){
            return res.status(400).json({message: "Payment Confirmed Already"})
        }

        booking.status = "paid"
        await booking.save()
        res.status(200).json({
            status: 'success',
            booking,
            message: "Booking Payment Confirmed Successfully"
        })
    } catch (error) {
        console.log('Error Confirming Payment', error)
        res.status(400).json({
            status: 'fail',
            message: 'Error Confirming Payment',
        }) 
    }
}

// Booking Completed when car is returned
export const completeBooking = async (req: AuthRequest, res: Response) => {
    try {
        const booking = await Booking.findById(req.params.id)
        // check if booking exist
        if(!booking) {
            return res.status(404).json({message: "Booking Not Found"})
        }
        // Check if booking is set to completed already
        if(booking.status === 'completed'){
            return res.status(400).json({message: "Booking Completed Already"})
        }
        booking.status = 'completed'
        await booking.save();

        // Return car availbility status to true
        const car = await Car.findById(booking.car)
        if(car){
            car.available = true
            await car.save();
        }
        res.status(200).json({
            status: 'success',
            booking,
            message: 'Booking Completed Successfully'
        })
    } catch (error) {
        console.log('Error Completing Booking', error)
        res.status(400).json({
            status: 'fail',
            message: 'Error Completing Booking',
            error
        })
    }
}