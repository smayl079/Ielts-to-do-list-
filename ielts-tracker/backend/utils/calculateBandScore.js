const toScore = (value) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return 0;
  }

  if (parsed < 0) return 0;
  if (parsed > 9) return 9;
  return parsed;
};

const calculateBandScore = (listening, reading, writing, speaking) => {
  const average =
    (toScore(listening) + toScore(reading) + toScore(writing) + toScore(speaking)) / 4;

  return Math.round(average * 2) / 2;
};

module.exports = calculateBandScore;
