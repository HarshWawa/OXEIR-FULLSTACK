
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LearnerRegister from "./pages/LearnerRegister";
import Home from './pages/home';
import Login from './pages/login';
import LearnerDashboard from './pages/LearnerDashboard';
import SubmitTest from './pages/submitTest';
import InstructorDashboard from './pages/instructorDashboard';
import TestCreationPage from './pages/test';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learner/register" element={<LearnerRegister />} />
        <Route path="/learner/login" element={<Login />} />
        <Route path="/learner/dashboard" element={<LearnerDashboard />} />
        <Route path="/submit-test" element={<SubmitTest />} />
        <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
        <Route path="/instructor/create-test" element={<TestCreationPage />} />
        {/* Add more routes as needed */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
