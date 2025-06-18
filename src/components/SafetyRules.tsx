
import { Button } from '@/components/ui/button';
import { Animal } from '@/types/game';
import { SAFETY_RULES } from '@/data/animals';

interface SafetyRulesProps {
  mentor: Animal;
  onContinue: () => void;
}

const SafetyRules = ({ mentor, onContinue }: SafetyRulesProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        <div className="mentor-bubble">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">{mentor.emoji}</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{mentor.name}</h3>
              <p className="text-gray-600">안전한 AI 프롬프트 작성법을 알려드릴게요!</p>
            </div>
          </div>
        </div>
        
        <div className="retro-card p-8 space-y-6">
          <h2 className="pixel-font text-2xl md:text-3xl text-center text-purple-700">
            🛡️ AI 프롬프트 안전 수칙
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAFETY_RULES.map((rule, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
                <div className="text-center space-y-4">
                  <div className="text-4xl">{rule.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800">{rule.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{rule.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mentor-bubble bg-yellow-50 border-yellow-300">
            <div className="flex items-start gap-3">
              <div className="text-2xl">{mentor.emoji}</div>
              <div>
                <p className="text-gray-700 leading-relaxed">
                  이 세 가지 규칙을 잘 기억해서 안전하고 효과적인 프롬프트를 작성해보세요! 
                  각 미션에서 이 규칙들을 잘 지켰는지 확인해드릴게요. 😊
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              onClick={onContinue}
              className="retro-button pixel-font text-lg px-8 py-4"
            >
              🎯 미션 시작하기!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyRules;
