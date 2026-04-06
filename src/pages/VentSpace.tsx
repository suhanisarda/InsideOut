import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Shield, History, Trash2, Sparkles } from 'lucide-react';
import { VentEntry } from '../types';

export default function VentSpace() {
  const [content, setContent] = useState('');
  const [entries, setEntries] = useState<VentEntry[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('vent_entries') || '[]');
    setEntries(data);
  }, []);

  const handleSave = () => {
    if (!content.trim()) return;
    
    const newEntry: VentEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      content: content.trim()
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('vent_entries', JSON.stringify(updated));
    setContent('');
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem('vent_entries', JSON.stringify(updated));
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-light-blue/10 text-light-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Shield size={16} />
          <span>Private & Anonymous</span>
        </div>
        <h1 className="text-4xl font-display font-bold mb-4">Vent Space</h1>
        <p className="text-dark-gray/60">Let it all out. This space is yours, and yours only.</p>
      </motion.div>

      <div className="glass-card p-8 mb-12 pastel-shadow">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write anything on your mind... No judgments, just you."
          className="w-full min-h-[300px] p-6 rounded-3xl bg-off-white border-none focus:ring-2 focus:ring-lavender outline-none transition-all text-lg leading-relaxed resize-none"
        />
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-dark-gray/40">
            <Shield size={14} />
            <span>Your entries are stored locally and never sent to any server.</span>
          </div>
          <button
            onClick={handleSave}
            disabled={!content.trim()}
            className="bg-lavender text-white px-10 py-4 rounded-2xl font-bold hover:bg-lavender/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-lavender/20"
          >
            Save Entry <Send size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-display font-bold flex items-center gap-2">
          <History size={24} className="text-lavender" /> Recent Entries
        </h2>
        
        {entries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-dark-gray/40">No entries yet. Start writing whenever you're ready.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            <AnimatePresence>
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-card p-6 group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2 text-xs text-dark-gray/40">
                      <Sparkles size={14} className="text-lavender" />
                      <span>{new Date(entry.timestamp).toLocaleString('en-IN')}</span>
                    </div>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="p-2 text-dark-gray/20 hover:text-soft-pink transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-dark-gray/80 leading-relaxed whitespace-pre-wrap">
                    {entry.content}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="mt-20 p-8 rounded-3xl bg-lavender/5 border border-lavender/10 text-center">
        <p className="text-sm text-dark-gray/60 italic">
          "Sometimes, the act of writing is enough to clear the fog."
        </p>
      </div>
    </div>
  );
}
