import { motion } from 'motion/react';
import { Phone, MessageSquare, Info, Shield, HelpCircle, ExternalLink, AlertCircle } from 'lucide-react';
import { HELPLINES } from '../constants';

export default function Support() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-display font-bold mb-4">Support & Resources</h1>
        <p className="text-dark-gray/60">You're not alone. Reach out whenever you need help.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Emergency Helplines */}
        <div className="lg:col-span-2 space-y-8">
          <div className="p-6 rounded-3xl bg-soft-pink/10 border border-soft-pink/20 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-soft-pink flex-shrink-0" size={24} />
              <div>
                <h4 className="text-lg font-bold text-soft-pink mb-1">Emergency Support</h4>
                <p className="text-dark-gray/70 leading-relaxed">
                  If you are in immediate danger or crisis, please contact a trusted person or call a mental health helpline immediately.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-display font-bold flex items-center gap-2">
            <Phone className="text-soft-pink" /> National Mental Health Helplines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HELPLINES.map((help, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 border-l-4 border-l-soft-pink pastel-shadow"
              >
                <h3 className="font-bold text-lg mb-1">{help.name}</h3>
                <p className="text-soft-pink font-display font-bold text-xl mb-3">{help.number}</p>
                <p className="text-sm text-dark-gray/60">{help.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="glass-card p-8 bg-mint/5 border-mint/20 pastel-shadow">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Shield size={20} className="text-mint" /> Privacy & Safety
            </h3>
            <p className="text-sm text-dark-gray/70 leading-relaxed mb-6">
              Your privacy is our top priority. All interactions on Inside Out are anonymous and encrypted. We focus on providing a safe space for your emotional well-being.
            </p>
            <div className="p-4 bg-white rounded-2xl border border-mint/10 text-xs text-mint font-medium flex items-center gap-2">
              <Shield size={14} />
              <span>End-to-end encrypted space</span>
            </div>
          </div>

          <div className="glass-card p-8 pastel-shadow">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <HelpCircle size={20} className="text-lavender" /> FAQs
            </h3>
            <div className="space-y-4">
              {[
                "Is this service free?",
                "How do I use the helplines?",
                "Can I remain anonymous?",
                "What happens in an emergency?"
              ].map((q, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="flex items-center justify-between text-sm font-medium text-dark-gray/70 group-hover:text-lavender transition-colors">
                    <span>{q}</span>
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="h-px bg-gray-50 mt-3" />
                </div>
              ))}
            </div>
          </div>

          <button className="w-full bg-lavender text-white py-5 rounded-3xl font-bold text-lg shadow-xl shadow-lavender/20 hover:scale-105 transition-all flex items-center justify-center gap-3">
            <MessageSquare size={24} /> Talk to Someone Now
          </button>
        </div>
      </div>
    </div>
  );
}
