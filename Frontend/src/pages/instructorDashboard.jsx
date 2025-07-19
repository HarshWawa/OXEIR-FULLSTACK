import { useState } from "react";
// import CandidateResponseCard from "../components/CandidateResponseCard";
import OverrideResponsesPanel from "../components/override";
import { useNavigate } from "react-router-dom";
import ViewAllTest from "../components/viewAllTest";
import EvaluateResponsesPanel from "../components/evaluateResponsesPanel";



const InstructorDashboard = () => {
  const [activeTab, setActiveTab] = useState("evaluate");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens or session here if needed

    alert("Logged out");
    localStorage.removeItem('token');
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex">
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-indigo-700">Instructor Panel</h2>
          <p className="mb-6 text-gray-600">Hello, Instructor!</p>

          <ul className="space-y-4">
              <li>
                <button
                  onClick={() => navigate("/instructor/create-test")}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeTab === "create test"
                      ? "bg-indigo-100 text-indigo-700 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Create test
                </button>
              </li>
            <li>
              <button
                onClick={() => setActiveTab("evaluate")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === "evaluate"
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                Evaluate Tests
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("override")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === "override"
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                Override Results
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("View Results")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === "View results"
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                View All Tests
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
        {activeTab === "evaluate" && (
          <div>
            <h3 className="text-xl font-bold mb-6">Candidate Responses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <EvaluateResponsesPanel />
              
              {/* Add more cards here */}
            </div>
          </div>
        )}

        {activeTab === "override" && (
          <div>
            <h3 className="text-xl font-bold mb-6">Override Scores</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <OverrideResponsesPanel />
              {/* Add more cards here */}
            </div>
          </div>
        )}
        {activeTab === "View Results" && (
          <div>
            <h3 className="text-xl font-bold mb-6">All Tests</h3>
            <ViewAllTest />
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;


// import { useState } from "react";
// import OverrideResponsesPanel from "../components/override";
// import { useNavigate } from "react-router-dom";
// import ViewAllTest from "../components/viewAllTest";
// import EvaluateResponsesPanel from "../components/evaluateResponsesPanel";

// const InstructorDashboard = () => {
//   const [activeTab, setActiveTab] = useState("evaluate");
//   const [filterStatus, setFilterStatus] = useState("all"); // 👈 Global filter
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     alert("Logged out");
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
//         <div>
//           <h2 className="text-2xl font-bold mb-2 text-indigo-700">Instructor Panel</h2>
//           <p className="mb-6 text-gray-600">Hello, Instructor!</p>

//           <ul className="space-y-4">
//             <li>
//               <button
//                 onClick={() => navigate("/instructor/create-test")}
//                 className={`w-full text-left px-4 py-2 rounded-md ${
//                   activeTab === "create test"
//                     ? "bg-indigo-100 text-indigo-700 font-semibold"
//                     : "hover:bg-gray-100"
//                 }`}
//               >
//                 Create test
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab("evaluate")}
//                 className={`w-full text-left px-4 py-2 rounded-md ${
//                   activeTab === "evaluate"
//                     ? "bg-indigo-100 text-indigo-700 font-semibold"
//                     : "hover:bg-gray-100"
//                 }`}
//               >
//                 Evaluate Tests
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab("override")}
//                 className={`w-full text-left px-4 py-2 rounded-md ${
//                   activeTab === "override"
//                     ? "bg-indigo-100 text-indigo-700 font-semibold"
//                     : "hover:bg-gray-100"
//                 }`}
//               >
//                 Override Results
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab("View Results")}
//                 className={`w-full text-left px-4 py-2 rounded-md ${
//                   activeTab === "View Results"
//                     ? "bg-indigo-100 text-indigo-700 font-semibold"
//                     : "hover:bg-gray-100"
//                 }`}
//               >
//                 View All Tests
//               </button>
//             </li>
//           </ul>
//         </div>

//         <button
//           onClick={handleLogout}
//           className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         {activeTab === "evaluate" && (
//           <div>
//             <h3 className="text-xl font-bold mb-6">Candidate Responses</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <EvaluateResponsesPanel />
//             </div>
//           </div>
//         )}

//         {activeTab === "override" && (
//           <div>
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-bold">Override Scores</h3>

//               {/* 🔽 Global Filter Dropdown */}
//               <div className="ml-auto">
//                 <select
//                   className="border border-gray-300 rounded px-4 py-1 shadow"
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                 >
//                   <option value="all">All</option>
//                   <option value="pending">Pending</option>
//                   <option value="evaluated">Evaluated</option>
//                   <option value="flagged">Flagged</option>
//                 </select>
//               </div>
//             </div>

//             {/* Panel Receives Filter */}
//             <OverrideResponsesPanel filterStatus={filterStatus} />
//           </div>
//         )}

//         {activeTab === "View Results" && (
//           <div>
//             <h3 className="text-xl font-bold mb-6">All Tests</h3>
//             <ViewAllTest />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InstructorDashboard;

