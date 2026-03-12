// routes/searchRoutes.js
import express from 'express';
import { searchDonors } from '../controllers/searchController.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, isAdmin, searchDonors);

export default router;