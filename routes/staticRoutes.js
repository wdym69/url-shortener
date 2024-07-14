const express = require('express');
const router = express.Router();
const URL = require('../models/urlModel');

router.get('/', async (req, res) => {
  try {
    const allURLs = await URL.find({});
    return res.render('home', { allURLs });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
