const AllModels = require("../all_models");

exports.getAllTestsForUser = async (req, res) => {
  try {
    // Validate user exists
    if (!req.is_user_exist) {
        return res.status(403).json({ error: "Access denied. User does not exist." });
        }
        
    const tests = await AllModels.Test_Model.find({})
      .select("title description") // only send necessary fields
      .populate("questions", "questionText"); // optional

    res.status(200).json({ success: true, tests });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch tests", error: err.message });
  }
};


// const Test_Model = require("../../models/Test");
// const SubjectiveResponse = require("../../models/SubjectiveResponse");

exports.submitTestAnswers = async (req, res) => {
  try {
    if (!req.is_user_exist) {
      return res.status(403).json({ error: "Access denied. User does not exist." });
    }
    const { testId, answers } = req.body;
    const userId = req.user.id; // From middleware after token verification
    console.log("User ID:", userId);

    const test = await AllModels.Test_Model.findById(testId);
    if (!test) return res.status(404).json({ message: "Test not found" });

    const responsesToSave = [];

    for (const ans of answers) {
      const matchedQuestion = test.questions.find(
        (q) => q.questionId === ans.questionId
      );

      if (!matchedQuestion) continue; // Skip invalid questionId

      responsesToSave.push({
        userId,
        testId,
        questionId: matchedQuestion.questionId,
        questionText: matchedQuestion.questionText,
        answerText: ans.answerText,
        status: "pending",
      });
    }

    const saved = await AllModels.SubjectiveResponse_Model.insertMany(responsesToSave);

    return res.status(200).json({
      success: true,
      message: "Answers submitted successfully",
      savedResponses: saved,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to submit answers",
      error: err.message,
    });
  }
};


exports.getEvaluationFeedback = async (req, res) => {
  try {
    if (!req.is_user_exist) {
      return res.status(403).json({ error: "Access denied. User does not exist." });
    }
    const { userId } = req.params;

    // Find ALL responses for this user with status 'evaluated'
    const responses = await AllModels.SubjectiveResponse_Model.find({
      userId: userId,
      status: { $in: ['evaluated', 'flagged'] }
    }).populate('testId', 'title');

    if (!responses || responses.length === 0) {
      return res.status(404).json({ error: 'No evaluated responses found for this user' });
    }

    // Process each response and return array
    const evaluationResults = responses.map(response => {
      const finalScore = response.instructorOverride?.score ?? response.aiScore;
      const finalFeedback = response.instructorOverride?.feedback ?? response.aiFeedback;

      return {
        responseId: response._id,
        question: response.questionText,
        answer: response.answerText,
        // testId: response.testId,
        testTitle: response.testId.title,
        score: finalScore,
        feedback: finalFeedback,
        evaluatedBy: (response.instructorOverride?.score !== undefined || response.instructorOverride?.feedback !== undefined) ? 'Instructor' : 'AI',
        submittedAt: response.submittedAt,
        evaluatedAt: response.evaluatedAt
      };
    });

    res.status(200).json({
      userId: userId,
      totalEvaluatedResponses: evaluationResults.length,
      responses: evaluationResults
    });

  } catch (err) {
    console.error('Feedback retrieval error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};