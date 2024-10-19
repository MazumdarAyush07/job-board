import { Router } from "express";
import {
  registerUser,
  loginUser,
  logout,
  getUserById,
  otpCheckerEmail,
  otpCheckerMobile,
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js"; // Middleware for JWT verification

const router = Router();

// User registration route
router.route("/register").post(registerUser); // Route to register a new user - tested successfully

// User login route
router.route("/login").post(loginUser); // Route for logging in a user - tested successfully

// OTP verification route
router.route("/verify-otp-email").post(otpCheckerEmail); // Route for checking the OTP sent to user's - tested successfully

router.route("/verify-otp-mobile").post(otpCheckerMobile); // Route for checking the OTP sent to user's - tested successfully

// User logout route
router.route("/logout").post(verifyJWT, logout); // Route for logging out a user (JWT required) - tested successfuly

// Get user by ID route
router.route("/:userId").get(verifyJWT, getUserById); // Route for fetching a user's information by ID (JWT required)

export default router;
