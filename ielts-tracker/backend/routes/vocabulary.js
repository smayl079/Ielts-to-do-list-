const express = require("express");
const Vocabulary = require("../models/Vocabulary");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);

function normalizeSynonyms(input) {
  if (Array.isArray(input)) {
    return input.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof input === "string") {
    return input
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

router.post("/add", async (req, res) => {
  try {
    const { word, meaning, example_sentence, synonyms } = req.body;

    if (!word || !meaning || !example_sentence) {
      return res.status(400).json({ message: "Word, meaning, and example sentence are required" });
    }

    const vocab = await Vocabulary.create({
      user_id: req.user.id,
      word,
      meaning,
      example_sentence,
      synonyms: normalizeSynonyms(synonyms),
    });

    return res.status(201).json(vocab);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Failed to add vocabulary" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { q } = req.query;
    const filter = { user_id: req.user.id };

    if (q) {
      filter.$or = [
        { word: { $regex: q, $options: "i" } },
        { meaning: { $regex: q, $options: "i" } },
      ];
    }

    const words = await Vocabulary.find(filter).sort({ created_at: -1 });
    return res.json(words);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Failed to fetch vocabulary" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { word, meaning, example_sentence, synonyms } = req.body;

    const updated = await Vocabulary.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      {
        ...(word !== undefined ? { word } : {}),
        ...(meaning !== undefined ? { meaning } : {}),
        ...(example_sentence !== undefined ? { example_sentence } : {}),
        ...(synonyms !== undefined ? { synonyms: normalizeSynonyms(synonyms) } : {}),
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Vocabulary not found" });
    }

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Failed to update vocabulary" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removed = await Vocabulary.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });

    if (!removed) {
      return res.status(404).json({ message: "Vocabulary not found" });
    }

    return res.json({ message: "Vocabulary deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Failed to delete vocabulary" });
  }
});

module.exports = router;
