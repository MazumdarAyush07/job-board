import mongoose, { Schema } from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    experienceLevel: {
      type: String,
    },
    endDate: {
      type: Date,
    },
    candidates: [{ type: String }],
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
