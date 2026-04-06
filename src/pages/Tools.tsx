import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Wind, Timer, Quote, Music, Coffee, Sparkles, Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Tools() {
  // Pomodoro State
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  
  // Breathing State
  const [breathPhase, setBreathPhase] = useState<'In' | 'Hold' | 'Out' | 'Hold2'>('In');
  const [breathProgress, setBreathProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    const phases = [
      { name: 'In', duration: 4000 },
      { name: 'Hold', duration: 7000 },
      { name: 'Out', duration: 8000 },
      { name: 'Hold2', duration: 1000 }
    ];
    
    let currentPhaseIdx = 0;
    const runPhase = () => {
      const phase = phases[currentPhaseIdx];
      setBreathPhase(phase.name as any);
      
      setTimeout(() => {
        currentPhaseIdx = (currentPhaseIdx + 1) % phases.length;
        runPhase();
      }, phase.duration);
    };

    const breathInterval = setInterval(() => {
      setBreathProgress(p => (p + 1) % 100);
    }, 100);

    runPhase();
    return () => {
      clearInterval(breathInterval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-display font-bold mb-4">Self-Help Tools</h1>
        <p className="text-dark-gray/60">Simple exercises to help you find your balance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Breathing Exercise */}
        <div className="glass-card p-10 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-6 left-6 flex items-center gap-2 text-lavender font-bold">
            <Wind size={20} />
            <span>4-7-8 Breathing</span>
          </div>
          
          <div className="relative w-64 h-64 flex items-center justify-center mb-8">
            <motion.div
              animate={{
                scale: breathPhase === 'In' ? 1.5 : breathPhase === 'Out' ? 1 : breathPhase === 'Hold' ? 1.5 : 1,
              }}
              transition={{ duration: breathPhase === 'In' ? 4 : breathPhase === 'Out' ? 8 : 0.5 }}
              className="w-32 h-32 bg-lavender/20 rounded-full blur-xl absolute"
            />
            <motion.div
              animate={{
                scale: breathPhase === 'In' ? 1.2 : breathPhase === 'Out' ? 0.8 : breathPhase === 'Hold' ? 1.2 : 0.8,
              }}
              transition={{ duration: breathPhase === 'In' ? 4 : breathPhase === 'Out' ? 8 : 0.5 }}
              className="w-40 h-40 border-4 border-lavender rounded-full flex items-center justify-center relative z-10"
            >
              <span className="text-2xl font-bold text-lavender">{breathPhase}</span>
            </motion.div>
          </div>
          <p className="text-dark-gray/60 max-w-xs">
            Inhale for 4s, hold for 7s, and exhale for 8s to calm your nervous system.
          </p>
        </div>

        {/* Pomodoro Timer */}
        <div className="glass-card p-10 flex flex-col items-center text-center">
          <div className="absolute top-6 left-6 flex items-center gap-2 text-soft-pink font-bold">
            <Timer size={20} />
            <span>Study Timer</span>
          </div>
          
          <div className="text-7xl font-display font-bold text-dark-gray mb-8 mt-4">
            {formatTime(timeLeft)}
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center transition-all",
                isActive ? "bg-soft-pink/10 text-soft-pink" : "bg-soft-pink text-white shadow-lg shadow-soft-pink/20"
              )}
            >
              {isActive ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </button>
            <button
              onClick={() => { setTimeLeft(25 * 60); setIsActive(false); }}
              className="w-16 h-16 rounded-full bg-off-white text-dark-gray/40 flex items-center justify-center hover:bg-gray-100 transition-all"
            >
              <RotateCcw size={24} />
            </button>
          </div>
          
          <div className="mt-8 flex gap-2">
            {['25:00', '15:00', '5:00'].map((t) => (
              <button
                key={t}
                onClick={() => { setTimeLeft(parseInt(t) * 60); setIsActive(false); }}
                className="px-4 py-2 rounded-xl bg-off-white text-xs font-bold hover:bg-soft-pink/10 hover:text-soft-pink transition-all"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Motivational Quotes */}
        <div className="glass-card p-8 bg-mint/5 border-mint/20">
          <div className="w-12 h-12 bg-mint rounded-2xl flex items-center justify-center mb-6">
            <Quote className="text-white w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-4">Daily Motivation</h3>
          <p className="text-dark-gray/70 italic leading-relaxed">
            "You don't have to see the whole staircase, just take the first step."
          </p>
          <div className="mt-6 pt-6 border-t border-mint/10 flex items-center gap-2 text-xs font-bold text-mint">
            <Sparkles size={14} />
            <span>New quote every 24h</span>
          </div>
        </div>

        {/* Relaxation Tips */}
        <div className="glass-card p-8 bg-beige/10 border-beige/20">
          <div className="w-12 h-12 bg-beige rounded-2xl flex items-center justify-center mb-6">
            <Coffee className="text-white w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-4">Relaxation Tips</h3>
          <ul className="space-y-3 text-sm text-dark-gray/70">
            <li className="flex items-center gap-2">• Drink a glass of warm water</li>
            <li className="flex items-center gap-2">• Stretch your neck and shoulders</li>
            <li className="flex items-center gap-2">• Step away from screens for 10m</li>
            <li className="flex items-center gap-2">• Listen to nature sounds</li>
          </ul>
        </div>

        {/* Calming Audio */}
        <div className="glass-card p-8 bg-light-blue/5 border-light-blue/20 md:col-span-3">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-light-blue rounded-2xl flex items-center justify-center">
              <Music className="text-white w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Calming Audio</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Gentle Rain Sounds",
                audio: "https://www.youtube.com/embed/ouXjNWkxoes?start=0&end=300"
              },
              {
                title: "Relaxation Sound",
                audio: "https://www.youtube.com/embed/vPvIxwh9N2w?start=0&end=300"
              },
              {
                title: "Ocean Waves Meditation",
                audio: "https://www.youtube.com/embed/VUnN0jILbmQ?start=0&end=300"
              }
            ].map((audio, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between"
              >
                <h4 className="text-gray-700 font-medium mb-4">{audio.title}</h4>

                {!audio.audio ? (
                  <p className="text-sm text-gray-500">
                    Audio unavailable right now.
                  </p>
                ) : (
                  <iframe
                    src={audio.audio}
                    width="100%"
                    height="80"
                    allow="autoplay"
                    className="rounded-2xl border-0"
                  />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-white/50 rounded-2xl border border-light-blue/10">
            <h4 className="text-sm font-bold text-light-blue mb-3 flex items-center gap-2">
              <Sparkles size={16} /> Deep Relaxation Playlists
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <iframe
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DWZd79rJ6a7lp"
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-3xl"
              />
              <iframe
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO"
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
