import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Users, Brain } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Home() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-lavender/10 text-lavender px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles size={16} />
              <span>Your safe space for mental wellness</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-display font-bold text-dark-gray leading-tight mb-6">
              Inside Out: <span className="text-lavender">Flip the script</span> on stress.
            </h1>
            <p className="text-lg text-dark-gray/70 leading-relaxed mb-10 max-w-lg">
              A private, minimal, and soothing platform designed for college students to track moods, vent safely, and access self-help tools.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/check-in"
                className="bg-lavender text-white px-8 py-4 rounded-2xl font-bold hover:bg-lavender/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-lavender/20 flex items-center gap-2"
              >
                Start Daily Check-In <ArrowRight size={20} />
              </Link>
              <Link
                to="/tools"
                className="bg-white text-dark-gray px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all border border-gray-100"
              >
                Explore Support Tools
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-soft-pink/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-light-blue/30 rounded-full blur-3xl animate-pulse" />
            <img
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop"
              alt="Mental Wellness"
              className="rounded-3xl shadow-2xl relative z-10 w-full object-cover aspect-[4/3]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -left-6 glass-card p-6 z-20 max-w-[200px] animate-bounce-slow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-mint rounded-lg flex items-center justify-center">
                  <Brain className="text-white w-5 h-5" />
                </div>
                <span className="font-bold text-sm">Mindfulness</span>
              </div>
              <p className="text-xs text-dark-gray/60">Take a deep breath. You're doing great.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-display font-bold mb-4">Designed for your well-being</h2>
            <p className="text-dark-gray/60">Everything you need to navigate college life with a clear mind.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Sparkles, title: 'Mood Tracking', desc: 'Log your daily emotions and see patterns over time.', color: 'bg-lavender' },
              { icon: Shield, title: 'Private Venting', desc: 'An anonymous space to write whatever is on your mind.', color: 'bg-light-blue' },
              { icon: Brain, title: 'Self-Help Tools', desc: 'Breathing exercises, study timers, and relaxation tips.', color: 'bg-mint' },
              { icon: Users, title: 'Mental Health Support', desc: 'Access national emergency helplines and emotional support resources.', color: 'bg-soft-pink' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-off-white hover:bg-white hover:shadow-xl transition-all group"
              >
                <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-6', feature.color)}>
                  <feature.icon className="text-white w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-dark-gray/60 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">What students are saying</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Aarav, 21', quote: 'The vent space is my go-to when exams get overwhelming. It feels good to just let it out.' },
              { name: 'Priya, 19', quote: 'The mood insights helped me realize that my stress peaks on Tuesdays. Now I plan better.' },
              { name: 'Ishaan, 22', quote: 'Simple, calming, and actually useful. The breathing exercises are a lifesaver.' },
            ].map((t, i) => (
              <div key={i} className="glass-card p-8 pastel-shadow">
                <p className="italic text-dark-gray/80 mb-6 font-medium">"{t.quote}"</p>
                <p className="font-bold text-lavender">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
