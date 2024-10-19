import React from "react";
import VerifyCard from "../components/VerifyCard";

const Verify = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-50 px-4">
      {/* Left Side Text Section */}
      <div className="text-center md:text-left md:w-1/2 p-6 pl-10">
        <p className="text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and <br />
          typesetting industry. Lorem Ipsum has been the industry's <br />{" "}
          standard dummy text ever since the 1500s, when an <br /> unknown
          printer took a galley.
        </p>
      </div>

      {/* Right Side Sign Up Form */}
      <div className="md:w-1/2">
        <VerifyCard />
      </div>
    </div>
  );
};

export default Verify;
