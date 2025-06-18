
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
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return '🏆';
    if (score >= 80) return '🌟';
    if (score >= 70) return '😊';
    if (score >= 60) return '🙂';
    return '💪';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl retro-card border-4 border-purple-300">
        <DialogHeader>
          <DialogTitle className="pixel-font text-2xl text-center text-purple-700">
            {getScoreEmoji(score)} 미션 {currentMission + 1} 결과
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <div className={`pixel-font text-4xl mb-2 ${getScoreColor(score)}`}>
              {score}점
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>

          <div className="mentor-bubble bg-purple-50 border-purple-300">
            <div className="flex items-start gap-3">
              <div className="text-3xl">{mentor.emoji}</div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">{mentor.name}의 피드백:</h4>
                <p className="text-gray-700 leading-relaxed">{feedback}</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button 
              onClick={onClose}
              className="retro-button pixel-font px-8 py-3"
            >
              {currentMission + 1 === totalMissions ? '🏁 최종 결과 보기!' : '➡️ 다음 미션으로!'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
