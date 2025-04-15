// controllers/DisasterController.js
const mongoose = require('mongoose')

const validCollections = [
  'cyclone_events',
  'drought_events',
  'earthquake_events',
  'flood_events',
  'forestfire_events',
]

exports.getDisasterEvents = async (req, res) => {
  const { type } = req.params

  if (!validCollections.includes(type)) {
    return res.status(400).json({ error: 'Invalid disaster type' })
  }

  try {
    const collection = mongoose.connection.collection(type)
    const events = await collection.find({}).limit(100).toArray()
    res.status(200).json(events)
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message })
  }
}
