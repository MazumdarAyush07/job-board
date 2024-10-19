import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpCard = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    companyName: "",
    email: "",
    employeeSize: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // State for button text
  const navigate = useNavigate(); // To navigate to different pages

  // Handle form inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsRegistering(true); // Set registering state to true

    try {
      // Sending form data to the backend
      const response = await axios.post(
        "https://job-board-o9en.onrender.com/api/v1/users/register",
        formData
      );

      if (response.status === 201) {
        const { user, refreshToken } = response.data.data;

        // Store tokens in localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("refreshToken", refreshToken);

        // Set success message
        setMessage(response.data.message);

        // Redirect to /verify page
        navigate("/verify");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Registration failed");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsRegistering(false); // Reset registering state
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full border border-blue-600">
        <h2 className="text-2xl font-bold text-center mb-2">Sign Up</h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Lorem Ipsum is simply dummy text
        </p>

        {/* Display success or error messages */}
        {message && <p className="text-green-500 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <div className="mb-4">
            <label className="sr-only" htmlFor="fullName">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fas fa-user"></i>
              </span>
              <input
                id="fullName"
                type="text"
                className="block w-full pl-10 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Phone Number Input */}
          <div className="mb-4">
            <label className="sr-only" htmlFor="phone">
              Phone No.
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fas fa-phone-alt"></i>
              </span>
              <input
                id="phone"
                type="tel"
                className="block w-full pl-10 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                placeholder="Phone no."
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Company Name Input */}
          <div className="mb-4">
            <label className="sr-only" htmlFor="companyName">
              Company Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fas fa-building"></i>
              </span>
              <input
                id="companyName"
                type="text"
                className="block w-full pl-10 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Company Email Input */}
          <div className="mb-4">
            <label className="sr-only" htmlFor="email">
              Company Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                id="email"
                type="email"
                className="block w-full pl-10 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                placeholder="Company Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Employee Size Input */}
          <div className="mb-4">
            <label className="sr-only" htmlFor="employeeSize">
              Employee Size
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fas fa-users"></i>
              </span>
              <input
                id="employeeSize"
                type="number"
                className="block w-full pl-10 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                placeholder="Employee Size"
                value={formData.employeeSize}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fas fa-lock"></i>
              </span>
              <input
                id="password"
                type="password"
                className="block w-full pl-10 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Terms & Conditions */}
          <p className="text-center text-gray-500 text-sm mb-4">
            By clicking on proceed you will accept our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms & Conditions
            </a>
          </p>

          {/* Proceed Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            disabled={isRegistering} // Disable the button while registering
          >
            {isRegistering ? "Registering..." : "Proceed"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpCard;
