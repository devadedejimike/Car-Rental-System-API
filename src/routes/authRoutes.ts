import { Router } from "express";
import { Login, Register } from "../controllers/authController";

const router = Router();

router
    .post('/register', Register)
    .post('/login', Login)


export default router;