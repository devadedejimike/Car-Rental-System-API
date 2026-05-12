import express from "express";
import cors from "cors";
import authRoutes from './routes/authRoutes'
import dotenv from "dotenv";
import connectDB from "./config/db";
import adminRoutes from "./routes/adminRoutes"
import userRoutes from "./routes/userRoutes"

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/user', userRoutes)


export default app;