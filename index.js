const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const disasterRoutes = require('./routes/disaster');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// ✅ Logger middleware (good for development)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// ✅ MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
app.get('/', (req, res) => {
  res.send('🌪️ Disaster backend is live!');
});

app.use('/api/disaster', disasterRoutes);

// Optional test route
app.get('/api/stats', (req, res) => {
  res.json({ message: '📊 Stats endpoint is working!' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
