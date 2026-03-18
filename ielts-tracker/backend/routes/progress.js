const express = require("express");
const { body, param } = require("express-validator");
const {
  upsertProgress,
  getProgressHistory,
  getProgressStats,
  deleteProgressEntry,
} = require("../controllers/progressController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

const progressValidators = [
  body("date").optional().isISO8601().withMessage("Date must be a valid ISO date"),
  body("listening")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Listening value must be at least 0"),
  body("reading")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Reading value must be at least 0"),
  body("writing")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Writing value must be at least 0"),
  body("speaking_minutes")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Speaking minutes must be at least 0"),
  body("vocabulary_count")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Vocabulary count must be at least 0"),
  body("notes")
    .optional()
    .isString()
    .isLength({ max: 500 })
    .withMessage("Notes must be at most 500 characters"),
];

router.post("/", progressValidators, upsertProgress);
router.put("/", progressValidators, upsertProgress);

// Backward-compatible aliases
router.post("/add", progressValidators, upsertProgress);
router.get("/history", getProgressHistory);

router.get("/", getProgressHistory);
router.get("/stats", getProgressStats);

router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid progress entry id")],
  deleteProgressEntry
);

module.exports = router;
