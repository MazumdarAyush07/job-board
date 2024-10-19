import React from "react";

const SignUpCard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full border border-blue-600">
        <h2 className="text-2xl font-bold text-center mb-2">Sign Up</h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Lorem Ipsum is simply dummy text
        </p>

        <form>
          {/* Name Input */}
          <div className="mb-4">
            <label className="sr-only" htmlFor="name">
              Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fas fa-user"></i>
              </span>
              <input
                id="name"
                type="text"
                className="block w-full pl-10 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                placeholder="Name"
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
          >
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpCard;
