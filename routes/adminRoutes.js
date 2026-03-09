// routes/adminRoutes.js
import express from 'express';
import { verifyDonor } from '../controllers/adminController.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route: PUT /api/admin/verify-donor/:donorId
// Middleware applied: 1. verifyToken (must be logged in) -> 2. isAdmin (must be an admin)
router.put('/verify-donor/:donorId', verifyToken, isAdmin, verifyDonor);

export default router;