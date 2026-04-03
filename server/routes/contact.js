const router = require('express').Router();
const axios = require('axios');
const Contact = require('../models/Contact');
const { sendContactEmails } = require('../utils/email');

router.post('/', async (req, res) => {
  try {
    const { captchaToken, ...contactData } = req.body;

    // Verify reCAPTCHA
    const recaptchaRes = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=6LeIN6UsAAAAAFrackdk2_k4P4XB1TmqrwcXKYqY&response=${captchaToken}`
    );

    if (!recaptchaRes.data.success) {
      return res.status(400).json({ error: 'reCAPTCHA verification failed' });
    }

    const message = await Contact.create(contactData);
    
    // Send emails
    await sendContactEmails(contactData).catch(err => console.error('Email error:', err));
    
    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
