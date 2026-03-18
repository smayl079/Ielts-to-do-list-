const mongoose = require("mongoose");

const vocabularySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  word: {
    type: String,
    required: true,
    trim: true,
  },
  meaning: {
    type: String,
    required: true,
    trim: true,
  },
  example_sentence: {
    type: String,
    default: "",
    trim: true,
  },
  synonyms: {
    type: [String],
    default: [],
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "medium",
  },
  learned: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

vocabularySchema.index({ user_id: 1, word: 1 });

module.exports = mongoose.model("Vocabulary", vocabularySchema);
