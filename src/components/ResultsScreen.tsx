
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Animal, Answer } from '@/types/game';

interface ResultsScreenProps {
  mentor: Animal;
  answers: Answer[];
  totalScore: number;
  onSaveScore: (nickname?: string) => Promise<void>;
  onViewLeaderboard: () => void;
  isTopScore: boolean;
}

const ResultsScreen = ({ 
  mentor, 
  answers, 
  totalScore, 
  onSaveScore, 
  onViewLeaderboard,
  isTopScore 
}: ResultsScreenProps) => {
  const [nickname, setNickname] = useState('');
  const [showNicknameInput, setShowNicknameInput] = useState(false);
  
  const averageScore = Math.round(totalScore / answers.length);
  
  const getGrade = (score: number) => {
    if (score >= 90) return { grade: 'S', color: 'text-purple-600', emoji: '🏆' };
    if (score >= 80) return { grade: 'A', color: 'text-blue-600', emoji: '🌟' };
    if (score >= 70) return { grade: 'B', color: 'text-green-600', emoji: '😊' };
    if (score >= 60) return { grade: 'C', color: 'text-yellow-600', emoji: '🙂' };
    return { grade: 'D', color: 'text-red-600', emoji: '💪' };
  };

  const { grade, color, emoji } = getGrade(averageScore);

  const handleSaveScore = async () => {
    await onSaveScore(nickname || undefined);
    onViewLeaderboard();
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="pixel-font text-3xl md:text-4xl text-purple-700">
            🎉 어드벤처 완료!
          </h2>
        </div>

        <div className="retro-card p-8 space-y-6">
          <div className="text-center space-y-6">
            <div className="mentor-bubble bg-green-50 border-green-300">
              <div className="flex items-start gap-3">
                <div className="text-3xl">{mentor.emoji}</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">{mentor.name}의 축하 메시지:</h4>
                  <p className="text-gray-700 leading-relaxed">
                    정말 수고했어요! 안전하고 효과적인 AI 프롬프트 작성법을 잘 배우셨네요. 
                    계속 연습하면 더욱 훌륭한 AI 대화 전문가가 될 수 있을 거예요! 🌟
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8">
              <div className="space-y-4">
                <div className="text-6xl">{emoji}</div>
                <div className={`pixel-font text-6xl ${color}`}>
                  {grade}등급
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  총점: {totalScore}점 / 1000점
                </div>
                <div className="text-lg text-gray-600">
                  평균: {averageScore}점
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
              <h4 className="font-bold text-blue-800 mb-2">📊 미션별 점수</h4>
              <div className="space-y-2">
                {answers.map((answer, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>미션 {index + 1}</span>
                    <span className="font-semibold">{answer.score}점</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
              <h4 className="font-bold text-purple-800 mb-2">🎯 성취도</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>완료한 미션</span>
                  <span className="font-semibold">{answers.length}개</span>
                </div>
                <div className="flex justify-between">
                  <span>최고 점수</span>
                  <span className="font-semibold">{Math.max(...answers.map(a => a.score))}점</span>
                </div>
                <div className="flex justify-between">
                  <span>등급</span>
                  <span className="font-semibold">{grade}등급</span>
                </div>
              </div>
            </div>
          </div>

          {isTopScore && (
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 text-center">
              <div className="text-2xl mb-2">🏆</div>
              <h4 className="font-bold text-yellow-800 mb-4">
                축하합니다! TOP 10에 들 수 있는 점수예요!
              </h4>
              <div className="space-y-4">
                {!showNicknameInput ? (
                  <Button 
                    onClick={() => setShowNicknameInput(true)}
                    className="retro-button"
                  >
                    🏅 랭킹에 등록하기
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <Input
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="닉네임을 입력하세요 (선택사항)"
                      className="max-w-xs mx-auto"
                      maxLength={10}
                    />
                    <div className="flex gap-2 justify-center">
                      <Button onClick={handleSaveScore} className="retro-button">
                        💾 저장하기
                      </Button>
                      <Button 
                        onClick={() => onSaveScore()}
                        variant="outline"
                        className="border-2 border-purple-300"
                      >
                        익명으로 저장
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onViewLeaderboard}
              className="retro-button pixel-font"
            >
              🏆 랭킹 보기
            </Button>
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
              className="border-2 border-purple-300 pixel-font"
            >
              🔄 다시 도전하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
