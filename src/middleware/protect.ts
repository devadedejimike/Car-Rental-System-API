import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import User from "../models/userModel";


export interface AuthRequest extends Request{
    user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        let token;
        const jwt_secret = process.env.JWT_SECRET as string;
        // Get Token
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }
        // No Token
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Not Authorized"
            })
        }
        // Verify Token
        const decoded = jwt.verify(token, jwt_secret) as {id: string}
        // Find User
        const user = await User.findById(decoded.id).select("-password")
        if(!user){
            return res.status(401).json({
                success: 'false',
                message: "User Not Found"
            })
        }
        // Attach User
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: 'false',
            message: 'Not Authorized'
        })
    }
}