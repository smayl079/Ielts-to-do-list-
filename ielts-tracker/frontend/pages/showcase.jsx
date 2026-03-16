import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { Button, Card, Badge, Input, Modal, Toast, Skeleton } from '../components/ui';
import MetricCard from '../components/dashboard/MetricCard';
import Badge as BadgeComponent from '../components/ui/Badge';
import { Award, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const ComponentShowcase = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-text-primary mb-2">
          Component Showcase
        </h1>
        <p className="text-text-muted">
          Gallery of all available components and their variants
        </p>
      </motion.div>

      {/* Buttons Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">Buttons</h2>
        <Card className="p-8 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Variants
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="accent">Accent</Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Sizes
            </h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              States
            </h3>
            <div className="flex gap-4">
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
              <Button isLoading>Loading</Button>
            </div>
          </div>
        </Card>
      </motion.section>

      {/* Badges Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">Badges</h2>
        <Card className="p-8">
          <div className="flex flex-wrap gap-4">
            <BadgeComponent variant="default">Default</BadgeComponent>
            <BadgeComponent variant="secondary">Secondary</BadgeComponent>
            <BadgeComponent variant="success">Success</BadgeComponent>
            <BadgeComponent variant="warning">Warning</BadgeComponent>
            <BadgeComponent variant="danger">Danger</BadgeComponent>
            <BadgeComponent variant="muted">Muted</BadgeComponent>
          </div>
        </Card>
      </motion.section>

      {/* Cards Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Glass Card
            </h3>
            <p className="text-text-muted text-sm">
              Card with glass morphism effect
            </p>
          </Card>

          <Card noBorder={true} className="p-6 bg-surface border border-border">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Solid Card
            </h3>
            <p className="text-text-muted text-sm">
              Card with solid background
            </p>
          </Card>

          <Card clickable className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Clickable Card
            </h3>
            <p className="text-text-muted text-sm">
              Card with hover lift effect
            </p>
          </Card>
        </div>
      </motion.section>

      {/* Metric Cards */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Metric Cards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Score"
            value={75}
            unit="/100"
            trend="up"
            trendValue={12}
            icon={Award}
            color="primary"
          />
          <MetricCard
            title="Hours Studied"
            value={156}
            unit="hrs"
            trend="up"
            trendValue={23}
            icon={TrendingUp}
            color="accent"
          />
          <MetricCard
            title="Accuracy"
            value={92}
            unit="%"
            trend="down"
            trendValue={5}
            icon={CheckCircle}
            color="success"
          />
          <MetricCard
            title="Alerts"
            value={3}
            unit="new"
            icon={AlertCircle}
            color="warning"
          />
        </div>
      </motion.section>

      {/* Input Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">Inputs</h2>
        <Card className="p-8 max-w-md">
          <div className="space-y-4">
            <Input label="Standard Input" placeholder="Enter text..." />
            <Input
              label="Input with Error"
              placeholder="Enter email..."
              error="This field is required"
            />
            <Input
              label="Input with Suffix"
              placeholder="0.00"
              suffix="USD"
            />
          </div>
        </Card>
      </motion.section>

      {/* Loading States */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Loading States
        </h2>
        <Card className="p-8 space-y-4">
          <div>
            <p className="text-text-muted text-sm mb-4">Skeleton Loaders</p>
            <Skeleton className="h-8 mb-4" />
            <Skeleton count={3} />
          </div>
        </Card>
      </motion.section>

      {/* Modal & Toast Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Modals & Toasts
        </h2>
        <div className="space-y-4">
          <Button
            variant="accent"
            onClick={() => setIsModalOpen(true)}
          >
            Open Modal
          </Button>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Example Modal"
            footer={
              <>
                <Button
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="accent">
                  Confirm
                </Button>
              </>
            }
          >
            <p className="text-text-primary mb-4">
              This is an example modal component with animated backdrop and content.
            </p>
            <p className="text-text-muted text-sm">
              Click the cancel button or anywhere outside to close.
            </p>
          </Modal>
        </div>
      </motion.section>

      {/* Typography Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Typography
        </h2>
        <Card className="p-8 space-y-6">
          <div>
            <h3 className="text-4xl font-bold text-text-primary">
              Heading 3XL
            </h3>
          </div>
          <div>
            <h4 className="text-3xl font-bold text-text-primary">
              Heading 2XL
            </h4>
          </div>
          <div>
            <h5 className="text-2xl font-bold text-text-primary">
              Heading XL
            </h5>
          </div>
          <div>
            <p className="text-lg text-text-primary">Large text</p>
            <p className="text-base text-text-primary">Base text</p>
            <p className="text-sm text-text-muted">Small muted text</p>
          </div>
          <div>
            <p className="text-lg font-mono text-primary">Font Mono 123.45</p>
          </div>
        </Card>
      </motion.section>

      {/* Color Palette */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Color Palette
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: 'Primary', color: 'bg-primary' },
            { name: 'Accent', color: 'bg-accent' },
            { name: 'Success', color: 'bg-success' },
            { name: 'Warning', color: 'bg-warning' },
            { name: 'Danger', color: 'bg-danger' },
            { name: 'Surface', color: 'bg-surface border border-border' },
          ].map((item) => (
            <div key={item.name} className="space-y-2">
              <div className={`w-full h-20 rounded-lg ${item.color}`} />
              <p className="text-sm font-medium text-text-primary text-center">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Gradient Examples */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">Gradients</h2>
        <div className="space-y-4">
          <div className="h-20 rounded-lg gradient-bg flex items-center justify-center text-white font-bold">
            Primary to Accent
          </div>
          <div className="h-20 rounded-lg gradient-bg-subtle border border-primary/30 flex items-center justify-center font-bold gradient-text">
            Subtle Gradient
          </div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default ComponentShowcase;
