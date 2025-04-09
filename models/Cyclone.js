const mongoose = require('mongoose');

const CycloneSchema = new mongoose.Schema({
  "DisNo.": String,
  "Historic": String,
  "Classification Key": String,
  "Disaster Group": String,
  "Disaster Subgroup": String,
  "Disaster Type": String,
  "Disaster Subtype": String,
  "External IDs": mongoose.Schema.Types.Mixed,
  "Event Name": String,
  "ISO": String,
  "Country": String,
  "Subregion": String,
  "Region": String,
  "Location": String,
  "Origin": mongoose.Schema.Types.Mixed,
  "Associated Types": String,
  "OFDA/BHA Response": String,
  "Appeal": String,
  "Declaration": String,
  "AID Contribution ('000 US$)": mongoose.Schema.Types.Mixed,
  "Magnitude": mongoose.Schema.Types.Mixed,
  "Magnitude Scale": String,
  "latitude":{
    type: Number,
    required: false // or true, if you always expect it
  },
  "longitude": {
    type: Number,
    required: false
  },
  "River Basin": mongoose.Schema.Types.Mixed,
  "Start Year": Number,
  "Start Month": Number,
  "Start Day": Number,
  "End Year": Number,
  "End Month": Number,
  "End Day": Number,
  "Total Deaths": Number,
  "No. Injured": mongoose.Schema.Types.Mixed,
  "No. Affected": mongoose.Schema.Types.Mixed,
  "No. Homeless": mongoose.Schema.Types.Mixed,
  "Total Affected": mongoose.Schema.Types.Mixed,
  "Reconstruction Costs ('000 US$)": mongoose.Schema.Types.Mixed,
  "Reconstruction Costs, Adjusted ('000 US$)": mongoose.Schema.Types.Mixed,
  "Insured Damage ('000 US$)": mongoose.Schema.Types.Mixed,
  "Insured Damage, Adjusted ('000 US$)": mongoose.Schema.Types.Mixed,
  "Total Damage ('000 US$)": mongoose.Schema.Types.Mixed,
  "Total Damage, Adjusted ('000 US$)": mongoose.Schema.Types.Mixed,
  "CPI": mongoose.Schema.Types.Mixed,
  "Admin Units": [mongoose.Schema.Types.Mixed],
  "Entry Date": String,
  "Last Update": String
}, {
  collection: 'cyclone_events',
  strict: true
});

module.exports = mongoose.model('Cyclone', CycloneSchema);
