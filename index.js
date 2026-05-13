import express from 'express';
import dotenv from 'dotenv';
import sequelize , {connectDB} from './config/database.js';
import Admin from './models/admin.js';
import Member from './models/member.js';
import authRoutes from './routes/authRoutes.js'; 
import searchRoutes from './routes/searchRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

const app=express();

app.use(cors({
  origin: process.env.FRONTEND_URL, // Your React frontend URL
  credentials: true // Allows sending tokens/cookies if needed
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.use('/api/search', searchRoutes);


const startServer = async () => {
  try {
    await connectDB();

    await sequelize.sync();
    console.log("Models synced successfully");

    app.listen(4000, () => {
      console.log("Running on port 4000");
    });
  } catch (error) {
    console.error("Server error:", error);
  }
};

startServer();