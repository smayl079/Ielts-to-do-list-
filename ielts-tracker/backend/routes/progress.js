const express = require("express");
const StudyProgress = require("../models/StudyProgress");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);

router.post("/add", async (req, res) => {
  try {
    const {
      date,
      listening = 0,
      reading = 0,
      writing = 0,
      speaking_minutes = 0,
      vocabulary_count = 0,
    } = req.body;

    const safeValues = {
      listening: Math.max(0, Number(listening) || 0),
      reading: Math.max(0, Number(reading) || 0),
      writing: Math.max(0, Number(writing) || 0),
      speaking_minutes: Math.max(0, Number(speaking_minutes) || 0),
      vocabulary_count: Math.max(0, Number(vocabulary_count) || 0),
    };

    const progressDate = new Date(date || Date.now());
    progressDate.setHours(0, 0, 0, 0);

    const progress = await StudyProgress.findOneAndUpdate(
      { user_id: req.user.id, date: progressDate },
      {
        user_id: req.user.id,
        date: progressDate,
        ...safeValues,
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(201).json(progress);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Failed to save progress" });
  }
});

router.get("/history", async (req, res) => {
  try {
    const history = await StudyProgress.find({ user_id: req.user.id }).sort({ date: 1 });
    return res.json(history);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Failed to fetch history" });
  }
});

module.exports = router;
