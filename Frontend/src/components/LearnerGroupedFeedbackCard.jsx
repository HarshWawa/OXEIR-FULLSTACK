const LearnerGroupedFeedbackCard = ({ testTitle, responses }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-6 border">
      <h3 className="text-xl font-bold mb-4">{testTitle}</h3>

      {responses.map((resp, index) => (
        <div key={index} className="mb-4 border-b pb-4">
          <p className="text-sm text-gray-600 mb-1">Question {index + 1}:</p>
          <p className="font-medium mb-2">{resp.question}</p>

          <p className="text-sm text-gray-600 mb-1">Your Answer:</p>
          <p className="mb-2">{resp.answer}</p>

          <p className="text-sm text-gray-600">Score: <span className="font-semibold">{resp.score}</span></p>
          <p className="text-sm text-gray-600">Feedback: <span className="italic">{resp.feedback}</span></p>
          <p className="text-sm text-gray-500 mt-1">Evaluated by: {resp.evaluatedBy}</p>
        </div>
      ))}
    </div>
  );
};

export default LearnerGroupedFeedbackCard;
