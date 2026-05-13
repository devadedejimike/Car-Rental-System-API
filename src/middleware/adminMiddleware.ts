import { Response, NextFunction } from "express";
import { AuthRequest } from "./protect";

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if(req.user.role !== 'admin'){
        return res.status(403).json({
            status: 'Fail',
            message: 'Admin Only'
        })
    }
    next();
}