import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col justify-center items-center px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 mb-4 text-center">
        Welcome to Smart Test App 📚
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8 text-center max-w-xl">
        Practice. Improve. Succeed. Join as a learner or instructor to get started!
      </p>
      <div className="flex space-x-4">
        <Link to="/learner/register">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg">
            Register
          </button>
        </Link>
        <Link to="/learner/login">
          <button className="bg-white hover:bg-gray-100 text-indigo-700 border border-indigo-600 font-semibold px-6 py-3 rounded-xl shadow-lg">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
