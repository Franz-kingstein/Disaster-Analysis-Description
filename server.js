const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (✅ cleaned options)
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error("❌ MongoDB error:", err));

// ➕ Root route
app.get('/', (req, res) => {
  res.send('🌪️ Cyclone backend is up and running!');
});

// Mount cyclone routes
app.use('/api/cyclone', require('./routes/cyclone'));

// Stats endpoint
app.get('/api/stats', (req, res) => {
  res.json({ message: '📊 Stats endpoint is working!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
