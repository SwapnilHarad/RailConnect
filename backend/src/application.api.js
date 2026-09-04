import express from "express";
import Application from "./application.model.js";
import authMiddleware from "./auth.middleware.js";

const router = express.Router();


// GET logged-in student's applications
router.get("/", authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find({
      studentId: req.user.userId,
    }).sort({
      submittedAt: -1,
    });

    res.status(200).json({
      applications,
    });

  } catch (error) {
    console.error("Fetch Applications Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// =====================================================
// GET SINGLE APPLICATION
// =====================================================

router.get("/applications/:id", async (req, res) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Staff authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decoded.role !== "COLLEGE_STAFF") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const application = await Application.findOne({
      applicationNumber: req.params.id,
      "institutionDetails.collegeCode": decoded.collegeCode,
    }).lean();

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


// POST new application
router.post("/", async (req, res) => {
  try {
    const application = new Application(req.body);

    await application.save();

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });

  } catch (error) {
    console.error("Application Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});


export default router;