const router = require('express').Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  try {
    const message = await Contact.create(req.body);
    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
