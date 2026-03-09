import express from 'express';
import bcrypt from 'bcryptjs';
import Donor from '../models/Donor.js';
import Seeker from '../models/Seeker.js';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import dotenv from 'dotenv';

dotenv.config();
export const registerDonor =async (req , res) =>{
    try{
         const { fullName,email,phone,password,bloodGroup,city,state,region,address} =req.body;
         const existingDonor =await Donor.findOne({where: {phone}});
         if(existingDonor){
            return res.json({message:"Donor with this phone number already exists"});
         }
          
         const hashedPassword =await bcrypt.hash(password,10);

         const newDonor = await Donor.create({
            fullName,
            email,
            phone,
            password:hashedPassword,
            bloodGroup,
            city,
            state,
            region,
            address
         });
         res.json({message:"Donor registered successfully", donor: newDonor
         });     

    }
    catch(error){
        res.status(500).json({message:"Error registering donor", error});
    }
}

export const registerSeeker = async(req,res) =>{
    try{
             const {name,email,phone,password,city,state,region,address} = req.body;
             const existingSeeker = await Seeker.findOne({where:{phone}});
              if(existingSeeker){
                return res.json({message:"Seeker with this phone number already exists"});
              }
                const hashedPassword = await bcrypt.hash(password,10);

                const newSeeker = await Seeker.create({
                    name,
                    email,
                    phone,
                    password:hashedPassword,
                    city,
                    state,
                    region,
                    address
                });

                res.json({message:"Seeker registered successfully", seeker: newSeeker});

    }
    catch(error){
        res.status(500).json({message:"Error registering seeker", error});
    }
}


const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// --- LOGIN SEEKER ---
// The system stores seeker login details to authorize searches[cite: 167].
export const loginSeeker = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const seeker = await Seeker.findOne({ where: { phone } });
    if (!seeker) return res.status(404).json({ message: "Seeker not found." });

    const isMatch = await bcrypt.compare(password, seeker.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

    const token = generateToken(seeker.id, 'SEEKER');

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: seeker.id, name: seeker.name, phone: seeker.phone, email: seeker.email, role: 'SEEKER' }
    });
  } catch (error) {
    console.error("Error in loginSeeker:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// --- LOGIN DONOR ---
export const loginDonor = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const donor = await Donor.findOne({ where: { phone } });
    if (!donor) return res.status(404).json({ message: "Donor not found." });

    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

    const token = generateToken(donor.id, 'DONOR');

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: donor.id, name: donor.fullName, phone: donor.phone, email: donor.email, role: 'DONOR', status: donor.verificationStatus }
    });
  } catch (error) {
    console.error("Error in loginDonor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// --- LOGIN ADMIN ---
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
    const { email, phone, password } = req.body;

    // 1. Check if the Admin already exists
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ message: "An admin with this email already exists." });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create the Admin in the database
    const newAdmin = await Admin.create({
      email,
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