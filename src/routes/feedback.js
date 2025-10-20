const router = require('express').Router();
const Feedback = require('../models/Feedback');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Please log in first' });
};

// Create feedback
router.post('/', async (req, res) => {
  try {
    const { name, message } = req.body;
    const feedback = new Feedback({
      userId: req.user ? req.user._id : null,
      name,
      message
    });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error creating feedback', error: error.message });
  }
});

// Get all feedback
router.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'username');
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error: error.message });
  }
});

// Update feedback
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const { name, message } = req.body;
    const feedback = await Feedback.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { name, message, updatedAt: Date.now() },
      { new: true }
    );
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found or unauthorized' });
    }
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error updating feedback', error: error.message });
  }
});

// Delete feedback
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const feedback = await Feedback.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found or unauthorized' });
    }
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting feedback', error: error.message });
  }
});

module.exports = router;