import "dotenv/config";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log(
  "Cloudinary:",
  process.env.CLOUDINARY_CLOUD_NAME ? "Cloud name found" : "Cloud name missing",
  process.env.CLOUDINARY_API_KEY ? "API key found" : "API key missing",
  process.env.CLOUDINARY_API_SECRET ? "API secret found" : "API secret missing"
);

export default cloudinary;