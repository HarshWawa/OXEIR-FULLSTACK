// //  POST /instructor/test
 
//  const express = require('express')
//  const router = express.Router();
//  // const { body } = require('express-validator');
//  const {Token_Verify} = require('../Middleware/tokenVerify')
// //  const Is_User_Exist = require('../Middleware/isUser')
 
//  const instructorController = require("../controllers/instructorController");;
 
//  router.post("/createTest", Token_Verify, instructorController.createTest);
//  // Delete a test
//  router.delete("/:testId", Token_Verify, instructorController.deleteTest);

// // View all tests
//  router.get("/all-tests", Token_Verify, instructorController.getAllTests);
 
//  router.get("/:testId",Token_Verify, instructorController.getTestWithQuestions);

// router.put('/responses/:responseId/override',Token_Verify,instructorController.overrideEvaluation);

// router.post("/evaluate/:userId/:testId",Token_Verify,instructorController.evaluateUserTest);

// router.get("/responses/pending", Token_Verify, instructorController.viewPendingResponses);


 
//  module.exports = router


const express = require('express')
const router = express.Router();
const {Token_Verify} = require('../middleware/tokenVerify')
const instructorController = require("../controllers/instructorController");

// POST routes
router.post("/createTest", Token_Verify, instructorController.createTest);
router.post("/evaluate/:userId/:testId", Token_Verify, instructorController.evaluateUserTest);

// PUT routes
router.put('/responses/:responseId/override', Token_Verify, instructorController.overrideEvaluation);

// DELETE routes
router.delete("/:testId", Token_Verify, instructorController.deleteTest);

// GET routes - SPECIFIC ROUTES FIRST
router.get("/all-tests", Token_Verify, instructorController.getAllTests);
router.get("/responses/pending", Token_Verify, instructorController.viewPendingResponses);

// Parameterized routes LAST
router.get("/:testId", Token_Verify, instructorController.getTestWithQuestions);

module.exports = router