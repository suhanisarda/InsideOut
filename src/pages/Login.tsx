import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, Shield, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 flex items-center justify-center bg-gradient-to-br from-lavender/10 via-off-white to-light-blue/10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-card p-10 pastel-shadow"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-lavender rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Heart className="text-white w-10 h-10 fill-current" />
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">Welcome Back</h1>
          <p className="text-dark-gray/60">Your safe space is waiting for you.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-dark-gray/70 ml-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-gray/30" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@college.edu"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-off-white border border-transparent focus:bg-white focus:border-lavender focus:ring-4 focus:ring-lavender/10 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-dark-gray/70 ml-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-gray/30" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-off-white border border-transparent focus:bg-white focus:border-lavender focus:ring-4 focus:ring-lavender/10 outline-none transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-lavender text-white py-4 rounded-2xl font-bold text-lg hover:bg-lavender/90 transition-all shadow-lg shadow-lavender/20 flex items-center justify-center gap-2"
          >
            Sign In <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-50 text-center space-y-4">
          <p className="text-sm text-dark-gray/60">
            Don't want to sign in?{' '}
            <Link to="/" className="text-lavender font-bold hover:underline">
              Continue Anonymously
            </Link>
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-dark-gray/40">
            <Shield size={14} />
            <span>Your data is always private & secure</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
