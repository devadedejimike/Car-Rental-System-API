import { Request, Response } from "express";
import Car from "../models/carModel"
import { uploadToCloudinary } from "../utils/uploadToCloudinary";


// Create Car
export const createCar = async (req: Request, res: Response) => {
  try {
    let image = "";

    if (req.file) {
      const result: any = await uploadToCloudinary(req.file.buffer);
      image = result.secure_url;
    } else {
      return res.status(400).json({ status: "Fail", message: "Car image is required" });
    }

    const car = await Car.create({
      ...req.body,
      image,
    });

    res.status(201).json({
      status: "Success",
      car,
      message: "New Car Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Fail", message: "Error Creating Car", error });
  }
};


// Get All Cars
export const getCars = async (req: Request, res: Response) => {
    try {
        const car = await Car.find()
        res.status(200).json({
            status: 'Success',
            length: car.length,
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
    const updatedData = { ...req.body };
    if (req.file) {
      const result: any = await uploadToCloudinary(req.file.buffer);
      updatedData.image = result.secure_url;
    }

    const car = await Car.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!car) {
      return res.status(404).json({ status: "Fail", message: "Car not found" });
    }

    res.status(200).json({
      status: "Success",
      car,
      message: "Car Details Updated Successfully",
    });
  } catch (error) {
    console.log("Error Updating Car Details", error);
    res.status(400).json({
      status: "Fail",
      message: "Error Updating Car Details",
      error,
    });
  }
};
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