const mongoose = require("mongoose");

function normalizeDate(value) {
  const date = new Date(value || Date.now());
  date.setHours(0, 0, 0, 0);
  return date;
}

const studyProgressSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
    set: normalizeDate,
  },
  listening: {
    type: Number,
    default: 0,
    min: 0,
  },
  reading: {
    type: Number,
    default: 0,
    min: 0,
  },
  writing: {
    type: Number,
    default: 0,
    min: 0,
  },
  speaking_minutes: {
    type: Number,
    default: 0,
    min: 0,
  },
  vocabulary_count: {
    type: Number,
    default: 0,
    min: 0,
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 500,
    default: "",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

studyProgressSchema.index({ user_id: 1, date: -1 });
studyProgressSchema.index({ user_id: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("StudyProgress", studyProgressSchema);
