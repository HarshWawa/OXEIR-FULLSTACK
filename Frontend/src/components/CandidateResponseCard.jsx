// const CandidateResponseCard = ({ name, testTitle, responses, onEvaluate }) => {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md mb-4">
//       <h4 className="font-bold text-lg mb-4">{name} - {testTitle}</h4>
      
//       <div className="space-y-4">
//         {responses.map((resp, index) => (
//           <div key={resp._id} className="bg-gray-100 p-3 rounded-md">
//             <p className="font-medium text-gray-800">Q{index + 1}: {resp.questionText}</p>
//             <p className="text-gray-700 mt-1">Answer: {resp.answerText}</p>
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={() => onEvaluate(responses)}
//         className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
//       >
//         Evaluate with AI
//       </button>
//     </div>
//   );
// };

// export default CandidateResponseCard;


import { useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL; // Ensure this is set in your .env file

const CandidateResponseCard = ({ name, testTitle, responses, userId, testId }) => {
  const [evaluatedResponses, setEvaluatedResponses] = useState(responses);
  const [loading, setLoading] = useState(false);

  const handleEvaluate = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // or sessionStorage, depending on your app

      const res = await axios.post(
        `${BASE_URL}/userApp/evaluate/${userId}/${testId}`,
        {}, // <= empty body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Evaluation response:", res.data);

      const updated = res.data.evaluatedAnswers;

      const enriched = evaluatedResponses.map((resp) => {
        const match = updated.find((u) => u._id === resp._id);
        return match ? { ...resp, aiScore: match.aiScore, aiFeedback: match.aiFeedback } : resp;
      });

      setEvaluatedResponses(enriched);
    } catch (error) {
      console.error("Evaluation failed", error);
      alert("Evaluation failed. Please check console or token.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-4">
      <h4 className="font-bold text-lg mb-4">{name} - {testTitle}</h4>

      <div className="space-y-4">
        {evaluatedResponses.map((resp, index) => (
          <div key={resp._id} className="bg-gray-100 p-4 rounded-md border">
            <p className="font-medium text-gray-800">Q{index + 1}: {resp.questionText}</p>
            <p className="text-gray-700 mt-1">Answer: {resp.answerText}</p>

            {resp.aiScore !== undefined && (
              <div className="mt-2 text-sm text-green-700">
                <p><strong>AI Score:</strong> {resp.aiScore} / 10</p>
                <p><strong>AI Feedback:</strong> {resp.aiFeedback}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleEvaluate}
        disabled={loading}
        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Evaluating..." : "Evaluate with AI"}
      </button>
    </div>
  );
};

export default CandidateResponseCard;

