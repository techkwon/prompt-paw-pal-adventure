
import { Animal } from '@/types/game';

export const ANIMALS: Animal[] = [
  {
    id: 'owl',
    name: '올빼미 박사',
    emoji: '🦉',
    description: '지혜로운 올빼미 박사와 함께 똑똑한 프롬프트를 배워요!',
    personality: '차분하고 논리적인'
  },
  {
    id: 'cat',
    name: '고양이 냥이',
    emoji: '🐱',
    description: '귀여운 고양이 냥이와 함께 창의적인 프롬프트를 만들어요!',
    personality: '장난스럽고 창의적인'
  },
  {
    id: 'dolphin',
    name: '돌고래 또리',
    emoji: '🐬',
    description: '똑똑한 돌고래 또리와 함께 안전한 프롬프트를 연습해요!',
    personality: '친근하고 도움이 되는'
  }
];

export const SAFETY_RULES = [
  {
    title: '명확하게 말하기',
    description: 'AI가 이해하기 쉽게 구체적으로 설명해주세요.',
    icon: '💡'
  },
  {
    title: '안전한 내용만',
    description: '다른 사람에게 해가 되거나 위험한 내용은 피해주세요.',
    icon: '🛡️'
  },
  {
    title: '정중하게 요청하기',
    description: '예의 바르고 친절한 말로 AI에게 도움을 요청해주세요.',
    icon: '🤝'
  }
];
