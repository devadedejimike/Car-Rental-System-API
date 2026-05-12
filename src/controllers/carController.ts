import { Request, Response } from "express";
import Car from "../models/carModel"


// Create Car
export const createCar = async (req: Request, res: Response) => {
    try {
        const car = await Car.create(req.body);
        res.status(201).json({
            status: 'Success',
            car,
            message: 'New Car Created Successfully'
        })
    } catch (error) {
        res.status(400).json({message: 'Error Creating Car'})
        console.log("Error creating cars: ", error)
    }
}

// Get All Cars
export const getCars = async (req: Request, res: Response) => {
    try {
        const car = await Car.find()
        res.status(201).json({
            status: 'Success',
            lenght: car.length,
            car,
            message: 'Fetch Cars Successfull'
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: 'Error fetching Cars',
            error
        })
        console.log("Error fetching cars: ", error)
    }
}

// Get Single Car
export const getACar = async (req: Request, res: Response) => {
    try {
        const car = await Car.findById(req.params.id);
        res.status(200).json({
            status: 'Success',
            car,
            message: 'Fetched a Single Car Successfully'
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: 'Cannot fetch note of the provided id',
            error
        })
        console.log("Error Fetchng A Single Car: ", error)
    }
}

// Update Car
export const UpdateCar = async (req: Request, res: Response) => {
    try {
        const car = await Car.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        res.status(200).json({
            status: 'Success',
            car,
            message: 'Car Details Updated Successfully'
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: 'Error Updating Car Details',
            error
        })
        console.log("Error Updating Car Details",error)
    }
}

// Delete Car
export const deleteCar = async (req: Request, res: Response) => {
    try {
        await Car.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: 'Success',
            data: null,
            message: 'Car Deleted Successfully'
        })
    } catch (error) {
        res.status(400).json({
            status: 'Success',
            message: 'Error Deleting Car'
        })
        console.log('Error Deleting Car: ', error)
    }
}