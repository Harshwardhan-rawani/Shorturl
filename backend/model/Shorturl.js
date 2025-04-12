// /models/ShortLink.js
const mongoose = require("mongoose");

const shortLinkSchema = new mongoose.Schema({
  id :  { type: String, required: true },
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  alias: { type: String, required: true },
  creationDate : { type: String, required: true },
  expirationDate: { type: Date, default: null },
  clicks : {type:Number , default : 0},
  status : { type: String, required: true }
});

module.exports = mongoose.model("ShortLink", shortLinkSchema);
