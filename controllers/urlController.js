const shortid = require("shortid");
const URL = require("../models/urlModel");
const { validateURL } = require("../utils/validateURL");

async function handleGenerateNewShortURL(req, res) {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }
    if (!validateURL(url)) {
      return res.status(400).json({ error: "Invalid URL format" });
    }
    const shortID = shortid();
    await URL.create({ shortId: shortID, redirectURL: url, visitHistory: [] });
    return res.json({ id: shortID });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function handleGetAnalytics(req, res) {
  try {
    const { shortId } = req.params;
    const result = await URL.findOne({ shortId });
    if (!result) {
      return res.status(404).json({ error: "URL not found" });
    }
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { handleGenerateNewShortURL, handleGetAnalytics };
