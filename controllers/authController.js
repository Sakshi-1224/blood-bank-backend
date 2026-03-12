import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import dotenv from 'dotenv';

dotenv.config();


const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};


export const loginAdmin = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const admin = await Admin.findOne({ where: { phone } });
    if (!admin) return res.status(404).json({ message: "Admin not found." });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

    const token = generateToken(admin.id, 'ADMIN');

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: admin.id, phone: admin.phone, role: 'ADMIN' }
    });
  } catch (error) {
    console.error("Error in loginAdmin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const registerAdmin = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // 1. Check if the Admin already exists
    const existingAdmin = await Admin.findOne({ where: { phone } });
    if (existingAdmin) {
      return res.status(400).json({ message: "An admin with this phone number already exists." });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create the Admin in the database
    const newAdmin = await Admin.create({
      phone,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Admin registered successfully!",
      adminId: newAdmin.id
    });

  } catch (error) {
    console.error("Error in registerAdmin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};