const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  recommend: String,
  sharedFeedback: String,
  suggestion: String,
  satisfaction: Number,
  fullName: String,
  email: String,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
