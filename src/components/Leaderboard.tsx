
import { Button } from '@/components/ui/button';
import { TopScore } from '@/types/game';

interface LeaderboardProps {
  topScores: TopScore[];
  onBack: () => void;
}

const Leaderboard = ({ topScores, onBack }: LeaderboardProps) => {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '🏅';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="pixel-font text-3xl md:text-4xl text-purple-700">
            🏆 TOP 10 랭킹
          </h2>
          <p className="text-lg text-gray-600">
            AI 프롬프트 어드벤처 최고 기록들
          </p>
        </div>

        <div className="retro-card p-8">
          {topScores.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="text-6xl">🎯</div>
              <p className="text-xl text-gray-600">
                아직 등록된 기록이 없어요!
              </p>
              <p className="text-gray-500">
                첫 번째 랭커가 되어보세요!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {topScores.map((score, index) => (
                <div 
                  key={`${score.user_id}-${score.created_at}`}
                  className={`
                    flex items-center justify-between p-4 rounded-xl border-2 
                    ${index < 3 
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300' 
                      : 'bg-gray-50 border-gray-200'
                    }
                    hover:scale-105 transition-transform
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getRankIcon(index + 1)}</span>
                      <span className="pixel-font text-lg font-bold text-gray-700">
                        {index + 1}위
                      </span>
                    </div>
                    
                    <div>
                      <div className="font-bold text-gray-800">
                        {score.nickname || '익명의 모험가'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(score.created_at)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="pixel-font text-xl font-bold text-purple-600">
                      {score.total_score}점
                    </div>
                    <div className="text-sm text-gray-500">
                      평균 {Math.round(score.total_score / 10)}점
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center space-y-4">
          <Button 
            onClick={onBack}
            className="retro-button pixel-font px-8 py-3"
          >
            ⬅️ 돌아가기
          </Button>
          
          <div className="text-sm text-gray-500">
            점수는 총 10개 미션의 합계입니다 (최대 1000점)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
