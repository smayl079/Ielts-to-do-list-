import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import ProgressBar from '../components/dashboard/ProgressBar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import Button from '../components/ui/Button';
import { Download } from 'lucide-react';

const ProgressPage = () => {
  const skillData = [
    { name: 'Listening', value: 78, fullMark: 100 },
    { name: 'Reading', value: 82, fullMark: 100 },
    { name: 'Writing', value: 65, fullMark: 100 },
    { name: 'Speaking', value: 72, fullMark: 100 },
    { name: 'Vocabulary', value: 88, fullMark: 100 },
  ];

  const dailyProgress = [
    { day: 'Mon', minutes: 45 },
    { day: 'Tue', minutes: 60 },
    { day: 'Wed', minutes: 30 },
    { day: 'Thu', minutes: 75 },
    { day: 'Fri', minutes: 90 },
    { day: 'Sat', minutes: 120 },
    { day: 'Sun', minutes: 60 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <Layout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-text-primary mb-2">
            Progress Tracking
          </h1>
          <p className="text-text-muted">
            Monitor your IELTS preparation journey and achievements
          </p>
        </div>
        <Button icon={Download} variant="secondary">
          Export Report
        </Button>
      </motion.div>

      {/* Overall Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
      >
        {[
          { label: 'Total Hours', value: '156', color: 'primary' },
          { label: 'Highest Score', value: '82', color: 'accent' },
          { label: 'Consistency', value: '95%', color: 'success' },
          { label: 'Avg. Daily Time', value: '1h 15m', color: 'warning' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="p-6 text-center">
              <p className="text-text-muted text-sm mb-2">{stat.label}</p>
              <p className={`text-3xl font-bold text-${stat.color}`}>
                {stat.value}
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        {/* Radar Chart - Skill Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-bold text-text-primary mb-6">
              Skill Balance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={skillData}>
                <PolarGrid stroke="#1f2937" />
                <PolarAngleAxis dataKey="name" stroke="#6b7280" />
                <PolarRadiusAxis stroke="#6b7280" />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Bar Chart - Daily Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-bold text-text-primary mb-6">
              Daily Study Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    background: '#111827',
                    border: '1px solid #1f2937',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#f9fafb' }}
                />
                <Bar
                  dataKey="minutes"
                  fill="#6366f1"
                  radius={[8, 8, 0, 0]}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </motion.div>

      {/* Detailed Progress by Skill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-bold text-text-primary mb-6">
            Skill Breakdown
          </h3>
          <div className="space-y-8">
            {skillData.map((skill, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-text-primary">{skill.name}</h4>
                  <span className="text-lg font-bold font-mono text-primary">
                    {skill.value}/100
                  </span>
                </div>
                <ProgressBar
                  value={skill.value}
                  color={
                    idx === 0
                      ? 'primary'
                      : idx === 1
                      ? 'accent'
                      : idx === 2
                      ? 'warning'
                      : idx === 3
                      ? 'success'
                      : 'primary'
                  }
                  animated={false}
                />
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Weekly Target */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10">
          <h3 className="text-lg font-bold text-text-primary mb-4">
            This Week's Goal
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-muted text-sm mb-2">Target: 500 minutes</p>
              <p className="text-3xl font-bold text-primary">380 / 500 min</p>
            </div>
            <div className="w-24 h-24 rounded-full border-8 border-border flex items-center justify-center bg-surface/50">
              <span className="text-2xl font-bold text-primary">76%</span>
            </div>
          </div>
          <ProgressBar value={76} color="primary" animated={false} showPercentage={false} />
        </Card>
      </motion.div>
    </Layout>
  );
};

export default ProgressPage;
