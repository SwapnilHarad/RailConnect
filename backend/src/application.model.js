import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    applicationNumber: {
      type: String,
      unique: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    personalDetails: {
      fullName: String,
      dateOfBirth: String,
      gender: String,
      email: String,
      mobileNumber: String,
      prnNumber: String,
      rollNumber: String,
      branch: String,
      division: String,
      academicYear: String,
      semester: String,
    },

    institutionDetails: {
      university: String,
      collegeName: String,
      collegeCode: String,
      course: String,
      collegeAddress: String,
    },

    journeyDetails: {
      fromStation: String,
      toStation: String,
      preferredRoute: String,
      ticketType: String,
      passDuration: String,
      travelClass: String,
    },

    documents: {
      feeReceipt: String,
      collegeId: String,
      aadhaarCard: String,
      previousPass: String,
    },

    status: {
      type: String,
      default: "SUBMITTED",
      enum: [
        "SUBMITTED",
        "COLLEGE_VERIFICATION",
        "COLLEGE_APPROVED",
        "COLLEGE_REJECTED",
        "RAILWAY_VERIFICATION",
        "APPROVED",
        "REJECTED",
      ],
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model(
  "Application",
  applicationSchema
);

export default Application;