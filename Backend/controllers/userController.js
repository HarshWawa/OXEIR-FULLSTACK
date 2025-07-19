const bcrypt = require("bcryptjs");
const allModels = require("../all_models");
const jwt = require("jsonwebtoken");

// Static instructor (hardcoded for now)
const INSTRUCTOR = {
  email: "instructor@admin.com",
  password: "instructor123" // Plain password — hash this later
};

// Register only for students
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await allModels.User_Model.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new allModels.User_Model({
      name,
      email,
      password: hashedPassword,
      role: "learner"
    });

    await user.save();
    res.status(201).json({ message: "Student registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
};

// Login for both instructor and student
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check for static instructor
//     if (email === INSTRUCTOR.email) {
//       if (password === INSTRUCTOR.password) {
//         return res.status(200).json({ message: "Instructor login successful", role: "instructor" });
//       } else {
//         return res.status(401).json({ message: "Invalid instructor credentials" });
//       }
//     }

//     // Check learner in DB
//     const user = await allModels.User_Model.findOne({ email });
//     if (!user || user.role !== "learner") {
//       return res.status(404).json({ message: "Learner not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//     res.status(200).json({ message: "Student login successful", role: "learner" });
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Static Instructor Login
    if (email === INSTRUCTOR.email) {
      if (password === INSTRUCTOR.password) {
        const token = jwt.sign(
          { email, role: "instructor" },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        return res.status(200).json({
          message: "Instructor login successful",
          role: "instructor",
          token,
        });
      } else {
        return res.status(401).json({ message: "Invalid instructor credentials" });
      }
    }

    // Learner Login
    const user = await allModels.User_Model.findOne({ email });
    if (!user || user.role !== "learner") {
      return res.status(404).json({ message: "Learner not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Student login successful",
      role: "learner",
      token,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.logout = (req, res) => {

  res.status(200).json({ message: "Logged out successfully" });
}