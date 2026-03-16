import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import { Save, Bell, Shield, Eye } from 'lucide-react';
import { useState } from 'react';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailDigest: false,
    darkMode: true,
    privacy: 'private',
  });

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const sections = [
    {
      title: 'Account Settings',
      icon: 'user',
      items: [
        { label: 'Email', value: 'john@example.com', editable: true },
        { label: 'Full Name', value: 'John Doe', editable: true },
        { label: 'Phone', value: '+1 (555) 123-4567', editable: true },
      ],
    },
    {
      title: 'Notifications',
      icon: 'bell',
      items: [
        {
          label: 'Push Notifications',
          description: 'Get reminders for study sessions',
          toggle: true,
          value: settings.notifications,
          key: 'notifications',
        },
        {
          label: 'Email Digest',
          description: 'Weekly progress summary',
          toggle: true,
          value: settings.emailDigest,
          key: 'emailDigest',
        },
      ],
    },
    {
      title: 'Privacy & Security',
      icon: 'shield',
      items: [
        { label: 'Profile Visibility', description: 'Control who sees your profile' },
        { label: '2-Factor Authentication', description: 'Enhance account security' },
        { label: 'Connected Apps', description: 'Manage third-party access' },
      ],
    },
  ];

  return (
    <Layout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-text-primary mb-2">
          Settings
        </h1>
        <p className="text-text-muted">
          Manage your account preferences and application settings
        </p>
      </motion.div>

      {/* Settings Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="space-y-6"
      >
        {/* Account Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-8">
            <div className="mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold">
                  JD
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">John Doe</h2>
                  <p className="text-text-muted">Premium Member</p>
                </div>
              </div>
              <Button variant="secondary" size="sm">
                Change Avatar
              </Button>
            </div>

            <h3 className="text-lg font-bold text-text-primary mb-6">Account Info</h3>
            <div className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                value="john@example.com"
                readOnly
              />
              <Input
                label="Full Name"
                value="John Doe"
              />
              <Input
                label="Phone Number"
                type="tel"
                value="+1 (555) 123-4567"
              />
              <Input
                label="Current Password"
                type="password"
                placeholder="Enter your current password"
              />
            </div>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-8">
            <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
              <Bell size={20} className="text-primary" />
              Notification Preferences
            </h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-surface/50 rounded-lg">
                <div>
                  <p className="font-medium text-text-primary">Push Notifications</p>
                  <p className="text-text-muted text-sm">
                    Get reminders for study sessions and goals
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleToggle('notifications')}
                  className={`relative inline-flex items-center h-8 w-14 rounded-full transition-colors ${
                    settings.notifications ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <motion.span
                    animate={{
                      x: settings.notifications ? 28 : 4,
                    }}
                    className="inline-block h-6 w-6 transform rounded-full bg-white"
                  />
                </motion.button>
              </div>

              <div className="flex items-center justify-between p-4 bg-surface/50 rounded-lg">
                <div>
                  <p className="font-medium text-text-primary">Email Digest</p>
                  <p className="text-text-muted text-sm">
                    Weekly progress summary and recommendations
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleToggle('emailDigest')}
                  className={`relative inline-flex items-center h-8 w-14 rounded-full transition-colors ${
                    settings.emailDigest ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <motion.span
                    animate={{
                      x: settings.emailDigest ? 28 : 4,
                    }}
                    className="inline-block h-6 w-6 transform rounded-full bg-white"
                  />
                </motion.button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Privacy & Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-8">
            <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
              <Shield size={20} className="text-accent" />
              Privacy & Security
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-surface/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-text-primary">
                    Profile Visibility
                  </p>
                  <Badge variant="success" size="sm">
                    Public
                  </Badge>
                </div>
                <p className="text-text-muted text-sm">
                  Others can see your profile and achievements
                </p>
              </div>

              <div className="p-4 bg-surface/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-text-primary">
                    Two-Factor Authentication
                  </p>
                  <Badge variant="warning" size="sm">
                    Not Active
                  </Badge>
                </div>
                <p className="text-text-muted text-sm mb-3">
                  Add an extra layer of security to your account
                </p>
                <Button variant="secondary" size="sm">
                  Enable 2FA
                </Button>
              </div>

              <div className="p-4 bg-surface/50 rounded-lg">
                <p className="font-medium text-text-primary mb-3">
                  Danger Zone
                </p>
                <Button
                  variant="danger"
                  size="sm"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 pt-4"
        >
          <Button
            variant="accent"
            size="lg"
            icon={Save}
            className="flex-1"
          >
            Save Changes
          </Button>
          <Button variant="secondary" size="lg">
            Cancel
          </Button>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default SettingsPage;
