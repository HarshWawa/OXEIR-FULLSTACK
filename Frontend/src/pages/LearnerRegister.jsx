// import { useState } from "react";
// import { Link } from "react-router-dom";

// const LearnerRegister = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col justify-center items-center px-4">
//       <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Learner Register</h2>

//         <input
//           type="text"
//           placeholder="Full Name"
//           className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <Link to="/learner/login">
//         <button
//           type="button"
//           className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">

//           Register
//         </button>
//         </Link>
//       </form>
//     </div>
//   );
// };

// export default LearnerRegister;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_URL;

const LearnerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      role: "learner"
    };

    try {
      const res = await fetch(`${BASE_URL}/userApp/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message); // "Student registered successfully"
        navigate("/learner/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Learner Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default LearnerRegister;
