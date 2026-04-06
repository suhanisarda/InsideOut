import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Heart } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Mood Check-In', path: '/check-in' },
  { name: 'Mood Insights', path: '/insights' },
  { name: 'Talk Freely', path: '/talk-freely' },
  { name: 'Vent Space', path: '/vent' },
  { name: 'Self-Help Tools', path: '/tools' },
  { name: 'Support', path: '/support' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-lavender rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Heart className="text-white w-6 h-6 fill-current" />
          </div>
          <span className="text-2xl font-display font-bold text-dark-gray">Inside Out</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-lavender',
                location.pathname === link.path ? 'text-lavender' : 'text-dark-gray/70'
              )}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-lavender/10 transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link
            to="/login"
            className="bg-lavender text-white px-6 py-2 rounded-full font-medium hover:bg-lavender/90 transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          <button onClick={toggleDarkMode} className="p-2">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 p-6 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'text-lg font-medium p-2 rounded-xl transition-colors',
                    location.pathname === link.path ? 'bg-lavender/10 text-lavender' : 'text-dark-gray/70'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="bg-lavender text-white text-center py-3 rounded-xl font-medium mt-2"
              >
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
