// /models/Analytics.js
const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
    id:String,
  shortId: String,
  timestamp: Date,
  ip: String,
  device: String,
  browser: String,
  os: String,
});

module.exports = mongoose.model("Analytics", analyticsSchema);
