import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";

// Admin Signup
export const adminSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create new admin
    const newAdmin = await Admin.create({ name, email, password });

    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      message: "Login successful",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
