import { motion } from 'framer-motion';
import { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const ScoreSlider = ({
  label,
  value,
  onChange,
  min = 0,
  max = 9,
  color = 'primary',
}) => {
  const colorClasses = {
    primary: 'accent-primary',
    accent: 'accent-accent',
    success: 'accent-success',
    warning: 'accent-warning',
    danger: 'accent-danger',
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-text-primary">{label}</label>
        <motion.div
          key={value}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-2xl font-bold font-mono px-3 py-1 rounded-lg bg-${color}/20 text-${color}`}
        >
          {value}
        </motion.div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-2 bg-surface rounded-full cursor-pointer appearance-none ${colorClasses[color]} hover:opacity-80 transition-opacity`}
        style={{
          background: `linear-gradient(to right, rgb(99, 102, 241) 0%, rgb(99, 102, 241) ${
            (value / max) * 100
          }%, rgb(31, 41, 55) ${(value / max) * 100}%, rgb(31, 41, 55) 100%)`,
        }}
      />
      <div className="flex justify-between text-xs text-text-muted px-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export const ScoreCalculator = () => {
  const [scores, setScores] = useState({
    listening: 0,
    reading: 0,
    writing: 0,
    speaking: 0,
  });

  const updateScore = (skill, value) => {
    setScores((prev) => ({
      ...prev,
      [skill]: value,
    }));
  };

  const average = Math.round(
    (Object.values(scores).reduce((a, b) => a + b, 0) / 4) * 10
  ) / 10;

  const getScoreColor = (score) => {
    if (score >= 7) return 'success';
    if (score >= 5) return 'warning';
    return 'danger';
  };

  const getGrade = (score) => {
    if (score >= 9) return 'Proficient';
    if (score >= 7) return 'Highly Competent';
    if (score >= 5) return 'Moderate';
    return 'Limited';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Score Sliders */}
      <Card className="p-8 space-y-8">
        <div>
          <h3 className="text-2xl font-bold text-text-primary mb-6">
            Calculate Your Band Score
          </h3>
          <p className="text-text-muted text-sm">
            Move the sliders to see your predicted band score
          </p>
        </div>

        <ScoreSlider
          label="Listening"
          value={scores.listening}
          onChange={(val) => updateScore('listening', val)}
          color="primary"
        />
        <ScoreSlider
          label="Reading"
          value={scores.reading}
          onChange={(val) => updateScore('reading', val)}
          color="accent"
        />
        <ScoreSlider
          label="Writing"
          value={scores.writing}
          onChange={(val) => updateScore('writing', val)}
          color="warning"
        />
        <ScoreSlider
          label="Speaking"
          value={scores.speaking}
          onChange={(val) => updateScore('speaking', val)}
          color="success"
        />
      </Card>

      {/* Overall Score Display */}
      <motion.div
        layoutId="score-display"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className={`p-8 bg-gradient-to-br from-${getScoreColor(average)}/20 to-${getScoreColor(average)}/10 relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-pulse-subtle" />
          </div>

          <div className="relative z-10 text-center">
            <p className="text-text-muted text-sm uppercase tracking-wide mb-4">
              Your Overall Band Score
            </p>

            <motion.div
              key={average}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-7xl font-bold font-mono glow-${getScoreColor(
                average
              )} mb-4 text-${getScoreColor(average)}`}
            >
              {average}
            </motion.div>

            <Badge variant={getScoreColor(average)} size="lg" className="mx-auto">
              {getGrade(average)}
            </Badge>

            <div className="mt-8 grid grid-cols-4 gap-4">
              {Object.entries(scores).map(([skill, score]) => (
                <div key={skill} className="space-y-2">
                  <p className="text-text-muted text-xs uppercase font-medium">
                    {skill}
                  </p>
                  <p className="text-2xl font-bold font-mono text-text-primary">
                    {score}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Score Breakdown Chart */}
      <Card className="p-8">
        <h4 className="text-lg font-bold text-text-primary mb-6">Score Breakdown</h4>
        <div className="space-y-4">
          {Object.entries(scores).map(([skill, score]) => (
            <div key={skill} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-text-primary capitalize">
                  {skill}
                </p>
                <p className="font-mono font-bold text-primary">{score}/9</p>
              </div>
              <div className="w-full h-2 bg-surface rounded-full overflow-hidden border border-border/50">
                <motion.div
                  animate={{ width: `${(score / 9) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default ScoreCalculator;
