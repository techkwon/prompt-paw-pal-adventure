
import { Button } from '@/components/ui/button';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
          <h1 className="pixel-font text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 leading-tight">
            🐾 AI 프롬프트
          </h1>
          <h1 className="pixel-font text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-tight">
            어드벤처
          </h1>
        </div>
        
        <div className="retro-card p-8 space-y-6">
          <div className="text-xl md:text-2xl font-semibold text-gray-700">
            🌟 AI와 안전하고 똑똑하게 대화하는 법을 배워보세요! 🌟
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-3xl">🦉</div>
              <div className="text-sm text-gray-600">지혜로운<br/>동물 멘토</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">🎯</div>
              <div className="text-sm text-gray-600">재미있는<br/>미션 10개</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">🏆</div>
              <div className="text-sm text-gray-600">점수 랭킹<br/>도전하기</div>
            </div>
          </div>
          
          <Button 
            onClick={onStart}
            className="retro-button pixel-font text-lg px-8 py-4"
          >
            🚀 어드벤처 시작하기!
          </Button>
        </div>
        
        <div className="text-sm text-gray-500">
          초등학생을 위한 AI 프롬프트 교육 게임
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
