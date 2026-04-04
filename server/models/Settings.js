const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  businessName: { type: String, default: "Lola's Lumpia" },
  tagline: { type: String, default: 'Authentic Filipino Lumpia, From Lola\'s Kitchen to Yours.' },
  location: { type: String, default: 'San Antonio, TX' },
  phone: { type: String, default: '(210) 555-LOLA' },
  email: { type: String, default: 'hello@lolaslumpia.com' },
  hours: {
    type: Map,
    of: String,
    default: {
      'Tuesday - Saturday': '10am - 7pm',
      'Sunday': '11am - 5pm',
      'Monday': 'Closed'
    }
  },
  aboutTitle: { type: String, default: 'MEET Lola - EMMA LONG' },
  aboutText: { type: String, default: "Emma Long has been perfecting her family's lumpia recipe for over thirty years. Her secret is patience and the freshest local ingredients. Every lumpia is hand-rolled and cooked with the same love she has for her grandchildren. At Lola's Lumpia — named for Emma, the cherished 'Lola' (grandmother) of our family — we believe food is more than sustenance — it's a way to share love, culture, and tradition. Every bite of our lumpia carries the warmth of Filipino hospitality and the rich flavors of authentic home cooking." },
  heroHeading: { type: String, default: "AUTHENTIC FILIPINO LUMPIA,\nFROM LOLA'S KITCHEN TO YOURS." },
  socialFacebook: { type: String, default: '#' },
  socialInstagram: { type: String, default: '#' },
  socialYoutube: { type: String, default: '#' }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
