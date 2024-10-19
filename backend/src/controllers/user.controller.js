import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import mongoose, { Types, isValidObjectId } from "mongoose";
import bcrypt from "bcrypt";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validatebeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          {},
          "Something went wrong while generating the tokens"
        )
      );
  }
};

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

const sendOTPByEmail = async (email, otp) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  });
  let mailOptions = {
    from: "Sender's Address",
    to: email,
    subject: "OTP for account verification",
    text: `Your OTP for account verification is ${otp}`,
    html: `<p>Your OTP for account verification is <b>${otp}</b>.</p>`,
  };
  await transporter.sendMail(mailOptions);
};

const otpCheckerEmail = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email) {
    return res.status(400).json(new ApiResponse(400, {}, "Email is required"));
  }

  if (!otp) {
    return res.status(400).json(new ApiResponse(400, {}, "OTP is required"));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "User does not exist"));
  }

  if (otp !== user.emailOTP) {
    return res.status(400).json(new ApiResponse(400, {}, "Invalid OTP"));
  }

  user.emailOTP = undefined;
  user.isVerified.email = true;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "OTP verified successfully"));
});

const otpCheckerMobile = asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;

  if (!phone) {
    return res.status(400).json(new ApiResponse(400, {}, "Email is required"));
  }

  if (!otp) {
    return res.status(400).json(new ApiResponse(400, {}, "OTP is required"));
  }

  const user = await User.findOne({ phone });

  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "User does not exist"));
  }

  if (otp !== user.mobileOTP) {
    return res.status(400).json(new ApiResponse(400, {}, "Invalid OTP"));
  }

  user.mobileOTP = undefined;
  user.isVerified.phone = true;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "OTP verified successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body; // Changed 'email' to 'identifier'

  if (!identifier) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Identifier is required"));
  }
  if (!password) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Password is required"));
  }

  let user;
  if (/\S+@\S+\.\S+/.test(identifier)) {
    // Regex to check if identifier is an email
    user = await User.findOne({ email: identifier });
  } else {
    user = await User.findOne({ phone: identifier });
  }

  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "User does not exist"));
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json(new ApiResponse(401, {}, "Wrong credentials"));
  }

  if (user.isVerified.email === false || user.isVerified.phone === false) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "User is not verified"));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, phone, companyName, employeeSize, password } =
    req.body;

  // Validate input fields
  if (
    !fullName ||
    !email ||
    !phone ||
    !companyName ||
    !employeeSize ||
    !password
  ) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "All fields are required"));
  }

  // Check if the email is already registered
  const existingUserByEmail = await User.findOne({ email });
  if (existingUserByEmail) {
    return res
      .status(409)
      .json(new ApiResponse(409, {}, "Email is already registered"));
  }

  // Check if the phone is already registered
  const existingUserByPhone = await User.findOne({ phone });
  if (existingUserByPhone) {
    return res
      .status(409)
      .json(new ApiResponse(409, {}, "Phone is already registered"));
  }

  // Create a new user
  const createdUser = await User.create({
    fullName,
    email,
    phone,
    companyName,
    employeeSize,
    password,
    isVerified: {
      email: false, // Initial verification status
      phone: false,
    },
    emailOTP: generateOTP(),
    mobileOTP: generateOTP(),
  });

  const newUser = await User.findById(createdUser._id).select(
    "-password -emailOTP -mobileOTP"
  );
  const tokens = await generateAccessAndRefreshTokens(createdUser._id);
  const refreshToken = tokens?.refreshToken;
  const user = await User.findByIdAndUpdate(
    newUser._id,
    {
      $set: { refreshToken },
    },
    { new: true }
  );

  if (!newUser) {
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Server Error while creating the user"));
  }

  // Send OTP email to verify the user's email
  await sendOTPByEmail(createdUser.email, createdUser.emailOTP);
  await sendOTPByEmail(createdUser.email, createdUser.mobileOTP);

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user, refreshToken },
        "User registered successfully. Please verify your email."
      )
    );
});

const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json(new ApiResponse(400, {}, "Provide the userId"));
  }

  const user = await User.findById(userId);

  if (!user) {
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Server error while fetching user"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});

export {
  registerUser,
  loginUser,
  logout,
  getUserById,
  otpCheckerEmail,
  otpCheckerMobile,
};
