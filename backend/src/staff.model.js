import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    staffId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    collegeName: {
      type: String,
      required: true,
      trim: true,
    },

    collegeCode: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      default: "COLLEGE_STAFF",
      enum: ["COLLEGE_STAFF"],
    },
  },
  {
    timestamps: true,
  }
);

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;