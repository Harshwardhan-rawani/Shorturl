const express = require("express");
const router = express.Router();
const ShortLink = require("../model/Shorturl");
const jwt = require('jsonwebtoken');

const generateRandomAlias = () => {
  return Math.random().toString(36).substring(2, 8);
};

router.post("/create-short-link", async (req, res) => {
  const { longUrl, customAlias, expirationDate } = req.body;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];


  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!longUrl) {
    return res.status(400).json({ error: "Long URL is required" });
  }

  try {
    const alias = customAlias || generateRandomAlias();
    const shortUrl = `${process.env.VITE_URL}/redirect/${alias}`;

    // Check if alias is already taken
    const existing = await ShortLink.findOne({ alias });
    if (existing) {
      return res.status(400).json({ error: "Alias already exists. Try another." });
    }

    const newShortLink = new ShortLink({
      id:decoded.userId,
      longUrl,
      shortUrl,
      alias,
      creationDate: new Date().toISOString().split("T")[0],
      expirationDate: expirationDate || null,
      clicks: 0,
      status: "Active"
    });

    await newShortLink.save();

    res.json({ shortUrl });
  } catch (error) {
    console.error("Error creating short link:", error);
    res.status(500).json({ error: "Server Error" });
  }
});


router.get("/create-short-link", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if token is present and valid
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const data = await ShortLink.find({ id: decoded.userId }).lean();

   
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No short links found for this user" });
    }

    // Respond with the short link data
    return res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});




module.exports = router;
