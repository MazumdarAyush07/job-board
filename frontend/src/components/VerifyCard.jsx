import React from "react";

const VerifyCard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full border border-blue-600">
        <h2 className="text-2xl font-bold text-center mb-2">Sign Up</h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Lorem Ipsum is simply dummy text
        </p>

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
              className="block w-full pl-10 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
              placeholder="Email OTP"
            />
          </div>
          <button className="mt-2 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
            Verify
          </button>
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
              className="block w-full pl-10 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
              placeholder="Mobile OTP"
            />
          </div>
          <button className="mt-2 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyCard;
