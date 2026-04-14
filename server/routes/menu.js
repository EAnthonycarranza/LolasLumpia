const router = require('express').Router();
const MenuItem = require('../models/MenuItem');

router.get('/', async (req, res) => {
  try {
    // Only return items that are available AND in the lumpia category with Pork flavor
    const items = await MenuItem.find({ category: 'lumpia', available: true, flavor: 'Pork' });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item || item.category !== 'lumpia') {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
