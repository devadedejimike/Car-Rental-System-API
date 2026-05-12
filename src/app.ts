import express from "express";
import cors from "cors";
import authRoutes from './routes/authRoutes'
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes)


export default app;