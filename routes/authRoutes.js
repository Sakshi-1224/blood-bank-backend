// routes/authRoutes.js
import express from 'express';
import { 
   loginAdmin , registerAdmin, logoutAdmin, getMe
} from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register-admin', registerAdmin);

router.post('/login-admin', loginAdmin);

router.post('/logout', logoutAdmin);

router.get('/me', verifyToken, getMe);

export default router;