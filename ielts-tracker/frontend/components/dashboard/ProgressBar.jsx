import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { useState } from 'react';

const ProgressBar = ({
  label,
  value,
  max = 100,
  showPercentage = true,
  color = 'primary',
  animated = true,
}) => {
  const [displayValue, setDisplayValue] = useState(animated ? 0 : value);

  useState(() => {
    if (!animated) return;

    const duration = 1500;
    const increment = value / 60;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(current);
      }
    }, duration / 60);

    return () => clearInterval(interval);
  }, [value, animated]);

  const percentage = Math.min((displayValue / max) * 100, 100);

  const colorClasses = {
    primary: 'from-primary to-primary/60',
    accent: 'from-accent to-accent/60',
    success: 'from-success to-success/60',
    warning: 'from-warning to-warning/60',
    danger: 'from-danger to-danger/60',
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-text-primary">{label}</label>
        {showPercentage && (
          <span className="text-sm font-mono text-text-muted">
            {Math.round(percentage)}%
          </span>
        )}
      </div>

      <div className="w-full h-2 bg-surface rounded-full overflow-hidden border border-border/50">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${colorClasses[color]} rounded-full`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
