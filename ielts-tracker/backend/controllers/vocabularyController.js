const { validationResult } = require("express-validator");
const Vocabulary = require("../models/Vocabulary");

const toStringArray = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const validationError = (res, errors) => {
  return res.status(400).json({
    success: false,
    message: errors.array()[0].msg,
    errors: errors.array(),
  });
};

const createVocabularyEntry = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationError(res, errors);
    }

    const { word, meaning, example_sentence, synonyms, difficulty, learned } = req.body;

    const entry = await Vocabulary.create({
      user_id: req.user._id,
      word,
      meaning,
      example_sentence,
      synonyms: toStringArray(synonyms),
      difficulty,
      learned: Boolean(learned),
    });

    return res.status(201).json({
      success: true,
      data: entry,
    });
  } catch (error) {
    return next(error);
  }
};

const getVocabularyEntries = async (req, res, next) => {
  try {
    const { q, difficulty, learned, page = 1, limit = 50 } = req.query;
    const query = { user_id: req.user._id };

    if (q) {
      query.$or = [
        { word: { $regex: q, $options: "i" } },
        { meaning: { $regex: q, $options: "i" } },
      ];
    }

    if (difficulty && ["easy", "medium", "hard"].includes(difficulty)) {
      query.difficulty = difficulty;
    }

    if (learned === "true") {
      query.learned = true;
    }

    if (learned === "false") {
      query.learned = false;
    }

    const currentPage = Math.max(Number(page) || 1, 1);
    const pageSize = Math.min(Math.max(Number(limit) || 50, 1), 200);

    const [entries, total] = await Promise.all([
      Vocabulary.find(query)
        .sort({ created_at: -1 })
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize),
      Vocabulary.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      count: entries.length,
      total,
      page: currentPage,
      pages: Math.ceil(total / pageSize) || 1,
      data: entries,
    });
  } catch (error) {
    return next(error);
  }
};

const updateVocabularyEntry = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationError(res, errors);
    }

    const { word, meaning, example_sentence, synonyms, difficulty, learned } = req.body;

    const payload = {
      ...(word !== undefined ? { word } : {}),
      ...(meaning !== undefined ? { meaning } : {}),
      ...(example_sentence !== undefined ? { example_sentence } : {}),
      ...(synonyms !== undefined ? { synonyms: toStringArray(synonyms) } : {}),
      ...(difficulty !== undefined ? { difficulty } : {}),
      ...(learned !== undefined ? { learned: Boolean(learned) } : {}),
    };

    const entry = await Vocabulary.findOneAndUpdate(
      {
        _id: req.params.id,
        user_id: req.user._id,
      },
      payload,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Vocabulary entry not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: entry,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteVocabularyEntry = async (req, res, next) => {
  try {
    const entry = await Vocabulary.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user._id,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Vocabulary entry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vocabulary entry deleted",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createVocabularyEntry,
  getVocabularyEntries,
  updateVocabularyEntry,
  deleteVocabularyEntry,
};
