// import { useState } from "react";

// const Login = () => {
//   const [role, setRole] = useState("learner");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col justify-center items-center px-4">
//       <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//         {/* Toggle for Learner / Instructor */}
//         <div className="flex justify-center gap-4 mb-6">
//           <button
//             type="button"
//             onClick={() => setRole("learner")}
//             className={`px-4 py-2 rounded-full font-semibold ${
//               role === "learner"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             Learner
//           </button>
//           <button
//             type="button"
//             onClick={() => setRole("instructor")}
//             className={`px-4 py-2 rounded-full font-semibold ${
//               role === "instructor"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             Instructor
//           </button>
//         </div>

//         {/* Email */}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />

//         {/* Password */}
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />

//         <button
//           type="button"
//           className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
//         >
//           Login as {role.charAt(0).toUpperCase() + role.slice(1)}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;


const Login = () => {
  const [role, setRole] = useState("learner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/userApp/login`, {
        email,
        password,
      });

      const { token, role, message } = response.data;

      // Save token
      localStorage.setItem("token", token);
      alert(message);

      // Redirect based on role
      if (role === "learner") {
        navigate("/learner/dashboard");
      } else if (role === "instructor") {
        navigate("/instructor/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col justify-center items-center px-4">
      <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Toggle for Learner / Instructor */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setRole("learner")}
            className={`px-4 py-2 rounded-full font-semibold ${
              role === "learner"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Learner
          </button>
          <button
            type="button"
            onClick={() => setRole("instructor")}
            className={`px-4 py-2 rounded-full font-semibold ${
              role === "instructor"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Instructor
          </button>
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="button"
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          Login as {role.charAt(0).toUpperCase() + role.slice(1)}
        </button>
      </form>
    </div>
  );
};

export default Login;

