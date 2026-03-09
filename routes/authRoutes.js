// routes/authRoutes.js
import express from 'express';
import { 
  registerSeeker, registerDonor,
  loginSeeker, loginDonor, loginAdmin , registerAdmin
} from '../controllers/authController.js';

const router = express.Router();


router.post('/register-seeker', registerSeeker);
router.post('/register-donor', registerDonor);
router.post('/register-admin', registerAdmin);


router.post('/login-seeker', loginSeeker);
router.post('/login-donor', loginDonor);
router.post('/login-admin', loginAdmin);

export default router;