// routes/authRoutes.js
import express from 'express';
import { 
   loginAdmin , registerAdmin
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register-admin', registerAdmin);

router.post('/login-admin', loginAdmin);

export default router;