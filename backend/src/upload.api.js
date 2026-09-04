import express from "express";
import multer from "multer";
import cloudinary from "./cloudinary.config.js";

const router = express.Router();

// Store uploaded file temporarily in memory
const upload = multer({
  storage: multer.memoryStorage(),
});

// Upload one document
router.post("/", upload.single("document"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No document uploaded",
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "railconnect/documents",
        resource_type: "auto",
      },
      (error, result) => {

        if (error) {
          console.error("Cloudinary Upload Error:", error);

          return res.status(500).json({
            message: "Failed to upload document",
          });
        }

        return res.status(200).json({
          message: "Document uploaded successfully",
          fileUrl: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(req.file.buffer);

  } catch (error) {

    console.error("Upload Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;