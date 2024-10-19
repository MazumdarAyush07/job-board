import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md mx-auto h-16 py-2 mt-4 px-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="../../cuvette-logo.png" alt="Cuvette" className="h-6" />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Contact
          </a>

          {/* Profile Dropdown */}
          <div className="relative border-2 p-2">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
              <span>Your Name</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Content (Optional) */}
            {/* 
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Profile
              </a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Logout
              </a>
            </div>
            */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
