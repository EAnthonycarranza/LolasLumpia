const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const MenuItem = require('./models/MenuItem');
const Settings = require('./models/Settings');
const Admin = require('./models/Admin');

const menuItems = [
  { name: 'Classic Pork Lumpia', description: 'Pork, garlic, carrots, secret spices.', price: 1.00, category: 'lumpia', emoji: '🥟', bgColor: '#d4a574' },
  { name: 'Chicken Pork Lumpia', description: 'Chicken, garlic, carrots, secret spices.', price: 3.00, category: 'lumpia', emoji: '🥟', bgColor: '#c49a6c' },
  { name: 'Vegetable Lumpia', description: 'Vegetables, garlic, carrots, secret spices.', price: 3.00, category: 'lumpia', emoji: '🥬', bgColor: '#8faa6b' },
  { name: "Lola's Creation", description: 'Special creation, garlic, carrots, secret spices.', price: 2.00, category: 'lumpia', emoji: '✨', bgColor: '#b89a7a', customizable: true },
  { name: 'Banana Turon', description: 'Banana turon, brown sugar, jackfruit, crispy wrapper.', price: 3.00, category: 'lumpia', emoji: '🍌', bgColor: '#c4a050', customizable: true },
  { name: 'Spicy Seafood Lumpia', description: 'Spicy seafood, garlic, carrots, secret spices.', price: 2.00, category: 'lumpia', emoji: '🌶️', bgColor: '#c47a5a' },
  { name: 'Chicken Adobo', description: 'Soy sauce, vinegar, garlic, bay leaves, peppercorns.', price: 10.00, category: 'entree', emoji: '🍗', bgColor: '#8b5e3c' },
  { name: 'Pork Sisig', description: 'Sizzling chopped pork, onions, chili peppers, calamansi.', price: 12.00, category: 'entree', emoji: '🍖', bgColor: '#a0522d' },
  { name: 'Pancit Canton', description: 'Stir-fried noodles, vegetables, soy sauce, pork & shrimp.', price: 9.00, category: 'entree', emoji: '🍜', bgColor: '#daa520' },
  { name: 'Kare-Kare', description: 'Oxtail, tripe, peanut sauce, vegetables, bagoong.', price: 14.00, category: 'entree', emoji: '🍚', bgColor: '#e8c55a' },
  { name: 'Sinigang na Baboy', description: 'Pork ribs, tamarind broth, vegetables, tomatoes.', price: 11.00, category: 'entree', emoji: '🥘', bgColor: '#cd853f' },
  { name: 'Leche Flan', description: 'Creamy caramel custard, eggs, condensed milk, vanilla.', price: 6.00, category: 'dessert', emoji: '🧁', bgColor: '#b8860b' },
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
