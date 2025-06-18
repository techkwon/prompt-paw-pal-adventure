
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { GameState, Animal, Question, Answer, User } from '@/types/game';
import { SAMPLE_QUESTIONS } from '@/data/questions';
import { evaluatePrompt } from '@/services/gptService';
import { saveUser, saveScore, getTopScores, isTopScore } from '@/services/storageService';

import StartScreen from '@/components/StartScreen';
import MentorSelect from '@/components/MentorSelect';
import SafetyRules from '@/components/SafetyRules';
import MissionScreen from '@/components/MissionScreen';
import FeedbackModal from '@/components/FeedbackModal';
import ResultsScreen from '@/components/ResultsScreen';
import Leaderboard from '@/components/Leaderboard';

const Index = () => {
  const { toast } = useToast();
  
  const [gameState, setGameState] = useState<GameState>({
    step: 'start',
    currentMission: 0,
    missions: [],
    answers: [],
    totalScore: 0
  });
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState({ score: 0, feedback: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [topScores, setTopScores] = useState(getTopScores());

  const shuffleQuestions = (questions: Question[]): Question[] => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  };

  const handleStart = () => {
    setGameState(prev => ({ ...prev, step: 'mentor-select' }));
  };

  const handleSelectMentor = (mentor: Animal) => {
    setGameState(prev => ({ 
      ...prev, 
      step: 'safety-rules',
      selectedMentor: mentor 
    }));
  };

  const handleContinueToMissions = () => {
    const missions = shuffleQuestions(SAMPLE_QUESTIONS);
    setGameState(prev => ({ 
      ...prev, 
      step: 'missions',
      missions,
      currentMission: 0,
      answers: [],
      totalScore: 0
    }));
  };

  const handleSubmitAnswer = async (prompt: string) => {
    if (!gameState.selectedMentor || !gameState.missions[gameState.currentMission]) return;
    
    setIsLoading(true);
    
    try {
      const currentQuestion = gameState.missions[gameState.currentMission];
      const evaluation = await evaluatePrompt(prompt, currentQuestion.text);
      
      const newAnswer: Answer = {
        questionId: currentQuestion.id,
        prompt,
        score: evaluation.score,
        feedback: evaluation.feedback
      };

      setCurrentFeedback(evaluation);
      setShowFeedback(true);
      
      const updatedAnswers = [...gameState.answers, newAnswer];
      const updatedTotalScore = gameState.totalScore + evaluation.score;
      
      setGameState(prev => ({
        ...prev,
        answers: updatedAnswers,
        totalScore: updatedTotalScore
      }));

    } catch (error) {
      console.error('Error evaluating prompt:', error);
      toast({
        title: "오류가 발생했습니다",
        description: "다시 시도해주세요.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseFeedback = () => {
    setShowFeedback(false);
    
    if (gameState.currentMission + 1 >= gameState.missions.length) {
      // Game completed
      setGameState(prev => ({ ...prev, step: 'results' }));
    } else {
      // Next mission
      setGameState(prev => ({ 
        ...prev, 
        currentMission: prev.currentMission + 1 
      }));
    }
  };

  const handleSaveScore = async (nickname?: string) => {
    if (!gameState.selectedMentor) return;
    
    try {
      const user = await saveUser(gameState.selectedMentor.id, nickname);
      setCurrentUser(user);
      await saveScore(user, gameState.answers);
      setTopScores(getTopScores());
      
      toast({
        title: "점수가 저장되었습니다!",
        description: "랭킹을 확인해보세요.",
      });
    } catch (error) {
      console.error('Error saving score:', error);
      toast({
        title: "저장 중 오류가 발생했습니다",
        description: "다시 시도해주세요.",
        variant: "destructive"
      });
    }
  };

  const handleViewLeaderboard = () => {
    setGameState(prev => ({ ...prev, step: 'leaderboard' }));
  };

  const handleBackFromLeaderboard = () => {
    setGameState(prev => ({ ...prev, step: 'results' }));
  };

  useEffect(() => {
    setTopScores(getTopScores());
  }, []);

  return (
    <div className="min-h-screen">
      {gameState.step === 'start' && (
        <StartScreen onStart={handleStart} />
      )}
      
      {gameState.step === 'mentor-select' && (
        <MentorSelect onSelectMentor={handleSelectMentor} />
      )}
      
      {gameState.step === 'safety-rules' && gameState.selectedMentor && (
        <SafetyRules 
          mentor={gameState.selectedMentor} 
          onContinue={handleContinueToMissions} 
        />
      )}
      
      {gameState.step === 'missions' && gameState.selectedMentor && (
        <>
          <MissionScreen
            mentor={gameState.selectedMentor}
            missions={gameState.missions}
            currentMission={gameState.currentMission}
            onSubmitAnswer={handleSubmitAnswer}
            isLoading={isLoading}
          />
          
          <FeedbackModal
            isOpen={showFeedback}
            onClose={handleCloseFeedback}
            mentor={gameState.selectedMentor}
            score={currentFeedback.score}
            feedback={currentFeedback.feedback}
            currentMission={gameState.currentMission}
            totalMissions={gameState.missions.length}
          />
        </>
      )}
      
      {gameState.step === 'results' && gameState.selectedMentor && (
        <ResultsScreen
          mentor={gameState.selectedMentor}
          answers={gameState.answers}
          totalScore={gameState.totalScore}
          onSaveScore={handleSaveScore}
          onViewLeaderboard={handleViewLeaderboard}
          isTopScore={isTopScore(gameState.totalScore)}
        />
      )}
      
      {gameState.step === 'leaderboard' && (
        <Leaderboard
          topScores={topScores}
          onBack={handleBackFromLeaderboard}
        />
      )}
    </div>
  );
};

export default Index;
