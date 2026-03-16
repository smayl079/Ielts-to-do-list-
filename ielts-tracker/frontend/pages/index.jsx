import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap, BookOpen, BarChart3, MessageSquare } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const HomePage = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed analytics and insights',
      color: 'primary',
    },
    {
      icon: BookOpen,
      title: 'Build Vocabulary',
      description: 'Master IELTS vocabulary with interactive flashcards and games',
      color: 'accent',
    },
    {
      icon: MessageSquare,
      title: 'AI Assistant',
      description: 'Get personalized guidance from our AI tutor anytime, anywhere',
      color: 'success',
    },
    {
      icon: Zap,
      title: 'Quick Practice',
      description: 'Solve practice questions and mock tests with instant feedback',
      color: 'warning',
    },
  ];

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
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
          style={{ backgroundSize: '400% 400%' }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 backdrop-blur-xl border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="gradient-bg rounded-lg p-2">
              <Zap className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold gradient-text">IELTS Tracker</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-text-primary hover:text-text-muted transition-colors"
            >
              Sign In
            </Link>
            <Link href="/auth/signup">
              <Button variant="accent">Get Started</Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-text-primary">Master IELTS</span>{' '}
            <span className="gradient-text">with AI</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-text-muted mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Your personal IELTS preparation companion. Track progress, build vocabulary,
            practice with AI, and achieve your target band score.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link href="/auth/signup">
              <Button
                variant="accent"
                size="lg"
                icon={ArrowRight}
                className="cursor-pointer"
              >
                Start Learning Now
              </Button>
            </Link>
            <Button variant="secondary" size="lg">
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Screenshot area would go here */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="rounded-2xl overflow-hidden border border-border glass p-2 mb-20"
        >
          <div className="bg-surface rounded-xl h-96 flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center"
            >
              <Zap className="text-primary mx-auto mb-4" size={48} />
              <p className="text-text-muted">Premium Dashboard Preview</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Powerful Features
          </h2>
          <p className="text-text-muted text-lg">
            Everything you need to succeed in your IELTS exam
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const colorClass = {
              primary: 'from-primary to-primary/60',
              accent: 'from-accent to-accent/60',
              success: 'from-success to-success/60',
              warning: 'from-warning to-warning/60',
            }[feature.color];

            return (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="p-6 h-full hover:shadow-lg transition-all group">
                  <div
                    className={`bg-gradient-to-br ${colorClass} rounded-lg p-4 w-fit mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-muted text-sm">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Ready to ace your IELTS?
          </h2>
          <p className="text-text-muted mb-8 max-w-xl mx-auto">
            Join thousands of students who have achieved their target scores with IELTS Tracker.
            Start your journey today.
          </p>
          <Link href="/auth/signup">
            <Button
              variant="accent"
              size="lg"
              icon={ArrowRight}
              className="cursor-pointer"
            >
              Create Free Account
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-bold text-text-primary mb-4">IELTS Tracker</p>
              <p className="text-text-muted text-sm">
                Your AI-powered IELTS preparation companion.
              </p>
            </div>
            <div>
              <p className="font-medium text-text-primary text-sm uppercase tracking-wider mb-4">
                Product
              </p>
              <ul className="space-y-2 text-text-muted text-sm">
                <li><a href="#" className="hover:text-text-primary transition">Features</a></li>
                <li><a href="#" className="hover:text-text-primary transition">Pricing</a></li>
                <li><a href="#" className="hover:text-text-primary transition">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-text-primary text-sm uppercase tracking-wider mb-4">
                Legal
              </p>
              <ul className="space-y-2 text-text-muted text-sm">
                <li><a href="#" className="hover:text-text-primary transition">Privacy</a></li>
                <li><a href="#" className="hover:text-text-primary transition">Terms</a></li>
                <li><a href="#" className="hover:text-text-primary transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-text-primary text-sm uppercase tracking-wider mb-4">
                Follow
              </p>
              <ul className="space-y-2 text-text-muted text-sm">
                <li><a href="#" className="hover:text-text-primary transition">Twitter</a></li>
                <li><a href="#" className="hover:text-text-primary transition">LinkedIn</a></li>
                <li><a href="#" className="hover:text-text-primary transition">Discord</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex items-center justify-between">
            <p className="text-text-muted text-sm">
              © 2024 IELTS Tracker. All rights reserved.
            </p>
            <div className="text-text-muted text-sm">
              Made with <span className="text-danger">♥</span> for IELTS learners
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
