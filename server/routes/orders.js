const router = require('express').Router();
const axios = require('axios');
const Order = require('../models/Order');
const { sendOrderEmails } = require('../utils/email');

router.post('/', async (req, res) => {
  try {
    const { captchaToken, ...orderData } = req.body;

    // Verify reCAPTCHA
    const recaptchaRes = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY || '6LeIN6UsAAAAAFrackdk2_k4P4XB1TmqrwcXKYqY'}&response=${captchaToken}`
    );

    if (!recaptchaRes.data.success) {
      return res.status(400).json({ error: 'reCAPTCHA verification failed' });
    }

    const order = await Order.create(orderData);
    
    // Send emails
    await sendOrderEmails(orderData).catch(err => console.error('Order email error:', err));
    
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
