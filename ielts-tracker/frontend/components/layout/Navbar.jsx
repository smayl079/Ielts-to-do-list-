import { useState } from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import Input from '../ui/Input';
import { motion } from 'framer-motion';

const Navbar = ({ onMenuClick }) => {
  const [hasNotifications, setHasNotifications] = useState(true);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-xl border-b border-border z-30 lg:ml-64">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between max-w-full">
        {/* Left side - Menu & Search */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-surface rounded-lg transition-smooth"
          >
            <Menu size={20} className="text-text-muted" />
          </button>

          <div className="hidden md:flex flex-1 max-w-xs">
            <Input
              placeholder="Search..."
              icon={Search}
              className="border-border/50"
            />
          </div>
        </div>

        {/* Right side - Notifications & Profile */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 hover:bg-surface rounded-lg transition-smooth"
          >
            <Bell size={20} className="text-text-muted" />
            {hasNotifications && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"
              />
            )}
          </motion.button>

          {/* User Avatar */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm hover:shadow-glow transition-smooth"
          >
            JD
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
