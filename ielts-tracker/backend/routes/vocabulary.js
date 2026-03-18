const express = require("express");
const { body, param } = require("express-validator");
const {
  createVocabularyEntry,
  getVocabularyEntries,
  updateVocabularyEntry,
  deleteVocabularyEntry,
} = require("../controllers/vocabularyController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

const createValidators = [
  body("word").trim().notEmpty().withMessage("Word is required"),
  body("meaning").trim().notEmpty().withMessage("Meaning is required"),
  body("example_sentence")
    .optional()
    .isString()
    .withMessage("Example sentence must be text"),
  body("synonyms")
    .optional()
    .custom((value) => Array.isArray(value) || typeof value === "string")
    .withMessage("Synonyms must be an array or comma-separated string"),
  body("difficulty")
    .optional()
    .isIn(["easy", "medium", "hard"])
    .withMessage("Difficulty must be easy, medium, or hard"),
  body("learned").optional().isBoolean().withMessage("Learned must be true or false"),
];

const updateValidators = [
  param("id").isMongoId().withMessage("Invalid vocabulary id"),
  body("word").optional().trim().notEmpty().withMessage("Word cannot be empty"),
  body("meaning").optional().trim().notEmpty().withMessage("Meaning cannot be empty"),
  body("example_sentence")
    .optional()
    .isString()
    .withMessage("Example sentence must be text"),
  body("synonyms")
    .optional()
    .custom((value) => Array.isArray(value) || typeof value === "string")
    .withMessage("Synonyms must be an array or comma-separated string"),
  body("difficulty")
    .optional()
    .isIn(["easy", "medium", "hard"])
    .withMessage("Difficulty must be easy, medium, or hard"),
  body("learned").optional().isBoolean().withMessage("Learned must be true or false"),
];

router.post("/", createValidators, createVocabularyEntry);

// Backward-compatible alias
router.post("/add", createValidators, createVocabularyEntry);

router.get("/", getVocabularyEntries);
router.put("/:id", updateValidators, updateVocabularyEntry);
router.delete("/:id", [param("id").isMongoId().withMessage("Invalid vocabulary id")], deleteVocabularyEntry);

module.exports = router;
