export type MoodType = 'Very Happy' | 'Happy' | 'Neutral' | 'Stressed' | 'Sad' | 'Burned Out';

export interface MoodEntry {
  id: string;
  timestamp: number;
  mood: MoodType;
  reflection?: string;
}

export interface VentEntry {
  id: string;
  timestamp: number;
  content: string;
}

export interface MediaRecommendation {
  type: 'spotify' | 'youtube';
  url: string;
  title: string;
}

export interface MoodResponse {
  message: string;
  prompt?: string;
  suggestion: string;
  recommendations: {
    englishPlaylist: string;
    hindiPlaylist: string;
    youtubeVideos: string[];
  };
}

export interface AnonymousSupportRequest {
  id: string;
  nickname: string;
  mood: MoodType;
  category: string;
  content: string;
  timestamp: number;
}

export interface CommunityPost {
  id: string;
  content: string;
  timestamp: number;
  reactions: {
    heart: number;
    flower: number;
    whiteHeart: number;
  };
}
