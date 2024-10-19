import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Job } from "../models/job.models.js";
import { User } from "../models/user.models.js";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

// Nodemailer setup
const sendJobNotificationEmail = async (candidates, jobDetails) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: "Sender's Address",
    to: candidates.join(","), // Multiple recipients separated by commas
    subject: "New Job Opportunity",
    html: `
      <h2>New Job Posted: ${jobDetails.title}</h2>
      <p><strong>Description:</strong> ${jobDetails.description}</p>
      <p><strong>Experience Level:</strong> ${jobDetails.experienceLevel}</p>
      <p><strong>Company Name:</strong> ${jobDetails.companyId.companyName}</p>
      <p><strong>End Date:</strong> ${jobDetails.endDate}</p>
      <p>Don't miss this opportunity!</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Create Job
const createJob = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    experienceLevel,
    endDate,
    candidates,
    companyId,
  } = req.body;

  if (
    !title ||
    !description ||
    !experienceLevel ||
    !endDate ||
    !companyId ||
    !candidates
  ) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "All fields are required"));
  }

  // Ensure the company exists
  const company = await User.findById(companyId);
  if (!company) {
    return res.status(404).json(new ApiResponse(404, {}, "Company not found"));
  }

  // Create a new job
  const job = await Job.create({
    title,
    description,
    experienceLevel,
    endDate,
    candidates,
    companyId,
  });

  // Send email notifications to candidates
  const createdJob = await Job.findById(job._id).populate("companyId");
  if (!createdJob) {
    return res.status(404).json(new ApiResponse(404, {}, "Job not found"));
  }
  await sendJobNotificationEmail(candidates, createdJob);

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        job,
        "Job created successfully and candidates notified"
      )
    );
});

// Get all Jobs
const getAllJobs = asyncHandler(async (req, res) => {
  const loggedInUser = req.params;
  const jobs = await Job.find({
    companyId: new mongoose.Types.ObjectId(loggedInUser),
  }).populate("companyId");

  if (!jobs.length) {
    return res.status(404).json(new ApiResponse(404, {}, "No jobs found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, jobs, "Jobs fetched successfully"));
});

// Get Job by ID
const getJobById = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  if (!jobId) {
    return res.status(400).json(new ApiResponse(400, {}, "Job ID is required"));
  }

  const job = await Job.findById(jobId).populate(
    "companyId",
    "fullName email companyName"
  );

  if (!job) {
    return res.status(404).json(new ApiResponse(404, {}, "Job not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, job, "Job fetched successfully"));
});

// Update Job
const updateJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const { title, description, experienceLevel, endDate, candidates } = req.body;

  if (!jobId) {
    return res.status(400).json(new ApiResponse(400, {}, "Job ID is required"));
  }

  let job = await Job.findByIdByUpdate(
    jobId,
    {
      title,
      description,
      experienceLevel,
      endDate,
      candidates,
    },
    { new: true }
  );
  if (!job) {
    return res.status(404).json(new ApiResponse(404, {}, "Job not found"));
  }

  // Update the job fields
  await job.save();

  return res
    .status(200)
    .json(new ApiResponse(200, job, "Job updated successfully"));
});

// Delete Job
const deleteJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  if (!jobId) {
    return res.status(400).json(new ApiResponse(400, {}, "Job ID is required"));
  }

  const job = await Job.findByIdAndDelete(jobId);

  if (!job) {
    return res.status(404).json(new ApiResponse(404, {}, "Job not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Job deleted successfully"));
});

export { createJob, getAllJobs, getJobById, updateJob, deleteJob };
