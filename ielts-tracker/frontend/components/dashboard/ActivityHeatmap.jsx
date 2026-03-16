import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { useState } from 'react';

const ActivityHeatmap = () => {
  const [hoveredCell, setHoveredCell] = useState(null);

  // Generate 52 weeks of data (1 year)
  const generateHeatmapData = () => {
    const data = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 365);

    let currentWeek = [];
    for (let i = 0; i < 365; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dayOfWeek = date.getDay();

      // Random activity level (0-4)
      const level = Math.floor(Math.random() * 5);

      currentWeek.push({
        date: date.toISOString().split('T')[0],
        dayOfWeek,
        level,
        count: level * 15,
      });

      if (dayOfWeek === 6 || i === 364) {
        data.push([...currentWeek]);
        currentWeek = [];
      }
    }

    return data;
  };

  const heatmapData = generateHeatmapData();

  const getLevelColor = (level) => {
    switch (level) {
      case 0:
        return 'bg-border/30';
      case 1:
        return 'bg-success/30';
      case 2:
        return 'bg-success/50';
      case 3:
        return 'bg-success/70';
      case 4:
        return 'bg-success';
      default:
        return 'bg-border/30';
    }
  };

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-text-primary">Activity Heatmap</h3>
          <p className="text-text-muted text-sm mt-1">52 weeks of learning activity</p>
        </div>

        {/* Heatmap Container */}
        <div className="overflow-x-auto">
          <div className="inline-flex gap-0.5 p-2">
            {/* Day labels */}
            <div className="flex flex-col gap-0.5 mr-2">
              {dayLabels.map((day) => (
                <div
                  key={day}
                  className="w-8 h-8 flex items-center justify-center text-xs text-text-muted font-medium"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Weeks */}
            <div className="flex gap-0.5">
              {heatmapData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-0.5">
                  {week.map((day, dayIndex) => (
                    <motion.div
                      key={`${weekIndex}-${dayIndex}`}
                      whileHover={{ scale: 1.2 }}
                      onMouseEnter={() =>
                        setHoveredCell({
                          date: day.date,
                          count: day.count,
                        })
                      }
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`w-3 h-3 rounded-sm cursor-pointer transition-all ${getLevelColor(
                        day.level
                      )} ${
                        hoveredCell?.date === day.date ? 'ring-2 ring-text-primary' : ''
                      }`}
                      title={`${day.date}: ${day.count} minutes`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-text-muted">Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`}
                />
              ))}
            </div>
            <span className="text-text-muted">More</span>
          </div>

          {hoveredCell && (
            <div className="text-text-primary font-medium">
              {hoveredCell.count} minutes on {hoveredCell.date}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ActivityHeatmap;
