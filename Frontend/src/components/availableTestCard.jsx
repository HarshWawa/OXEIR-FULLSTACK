// import { useNavigate } from "react-router-dom";

// const AvailableTestCard = ({ title, description }) => {
//   const navigate = useNavigate();

//   const handleStart = () => {
//     navigate("/submit-test", { state: { testTitle: title } });
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
//       <h4 className="text-lg font-bold text-indigo-700 mb-2">{title}</h4>
//       <p className="text-gray-600 mb-4">{description}</p>
//       <button
//         onClick={handleStart}
//         className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
//       >
//         Start Test
//       </button>
//     </div>
//   );
// };

// export default AvailableTestCard;


import { useNavigate } from "react-router-dom";

const AvailableTestCard = ({ testId, title, description, questions }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/submit-test", {
      state: { testId, testTitle: title, questions },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
      <h4 className="text-lg font-bold text-indigo-700 mb-2">{title}</h4>
      <p className="text-gray-600 mb-4">{description}</p>
      <button
        onClick={handleStart}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
      >
        Start Test
      </button>
    </div>
  );
};

export default AvailableTestCard;

