import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Staff from "./staff.model.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find staff by email
    const staff = await Staff.findOne({ email });

    if (!staff) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      staff.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        staffId: staff._id,
        email: staff.email,
        role: staff.role,
        collegeCode: staff.collegeCode,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Login successful
    res.status(200).json({
      message: "Staff login successful",
      token,
      staff: {
        id: staff._id,
        fullName: staff.fullName,
        email: staff.email,
        staffId: staff.staffId,
        collegeName: staff.collegeName,
        collegeCode: staff.collegeCode,
        role: staff.role,
      },
    });

  } catch (error) {
    console.error("Staff Login Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;