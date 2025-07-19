import { useEffect, useState } from "react";
import axios from "axios";
import OverrideSubmissionCard from "./OverrideSubmissionCard";
const BASE_URL = import.meta.env.VITE_API_URL;

const OverrideResponsesPanel = () => {
  const [groupedResponses, setGroupedResponses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${BASE_URL}/userApp/responses/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const rawResponses = res.data.responses;
        console.log("🔍 Raw response data:", rawResponses);

        const grouped = {};
        rawResponses.forEach((resp) => {
          const groupKey = `${resp.userId._id}_${resp.testId._id}`;
          if (!grouped[groupKey]) {
            grouped[groupKey] = {
              name: resp.userId.name,
              testTitle: resp.testId.title,
              responses: [],
            };
          }
          grouped[groupKey].responses.push(resp);
        });

        setGroupedResponses(Object.values(grouped));
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Override Scores</h2>
      {groupedResponses.map((group, idx) => (
        <OverrideSubmissionCard
          key={idx}
          name={group.name}
          testTitle={group.testTitle}
          responses={group.responses}
        />
      ))}
    </div>
  );
};

export default OverrideResponsesPanel;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import OverrideSubmissionCard from "./OverrideSubmissionCard";

// const OverrideResponsesPanel = () => {
//   const [groupedResponses, setGroupedResponses] = useState([]);
//   const [filteredTestTitle, setFilteredTestTitle] = useState("All");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     axios
//       .get("http://localhost:5000/userApp/responses/pending", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         const rawResponses = res.data.responses;
//         console.log("🔍 Raw response data:", rawResponses);

//         const grouped = {};
//         rawResponses.forEach((resp) => {
//           const groupKey = `${resp.userId._id}_${resp.testId._id}`;
//           if (!grouped[groupKey]) {
//             grouped[groupKey] = {
//               name: resp.userId.name,
//               testTitle: resp.testId.title,
//               responses: [],
//             };
//           }
//           grouped[groupKey].responses.push(resp);
//         });

//         setGroupedResponses(Object.values(grouped));
//       });
//   }, []);

//   // Get list of unique test titles
//   const testTitles = ["All", ...new Set(groupedResponses.map((group) => group.testTitle))];

//   const filteredGroups =
//     filteredTestTitle === "All"
//       ? groupedResponses
//       : groupedResponses.filter((group) => group.testTitle === filteredTestTitle);

//   return (
//     <div className="p-4">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold">Override Scores</h2>
//         <select
//           value={filteredTestTitle}
//           onChange={(e) => setFilteredTestTitle(e.target.value)}
//           className="px-3 py-2 border border-gray-300 rounded-md"
//         >
//           {testTitles.map((title, idx) => (
//             <option key={idx} value={title}>
//               {title}
//             </option>
//           ))}
//         </select>
//       </div>

//       {filteredGroups.length > 0 ? (
//         filteredGroups.map((group, idx) => (
//           <OverrideSubmissionCard
//             key={idx}
//             name={group.name}
//             testTitle={group.testTitle}
//             responses={group.responses}
//           />
//         ))
//       ) : (
//         <p className="text-gray-600">No responses found for the selected test.</p>
//       )}
//     </div>
//   );
// };

// export default OverrideResponsesPanel;

