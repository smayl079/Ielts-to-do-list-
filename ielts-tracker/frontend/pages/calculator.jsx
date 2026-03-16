import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import ScoreCalculator from '../components/calculator/ScoreCalculator';

const CalculatorPage = () => {
  return (
    <Layout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-text-primary mb-2">
          IELTS Band Score Calculator
        </h1>
        <p className="text-text-muted">
          Calculate your predicted IELTS band score based on your module performance
        </p>
      </motion.div>

      {/* Calculator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ScoreCalculator />
      </motion.div>

      {/* Information cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-bold text-text-primary mb-3">
            How Scores Are Calculated
          </h3>
          <p className="text-text-muted text-sm leading-relaxed">
            The overall band score is calculated as the average of your four module scores
            (Listening, Reading, Writing, and Speaking). Each module is scored from 0-9.
          </p>
        </div>

        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-bold text-text-primary mb-3">
            Score Interpretation
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">7.0-9.0:</span>
              <span className="text-success font-medium">Highly Competent</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">5.0-6.5:</span>
              <span className="text-warning font-medium">Moderate</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Below 5.0:</span>
              <span className="text-danger font-medium">Limited</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default CalculatorPage;
