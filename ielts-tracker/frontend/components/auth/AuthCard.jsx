import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Github } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

const AuthCard = ({ title, subtitle, children, footerText, footerLink }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated gradient background */}
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

      {/* Blur backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 backdrop-blur-3xl z-0"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <Link href="/" className="mb-8 inline-flex items-center gap-2">
          <div className="gradient-bg rounded-lg p-2">
            <span className="text-white font-bold text-2xl">⚡</span>
          </div>
          <span className="text-lg font-bold gradient-text">IELTS Tracker</span>
        </Link>

        {/* Card */}
        <Card className="p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              {title}
            </h1>
            <p className="text-text-muted">{subtitle}</p>
          </div>

          {children}

          {/* Footer */}
          <p className="text-center text-text-muted text-sm">
            {footerText}{' '}
            <Link href={footerLink} className="text-primary hover:underline font-medium">
              {footerLink === '/signup' ? 'Sign up' : 'Sign in'}
            </Link>
          </p>
        </Card>

        {/* Divider text */}
        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-text-muted">Or continue with</span>
          </div>
        </div>

        {/* Social login buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            variant="secondary"
            size="md"
            className="w-full"
            icon={Github}
          >
            GitHub
          </Button>
          <Button
            variant="secondary"
            size="md"
            className="w-full"
          >
            Google
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthCard;
