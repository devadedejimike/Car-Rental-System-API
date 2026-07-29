import { Request, Response } from "express";
import Car from "../models/carModel"
// import { uploadToCloudinary } from "../utils/uploadToCloudinary";


// Create Car
export const createCar = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "Fail",
        message: "Car image is required",
      });
    }

    const image =
      `${req.protocol}://${req.get("host")}/uploads/cars/${req.file.filename}`;

    const car = await Car.create({
      ...req.body,
      image,
    });

    res.status(201).json({
      status: "Success",
      car,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
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
      updatedData.image =
        `${req.protocol}://${req.get("host")}/uploads/cars/${req.file.filename}`;
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
      return res.status(404).json({
        status: "Fail",
        message: "Car not found",
      });
    }

    res.json({
      status: "Success",
      car,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
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
export const uploadCarImage = async (req: Request,  res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No image uploaded",
    });
  }

  const image =
    `${req.protocol}://${req.get("host")}/uploads/cars/${req.file.filename}`;

  res.json({
    image,
  });
};