// components/viewAllTestLearner.jsx
import { useEffect, useState } from "react";
import AvailableTestCard from "./availableTestCard";
const BASE_URL = import.meta.env.VITE_API_URL;

const ViewAllTestLearner = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailableTests = async () => {
      try {
        const response = await fetch(`${BASE_URL}/userApp/learner/viewTest`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        if (response.ok && data.success) {
          setTests(data.tests);
        } else {
          console.error("Failed to fetch available tests:", data.message);
        }
      } catch (err) {
        console.error("Error fetching tests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableTests();
  }, []);

  if (loading) return <p>Loading available tests...</p>;

  if (tests.length === 0) return <p>No available tests found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tests.map((test) => (
        <AvailableTestCard
          key={test._id}
          title={test.title}
          description={test.description}
          questions={test.questions}
          testId={test._id}
        />
      ))}
    </div>
  );
};

export default ViewAllTestLearner;
