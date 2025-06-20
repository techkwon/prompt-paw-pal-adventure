
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Animal } from '@/types/game';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Animal;
  score: number;
  feedback: string;
  currentMission: number;
  totalMissions: number;
}

const FeedbackModal = ({ 
  isOpen, 
  onClose, 
  mentor, 
  score, 
  feedback, 
  currentMission, 
  totalMissions 
}: FeedbackModalProps) => {
  const getScoreReaction = (score: number) => {
    if (score >= 95) return { emoji: '🏆', message: '완벽해요!', color: 'text-yellow-600' };
    if (score >= 90) return { emoji: '🌟', message: '정말 훌륭해요!', color: 'text-yellow-600' };
    if (score >= 85) return { emoji: '😍', message: '너무 좋아요!', color: 'text-pink-600' };
    if (score >= 80) return { emoji: '😊', message: '잘했어요!', color: 'text-green-600' };
    if (score >= 75) return { emoji: '🙂', message: '좋아요!', color: 'text-blue-600' };
    if (score >= 70) return { emoji: '😌', message: '괜찮아요!', color: 'text-purple-600' };
    if (score >= 60) return { emoji: '💪', message: '더 열심히!', color: 'text-orange-600' };
    return { emoji: '🔥', message: '계속 도전!', color: 'text-red-600' };
  };

  const reaction = getScoreReaction(score);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl retro-card border-4 border-pink-400">
        <DialogHeader>
          <DialogTitle className="cute-font text-3xl text-center text-purple-700">
            {reaction.emoji} 미션 {currentMission + 1} 결과
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="text-6xl">{reaction.emoji}</div>
            <div className={`cute-font text-5xl font-bold ${reaction.color}`}>
              {score}점
            </div>
            <div className="cute-font text-xl text-gray-600">
              {reaction.message}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6">
              <div 
                className="bg-gradient-to-r from-pink-400 to-purple-400 h-6 rounded-full transition-all duration-1000 flex items-center justify-center"
                style={{ width: `${score}%` }}
              >
                <span className="text-white text-xs font-bold">{score}%</span>
              </div>
            </div>
          </div>

          <div className="mentor-bubble">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{mentor.emoji}</div>
              <div className="flex-1">
                <h4 className="cute-font text-xl font-bold text-gray-800 mb-3">{mentor.name}의 피드백:</h4>
                <p className="cute-font text-lg text-gray-700 leading-relaxed">{feedback}</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button 
              onClick={onClose}
              className="retro-button cute-font text-xl px-10 py-4"
            >
              {currentMission + 1 === totalMissions ? '🏁 최종 결과 보러가기!' : '➡️ 다음 미션 도전!'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
