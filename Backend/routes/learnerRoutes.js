 
 const express = require('express')
 const router = express.Router();
 // const { body } = require('express-validator');
 const {Token_Verify} = require('../middleware/tokenVerify')
 const Is_User_Exist = require('../middleware/isUser')
 
 const learnerController = require("../controllers/learnerController");;
 
 router.get("/learner/viewTest", Token_Verify,Is_User_Exist.isUser, learnerController.getAllTestsForUser);
 router.post("/learner/submitTest", Token_Verify, Is_User_Exist.isUser, learnerController.submitTestAnswers);
 router.get('/responses/:userId/feedback',Token_Verify,Is_User_Exist.isUser,learnerController.getEvaluationFeedback);


 
 
 module.exports = router