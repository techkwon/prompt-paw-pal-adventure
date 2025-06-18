
export interface Animal {
  id: string;
  name: string;
  emoji: string;
  description: string;
  personality: string;
}

export interface Question {
  id: string;
  text: string;
  level: string;
  type: string;
}

export interface GameState {
  step: 'start' | 'mentor-select' | 'safety-rules' | 'missions' | 'results' | 'leaderboard';
  selectedMentor?: Animal;
  currentMission: number;
  missions: Question[];
  answers: Answer[];
  totalScore: number;
}

export interface Answer {
  questionId: string;
  prompt: string;
  score: number;
  feedback: string;
}

export interface User {
  id: string;
  mentor: string;
  nickname?: string;
  created_at: string;
}

export interface TopScore {
  user_id: string;
  nickname: string;
  total_score: number;
  created_at: string;
}
