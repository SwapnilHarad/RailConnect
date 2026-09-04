import express from "express";
import bcrypt from "bcryptjs";
import User from "./user.model.js";

const router = express.Router();


// ===============================
// STUDENT REGISTER API
// ===============================

router.post("/register", async (req, res) => {
  try {

    const {
      fullName,
      dateOfBirth,
      gender,
      university,
      collegeName,
      prnNumber,
      rollNumber,
      email,
      mobileNumber,
      password,
    } = req.body;


    // 1. Check required fields

    if (
      !fullName ||
      !dateOfBirth ||
      !gender ||
      !university ||
      !collegeName ||
      !prnNumber ||
      !rollNumber ||
      !email ||
      !mobileNumber ||
      !password
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }


    // 2. Check if email already exists

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }


    // 3. Check if PRN already exists

    const existingPRN = await User.findOne({ prnNumber });

    if (existingPRN) {
      return res.status(400).json({
        message: "PRN number already registered",
      });
    }


    // 4. Hash password

    const hashedPassword = await bcrypt.hash(password, 10);


    // 5. Create student

    const newUser = await User.create({
      fullName,
      dateOfBirth,
      gender,
      university,
      collegeName,
      prnNumber,
      rollNumber,
      email,
      mobileNumber,
      password: hashedPassword,
    });


    // 6. Send response

    res.status(201).json({
      message: "Student registered successfully",

      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });

  } catch (error) {

    console.error("Register Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


export default router;