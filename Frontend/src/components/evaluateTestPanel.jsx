import React from "react";
import CandidateCard from "./CandidateResponseCard";

const EvaluateTestPanel = ({ candidateResponses, onEvaluate }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-indigo-600 mb-4">📑 Evaluate Test</h3>
      {candidateResponses.map((candidate) => (
        <CandidateCard key={candidate.id} candidate={candidate} onEvaluate={onEvaluate} />
      ))}
    </div>
  );
};

export default EvaluateTestPanel;
