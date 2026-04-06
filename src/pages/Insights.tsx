import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Calendar, TrendingUp, History, Sparkles, Brain } from 'lucide-react';
import { MoodEntry } from '../types';
import { cn } from '../lib/utils';

const moodValues: Record<string, number> = {
  'Very Happy': 5,
  'Happy': 4,
  'Neutral': 3,
  'Stressed': 2,
  'Sad': 1,
  'Burned Out': 0,
};

const moodColors: Record<string, string> = {
  'Very Happy': '#CDB4DB',
  'Happy': '#B8E0D2',
  'Neutral': '#F5E6DA',
  'Stressed': '#AFCBFF',
  'Sad': '#F7D6E0',
  'Burned Out': '#CDB4DB',
};

export default function Insights() {
  const [history, setHistory] = useState<MoodEntry[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('mood_history') || '[]');
    setHistory(data);
  }, []);

  const chartData = history.slice(0, 7).reverse().map(entry => ({
    name: new Date(entry.timestamp).toLocaleDateString('en-IN', { weekday: 'short' }),
    value: moodValues[entry.mood],
    mood: entry.mood
  }));

  const moodCounts = history.reduce((acc: Record<string, number>, curr) => {
    acc[curr.mood] = (acc[curr.mood] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.entries(moodCounts).map(([name, value]) => ({ name, value }));

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">Mood Insights</h1>
          <p className="text-dark-gray/60">Understand your emotional patterns over time.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
          <Calendar size={18} className="text-lavender" />
          <span className="text-sm font-medium">Last 7 Days</span>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="glass-card p-20 text-center">
          <div className="w-20 h-20 bg-lavender/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <TrendingUp className="text-lavender w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mb-4">No data yet</h2>
          <p className="text-dark-gray/60 max-w-md mx-auto">
            Start your first mood check-in to see your emotional trends and patterns here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weekly Trend Chart */}
          <div className="lg:col-span-2 glass-card p-8">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <TrendingUp size={20} className="text-lavender" /> Weekly Mood Trend
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                  <YAxis hide domain={[0, 5]} />
                  <Tooltip
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                    formatter={(value: number, name: string, props: any) => [props.payload.mood, 'Mood']}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#CDB4DB"
                    strokeWidth={4}
                    dot={{ r: 6, fill: '#CDB4DB', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 8, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Mood Distribution */}
          <div className="glass-card p-8">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <Sparkles size={20} className="text-mint" /> Mood Distribution
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#666' }} width={80} />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px' }} />
                  <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={20}>
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={moodColors[entry.name] || '#CDB4DB'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Suggestions & Patterns */}
          <div className="glass-card p-8 bg-lavender/5 border-lavender/20">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Brain size={20} className="text-lavender" /> Pattern Detection
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-2xl shadow-sm">
                <p className="text-sm font-bold mb-1">Stress Alert</p>
                <p className="text-xs text-dark-gray/60">
                  {history.filter(h => h.mood === 'Stressed' || h.mood === 'Burned Out').length > 2
                    ? "You've been feeling stressed lately. Consider scheduling a break."
                    : "Your stress levels seem stable. Keep up the good work!"}
                </p>
              </div>
              <div className="p-4 bg-white rounded-2xl shadow-sm">
                <p className="text-sm font-bold mb-1">Positive Momentum</p>
                <p className="text-xs text-dark-gray/60">
                  {history[0]?.mood === 'Happy' || history[0]?.mood === 'Very Happy'
                    ? "You're ending the week on a high note! What contributed to this?"
                    : "Try to find one small thing to celebrate today."}
                </p>
              </div>
            </div>
          </div>

          {/* History Cards */}
          <div className="lg:col-span-2 glass-card p-8">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <History size={20} className="text-dark-gray" /> Recent History
            </h3>
            <div className="space-y-4">
              {history.slice(0, 5).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-4 bg-off-white rounded-2xl hover:bg-white transition-all border border-transparent hover:border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-2xl', moodColors[entry.mood] ? `bg-[${moodColors[entry.mood]}]` : 'bg-lavender/20')}>
                      {entry.mood === 'Very Happy' ? '🤩' : entry.mood === 'Happy' ? '😊' : entry.mood === 'Neutral' ? '😐' : entry.mood === 'Stressed' ? '😫' : entry.mood === 'Sad' ? '😢' : '🤯'}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{entry.mood}</p>
                      <p className="text-xs text-dark-gray/40">{new Date(entry.timestamp).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                  {entry.reflection && (
                    <p className="text-xs text-dark-gray/60 italic max-w-[200px] truncate">
                      "{entry.reflection}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
