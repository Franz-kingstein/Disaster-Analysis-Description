const express = require('express');
const router = express.Router();
const Cyclone = require('../models/Cyclone');

router.get('/', async (req, res) => {
  try {
    const year = parseInt(req.query.year);
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);

    const query = year ? { "Start Year": year } : {};

    const rawEvents = await Cyclone.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const events = rawEvents.map(event => ({
      id: event._id,
      name: event["Event Name"] || "Unnamed Cyclone",
      location: event["Location"] || "N/A",
      country: event["Country"] || "N/A",
      disasterType: event["Disaster Type"] || "N/A",
      disasterSubtype: event["Disaster Subtype"] || "N/A",
      magnitude: event["Magnitude"] || "N/A",
      affected: event["Total Affected"] || "N/A",
      deaths: event["Total Deaths"] || "N/A",
      date: event.date || (
        event["Start Year"] && event["Start Month"] && event["Start Day"]
          ? `${event["Start Day"]}-${event["Start Month"]}-${event["Start Year"]}`
          : "Date Not Available"
      ),
      lastUpdated: event.lastUpdated || event["Last Update"] || "Unknown",
      latitude: event["Latitude"] !== undefined ? parseFloat(event["Latitude"]) : null,
      longitude: event["Longitude"] !== undefined ? parseFloat(event["Longitude"]) : null
    }));

    res.json(events);
  } catch (error) {
    console.error(' Error fetching cyclone events:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
