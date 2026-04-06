import { MoodType, MoodResponse } from './types';

export const MOOD_RESPONSES: Record<MoodType, MoodResponse> = {
  'Very Happy': {
    message: "Amazing! Celebrate the small wins today. 🌟",
    prompt: "What's one small win you achieved today?",
    suggestion: "Celebrate your small wins and share your positive energy with someone else.",
    recommendations: {
      englishPlaylist: "https://open.spotify.com/embed/playlist/37i9dQZF1DX9XIFQuFvzM4",
      hindiPlaylist: "https://open.spotify.com/embed/playlist/37i9dQZF1DWXtlo6ENS92N",
      youtubeVideos: [
        "https://www.youtube.com/embed/g-jwWYX7Jlo",
        "https://www.youtube.com/embed/wnHW6o8WMas"
      ]
    }
  },
  'Happy': {
    message: "That’s wonderful to hear today 🌼 Keep carrying that positive energy.",
    prompt: "What's making you feel happy right now?",
    suggestion: "Try gratitude journaling—write down three things you're thankful for today.",
    recommendations: {
      englishPlaylist: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC",
      hindiPlaylist: "https://open.spotify.com/embed/playlist/37i9dQZF1DWXtlo6ENS92N",
      youtubeVideos: [
        "https://www.youtube.com/embed/TQMbvJNRpLE",
        "https://www.youtube.com/embed/ZXsQAXx_ao0"
      ]
    }
  },
  'Neutral': {
    message: "It’s okay to have an ordinary day. Take things one step at a time.",
    prompt: "How has your day been so far?",
    suggestion: "Take a 10-minute walk outside to refresh your mind.",
    recommendations: {
      englishPlaylist: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4WYpdgoIcn6",
      hindiPlaylist: "https://open.spotify.com/embed/playlist/6pcpqXFLsYXK1DoCfofndR",
      youtubeVideos: [
        "https://www.youtube.com/embed/5qap5aO4i9A",
        "https://www.youtube.com/embed/1vx8iUvfyCY"
      ]
    }
  },
  'Stressed': {
    message: "You seem stressed today. Would you like to try a breathing exercise?",
    prompt: "What's weighing on your mind? Writing it down can help.",
    suggestion: "Try a 5-minute guided breathing exercise to center yourself.",
    recommendations: {
      englishPlaylist: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO",
      hindiPlaylist: "https://open.spotify.com/embed/playlist/4C34CZdaGedDSVEJ4fyqmd",
      youtubeVideos: [
        "https://www.youtube.com/embed/2OEL4P1Rz04",
        "https://www.youtube.com/embed/lFcSrYw-ARY",
        "https://www.youtube.com/embed/1ZYbU82GVz4"
      ]
    }
  },
  'Sad': {
    message: "We’re sorry you had a difficult day. Would you like to write about what happened?",
    prompt: "Would you like to talk about what's making you sad?",
    suggestion: "Listen to some soothing music and allow yourself to feel your emotions without judgment.",
    recommendations: {
      englishPlaylist: "https://open.spotify.com/embed/playlist/37i9dQZF1DX3YSRoSdA634",
      hindiPlaylist: "https://open.spotify.com/embed/playlist/4C34CZdaGedDSVEJ4fyqmd",
      youtubeVideos: [
        "https://www.youtube.com/embed/2OEL4P1Rz04",
        "https://www.youtube.com/embed/cp7Irf_qxdk"
      ]
    }
  },
  'Burned Out': {
    message: "You may be feeling overwhelmed. Consider taking a short break and using a self-help tool.",
    prompt: "When was the last time you took a complete break?",
    suggestion: "Take a complete break from screens for at least an hour today.",
    recommendations: {
      englishPlaylist: "https://open.spotify.com/embed/playlist/37i9dQZF1DWZd79rJ6a7lp",
      hindiPlaylist: "https://open.spotify.com/embed/playlist/3qkNyLJjqOBciOhfUy76gB",
      youtubeVideos: [
        "https://www.youtube.com/embed/4EaMJOo1jks",
        "https://www.youtube.com/embed/ZToicYcHIOU"
      ]
    }
  }
};

export const HELPLINES = [
  { name: 'Kiran Mental Health Helpline', number: '1800-599-0019', description: '24/7 Toll-free national helpline' },
  { name: 'Vandrevala Foundation', number: '+91 9999666555', description: '24/7 Crisis intervention and support' },
  { name: 'AASRA Helpline', number: '+91 9820466726', description: '24/7 Suicide prevention helpline' },
  { name: 'Fortis Mental Health Helpline', number: '+91 8376804102', description: '24/7 Stress and mental health support' }
];
