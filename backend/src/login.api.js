import express from "express";
import bcrypt from "bcryptjs";
import User from "./user.model.js";
import jwt from "jsonwebtoken";

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

    // Find student by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
  {
    userId: user._id,
    email: user.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

    // Login successful
   res.status(200).json({
  message: "Login successful",
  token: token,
  user: {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
  },
});

  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;