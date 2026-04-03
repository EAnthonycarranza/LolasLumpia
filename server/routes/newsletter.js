const router = require('express').Router();
const Newsletter = require('../models/Newsletter');

router.post('/', async (req, res) => {
  try {
    await Newsletter.create({ email: req.body.email });
    res.status(201).json({ success: true, message: 'Subscribed successfully!' });
  } catch (err) {
    if (err.code === 11000) {
      return res.json({ success: true, message: 'Already subscribed!' });
    }
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
