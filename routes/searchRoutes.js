// routes/searchRoutes.js
import express from 'express';
import { searchDonors } from '../controllers/searchController.js';
import { verifyToken, isSeeker } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, isSeeker, searchDonors);

export default router;