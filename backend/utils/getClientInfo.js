// /utils/getClientInfo.js
const UAParser = require("ua-parser-js");

exports.getClientInfo = (req) => {
  const ua = UAParser(req.headers["user-agent"] || "");
  return {
    device: ua.device.type || "desktop",
    browser: ua.browser.name || "unknown",
    os: ua.os.name || "unknown",
  };
};
