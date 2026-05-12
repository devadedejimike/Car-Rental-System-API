import { Router } from "express";
import { Register } from "../controllers/authController";

const router = Router();

router
    .post('/register', Register);


export default router;