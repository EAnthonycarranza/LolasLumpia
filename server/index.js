const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('CRITICAL: MONGODB_URI is not defined in environment variables!');
} else {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
}

// Routes
app.use('/api/menu', require('./routes/menu'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/newsletter', require('./routes/newsletter'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/admin', require('./routes/admin'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../client/dist');
  
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      const indexPath = path.resolve(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Frontend build (index.html) not found. Please run build script.');
      }
    });
  } else {
    console.warn('WARNING: client/dist directory not found. Static files will not be served.');
  }
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
