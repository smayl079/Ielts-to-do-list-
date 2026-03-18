const { validationResult } = require("express-validator");
const StudyProgress = require("../models/StudyProgress");
const calculateBandScore = require("../utils/calculateBandScore");

const normalizeDate = (inputDate) => {
  const date = new Date(inputDate || Date.now());
  date.setHours(0, 0, 0, 0);
  return date;
};

const safeNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
};

const getSpeakingBandEstimate = (minutes) => {
  const score = safeNumber(minutes) / 10;
  if (score > 9) return 9;
  return score;
};

const validationError = (res, errors) => {
  return res.status(400).json({
    success: false,
    message: errors.array()[0].msg,
    errors: errors.array(),
  });
};

const toProgressPayload = (progressDoc) => {
  const speakingEstimate = getSpeakingBandEstimate(progressDoc.speaking_minutes);

  return {
    ...progressDoc.toObject(),
    overall_band_estimate: calculateBandScore(
      progressDoc.listening,
      progressDoc.reading,
      progressDoc.writing,
      speakingEstimate
    ),
  };
};

const upsertProgress = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationError(res, errors);
    }

    const {
      date,
      listening,
      reading,
      writing,
      speaking_minutes,
      vocabulary_count,
      notes,
    } = req.body;

    const normalizedDate = normalizeDate(date);

    const payload = {
      user_id: req.user._id,
      date: normalizedDate,
      listening: safeNumber(listening),
      reading: safeNumber(reading),
      writing: safeNumber(writing),
      speaking_minutes: safeNumber(speaking_minutes),
      vocabulary_count: safeNumber(vocabulary_count),
      notes: typeof notes === "string" ? notes.trim() : "",
    };

    const progress = await StudyProgress.findOneAndUpdate(
      { user_id: req.user._id, date: normalizedDate },
      payload,
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      data: toProgressPayload(progress),
    });
  } catch (error) {
    return next(error);
  }
};

const getProgressHistory = async (req, res, next) => {
  try {
    const { from, to, limit = 365 } = req.query;
    const query = { user_id: req.user._id };

    if (from || to) {
      query.date = {};
      if (from) {
        query.date.$gte = normalizeDate(from);
      }
      if (to) {
        query.date.$lte = normalizeDate(to);
      }
    }

    const parsedLimit = Math.min(Math.max(Number(limit) || 365, 1), 3650);

    const history = await StudyProgress.find(query)
      .sort({ date: -1 })
      .limit(parsedLimit);

    return res.status(200).json({
      success: true,
      count: history.length,
      data: history.map(toProgressPayload),
    });
  } catch (error) {
    return next(error);
  }
};

const getProgressStats = async (req, res, next) => {
  try {
    const history = await StudyProgress.find({ user_id: req.user._id }).sort({ date: -1 });

    const totals = history.reduce(
      (accumulator, entry) => {
        accumulator.listening += safeNumber(entry.listening);
        accumulator.reading += safeNumber(entry.reading);
        accumulator.writing += safeNumber(entry.writing);
        accumulator.speaking_minutes += safeNumber(entry.speaking_minutes);
        accumulator.vocabulary_count += safeNumber(entry.vocabulary_count);

        const activityScore =
          safeNumber(entry.listening) +
          safeNumber(entry.reading) +
          safeNumber(entry.writing) +
          safeNumber(entry.speaking_minutes) / 10 +
          safeNumber(entry.vocabulary_count) / 5;

        if (activityScore > 0) {
          accumulator.active_days += 1;
        }

        return accumulator;
      },
      {
        listening: 0,
        reading: 0,
        writing: 0,
        speaking_minutes: 0,
        vocabulary_count: 0,
        active_days: 0,
      }
    );

    const totalEntries = history.length;

    const averages = {
      listening: totalEntries ? totals.listening / totalEntries : 0,
      reading: totalEntries ? totals.reading / totalEntries : 0,
      writing: totalEntries ? totals.writing / totalEntries : 0,
      speaking: totalEntries ? getSpeakingBandEstimate(totals.speaking_minutes / totalEntries) : 0,
    };

    const overall_band = calculateBandScore(
      averages.listening,
      averages.reading,
      averages.writing,
      averages.speaking
    );

    return res.status(200).json({
      success: true,
      data: {
        total_entries: totalEntries,
        active_days: totals.active_days,
        totals,
        averages,
        overall_band,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const deleteProgressEntry = async (req, res, next) => {
  try {
    const deletedEntry = await StudyProgress.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user._id,
    });

    if (!deletedEntry) {
      return res.status(404).json({
        success: false,
        message: "Study progress entry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Study progress entry deleted",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  upsertProgress,
  getProgressHistory,
  getProgressStats,
  deleteProgressEntry,
};
