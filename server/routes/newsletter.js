const router = require('express').Router();
const Newsletter = require('../models/Newsletter');
const { sendNewsletterWelcome } = require('../utils/email');

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    await Newsletter.create({ email });
    
    // Send welcome email
    await sendNewsletterWelcome(email).catch(err => console.error('Newsletter email error:', err));
    
    res.status(201).json({ success: true, message: 'Subscribed successfully!' });
  } catch (err) {
    if (err.code === 11000) {
      return res.json({ success: true, message: 'Already subscribed!' });
    }
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
