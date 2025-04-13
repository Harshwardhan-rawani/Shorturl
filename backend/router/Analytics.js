const express = require("express");
const router = express.Router();
const Url = require("../model/Shorturl");
const Analytics = require("../model/Analytics");

const { getClientInfo } = require("../utils/getClientInfo");
const jwt = require("jsonwebtoken");

router.get("/redirect/:shortId", async (req, res) => {
    try {
      const { shortId } = req.params;
      const urlDoc = await Url.findOne({ alias: shortId });
      const data = urlDoc
      if (!urlDoc) {
        return res.status(404).json({ status: "error", message: "URL not found" });
      }
  
      const now = new Date();
      if (urlDoc.expirationDate && now > new Date(urlDoc.expirationDate)) {
        if (urlDoc.status !== "Expired") {
          urlDoc.status = "Expired";
          await urlDoc.save();
        }
        return res.status(410).json({ status: "error", message: "This short link has expired." });
      }
  
      const clientInfo = getClientInfo(req);
  
      const recentClick = await Analytics.findOne({
        shortId,
        ip: req.ip,
        timestamp: { $gt: new Date(Date.now() - 5000) } // 5 seconds window
      });
  
      if (!recentClick) {
        urlDoc.clicks += 1;
        await urlDoc.save();

        const logEntry = new Analytics({
          id: data.id,  
          shortId,
          timestamp: new Date(),
          ip: req.ip,
          ...clientInfo,
        });
  
        await logEntry.save();
      }
  
      res.json({ status: "success", originalUrl: urlDoc.longUrl });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  });

  router.get("/analytic", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
      }
  
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      if (!decoded || !decoded.userId) {
        return res.status(401).json({ message: "Invalid token" });
      }
  
      const data = await Analytics.find({ id: decoded.userId })
  
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "No analytics data found for this user" });
      }
  
      const deviceCounts = data.reduce(
        (acc, row) => {
          const device = row.device?.toLowerCase(); // Ensure case-insensitive
  
          if (device === "mobile") {
            acc.mobile += 1;
          } else if (device === "tablet") {
            acc.tablet += 1;
          } else if (device === "desktop") {
            acc.desktop += 1;
          }
  
          return acc;
        },
        { mobile: 0, tablet: 0, desktop: 0 } // Default initial values
      );
   
      return res.json({ data: deviceCounts });
    } catch (err) {
      console.error("Error in /analytic:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

module.exports = router;
