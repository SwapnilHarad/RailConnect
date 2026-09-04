import express from "express";
import bcrypt from "bcryptjs";
import Staff from "./staff.model.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      staffId,
      collegeName,
      collegeCode,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !password ||
      !staffId ||
      !collegeName ||
      !collegeCode
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingEmail = await Staff.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    const existingStaff = await Staff.findOne({
      staffId: staffId.trim(),
    });

    if (existingStaff) {
      return res.status(409).json({
        success: false,
        message: "Staff ID is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const staff = await Staff.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      staffId: staffId.trim(),
      collegeName: collegeName.trim(),
      collegeCode: collegeCode.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Staff registered successfully",
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
    console.error("Staff registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during staff registration",
    });
  }
});

export default router;