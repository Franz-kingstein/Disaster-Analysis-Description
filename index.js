const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 15000, // wait max 15s
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Base route
app.get('/', (req, res) => {
  res.send('🌪️ Cyclone backend running ...');
});

// Stats route
app.get('/api/stats', (req, res) => {
  res.json({ message: '📊 Stats endpoint is working!' });
});

// Cyclone routes
app.use('/api/cyclone', require('./routes/cyclone')); // ✅ You missed this before!

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
