import { useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

const OverrideSubmissionCard = ({ name, testTitle, responses }) => {
  const [responseData, setResponseData] = useState(responses);

  const handleOverride = async (responseId, questionId, newScore, feedback) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${BASE_URL}/userApp/responses/${responseId}/override`,
        {
          score: newScore,
          feedback: feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Score overridden!");
    } catch (err) {
      console.error("Override failed", err);
      alert("Failed to override");
    }
  };

  return (
    <div className="bg-white p-10 mb-8 rounded-lg shadow ">
      <h3 className="text-xl font-bold mb-2">{testTitle}</h3>
      <p className="mb-4 font-medium">Candidate: {name}</p>

      {responseData.map((resp, idx) => (
        <div key={idx} className="border-t pt-4 mt-4">
          <p className="font-semibold">Question:</p>
          <p className="mb-2">{resp.questionText}</p>

          <p className="font-semibold">Answer:</p>
          <p className="mb-2">{resp.answerText}</p>

          <p className="text-sm text-gray-600">AI Score: {resp.aiScore}</p>
          <p className="text-sm text-gray-600 mb-2">AI Feedback: {resp.aiFeedback}</p>
          <p className="text-sm text-gray-600 mb-2">Instructor Score: {resp.instructorOverride?.score ?? "Not overridden"}</p>
          

          <div className="flex flex-wrap gap-4 items-center mb-4">
            <input
              type="number"
              placeholder="New Score"
              className="border rounded px-2 py-1 flex-1"
              onChange={(e) => resp.overrideScore = e.target.value}
            />
            <input
              type="text"
              placeholder="New Feedback"
              className="border rounded px-2 py-1 flex-1"
              onChange={(e) => resp.overrideFeedback = e.target.value}
            />
             <button
              onClick={() =>
                handleOverride(
                  resp._id,
                  resp.questionId,
                  resp.overrideScore,
                  resp.overrideFeedback
                )
              }
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Override
          </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverrideSubmissionCard;


