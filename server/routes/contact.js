const router = require('express').Router();
const Contact = require('../models/Contact');
const { sendContactEmails } = require('../utils/email');

router.post('/', async (req, res) => {
  try {
    const contactData = req.body;
    const message = await Contact.create(contactData);
    
    // Send emails
    await sendContactEmails(contactData).catch(err => console.error('Email error:', err));
    
    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
