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

