import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Shield, Send, Heart, Sparkles, User, AlertCircle, Flower2 } from 'lucide-react';
import { MoodType, AnonymousSupportRequest, CommunityPost } from '../types';
import { cn } from '../lib/utils';

const categories = [
  'Academic Stress',
  'Anxiety',
  'Family Issues',
  'Relationship Problems',
  'Burnout',
  'Loneliness',
  'Self-Esteem',
];

const initialPosts: CommunityPost[] = [
  {
    id: '1',
    content: "Just wanted to say that things will get better. Hang in there! 🤍",
    timestamp: Date.now() - 3600000,
    reactions: { heart: 5, flower: 3, whiteHeart: 8 }
  },
  {
    id: '2',
    content: "It's okay to not be okay today. Taking it one breath at a time.",
    timestamp: Date.now() - 7200000,
    reactions: { heart: 12, flower: 2, whiteHeart: 15 }
  }
];

export default function TalkFreely() {
  const [nickname, setNickname] = useState('');
  const [mood, setMood] = useState<MoodType | ''>('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [posts, setPosts] = useState<CommunityPost[]>(initialPosts);
  const [newPostContent, setNewPostContent] = useState('');
  
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: "I'm here for you. How are you feeling right now?" }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSupportRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    // Reset form
    setMood('');
    setCategory('');
    setContent('');
  };

  const handleAddPost = () => {
    if (!newPostContent.trim()) return;
    const newPost: CommunityPost = {
      id: Date.now().toString(),
      content: newPostContent,
      timestamp: Date.now(),
      reactions: { heart: 0, flower: 0, whiteHeart: 0 }
    };
    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  const handleReaction = (postId: string, type: keyof CommunityPost['reactions']) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          reactions: {
            ...post.reactions,
            [type]: post.reactions[type] + 1
          }
        };
      }
      return post;
    }));
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: 'user', text: chatInput };
    setChatMessages([...chatMessages, userMsg]);
    setChatInput('');

    // Simple AI response simulation
    setTimeout(() => {
      const responses = [
        "Take a deep breath. You do not have to handle everything at once.",
        "I'm here for you. Would you like to try a calming exercise?",
        "That sounds tough. What do you think is making you feel this way?",
        "Your feelings are valid. Take your time."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, { role: 'ai', text: randomResponse }]);
    }, 1000);
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender/10 text-lavender font-medium mb-4"
        >
          <Shield size={16} />
          <span>Anonymous & Private</span>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Talk Freely</h1>
        <p className="text-dark-gray/60 max-w-2xl mx-auto">
          Your identity stays private. You can talk freely without sharing your real name.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Support Request Form */}
        <div className="lg:col-span-2 space-y-12">
          <section className="glass-card p-8 pastel-shadow">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="text-lavender" /> Need to Talk?
            </h2>
            
            <form onSubmit={handleSupportRequest} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark-gray/70 ml-1">Nickname</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-gray/30" size={18} />
                    <input
                      type="text"
                      placeholder="e.g. CalmSoul21"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-2xl bg-off-white border border-transparent focus:border-lavender focus:ring-2 focus:ring-lavender/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark-gray/70 ml-1">Category of Concern</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-off-white border border-transparent focus:border-lavender focus:ring-2 focus:ring-lavender/20 outline-none transition-all appearance-none"
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-dark-gray/70 ml-1">Tell us what's on your mind...</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  placeholder="Share your thoughts anonymously..."
                  className="w-full p-4 rounded-2xl bg-off-white border border-transparent focus:border-lavender focus:ring-2 focus:ring-lavender/20 outline-none transition-all min-h-[150px]"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-2 text-xs text-dark-gray/40">
                  <Shield size={14} />
                  <span>Identity protected</span>
                </div>
                <button
                  type="submit"
                  className="bg-lavender text-white px-8 py-3 rounded-xl font-bold hover:bg-lavender/90 transition-all flex items-center gap-2 shadow-lg shadow-lavender/20"
                >
                  Send Anonymous Request <Send size={18} />
                </button>
              </div>
            </form>

            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 p-4 bg-mint/10 border border-mint/20 rounded-2xl text-mint font-bold flex items-center gap-3"
                >
                  <Sparkles size={20} />
                  <span>Thank you for sharing. You are not alone, and your message matters.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Community Wall */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Flower2 className="text-soft-pink" /> Anonymous Community Wall
              </h2>
            </div>
            
            <div className="glass-card p-6 bg-white/50">
              <div className="flex gap-4 mb-8">
                <input
                  type="text"
                  placeholder="Share an encouraging thought..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white border border-gray-100 focus:ring-2 focus:ring-lavender outline-none transition-all"
                />
                <button
                  onClick={handleAddPost}
                  className="bg-lavender text-white px-6 py-3 rounded-xl font-bold hover:bg-lavender/90 transition-all"
                >
                  Post
                </button>
              </div>

              <div className="space-y-4">
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-6 rounded-2xl bg-white border border-gray-50 shadow-sm"
                  >
                    <p className="text-dark-gray mb-4">{post.content}</p>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleReaction(post.id, 'heart')}
                        className="flex items-center gap-1.5 text-xs font-bold text-soft-pink hover:scale-110 transition-transform"
                      >
                        <Heart size={14} className="fill-current" /> {post.reactions.heart}
                      </button>
                      <button
                        onClick={() => handleReaction(post.id, 'flower')}
                        className="flex items-center gap-1.5 text-xs font-bold text-mint hover:scale-110 transition-transform"
                      >
                        <Flower2 size={14} /> {post.reactions.flower}
                      </button>
                      <button
                        onClick={() => handleReaction(post.id, 'whiteHeart')}
                        className="flex items-center gap-1.5 text-xs font-bold text-lavender hover:scale-110 transition-transform"
                      >
                        <Heart size={14} /> {post.reactions.whiteHeart}
                      </button>
                      <span className="ml-auto text-[10px] text-dark-gray/30">
                        {new Date(post.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: AI Chat & Instant Support */}
        <div className="space-y-8">
          {/* AI Support Widget */}
          <section className="glass-card flex flex-col h-[500px] pastel-shadow overflow-hidden">
            <div className="p-4 bg-lavender text-white flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm">AI Support Chat</h3>
                <p className="text-[10px] opacity-80">Always here to listen</p>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] p-3 rounded-2xl text-sm",
                    msg.role === 'ai' 
                      ? "bg-lavender/10 text-dark-gray self-start rounded-tl-none" 
                      : "bg-lavender text-white self-end rounded-tr-none ml-auto"
                  )}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-100 flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                className="flex-1 px-4 py-2 rounded-xl bg-off-white text-sm outline-none focus:ring-2 focus:ring-lavender/20"
              />
              <button
                onClick={handleChatSend}
                className="p-2 bg-lavender text-white rounded-xl hover:bg-lavender/90 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </section>

          {/* Instant Support Prompts */}
          <section className="glass-card p-6 bg-mint/5 border-mint/20">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-mint" /> Instant Support
            </h3>
            <div className="space-y-3">
              {[
                "Would you like to talk about what happened today?",
                "What do you think is making you feel this way?",
                "What would help you feel a little better right now?"
              ].map((prompt, i) => (
                <button
                  key={i}
                  className="w-full text-left p-3 rounded-xl bg-white border border-mint/10 text-xs text-dark-gray/70 hover:border-mint hover:text-mint transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </section>

          {/* Safety Note */}
          <section className="p-6 rounded-3xl bg-soft-pink/10 border border-soft-pink/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-soft-pink flex-shrink-0" size={20} />
              <div>
                <h4 className="text-sm font-bold text-soft-pink mb-1">Safety Note</h4>
                <p className="text-xs text-dark-gray/60 leading-relaxed">
                  If you are in immediate danger or crisis, please contact a trusted person or mental health helpline immediately.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
