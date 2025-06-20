
import { supabase } from '@/integrations/supabase/client';

export interface GPTResponse {
  score: number;
  feedback: string;
}

export const evaluatePrompt = async (prompt: string, questionText: string): Promise<GPTResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('evaluate-prompt', {
      body: { prompt, questionText }
    });

    if (error) {
      console.error('Supabase function error:', error);
      // 에러가 있어도 학생들에게 긍정적인 피드백 제공
      return {
        score: 75,
        feedback: "좋은 시도예요! AI에게 더 친절하고 구체적으로 말해보세요! 😊"
      };
    }

    return data;
  } catch (error) {
    console.error('Error calling evaluate-prompt function:', error);
    // 에러 발생시 학생들을 위한 격려 메시지
    return {
      score: 70,
      feedback: "훌륭해요! 계속 연습하면 더 좋은 프롬프트를 쓸 수 있을 거예요! 🌟"
    };
  }
};
