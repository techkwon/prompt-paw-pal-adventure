
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Animal, Question } from '@/types/game';

interface MissionScreenProps {
  mentor: Animal;
  missions: Question[];
  currentMission: number;
  onSubmitAnswer: (prompt: string) => Promise<void>;
  isLoading: boolean;
}

const MissionScreen = ({ 
  mentor, 
  missions, 
  currentMission, 
  onSubmitAnswer,
  isLoading 
}: MissionScreenProps) => {
  const [prompt, setPrompt] = useState('');
  
  const currentQuestion = missions[currentMission];
  const progress = ((currentMission + 1) / missions.length) * 100;

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    await onSubmitAnswer(prompt);
    setPrompt('');
  };

  const getSamplePrompts = (questionText: string) => {
    const samples = [
      "AI야, 도와줄 수 있을까요?",
      "안녕! 부탁이 있어요!",
      "AI님, 친절하게 알려주세요!",
      "제발 도와주세요!"
    ];
    return samples[Math.floor(Math.random() * samples.length)];
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Progress Header */}
        <div className="retro-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{mentor.emoji}</div>
              <div>
                <h3 className="cute-font text-2xl font-bold text-gray-800">{mentor.name}</h3>
                <p className="cute-font text-lg text-gray-600">함께 도전해봐요!</p>
              </div>
            </div>
            <div className="text-right">
              <div className="pixel-font text-lg text-purple-700">
                미션 {currentMission + 1} / {missions.length}
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between cute-font text-lg text-gray-600">
              <span>진행률</span>
              <span>{Math.round(progress)}% 완료!</span>
            </div>
            <Progress value={progress} className="h-4 rounded-full" />
          </div>
        </div>

        {/* Mission Question */}
        <div className="retro-card p-8 space-y-8">
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-3 rounded-full inline-block">
              <span className="cute-font text-xl">🎯 미션 {currentMission + 1}</span>
            </div>
            <h2 className="cute-font text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed">
              {currentQuestion?.text}
            </h2>
          </div>

          <div className="mentor-bubble">
            <div className="flex items-start gap-4">
              <div className="text-3xl">{mentor.emoji}</div>
              <div className="flex-1">
                <p className="cute-font text-lg text-gray-700 leading-relaxed">
                  안전 수칙을 기억하면서 AI에게 친절하고 구체적으로 말해보세요! 
                  어떻게 부탁하면 좋을까요? 😊
                </p>
                <div className="mt-3 p-3 bg-white rounded-xl border-2 border-yellow-300">
                  <p className="cute-font text-base text-gray-600">
                    💡 예시: "{getSamplePrompts(currentQuestion?.text || '')}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <label className="block cute-font text-xl font-bold text-gray-700">
              ✍️ AI에게 어떻게 말할까요?
            </label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="예: AI야, 친구 생일을 축하하는 따뜻하고 재미있는 편지를 써줄 수 있을까요? 친구가 좋아하는 것들을 포함해서 써주세요!"
              className="min-h-[150px] cute-font text-lg resize-none border-4 border-purple-300 focus:border-pink-400 rounded-2xl p-4"
              disabled={isLoading}
            />
            <div className="cute-font text-base text-gray-500 bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
              💡 팁: "안녕!", "부탁드려요", "감사해요" 같은 정중한 말을 쓰고, 
              구체적으로 설명할수록 더 좋은 답변을 받을 수 있어요!
            </div>
          </div>

          <div className="text-center">
            <Button 
              onClick={handleSubmit}
              disabled={!prompt.trim() || isLoading}
              className="retro-button cute-font text-xl px-10 py-5 disabled:opacity-50"
            >
              {isLoading ? '⏳ 채점 중이에요...' : '📝 답변 제출하기!'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionScreen;
