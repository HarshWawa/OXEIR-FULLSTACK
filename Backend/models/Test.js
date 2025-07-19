const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [{
    questionId: String,  // You can use ObjectId if needed later
    questionText: String,
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Test', testSchema);
