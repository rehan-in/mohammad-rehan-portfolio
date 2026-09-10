const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// GET /api/feedback - Retrieve all feedback entries
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ submittedAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error('Feedback fetch error:', error);
    res.status(500).json({ msg: 'Server error while fetching feedback' });
  }
});

// POST /api/feedback - Submit new feedback
router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ msg: 'Feedback submitted successfully', feedback });
  } catch (error) {
    console.error('Feedback save error:', error);
    res.status(500).json({ msg: 'Server error while saving feedback' });
  }
});

// PATCH /api/feedback/:id - Update feedback status
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!feedback) {
      return res.status(404).json({ msg: 'Feedback not found' });
    }
    res.json({ msg: 'Feedback updated successfully', feedback });
  } catch (error) {
    console.error('Feedback update error:', error);
    res.status(500).json({ msg: 'Server error while updating feedback' });
  }
});

// DELETE /api/feedback/:id - Delete single feedback
router.delete('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ msg: 'Feedback not found' });
    }
    res.json({ msg: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('Feedback delete error:', error);
    res.status(500).json({ msg: 'Server error while deleting feedback' });
  }
});

// DELETE /api/feedback - Clear all feedback
router.delete('/', async (req, res) => {
  try {
    await Feedback.deleteMany({});
    res.json({ msg: 'All feedback deleted successfully' });
  } catch (error) {
    console.error('Clear all feedback error:', error);
    res.status(500).json({ msg: 'Server error while clearing feedback' });
  }
});

module.exports = router;
