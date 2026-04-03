const router = require('express').Router();
const Review = require('../models/Review');
const auth = require('../middleware/auth');

// Public: get approved reviews only
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: get all reviews
router.get('/all', auth, async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Public: submit a review
router.post('/', async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json({ success: true, message: 'Review submitted for approval!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: approve/reject review
router.patch('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: delete review
router.delete('/:id', auth, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
