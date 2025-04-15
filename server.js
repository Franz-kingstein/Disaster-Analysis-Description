const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// ✅ Import route files
const disasterRoutes = require('./routes/disaster');  // 👈 Add this

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Middleware
app.use(cors({
  origin: '*', // Frontend URL
  credentials: true
}));
app.use(express.json());

// ✅ Optional: Log incoming requests
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// ✅ MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// ✅ Root Route
app.get('/', (req, res) => {
  res.send('🌪️ Cyclone backend is up and running!');
});

// ✅ API Routes
app.use('/api/disasters', disasterRoutes); // ✅ plural
// ✅ Test Stats Endpoint
app.get('/api/stats', (req, res) => {
  res.json({ message: '📊 Stats endpoint is working!' });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
