const router = require('express').Router();
const MenuItem = require('../models/MenuItem');

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category, available: true } : { available: true };
    const items = await MenuItem.find(filter);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
