// models/SubjectiveResponse.js
const mongoose = require('mongoose');

const subjectiveResponseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true
  },

  questionId: {
    type: String, 
    required: true
  },

  questionText: {
    type: String,
    required: true
  },

  answerText: {
    type: String,
    required: true
  },

  // AI-generated evaluation
  aiScore: Number,           // 0–10
  aiFeedback: String,
  keyPointsMatched: [String],
  grammarRating: Number,     // optional 0–5

  // Instructor manual override
  instructorOverride: {
    score: Number,
    feedback: String
  },

  // Status
  status: {
    type: String,
    enum: ['pending', 'evaluated', 'flagged'],
    default: 'pending'
  },

  submittedAt: {
    type: Date,
    default: Date.now
  },

  evaluatedAt: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('SubjectiveResponse', subjectiveResponseSchema);
