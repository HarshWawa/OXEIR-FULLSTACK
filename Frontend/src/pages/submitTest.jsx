import { useState } from "react";
import { useLocation,useNavigate  } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

const SubmitTest = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ for redirect
  const { testId, testTitle = "Untitled Test", questions = [] } = location.state || {};

  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    const payload = {
      testId,
      answers: questions.map((q, index) => ({
        questionId: q.questionId,
        answerText: answers[index],
      })),
    };

    try {
      const res = await axios.post(`${BASE_URL}/userApp/learner/submitTest`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Test submitted successfully!");
      navigate("/learner/dashboard"); // Redirect to learner dashboard after submission
    } catch (err) {
      console.error(err);
      alert("Failed to submit test.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-10 px-4 flex flex-col items-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">{testTitle}</h2>

        {questions.map((q, idx) => (
          <div key={q.questionId || idx} className="mb-6">
            <p className="font-medium mb-2">
              Q{idx + 1}. {q.questionText}
            </p>
            <textarea
              className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              placeholder="Your answer..."
              value={answers[idx]}
              onChange={(e) => handleChange(idx, e.target.value)}
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
};

export default SubmitTest;
