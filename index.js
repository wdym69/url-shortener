const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/urlRoutes");
const staticRouter = require("./routes/staticRoutes");
const URL = require("./models/urlModel");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8001;

connectToMongoDB(process.env.MONGODB_URI)
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log("mongodb error:", err));

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", staticRouter);
app.use("/api/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );
    if (!entry) {
      return res.status(404).json({ error: "URL does not exist" });
    }
    res.redirect(entry.redirectURL);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
