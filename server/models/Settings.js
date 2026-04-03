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
  aboutTitle: { type: String, default: 'MEET LOLA ELENA' },
  aboutText: { type: String, default: "Lola Elena has been perfecting her family's lumpia recipe for over fifty years. Her secret is patience and the freshest local ingredients. Every lumpia is hand-rolled and cooked with the same love she has for her grandchildren." },
  heroHeading: { type: String, default: "AUTHENTIC FILIPINO LUMPIA,\nFROM LOLA'S KITCHEN TO YOURS." },
  socialFacebook: { type: String, default: '#' },
  socialInstagram: { type: String, default: '#' },
  socialYoutube: { type: String, default: '#' }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
