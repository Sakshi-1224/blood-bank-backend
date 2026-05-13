import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// LOGIN ADMIN
export const loginAdmin = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const admin = await Admin.findOne({
      where: {
        phoneNumber: phoneNumber,
      },
    });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found.",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials.",
      });
    }

    const token = generateToken(admin.id, "ADMIN");

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents XSS attacks
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "lax", // Prevents CSRF
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      message: "Login successful",
      token, // Added back to support mobile apps
      user: {
        id: admin.id,
        phoneNumber: admin.phoneNumber,
        role: "ADMIN",
      },
    });
  } catch (error) {
    console.error("Error in loginAdmin:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// LOGOUT ADMIN
export const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Error in logoutAdmin:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// GET CURRENT USER
export const getMe = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    res.status(200).json({
      user: {
        id: admin.id,
        phoneNumber: admin.phoneNumber,
        role: "ADMIN",
      },
    });
  } catch (error) {
    console.error("Error in getMe:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// REGISTER ADMIN
export const registerAdmin = async (req, res) => {
  try {
    const { email, phoneNumber, password } = req.body;

    const existingAdmin = await Admin.findOne({
      where: { phoneNumber },
    });

    if (existingAdmin) {
      return res.status(400).json({
        message: "An admin with this phone number already exists.",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await Admin.create({
      email,
      phoneNumber,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Admin registered successfully!",
      adminId: newAdmin.id,
    });
  } catch (error) {
    console.error("Error in registerAdmin:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
