const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// POST /api/feedback
router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ msg: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Feedback save error:', error);
    res.status(500).json({ msg: 'Server error while saving feedback' });
  }
});

module.exports = router;
