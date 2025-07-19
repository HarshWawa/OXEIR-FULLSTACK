const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");


dotenv.config();

const connectDB = require("./config/db");
connectDB();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000','https://oxeir-frontend-87b1-psi81nnsm-harsh-wawas-projects.vercel.app/'], // Add your frontend origins
  credentials: true, // Allow cookies to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//Admin Routes
const User_AppDashbaord_Routes = require('./all_routes');
User_AppDashbaord_Routes.User_AppDashbaord_Routes(app);


app.get("/", (req, res) => {
  res.send("Subjective Evaluator API running 🎯");
});

// Global Error Handler
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || res.statusCode || 500;
  const errorMessage = error.message || error;
  if (statusCode === 500) console.error("Internal Server Error:", error);
  else console.warn("Handled Error:", errorMessage);

  return res.status(statusCode).json({ message: errorMessage });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const path = require("path");
// const cookieParser = require("cookie-parser");

// dotenv.config();

// const connectDB = require("./config/db");
// connectDB();

// const app = express();

// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:3000'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cookieParser());

// // Load API routes first
// console.log("Loading API routes...");
// const User_AppDashbaord_Routes = require('./all_routes');
// User_AppDashbaord_Routes.User_AppDashbaord_Routes(app);
// console.log("✅ API routes loaded");

// // app.get("/", (req, res) => {
// //   res.send("Subjective Evaluator API running 🎯");
// // });

// // Test ONLY the most basic static file serving
// console.log("Testing basic static file serving...");
// const distPath = path.join(__dirname, 'dist');

// try {
//   // Try the absolute minimal approach
//   app.use('/static', express.static(distPath));
//   console.log("✅ Basic static serving added");
  
//   // Test catch-all with named parameter (Express 5 compatible)
//   app.get('/*path', (req, res) => {
//     res.sendFile(path.join(distPath, 'index.html'));
//   });
//   console.log("✅ Catch-all route added with named parameter");
  
// } catch (error) {
//   console.error("❌ Error with static serving:", error);
// }

// // Global Error Handler
// app.use((error, req, res, next) => {
//   const statusCode = error.statusCode || res.statusCode || 500;
//   const errorMessage = error.message || error;
//   if (statusCode === 500) console.error("Internal Server Error:", error);
//   else console.warn("Handled Error:", errorMessage);

//   return res.status(statusCode).json({ message: errorMessage });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));