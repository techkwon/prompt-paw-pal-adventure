
// Mock storage service - in real implementation would use Supabase
import { TopScore, User, Answer } from '@/types/game';

const STORAGE_KEYS = {
  TOP_SCORES: 'ai_prompt_adventure_top_scores',
  CURRENT_USER: 'ai_prompt_adventure_current_user'
};

export const saveUser = async (mentor: string, nickname?: string): Promise<User> => {
  const user: User = {
    id: crypto.randomUUID(),
    mentor,
    nickname,
    created_at: new Date().toISOString()
  };
  
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  return user;
};

export const saveScore = async (user: User, answers: Answer[]): Promise<void> => {
  const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
  
  const topScore: TopScore = {
    user_id: user.id,
    nickname: user.nickname || '익명의 모험가',
    total_score: totalScore,
    created_at: user.created_at
  };
  
  const existingScores = getTopScores();
  const updatedScores = [...existingScores, topScore]
    .sort((a, b) => {
      if (b.total_score !== a.total_score) {
        return b.total_score - a.total_score; // Score DESC
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime(); // Date DESC
    })
    .slice(0, 10); // Keep only top 10
  
  localStorage.setItem(STORAGE_KEYS.TOP_SCORES, JSON.stringify(updatedScores));
};

export const getTopScores = (): TopScore[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.TOP_SCORES);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const isTopScore = (totalScore: number): boolean => {
  const topScores = getTopScores();
  if (topScores.length < 10) return true; // Always top 10 if less than 10 scores
  
  const lowestTopScore = topScores[topScores.length - 1]?.total_score || 0;
  return totalScore > lowestTopScore;
};
