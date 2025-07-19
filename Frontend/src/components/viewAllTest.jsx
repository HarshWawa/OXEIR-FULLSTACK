// import { useEffect, useState } from "react";
// import TestCard from "./testCard";

// const ViewAllTest = () => {
//   const [tests, setTests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTests = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/userApp/all-tests", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         const result = await response.json();

//         if (response.ok) {
//           setTests(result.tests);
//         } else {
//           console.error("Failed to fetch tests:", result.message);
//         }
//       } catch (error) {
//         console.error("Error fetching tests:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTests();
//   }, []);

//   if (loading) return <p>Loading tests...</p>;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {tests.map((test) => (
//         <TestCard
//           key={test._id}
//           title={test.title}
//           description={test.description}
//           createdAt={test.createdAt}
//         />
//       ))}
//     </div>
//   );
// };

// export default ViewAllTest;


import { useEffect, useState } from "react";
import TestCard from "./testCard";
const BASE_URL = import.meta.env.VITE_API_URL;

const ViewAllTest = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch(`${BASE_URL}/userApp/all-tests`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await response.json();

        if (response.ok) {
          setTests(result.tests);
        } else {
          console.error("Failed to fetch tests:", result.message);
        }
      } catch (error) {
        console.error("Error fetching tests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const handleDeleteFromUI = (deletedId) => {
    setTests((prevTests) => prevTests.filter((test) => test._id !== deletedId));
  };

  if (loading) return <p>Loading tests...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tests.map((test) => (
        <TestCard
          key={test._id}
          id={test._id}
          title={test.title}
          description={test.description}
          createdAt={test.createdAt}
          onDelete={handleDeleteFromUI}
        />
      ))}
    </div>
  );
};

export default ViewAllTest;

