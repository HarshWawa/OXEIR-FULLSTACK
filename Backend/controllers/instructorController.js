const AllModels = require("../all_models");
// import Groq from "groq-sdk";
const Groq = require("groq-sdk");

exports.createTest = async (req, res) => {
	try {
		// Validate instructor exists
        console.log("Creating test with user:", req.user);
		// if (!req.user.role !== "instructor") {
		// 	return res.status(403).json({ error: "Access denied. Not an instructor." });
		// }

		const userId = req.user.userID;
		const { title, description, questions } = req.body;

		// Basic validation
		if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
			return res.status(400).json({ error: "Title and at least one question is required." });
		}

		// Construct test data
		const test = await AllModels.Test_Model.create({
			title,
			description,
			questions: questions.map(q => ({
				questionId: new Date().getTime().toString() + Math.random().toString(36).substring(2, 8), // Custom ID
				questionText: q.questionText
			})),
			// createdBy: userId, // Optional: if you add createdBy in schema
		});

		return res.status(201).json({
			notifications: req.notifications,
			data: test,
			message: "Test created successfully.",
		});
	} catch (error) {
		console.error("Error creating test:", error);
		return res.status(500).json({ error: "Internal server error." });
	}
};

// DELETE /userApp/:testId
exports.deleteTest = async (req, res) => {
  const { testId } = req.params;

  try {
    const deletedTest = await AllModels.Test_Model.findByIdAndDelete(testId);

    if (!deletedTest) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json({ message: "Test deleted successfully", deletedTest });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete test", error: error.message });
  }
};


exports.getTestWithQuestions = async (req, res) => {
  const testId  = req.params;

  try {
    const test = await AllModels.Test_Model.findById(testId).populate("questions");

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json({ test });
  } catch (err) {
    res.status(500).json({ message: "Error fetching test", error: err.message });
  }
};


exports.getAllTests = async (req, res) => {
  try {
    const tests = await AllModels.Test_Model.find().populate("questions");

    res.status(200).json({ message: "All tests fetched successfully", tests });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tests", error: error.message });
  }
};


// // controllers/userTestController.ts
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.evaluateUserTest = async (req, res) => {
try {
    
    const { testId,userId } = req.params;

    if (!userId || !testId) {
      return res.status(400).json({ error: "Missing userId or testId" });
    }

    const userAnswers = await AllModels.SubjectiveResponse_Model.find({ userId, testId });

    if (!userAnswers || userAnswers.length === 0) {
      return res.status(404).json({ message: "No answers found for this test." });
    }

    const updatedAnswers = await Promise.all(
      userAnswers.map(async (answerDoc) => {
        const question = answerDoc.questionText;
        const userAnswer = answerDoc.answerText;

        const prompt = `
You are an AI grader. Please evaluate the following subjective answer.

Question: ${question}

Answer: ${userAnswer}

Respond ONLY in this JSON format:
{
  "aiScore": number (between 0 and 10),
  "aiFeedback": "brief and constructive feedback"
}
        `.trim();

        try {
          const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant", // You can also use: llama-3.1-8b-instant
            messages: [{ role: "user", content: prompt }],
          });

          const content = completion.choices[0]?.message?.content;

          let aiEval = {};
          try {
            aiEval = JSON.parse(content);
          } catch (err) {
            console.error("❌ Failed to parse AI response", content);
            aiEval = {
              aiScore: 0,
              aiFeedback: "AI response format invalid. Please review manually.",
            };
          }

          // Update document
          answerDoc.aiScore = aiEval.aiScore || 0;
          answerDoc.aiFeedback = aiEval.aiFeedback || "No feedback";
          answerDoc.status = "evaluated";
          answerDoc.evaluatedAt = new Date();
          await answerDoc.save();

          return answerDoc;
        } catch (error) {
          console.error("❌ Groq API error:", error.message);
          return {
            ...answerDoc.toObject(),
            aiScore: 0,
            aiFeedback: "Evaluation failed. Try again later.",
          };
        }
      })
    );

    res.status(200).json({
      message: "AI evaluation complete",
      evaluatedAnswers: updatedAnswers,
    });
  } catch (error) {
    console.error("❌ Error in evaluation controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


// const SubjectiveResponse = require('../models/SubjectiveResponse');

exports.overrideEvaluation = async (req, res) => {
  try {
    const { responseId } = req.params;
    const { score, feedback } = req.body;

    const response = await AllModels.SubjectiveResponse_Model.findById(responseId);

    if (!response) {
      return res.status(404).json({ error: 'Response not found' });
    }

    response.instructorOverride = {
      score,
      feedback
    };
    response.status = 'flagged'; // Mark as manually reviewed
    response.evaluatedAt = new Date();

    await response.save();

    res.status(200).json({ message: 'Evaluation overridden successfully', response });
  } catch (err) {
    console.error('Override error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.viewPendingResponses = async (req, res) => {
  try {
    const responses = await AllModels.SubjectiveResponse_Model.find()
      .populate('userId', 'name email')
      .populate('testId', 'title description')
      .sort({ submittedAt: -1 });

    if (!responses || responses.length === 0) {
      return res.status(404).json({ message: "No pending responses found." });
    }

    res.status(200).json({ 
      message: "Pending responses fetched successfully", 
      totalPendingResponses: responses.length,
      responses
    });

  } catch (error) {
    console.error("Error fetching pending responses:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};