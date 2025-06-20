
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
  
  const getAnimalGrade = (score: number) => {
    if (score >= 95) return { 
      animal: '🦅', 
      title: '독수리 급', 
      message: '하늘 높이 나는 독수리처럼 완벽해요!', 
      color: 'text-yellow-600',
      bgColor: 'bg-gradient-to-r from-yellow-100 to-orange-100'
    };
    if (score >= 90) return { 
      animal: '🐅', 
      title: '호랑이 급', 
      message: '용감한 호랑이처럼 멋져요!', 
      color: 'text-orange-600',
      bgColor: 'bg-gradient-to-r from-orange-100 to-red-100'
    };
    if (score >= 85) return { 
      animal: '🐺', 
      title: '늑대 급', 
      message: '똑똑한 늑대처럼 훌륭해요!', 
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-r from-blue-100 to-purple-100'
    };
    if (score >= 80) return { 
      animal: '🦊', 
      title: '여우 급', 
      message: '영리한 여우처럼 잘했어요!', 
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-r from-purple-100 to-pink-100'
    };
    if (score >= 75) return { 
      animal: '🐰', 
      title: '토끼 급', 
      message: '귀여운 토끼처럼 깡총깡총 발전해요!', 
      color: 'text-pink-600',
      bgColor: 'bg-gradient-to-r from-pink-100 to-purple-100'
    };
    if (score >= 70) return { 
      animal: '🐨', 
      title: '코알라 급', 
      message: '느긋한 코알라처럼 천천히 배워가요!', 
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-r from-green-100 to-blue-100'
    };
    if (score >= 65) return { 
      animal: '🐼', 
      title: '판다 급', 
      message: '사랑스러운 판다처럼 더 열심히 해봐요!', 
      color: 'text-gray-600',
      bgColor: 'bg-gradient-to-r from-gray-100 to-green-100'
    };
    if (score >= 60) return { 
      animal: '🐹', 
      title: '햄스터 급', 
      message: '바쁜 햄스터처럼 더 많이 연습해봐요!', 
      color: 'text-yellow-600',
      bgColor: 'bg-gradient-to-r from-yellow-100 to-orange-100'
    };
    return { 
      animal: '🐣', 
      title: '병아리 급', 
      message: '작은 병아리도 언젠가 하늘을 날아요! 포기하지 말고 계속 도전해요!', 
      color: 'text-yellow-500',
      bgColor: 'bg-gradient-to-r from-yellow-50 to-orange-50'
    };
  };

  const animalGrade = getAnimalGrade(averageScore);

  const handleSaveScore = async () => {
    await onSaveScore(nickname || undefined);
    onViewLeaderboard();
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h2 className="cute-font text-4xl md:text-5xl text-purple-700">
            🎉 와! 모든 미션 완료! 🎉
          </h2>
          <div className="text-2xl">축하해요! 정말 잘했어요! ✨</div>
        </div>

        <div className="retro-card p-6 space-y-6">
          <div className="mentor-bubble">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{mentor.emoji}</div>
              <div className="flex-1">
                <h4 className="cute-font text-xl font-bold text-gray-800 mb-3">{mentor.name}의 축하 메시지:</h4>
                <p className="cute-font text-lg text-gray-700 leading-relaxed">
                  우와! 정말 대단해요! 🌟 안전하고 똑똑한 AI 프롬프트 쓰는 법을 잘 배웠네요! 
                  계속 연습하면 AI와 더 재미있게 대화할 수 있을 거예요! 💪
                </p>
              </div>
            </div>
          </div>

          <div className={`${animalGrade.bgColor} rounded-3xl p-8 border-4 border-yellow-300`}>
            <div className="text-center space-y-4">
              <div className="text-8xl">{animalGrade.animal}</div>
              <div className={`cute-font text-3xl font-bold ${animalGrade.color}`}>
                {animalGrade.title}
              </div>
              <div className="cute-font text-xl text-gray-700 max-w-md mx-auto">
                {animalGrade.message}
              </div>
              <div className="score-display inline-block">
                <div className="cute-font text-2xl font-bold text-gray-800">
                  총점: {totalScore}점 / 1000점
                </div>
                <div className="cute-font text-lg text-gray-600">
                  평균: {averageScore}점
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-3 border-blue-300">
              <h4 className="cute-font text-xl font-bold text-blue-800 mb-4">📊 미션별 점수</h4>
              <div className="space-y-3">
                {answers.map((answer, index) => (
                  <div key={index} className="flex justify-between items-center bg-white rounded-xl p-3">
                    <span className="cute-font text-lg">미션 {index + 1}</span>
                    <span className="cute-font text-lg font-bold text-purple-700">{answer.score}점</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border-3 border-pink-300">
              <h4 className="cute-font text-xl font-bold text-pink-800 mb-4">🎯 나의 성과</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-white rounded-xl p-3">
                  <span className="cute-font text-lg">완료한 미션</span>
                  <span className="cute-font text-lg font-bold text-purple-700">{answers.length}개</span>
                </div>
                <div className="flex justify-between items-center bg-white rounded-xl p-3">
                  <span className="cute-font text-lg">최고 점수</span>
                  <span className="cute-font text-lg font-bold text-purple-700">{Math.max(...answers.map(a => a.score))}점</span>
                </div>
                <div className="flex justify-between items-center bg-white rounded-xl p-3">
                  <span className="cute-font text-lg">동물 등급</span>
                  <span className="cute-font text-lg font-bold text-purple-700">{animalGrade.title}</span>
                </div>
              </div>
            </div>
          </div>

          {isTopScore && (
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-4 border-yellow-400 rounded-3xl p-6 text-center">
              <div className="text-4xl mb-3">🏆</div>
              <h4 className="cute-font text-2xl font-bold text-yellow-800 mb-4">
                축하해요! TOP 10에 들 수 있는 점수예요!
              </h4>
              <div className="space-y-4">
                {!showNicknameInput ? (
                  <Button 
                    onClick={() => setShowNicknameInput(true)}
                    className="retro-button cute-font text-xl"
                  >
                    🏅 랭킹에 내 이름 올리기
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <Input
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="내 이름을 써주세요 (안 써도 돼요!)"
                      className="max-w-xs mx-auto cute-font text-lg border-3 border-purple-300 rounded-xl p-3"
                      maxLength={10}
                    />
                    <div className="flex gap-3 justify-center">
                      <Button onClick={handleSaveScore} className="retro-button cute-font">
                        💾 저장하기
                      </Button>
                      <Button 
                        onClick={() => onSaveScore()}
                        variant="outline"
                        className="border-3 border-purple-300 cute-font text-lg rounded-xl"
                      >
                        이름 없이 저장
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
              className="retro-button cute-font text-xl"
            >
              🏆 랭킹 보기
            </Button>
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
              className="border-3 border-purple-300 cute-font text-xl rounded-xl"
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
