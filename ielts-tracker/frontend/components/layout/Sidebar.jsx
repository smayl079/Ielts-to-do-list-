import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Home,
  BookOpen,
  Target,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ onClose, isOpen }) => {
  const router = useRouter();

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: BookOpen, label: 'Vocabulary', href: '/vocabulary' },
    { icon: Target, label: 'Practice', href: '/practice' },
    { icon: BarChart3, label: 'Progress', href: '/progress' },
    { icon: Zap, label: 'AI Assistant', href: '/ai' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  const isActive = (href) => router.pathname === href;

  const variants = {
    hidden: { x: -256 },
    visible: { x: 0 },
  };

  return (
    <>
      {/* Backdrop on mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        variants={variants}
        initial={false}
        animate={isOpen ? 'visible' : 'hidden'}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-screen w-64 bg-surface border-r border-border z-40 lg:z-0 lg:relative lg:translate-x-0 flex flex-col"
      >
        {/* Header with Logo */}
        <div className="px-6 py-6 flex items-center justify-between lg:justify-start">
          <Link href="/" className="flex items-center gap-3">
            <div className="gradient-bg rounded-lg p-2">
              <Zap className="text-white" size={24} />
            </div>
            <div className="hidden lg:block">
              <h1 className="text-xl font-bold gradient-text">IELTS Tracker</h1>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 hover:bg-surface/50 rounded-lg transition-smooth"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map(({ icon: Icon, label, href }) => (
              <motion.li
                key={href}
                whileHover={{ x: 4 }}
              >
                <Link href={href}>
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth duration-200 text-left group ${
                      isActive(href)
                        ? 'bg-gradient-to-r from-primary to-accent text-white'
                        : 'text-text-muted hover:text-text-primary hover:bg-surface/50'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{label}</span>
                    {isActive(href) && (
                      <motion.div
                        layoutId="sidebar-pill"
                        className="absolute inset-0 rounded-lg -z-10"
                      />
                    )}
                  </button>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="px-3 py-4 border-t border-border">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface/50 transition-smooth group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
              JD
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-text-primary">John Doe</p>
              <p className="text-xs text-text-muted">Premium</p>
            </div>
          </button>
          <button className="w-full mt-2 flex items-center gap-3 px-4 py-2 rounded-lg text-text-muted hover:text-danger hover:bg-danger/5 transition-smooth">
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
