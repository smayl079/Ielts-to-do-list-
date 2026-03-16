import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import ChatInterface from '../components/ai/ChatInterface';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { Lightbulb, MessageSquare, Clock, Zap } from 'lucide-react';

const AIPage = () => {
  return (
    <Layout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-text-primary mb-2">
          AI Study Assistant
        </h1>
        <p className="text-text-muted">
          Get personalized guidance for your IELTS preparation
        </p>
      </motion.div>

      {/* Main Chat and Sidebar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-4 gap-6"
      >
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="overflow-hidden">
            <ChatInterface />
          </Card>
        </div>

        {/* Features Sidebar */}
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-text-primary mb-4">
              AI Features
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <Zap className="flex-shrink-0 text-primary" size={20} />
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Quick Tips
                  </p>
                  <p className="text-xs text-text-muted">
                    Instant advice for improvement
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <MessageSquare className="flex-shrink-0 text-accent" size={20} />
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Q&A Sessions
                  </p>
                  <p className="text-xs text-text-muted">
                    Ask and get detailed answers
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Lightbulb className="flex-shrink-0 text-warning" size={20} />
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Study Plans
                  </p>
                  <p className="text-xs text-text-muted">
                    Personalized learning paths
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="flex-shrink-0 text-success" size={20} />
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    24/7 Available
                  </p>
                  <p className="text-xs text-text-muted">
                    Always ready to help
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-text-primary mb-4">
              Quick Notes
            </h3>
            <div className="space-y-2 text-sm">
              <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-primary font-medium">Pro Tip</p>
                <p className="text-text-muted text-xs mt-1">
                  Practice writing essays daily to improve fluency
                </p>
              </div>

              <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                <p className="text-accent font-medium">Today's Focus</p>
                <p className="text-text-muted text-xs mt-1">
                  Work on reading comprehension strategies
                </p>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </Layout>
  );
};

export default AIPage;
