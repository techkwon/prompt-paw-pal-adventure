
// Mock GPT service for scoring prompts
// In a real implementation, this would call the OpenAI API

export interface GPTResponse {
  score: number;
  feedback: string;
}

export const evaluatePrompt = async (prompt: string, questionText: string): Promise<GPTResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock scoring logic - in real app, this would be GPT API call
  const promptLength = prompt.length;
  const hasPoliteWords = /안녕|부탁|감사|고마워|제발|도와주세요|부탁드려요|해주세요|가능한지|수 있을까요/.test(prompt);
  const hasSpecificRequest = prompt.length > 20;
  const hasDangerousContent = /비밀번호|주소|전화번호|개인정보|해킹|바이러스/.test(prompt);
  
  let score = 50; // Base score
  let feedback = '';
  
  // Scoring logic
  if (hasPoliteWords) {
    score += 20;
    feedback += '정중한 표현을 사용해서 좋아요! ';
  }
  
  if (hasSpecificRequest) {
    score += 20;
    feedback += '구체적으로 요청해서 훌륭해요! ';
  }
  
  if (promptLength > 50) {
    score += 10;
    feedback += '충분히 자세하게 설명했어요! ';
  }
  
  if (hasDangerousContent) {
    score -= 30;
    feedback = '안전하지 않은 내용이 포함되어 있어요. 다시 시도해보세요. ';
  }
  
  if (!hasPoliteWords && !hasSpecificRequest) {
    feedback = '더 정중하고 구체적으로 요청해보세요! ';
  }
  
  // Ensure score is within bounds
  score = Math.max(0, Math.min(100, score));
  
  // Add encouraging message based on score
  if (score >= 80) {
    feedback += '정말 훌륭한 프롬프트예요! 🌟';
  } else if (score >= 60) {
    feedback += '좋은 시작이에요! 조금 더 구체적으로 써보세요. 😊';
  } else {
    feedback += '안전 수칙을 다시 한번 확인해보세요! 💪';
  }
  
  return { score, feedback };
};
