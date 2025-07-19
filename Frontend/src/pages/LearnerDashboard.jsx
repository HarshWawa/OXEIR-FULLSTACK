import { useState } from "react";
import LearnerGroupedFeedbackCard from "../components/LearnerGroupedFeedbackCard";
// import AvailableTestCard from "../components/availableTestCard";
import ViewAllTestLearner from "../components/viewAllTestLearner";
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import { useEffect } from "react";
const BASE_URL = import.meta.env.VITE_API_URL;

const LearnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("tests");
  const navigate = useNavigate();

  const handleStartTest = (title) => {
    alert(`Starting test: ${title}`);
  };
  const handleLogout = () => {
    // Clear tokens or session here if needed
    alert("Logged out");
    localStorage.removeItem('token');
    navigate("/");
  };
    const [groupedFeedback, setGroupedFeedback] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      const token = localStorage.getItem("token");
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      const userId = decodedToken.id;

      const res = await axios.get(`${BASE_URL}/userApp/responses/${userId}/feedback`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const responses = res.data.responses;

      // Group by testTitle
      const grouped = {};
      responses.forEach(resp => {
        const title = resp.testTitle;
        if (!grouped[title]) {
          grouped[title] = [];
        }
        grouped[title].push(resp);
      });

      const final = Object.entries(grouped).map(([testTitle, items]) => ({
        testTitle,
        responses: items
      }));

      setGroupedFeedback(final);
    };

    fetchFeedback();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-indigo-700">Learner Panel</h2>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setActiveTab("tests")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === "tests"
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                My Test Results
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("available")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === "available"
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                Available Tests
              </button>
            </li>
          </ul>
        </div>

           <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-indigo-800 mb-6">Hello, Learner</h1>

        {activeTab === "tests" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">My Test Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedFeedback.map((group, idx) => (
                <LearnerGroupedFeedbackCard
                  key={idx}
                  testTitle={group.testTitle}
                  responses={group.responses}
                />
              ))}
            
            
            </div>
          </div>
        )}

        {activeTab === "available" && (
          <div>
            {/* <h3 className="text-xl font-semibold mb-4">Available Tests</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AvailableTestCard
                title="React Basics Quiz"
                description="Covers JSX, props, and component state."
                onStart={() => handleStartTest("React Basics Quiz")}
              />
              <AvailableTestCard
                title="Database Fundamentals"
                description="Covers SQL, joins, indexing, and normalization."
                onStart={() => handleStartTest("Database Fundamentals")}
              />
              <AvailableTestCard
                title="Python Advanced"
                description="Generators, decorators, and context managers."
                onStart={() => handleStartTest("Python Advanced")}
              />
            </div> */}
            <ViewAllTestLearner />
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnerDashboard;
