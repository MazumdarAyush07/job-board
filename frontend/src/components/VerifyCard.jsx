import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyCard = () => {
  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Get user details from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Function to verify email OTP
  // Function to verify email OTP
  const verifyEmailOTP = async () => {
    try {
      const response = await axios.post(
        "https://job-board-o9en.onrender.com/api/v1/users/verify-otp-email",
        { email: user.email, otp: emailOtp }
      );
      console.log("Email OTP Response:", response); // Log the full response
      if (response.data.statusCode === 200) {
        setEmailVerified(true);
        setErrorMessage(""); // Clear error message on success
      } else {
        setErrorMessage("Email OTP verification failed."); // Handle non-success status
      }
    } catch (error) {
      console.error("Email OTP Verification Error:", error); // Log the error
      setErrorMessage("Email OTP verification failed.");
    }
  };

  // Function to verify mobile OTP
  const verifyMobileOTP = async () => {
    try {
      const response = await axios.post(
        "https://job-board-o9en.onrender.com/api/v1/users/verify-otp-mobile",
        { phone: user.phone, otp: mobileOtp }
      );
      console.log("Mobile OTP Response:", response); // Log the full response
      if (response.data.statusCode === 200) {
        setMobileVerified(true);
        setErrorMessage(""); // Clear error message on success
      } else {
        setErrorMessage("Mobile OTP verification failed."); // Handle non-success status
      }
    } catch (error) {
      console.error("Mobile OTP Verification Error:", error); // Log the error
      setErrorMessage("Mobile OTP verification failed.");
    }
  };

  // Effect to navigate to the homepage once both OTPs are verified
  useEffect(() => {
    if (emailVerified && mobileVerified) {
      navigate("/");
    }
  }, [emailVerified, mobileVerified, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full border border-blue-600">
        <h2 className="text-2xl font-bold text-center mb-2">Verify Account</h2>
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}

        {/* Email OTP Input */}
        <div className="mb-4">
          <label className="sr-only" htmlFor="emailOtp">
            Email OTP
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <i className="fas fa-envelope"></i>
            </span>
            <input
              id="emailOtp"
              type="text"
              value={emailOtp}
              onChange={(e) => setEmailOtp(e.target.value)}
              className={`block w-full pl-10 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                emailVerified ? "border-green-500" : "border-gray-300"
              }`}
              placeholder="Email OTP"
              disabled={emailVerified} // Disable input after verification
            />
            {emailVerified && (
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-500">
                ✔
              </span>
            )}
          </div>
          {!emailVerified && (
            <button
              className="mt-2 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
              onClick={verifyEmailOTP}
              disabled={emailVerified || emailOtp.trim() === ""} // Disable if already verified or input is empty
            >
              Verify
            </button>
          )}
        </div>

        {/* Mobile OTP Input */}
        <div className="mb-4">
          <label className="sr-only" htmlFor="mobileOtp">
            Mobile OTP
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <i className="fas fa-phone-alt"></i>
            </span>
            <input
              id="mobileOtp"
              type="text"
              value={mobileOtp}
              onChange={(e) => setMobileOtp(e.target.value)}
              className={`block w-full pl-10 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                mobileVerified ? "border-green-500" : "border-gray-300"
              }`}
              placeholder="Mobile OTP"
              disabled={mobileVerified} // Disable input after verification
            />
            {mobileVerified && (
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-500">
                ✔
              </span>
            )}
          </div>
          {!mobileVerified && (
            <button
              className="mt-2 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
              onClick={verifyMobileOTP}
              disabled={mobileVerified || mobileOtp.trim() === ""} // Disable if already verified or input is empty
            >
              Verify
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyCard;
