const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const MenuItem = require('./models/MenuItem');
const Settings = require('./models/Settings');
const Admin = require('./models/Admin');

const menuItems = [
  { name: 'Classic Pork Lumpia', description: 'Pork, garlic, carrots, secret spices.', price: 1.00, category: 'lumpia', emoji: '🥟', bgColor: '#d4a574' },
  { name: 'Chicken Pork Lumpia', description: 'Chicken, garlic, carrots, secret spices.', price: 3.00, category: 'lumpia', emoji: '🥟', bgColor: '#c49a6c' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Seed menu items
    await MenuItem.deleteMany({});
    const items = await MenuItem.insertMany(menuItems);
    console.log(`Seeded ${items.length} menu items`);

    // Seed default settings
    await Settings.deleteMany({});
    await Settings.create({});
    console.log('Seeded default settings');

    // Seed admin account
    await Admin.deleteMany({});
    await Admin.create({ username: 'admin', password: 'lolaslumpia2024' });
    console.log('Seeded admin account (admin / lolaslumpia2024)');

    await mongoose.disconnect();
    console.log('Done!');
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
