# Job Posting Board

## Overview

The Job Posting Board is a full-stack application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) designed for companies to register, post job openings, and send automated email alerts to candidates. This project demonstrates the integration of authentication, email automation, and a responsive user interface.

## Table of Contents

- [Objective](#objective)
- [Functional Requirements](#functional-requirements)
- [Technical Requirements](#technical-requirements)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Objective

Design and implement a full-stack job posting board where companies can:
- Register and verify their accounts via email.
- Post job openings.
- Send automated emails to candidates.

## Functional Requirements

### User Registration (Company)
- Companies can register by providing basic details.
- Implement email and mobile verification to activate the account. Unverified users cannot post jobs.

### Company Login
- Implement auto login using JWT or session-based authentication.

### Job Posting
- Authenticated companies can post jobs with the following details:
  - Job title
  - Job description
  - Experience level
  - Candidate email
  - End date

### Candidate Email Automation
- Companies can send job alerts or updates to multiple candidates via email.
- Use Nodemailer to automate emails, ensuring emails contain:
  - Job details
  - Sender information

### Logout
- Provide an option to logout, clearing tokens or sessions.

## Technical Requirements

### Frontend (React.js)
- Use React to build a responsive UI.
- Include forms for company registration, login, and job posting.

### Backend (Node.js & Express.js)
- Set up RESTful APIs for user registration, login, job posting, and email automation.
- Use Nodemailer to handle email sending.
- Implement input validation to ensure data consistency.

### Database (MongoDB)
- Store company details, job postings, and email logs in MongoDB.

### Authentication
- Use JWT or session-based authentication to protect routes.

## Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Email Automation:** Nodemailer

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MazumdarAyush07/job-board
   ```
2. ***Navigate to the project***
    ```cd job-posting-board```
3. Install the Backend Dependencies
   ```
   cd backend
   npm install
   ```
4. Install the Frontend Dependencies
   ```
   cd frontend
   npm install
   ```
5. Sample env structure:
   ```
   PORT =
   MONGODB_URI = 
   CORS_ORIGIN=
   
   ACCESS_TOKEN_SECRET = 
   ACCESS_TOKEN_EXPIRY = 
   REFRESH_TOKEN_SECRET = 
   REFRESH_TOKEN_EXPIRY = 
    
   MAIL = 
   PASS = 
   ```
6. Run the backend:
   ```
   cd backend
   npm run dev
   ```
7. Run the backend:
   ```
   cd frontend
   npm run dev
   ```


    
