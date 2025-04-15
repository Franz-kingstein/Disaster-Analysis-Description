const express = require('express');
const router = express.Router();
const getDisasterModel = require('../models/Cyclone'); // This function should return a dynamic Mongoose model

const disasterCollections = {
  cyclone: 'cyclone_events',
  earthquake: 'earthquake_events',
  flood: 'flood_events',
  drought: 'drought_events',
  forestfire: 'forestfire_events' // ✅ Add this
};


// Default root response
router.get('/', (req, res, next) => {
  if (!req.query.type) {
    return res.status(200).json({ message: '🛰️ Disaster API is live. Use ?type=&year=' });
  }
  next();
});

// Main disaster data handler
router.get('/', async (req, res) => {
  try {
    const year = parseInt(req.query.year);
    const disasterType = req.query.type?.toLowerCase();
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);

    if (!disasterType || !disasterCollections[disasterType]) {
      return res.status(400).json({ message: 'Invalid or missing disaster type' });
    }

    const collectionName = disasterCollections[disasterType];
    const DisasterModel = getDisasterModel(collectionName);

    const query = year ? { "Start Year": year } : {};

    const rawEvents = await DisasterModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const events = rawEvents.map(event => ({
      id: event._id,
      name: event["Event Name"] || event["Disaster Subtype"] || "Unnamed Event",
      location: event["Location"] || "N/A",
      country: event["Country"] || "N/A",
      disasterType: event["Disaster Type"] || "N/A",
      disasterSubtype: event["Disaster Subtype"] || "N/A",
      magnitude: event["Magnitude"] || "N/A",
      deaths: isNaN(parseInt(event["Total Deaths"])) ? 0 : parseInt(event["Total Deaths"]),
      affected: isNaN(parseInt(event["Total Affected"])) ? 0 : parseInt(event["Total Affected"]),
      date: event.date || (
        event["Start Year"] && event["Start Month"] && event["Start Day"]
          ? `${event["Start Day"]}-${event["Start Month"]}-${event["Start Year"]}`
          : "Date Not Available"
      ),
      lastUpdated: event.lastUpdated || event["Last Update"] || "Unknown",
      latitude: event["Latitude"] ?? event["latitude"] ?? null,
      longitude: event["Longitude"] ?? event["longitude"] ?? null
    }));

    res.json(events);
  } catch (error) {
    console.error('Error fetching disaster events:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
