
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

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Progress Header */}
        <div className="retro-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{mentor.emoji}</div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{mentor.name}</h3>
                <p className="text-sm text-gray-600">함께 도전해봐요!</p>
              </div>
            </div>
            <div className="text-right">
              <div className="pixel-font text-lg text-purple-700">
                미션 {currentMission + 1} / {missions.length}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>진행률</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </div>

        {/* Mission Question */}
        <div className="retro-card p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full inline-block">
              <span className="pixel-font text-sm">🎯 미션 {currentMission + 1}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed">
              {currentQuestion?.text}
            </h2>
          </div>

          <div className="mentor-bubble bg-blue-50 border-blue-300">
            <div className="flex items-start gap-3">
              <div className="text-2xl">{mentor.emoji}</div>
              <div>
                <p className="text-gray-700">
                  안전 수칙을 기억하면서 명확하고 정중한 프롬프트를 작성해보세요! 
                  어떻게 AI에게 요청하면 좋을까요?
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">
              ✍️ 당신의 프롬프트를 작성해주세요:
            </label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="예: AI야, 친구 생일을 축하하는 따뜻하고 재미있는 편지를 써줄 수 있을까요? 친구가 좋아하는 것들을 포함해서 써주세요."
              className="min-h-[120px] text-lg resize-none border-2 border-purple-200 focus:border-purple-400"
              disabled={isLoading}
            />
            <div className="text-sm text-gray-500">
              💡 팁: 구체적이고 명확하게 요청할수록 더 좋은 답변을 받을 수 있어요!
            </div>
          </div>

          <div className="text-center">
            <Button 
              onClick={handleSubmit}
              disabled={!prompt.trim() || isLoading}
              className="retro-button pixel-font text-lg px-8 py-4 disabled:opacity-50"
            >
              {isLoading ? '⏳ 채점 중...' : '📝 프롬프트 제출하기!'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionScreen;
