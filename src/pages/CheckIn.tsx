import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Send, Sparkles, Music, Video, BookOpen, AlertCircle } from 'lucide-react';
import { MoodType } from '../types';
import { MOOD_RESPONSES } from '../constants';
import { cn } from '../lib/utils';

const moods: { type: MoodType; emoji: string; color: string }[] = [
  { type: 'Very Happy', emoji: '🤩', color: 'bg-lavender' },
  { type: 'Happy', emoji: '😊', color: 'bg-mint' },
  { type: 'Neutral', emoji: '😐', color: 'bg-beige' },
  { type: 'Stressed', emoji: '😫', color: 'bg-light-blue' },
  { type: 'Sad', emoji: '😢', color: 'bg-soft-pink' },
  { type: 'Burned Out', emoji: '🤯', color: 'bg-lavender' },
];

const EmbedFallback = ({ type }: { type: string }) => (
  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center h-full flex flex-col justify-center">
    <p className="text-gray-600 font-medium">
      This {type} is unavailable right now.
    </p>
    <p className="text-sm text-gray-400 mt-2">
      Try another calming recommendation.
    </p>
  </div>
);

export default function CheckIn() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [reflection, setReflection] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (!selectedMood) return;
    
    const entry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      mood: selectedMood,
      reflection
    };

    const existing = JSON.parse(localStorage.getItem('mood_history') || '[]');
    localStorage.setItem('mood_history', JSON.stringify([entry, ...existing]));
    setIsSaved(true);
  };

  const currentResponse = selectedMood ? MOOD_RESPONSES[selectedMood] : null;
  const isNegative = selectedMood && ['Stressed', 'Sad', 'Burned Out'].includes(selectedMood);

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-display font-bold mb-4">How are you feeling today?</h1>
        <p className="text-dark-gray/60">Take a moment to check in with yourself.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {moods.map((mood) => (
          <button
            key={mood.type}
            onClick={() => {
              setSelectedMood(mood.type);
              setIsSaved(false);
            }}
            className={cn(
              'p-6 rounded-3xl transition-all flex flex-col items-center gap-3 border-2',
              selectedMood === mood.type
                ? `${mood.color} border-lavender scale-105 shadow-lg`
                : 'bg-white border-transparent hover:border-lavender/30 hover:scale-102'
            )}
          >
            <span className="text-4xl">{mood.emoji}</span>
            <span className={cn('text-xs font-bold', selectedMood === mood.type ? 'text-white' : 'text-dark-gray/60')}>
              {mood.type}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedMood && (
          <motion.div
            key={selectedMood}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-8"
          >
            <div className="glass-card p-8 bg-lavender/5 border-lavender/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-lavender rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="text-white w-6 h-6 fill-current" />
                </div>
                <div>
                  <p className="text-lg font-medium text-dark-gray mb-4">
                    {currentResponse?.message}
                  </p>
                  
                  {(isNegative || reflection) && (
                    <div className="space-y-4">
                      <p className="text-sm text-dark-gray/60 italic">
                        {currentResponse?.prompt || "Would you like to add a reflection?"}
                      </p>
                      <textarea
                        value={reflection}
                        onChange={(e) => setReflection(e.target.value)}
                        placeholder="Write your thoughts here..."
                        className="w-full p-4 rounded-2xl bg-white border border-gray-100 focus:ring-2 focus:ring-lavender outline-none transition-all min-h-[120px]"
                      />
                    </div>
                  )}

                  {!isSaved ? (
                    <button
                      onClick={handleSave}
                      className="mt-6 bg-lavender text-white px-8 py-3 rounded-xl font-bold hover:bg-lavender/90 transition-all flex items-center gap-2"
                    >
                      Save My Mood <Send size={18} />
                    </button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-6 inline-flex items-center gap-2 text-mint font-bold"
                    >
                      <Sparkles size={20} /> Mood Saved Successfully
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                  <Sparkles className="text-lavender" /> Something for Your Mood Today
                </h2>
                <div className="flex items-center gap-1 text-[10px] text-dark-gray/40 bg-white/50 px-2 py-1 rounded-full">
                  <AlertCircle size={10} />
                  <span>Tip: Click the play button on the cards to start audio</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentResponse?.recommendations && (
                  <>
                    {/* English Spotify */}
                    <div className="glass-card overflow-hidden pastel-shadow flex flex-col">
                      <div className="p-4 bg-white/50 border-b border-white/20 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Music size={18} className="text-mint flex-shrink-0" />
                          <span className="text-sm font-bold truncate">English Playlist</span>
                        </div>
                        <a href={currentResponse.recommendations.englishPlaylist.replace('/embed', '')} target="_blank" rel="noopener noreferrer" className="text-[10px] text-lavender hover:underline">Open in App</a>
                      </div>
                      <div className="bg-gray-50 flex-grow">
                        {currentResponse.recommendations.englishPlaylist ? (
                          <iframe
                            src={currentResponse.recommendations.englishPlaylist}
                            width="100%"
                            height="152"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            className="rounded-3xl"
                          />
                        ) : (
                          <EmbedFallback type="playlist" />
                        )}
                      </div>
                    </div>

                    {/* Hindi Spotify */}
                    <div className="glass-card overflow-hidden pastel-shadow flex flex-col">
                      <div className="p-4 bg-white/50 border-b border-white/20 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Music size={18} className="text-mint flex-shrink-0" />
                          <span className="text-sm font-bold truncate">Hindi Playlist</span>
                        </div>
                        <a href={currentResponse.recommendations.hindiPlaylist.replace('/embed', '')} target="_blank" rel="noopener noreferrer" className="text-[10px] text-lavender hover:underline">Open in App</a>
                      </div>
                      <div className="bg-gray-50 flex-grow">
                        {currentResponse.recommendations.hindiPlaylist ? (
                          <iframe
                            src={currentResponse.recommendations.hindiPlaylist}
                            width="100%"
                            height="152"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            className="rounded-3xl"
                          />
                        ) : (
                          <EmbedFallback type="playlist" />
                        )}
                      </div>
                    </div>

                    {/* YouTube Videos */}
                    {currentResponse.recommendations.youtubeVideos.map((videoUrl, idx) => (
                      <div key={idx} className="glass-card overflow-hidden pastel-shadow flex flex-col">
                        <div className="p-4 bg-white/50 border-b border-white/20 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <Video size={18} className="text-soft-pink flex-shrink-0" />
                            <span className="text-sm font-bold truncate">Recommended Video {idx + 1}</span>
                          </div>
                          <a href={videoUrl.replace('/embed/', '/watch?v=')} target="_blank" rel="noopener noreferrer" className="text-[10px] text-lavender hover:underline">Open in App</a>
                        </div>
                        <div className="bg-gray-50 flex-grow">
                          {videoUrl ? (
                            <iframe
                              src={videoUrl}
                              width="100%"
                              height="220"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              loading="lazy"
                              className="rounded-3xl"
                            />
                          ) : (
                            <EmbedFallback type="video" />
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                )}
                
                {/* Calming Suggestion Card */}
                <div className="glass-card p-6 bg-mint/10 border-mint/20 flex flex-col justify-center pastel-shadow md:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-mint rounded-xl flex items-center justify-center">
                      <BookOpen className="text-white w-6 h-6" />
                    </div>
                    <h3 className="font-bold">Daily Suggestion</h3>
                  </div>
                  <p className="text-lg text-dark-gray/80 leading-relaxed font-medium">
                    {currentResponse?.suggestion}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
