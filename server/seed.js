const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const MenuItem = require('./models/MenuItem');
const Settings = require('./models/Settings');
const Admin = require('./models/Admin');

const menuItems = [
  { 
    name: 'Appetizer Order', 
    description: '5 to 6 pieces. Perfect for individual diners or small tables.', 
    price: 7.50, 
    category: 'lumpia', 
    emoji: '🥟', 
    bgColor: '#d4a574' 
  },
  { 
    name: 'Small Party Tray', 
    description: '25 pieces. Ideal for small family gatherings and potlucks.', 
    price: 30.00, 
    category: 'lumpia', 
    emoji: '🍱', 
    bgColor: '#c49a6c' 
  },
  { 
    name: 'Large Party Tray', 
    description: '50 pieces. Great for parties, catering events, and holidays.', 
    price: 55.00, 
    category: 'lumpia', 
    emoji: '🎉', 
    bgColor: '#b89a7a' 
  },
  { 
    name: 'Event Tray', 
    description: '100 pieces. Best for large-scale catering.', 
    price: 95.00, 
    category: 'lumpia', 
    emoji: '🏢', 
    bgColor: '#a08a70' 
  },
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
