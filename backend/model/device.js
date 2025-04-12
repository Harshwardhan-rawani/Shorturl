// /models/Analytics.js
const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
    id:String,
 device : String,
 clicks : {type:Number,default : 0}
});

module.exports = mongoose.model("device", analyticsSchema);
