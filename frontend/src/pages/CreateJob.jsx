import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios"; // Add axios to handle API requests

const CreateJob = () => {
  const [showForm, setShowForm] = useState(false);
  const [emails, setEmails] = useState([]);
  const [emailInput, setEmailInput] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [success, setSuccess] = useState(false); // Success state

  const handleCreateInterview = () => {
    if (showForm) {
      setEmails([]);
      setEmailInput("");
      setJobTitle("");
      setJobDescription("");
      setExperienceLevel("");
      setEndDate("");
      setError(null);
      setSuccess(false);
    }
    setShowForm(!showForm);
  };

  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  };

  const handleEmailKeyDown = (e) => {
    if (e.key === "Enter" && emailInput.trim()) {
      e.preventDefault();
      if (validateEmail(emailInput)) {
        setEmails((prevEmails) => [...prevEmails, emailInput.trim()]); // Correctly update emails
        setEmailInput("");
      }
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleRemoveEmail = (index) => {
    setEmails((prevEmails) => prevEmails.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Retrieve companyId and token from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const companyId = user ? user._id : null; // Ensure _id exists
    const accessToken = localStorage.getItem("accessToken"); // Retrieve the accessToken

    if (!companyId || !accessToken) {
      setLoading(false);
      setError(
        "Company ID or token is missing. Please ensure you are logged in."
      );
      return;
    }

    const jobData = {
      title: jobTitle,
      description: jobDescription,
      experienceLevel,
      endDate,
      candidates: emails, // Include emails in the payload
      companyId, // Dynamically set the companyId
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/jobs/create",
        jobData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setLoading(false);
      setSuccess(true);
      setShowForm(false); // Optionally close the form
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Failed to create the job");
    }
  };

  return (
    <div className="flex">
      <div className="w-16 h-screen bg-gray-100 flex flex-col items-center py-4">
        <button className="mb-4">
          <i className="fas fa-home text-gray-600 text-xl"></i>
        </button>
      </div>

      <div className="flex-1 p-8">
        <div className="flex justify-start mb-4">
          <button
            onClick={handleCreateInterview}
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
          >
            {showForm ? "Close Form" : "Create Interview"}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-8 rounded-md shadow-md max-w-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Enter Job Title"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Enter Job Description"
                  rows="4"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Experience Level
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select Experience Level</option>
                  <option value="Junior">Junior</option>
                  <option value="Mid">Mid</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Add Candidate
                </label>
                <div className="border px-2 py-2 rounded-md">
                  <div className="flex flex-wrap mb-1">
                    {emails.map((email, index) => (
                      <div
                        key={index}
                        className="bg-gray-200 px-3 py-1 rounded-full flex items-center mr-2 mb-2"
                      >
                        <span className="text-gray-700">{email}</span>
                        <button
                          className="ml-2 text-gray-600"
                          onClick={() => handleRemoveEmail(index)}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={handleEmailChange}
                    onKeyDown={handleEmailKeyDown}
                    placeholder="xyz@gmail.com"
                    className="w-full px-2 py-1 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {success && (
                <p className="text-green-500">Job created successfully!</p>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        )}

        {!showForm && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Create a New Job</h2>
            <p className="text-gray-600">
              Here, you can create a new job by filling out the form below:
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateJob;
