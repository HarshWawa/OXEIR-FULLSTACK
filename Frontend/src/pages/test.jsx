// import { useState } from "react";

// const TestCreationPage = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [questions, setQuestions] = useState([""]);

//   const handleAddQuestion = () => {
//     setQuestions([...questions, ""]);
//   };

//   const handleChangeQuestion = (index, value) => {
//     const newQuestions = [...questions];
//     newQuestions[index] = value;
//     setQuestions(newQuestions);
//   };

//   const handleSubmit = () => {
//     const testData = { title, description, questions };
//     console.log("Test Data:", testData);
//     // TODO: Send this to backend
//     alert("Test created!");
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 p-8">
//       <h2 className="text-2xl font-bold text-indigo-700 mb-6">Create New Test</h2>

//       <div className="space-y-4">
//         <input
//           type="text"
//           placeholder="Test Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded-md"
//         />
//         <textarea
//           placeholder="Test Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded-md"
//         />
//         <h3 className="text-lg font-semibold">Questions</h3>
//         {questions.map((q, i) => (
//           <input
//             key={i}
//             type="text"
//             value={q}
//             onChange={(e) => handleChangeQuestion(i, e.target.value)}
//             placeholder={`Question ${i + 1}`}
//             className="w-full p-2 border border-gray-300 rounded-md mb-2"
//           />
//         ))}
//         <button
//           onClick={handleAddQuestion}
//           className="bg-green-500 text-white px-4 py-2 rounded-md"
//         >
//           + Add Question
//         </button>
//         <br />
//         <button
//           onClick={handleSubmit}
//           className="bg-indigo-600 text-white px-6 py-2 rounded-md mt-4"
//         >
//           Submit Test
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TestCreationPage;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_URL;


const TestCreationPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([""]);
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleChangeQuestion = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    const testData = {
      title,
      description,
      questions: questions.map((q) => ({ questionText: q })),
    };

    try {
      const response = await fetch(`${BASE_URL}/userApp/createTest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(testData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Test created successfully!");
        navigate("/instructor/dashboard");
      } else {
        alert(result.message || "Failed to create test.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Create New Test</h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Test Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <textarea
          placeholder="Test Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <h3 className="text-lg font-semibold">Questions</h3>
        {questions.map((q, i) => (
          <input
            key={i}
            type="text"
            value={q}
            onChange={(e) => handleChangeQuestion(i, e.target.value)}
            placeholder={`Question ${i + 1}`}
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
        ))}
        <button
          onClick={handleAddQuestion}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          + Add Question
        </button>
        <br />
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-6 py-2 rounded-md mt-4"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
};

export default TestCreationPage;

