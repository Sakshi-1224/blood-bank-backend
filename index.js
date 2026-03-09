import express from 'express';
import dotenv from 'dotenv';
import sequelize , {connectDB} from './config/database.js';
import Admin from './models/Admin.js';
import Donor from './models/Donor.js';
import Seeker from './models/Seeker.js';
import authRoutes from './routes/authRoutes.js'; 
import adminRoutes from './routes/adminRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
dotenv.config();

const app=express();



app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/admin', adminRoutes);

app.use('/api/search', searchRoutes);
const startServer = async () => {
  try {
    await connectDB();

    await sequelize.sync({alter:true});
    console.log("Models synced successfully");

    app.listen(4000, () => {
      console.log("Running on port 4000");
    });
  } catch (error) {
    console.error("Server error:", error);
  }
};

startServer();