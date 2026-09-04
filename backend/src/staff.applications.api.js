import express from "express";
import jwt from "jsonwebtoken";
import Application from "./application.model.js";

const router = express.Router();


// =====================================================
// GET ALL APPLICATIONS FOR LOGGED-IN STAFF COLLEGE
// =====================================================

router.get("/applications", async (req, res) => {
  try {

    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Staff authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Make sure this is a staff account
    if (decoded.role !== "COLLEGE_STAFF") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    // Get college code from staff token
    const collegeCode = decoded.collegeCode;

    // Find applications belonging to this college
    const applications = await Application.find({
      "institutionDetails.collegeCode": collegeCode,
    })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      message: "Applications fetched successfully",
      count: applications.length,
      applications,
    });

  } catch (error) {

    console.error(
      "Staff Applications Error:",
      error
    );

    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

    res.status(500).json({
      message: "Server error",
    });
  }
});

// =====================================================
// GET SINGLE APPLICATION FOR STAFF
// =====================================================

router.get("/applications/:id", async (req, res) => {
  try {

    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Staff authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Make sure this is a staff account
    if (decoded.role !== "COLLEGE_STAFF") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    // Get application number from URL
    const applicationNumber = req.params.id;

    // Find application belonging to this staff's college
    const application = await Application.findOne({
      applicationNumber: applicationNumber,
      "institutionDetails.collegeCode": decoded.collegeCode,
    }).lean();

    // Application not found
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json({
      message: "Application fetched successfully",
      application,
    });

  } catch (error) {

    console.error(
      "Staff Single Application Error:",
      error
    );

    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

    res.status(500).json({
      message: "Server error",
    });
  }
});


// =====================================================
// UPDATE APPLICATION STATUS
// =====================================================

router.patch("/applications/:id/status", async (req, res) => {
  try {

    // Get token
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Staff authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify staff token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Make sure this is college staff
    if (decoded.role !== "COLLEGE_STAFF") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const { status } = req.body;

    // Allow only college approve/reject
    if (
      status !== "COLLEGE_APPROVED" &&
      status !== "COLLEGE_REJECTED"
    ) {
      return res.status(400).json({
        message: "Invalid application status",
      });
    }

    // Find application belonging to staff's college
    const application = await Application.findOne({
      applicationNumber: req.params.id,
      "institutionDetails.collegeCode": decoded.collegeCode,
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    // Update status
    application.status = status;

    await application.save();

    res.status(200).json({
      message:
        status === "COLLEGE_APPROVED"
          ? "Application approved successfully"
          : "Application rejected successfully",

      application,
    });

  } catch (error) {

    console.error(
      "Update Application Status Error:",
      error
    );

    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

    res.status(500).json({
      message: "Server error",
    });
  }
});


export default router;