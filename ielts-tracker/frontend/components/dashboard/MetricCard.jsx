import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import Card from '../ui/Card';
import { useState, useEffect } from 'react';

const MetricCard = ({
  title,
  value,
  unit,
  trend,
  trendValue,
  icon: Icon,
  color = 'primary',
  animated = true,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!animated) {
      setDisplayValue(value);
      return;
    }

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [value, animated]);

  const colorClasses = {
    primary: 'from-primary to-primary/60',
    accent: 'from-accent to-accent/60',
    success: 'from-success to-success/60',
    warning: 'from-warning to-warning/60',
    danger: 'from-danger to-danger/60',
  };

  const trendColor = trend === 'up' ? 'text-success' : 'text-danger';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      <Card className="p-6 relative overflow-hidden group">
        {/* Background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-text-muted text-sm font-medium">{title}</p>
              <div className="flex items-baseline gap-2 mt-2">
                <h3 className="text-4xl font-bold text-text-primary font-mono">
                  {displayValue}
                </h3>
                {unit && <span className="text-text-muted text-sm">{unit}</span>}
              </div>
            </div>

            {Icon && (
              <div
                className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]} group-hover:shadow-glow transition-all duration-300`}
              >
                <Icon size={24} className="text-white opacity-90" />
              </div>
            )}
          </div>

          {/* Trend */}
          {trendValue && (
            <div className="flex items-center gap-1 mt-4">
              {trend === 'up' ? (
                <ArrowUp size={16} className={trendColor} />
              ) : (
                <ArrowDown size={16} className={trendColor} />
              )}
              <span className={`text-sm font-medium ${trendColor}`}>
                {trendValue}% than last week
              </span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default MetricCard;
