import { Request, Response } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"


export const Register = async (req: Request, res: Response) => {
    try {
        const jwt_secret = process.env.JWT_SECRET as string;
        const {username, email, password} = req.body;
        // Check if user already exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ message: 'User already exist'})
        }
        // If User doesn't exist
        const newUser = await User.create({username, email, password});
        const token = jwt.sign({id: newUser._id}, jwt_secret, {expiresIn: "7d"});
        res.status(201).json({
            status: 'Success',
            token,
            data: {
                user: newUser
            },
            message: 'New User Created'
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: 'Error creating new user',
            error
        })
        // console.log(error)
    }
}

export const Login = async (req: Request, res: Response) => {
    try {
        const jwt_secret = process.env.JWT_SECRET as string;
        const {email, password} = req.body;
        // Find User in DB
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({ message: "Invalid Credentials"});
        }
        // Verify Password
        const verifyPassword = bcrypt.compare(password, user.password)
        if(!verifyPassword){
            return res.status(400).json({ message: "Incorrect Password"})
        }
        // Generate Token 
        const token = jwt.sign({id: user._id}, jwt_secret, { expiresIn: "7d"})
        res.status(200).json({
            status: 'Success',
            token,
            user,
            message: 'User Login Successful'
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: 'Login Error',
            error
        })
        // console.log("Error: ", error)
    }
}