import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
  Cell,
} from 'recharts';
import Card from '../ui/Card';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload[0]) {
    return (
      <div className="glass rounded-lg p-3 border border-border/50">
        <p className="text-text-primary font-mono text-sm">
          {payload[0].payload.name}
        </p>
        <p className="text-primary font-bold text-lg">
          {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export const WeeklyChart = ({ data = [], type = 'bar' }) => {
  const defaultData = [
    { name: 'Mon', value: 65, fill: '#6366f1' },
    { name: 'Tue', value: 72, fill: '#6366f1' },
    { name: 'Wed', value: 68, fill: '#8b5cf6' },
    { name: 'Thu', value: 78, fill: '#8b5cf6' },
    { name: 'Fri', value: 85, fill: '#6366f1' },
    { name: 'Sat', value: 92, fill: '#6366f1' },
    { name: 'Sun', value: 88, fill: '#8b5cf6' },
  ];

  const chartData = data.length > 0 ? data : defaultData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-text-primary">Weekly Activity</h3>
          <p className="text-text-muted text-sm mt-1">Your study pattern this week</p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          {type === 'bar' ? (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                radius={[8, 8, 0, 0]}
                animationDuration={1000}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill || '#6366f1'} />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                fill="url(#colorGradient)"
                strokeWidth={2}
                animationDuration={1000}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </Card>
    </motion.div>
  );
};

export default WeeklyChart;
