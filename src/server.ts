import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import passport from "passport";
import authRoutes from "./routes/authRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
