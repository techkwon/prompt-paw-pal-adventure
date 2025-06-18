
import { Button } from '@/components/ui/button';
import { Animal } from '@/types/game';
import { ANIMALS } from '@/data/animals';

interface MentorSelectProps {
  onSelectMentor: (mentor: Animal) => void;
}

const MentorSelect = ({ onSelectMentor }: MentorSelectProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h2 className="pixel-font text-3xl md:text-4xl text-purple-700">
            🌟 멘토를 선택하세요!
          </h2>
          <p className="text-lg text-gray-600">
            함께 모험을 떠날 동물 친구를 골라보세요
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ANIMALS.map((animal) => (
            <div key={animal.id} className="retro-card p-6 text-center space-y-4 hover:scale-105 transition-transform">
              <div className="text-6xl mb-4">{animal.emoji}</div>
              <h3 className="text-2xl font-bold text-gray-800">{animal.name}</h3>
              <p className="text-gray-600 leading-relaxed">{animal.description}</p>
              <div className="bg-purple-100 rounded-lg p-3">
                <span className="text-sm text-purple-700 font-semibold">
                  성격: {animal.personality}
                </span>
              </div>
              <Button 
                onClick={() => onSelectMentor(animal)}
                className="retro-button w-full"
              >
                {animal.name} 선택하기!
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorSelect;
