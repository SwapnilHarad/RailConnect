import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    university: {
      type: String,
      required: true,
    },

    collegeName: {
      type: String,
      required: true,
      trim: true,
    },

    prnNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    rollNumber: {
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

    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;