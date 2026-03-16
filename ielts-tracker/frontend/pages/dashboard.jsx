import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BookOpen, Target, Award, Clock, Zap } from 'lucide-react';
import Layout from '../components/layout/Layout';
import MetricCard from '../components/dashboard/MetricCard';
import ProgressBar from '../components/dashboard/ProgressBar';
import WeeklyChart from '../components/dashboard/WeeklyChart';
import ActivityHeatmap from '../components/dashboard/ActivityHeatmap';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const Dashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Layout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-text-primary mb-2">
          Welcome back, John 👋
        </h1>
        <p className="text-text-muted">
          Track your IELTS preparation progress and achieve your goals
        </p>
      </motion.div>

      {/* Metric Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <MetricCard
          title="Current Band Score"
          value={75}
          unit="/100"
          trend="up"
          trendValue={12}
          icon={Award}
          color="primary"
        />
        <MetricCard
          title="Study Hours"
          value={156}
          unit="hrs"
          trend="up"
          trendValue={23}
          icon={Clock}
          color="accent"
        />
        <MetricCard
          title="Words Learned"
          value={1243}
          unit="words"
          trend="up"
          trendValue={8}
          icon={BookOpen}
          color="success"
        />
        <MetricCard
          title="Streak"
          value={18}
          unit="days"
          trend="down"
          trendValue={-2}
          icon={Zap}
          color="warning"
        />
      </motion.div>

      {/* Skill Progress */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-text-primary">
                Skill Progress
              </h2>
              <p className="text-text-muted text-sm mt-1">
                Your performance across IELTS modules
              </p>
            </div>
            <Button variant="secondary" size="sm">
              View Details
            </Button>
          </div>

          <div className="space-y-6">
            <ProgressBar label="Listening" value={78} color="primary" />
            <ProgressBar label="Reading" value={82} color="accent" />
            <ProgressBar label="Writing" value={65} color="warning" />
            <ProgressBar label="Speaking" value={72} color="success" />
          </div>
        </Card>
      </motion.div>

      {/* Charts and Activity */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
      >
        <div className="lg:col-span-2">
          <WeeklyChart />
        </div>

        {/* Quick Stats */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-text-primary mb-4">
                Today's Goals
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded accent-success bg-surface border-border"
                    />
                    <span className="text-text-primary">Reading practice</span>
                  </div>
                  <Badge variant="success" size="sm">Done</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded accent-success bg-surface border-border"
                    />
                    <span className="text-text-primary">Learn 10 words</span>
                  </div>
                  <Badge variant="warning" size="sm">5/10</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded accent-success bg-surface border-border"
                    />
                    <span className="text-text-primary">Speaking session</span>
                  </div>
                  <Badge variant="danger" size="sm">Pending</Badge>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-3">
                Next Sessions
              </h4>
              <div className="space-y-2">
                <div className="text-sm">
                  <p className="font-medium text-text-primary">Mock Test</p>
                  <p className="text-text-muted text-xs">Tomorrow at 2:00 PM</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-text-primary">Tutor Session</p>
                  <p className="text-text-muted text-xs">Thu at 4:00 PM</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Activity Heatmap */}
      <motion.div variants={itemVariants} initial="hidden" animate="visible">
        <ActivityHeatmap />
      </motion.div>
    </Layout>
  );
};

export default Dashboard;
