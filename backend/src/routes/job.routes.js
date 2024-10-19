import { Router } from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/job.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"; // Middleware for JWT verification

const router = Router();

router.use(verifyJWT);

// Route to create a new job (JWT required)
router.route("/create").post(createJob); //tested successfully

// Route to get all jobs
router.route("/getAllJobs/:loggedInUser").get(getAllJobs); //tested successfully

// Route to get a job by its ID
router.route("/:jobId").get(getJobById);

// Route to update a job by its ID (JWT required)
router.route("/:jobId").patch(updateJob);

// Route to delete a job by its ID (JWT required)
router.route("/:jobId").delete(deleteJob);

export default router;
