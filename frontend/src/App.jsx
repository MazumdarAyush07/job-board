import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp.jsx"; // Assuming SignUp.jsx is in a "pages" folder
import Verify from "./pages/Verify.jsx";
import CreateJob from "./pages/CreateJob.jsx";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/createJob" element={<CreateJob />} />
          <Route path="/" element={<SignUp />} />
          {/* You can add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
