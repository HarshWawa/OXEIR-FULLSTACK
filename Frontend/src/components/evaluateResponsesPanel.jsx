import { useEffect, useState } from 'react';
import axios from 'axios';
import CandidateResponseCard from './CandidateResponseCard';
const BASE_URL = import.meta.env.VITE_API_URL;

const EvaluateResponsesPanel = () => {
  const [groupedResponses, setGroupedResponses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token")
    axios.get(`${BASE_URL}/userApp/responses/pending`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
      .then(res => {
        const rawResponses = res.data.responses;

        const grouped = {};

        rawResponses.forEach(resp => {
          const groupKey = `${resp.userId._id}_${resp.testId._id}`;
          if (!grouped[groupKey]) {
            grouped[groupKey] = {
              name: resp.userId.name,
              testTitle: resp.testId.title,
              responses: []
            };
          }
          grouped[groupKey].responses.push(resp);
        });

        const final = Object.values(grouped);
        setGroupedResponses(final);
      });
  }, []);

  const handleEvaluate = (responsesGroup) => {
    // Optional: send to AI evaluation endpoint
    console.log('Evaluating this group:', responsesGroup);
  };

  return (
    <div className="max-w-3xl mx-auto mt-6">
      {groupedResponses.map((group, idx) => (
        <CandidateResponseCard
          key={idx}
          name={group.name}
          testTitle={group.testTitle}
          responses={group.responses}
          userId={group.responses[0].userId._id}
          testId={group.responses[0].testId._id}
          onEvaluate={handleEvaluate}
        />
      ))}
    </div>
  );
};

export default EvaluateResponsesPanel;
