require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//model


const authRoutes = require("./router/Auth");
const shorturl = require("./router/Shorturl");
const analytics = require("./router/Analytics")
const app = express();


app.use(cors({
    origin: process.env.F_URL, 
    credentials: true
  }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB", error));

app.use("/api/auth", authRoutes);
app.use("/api", shorturl);
app.use("/api", analytics);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
