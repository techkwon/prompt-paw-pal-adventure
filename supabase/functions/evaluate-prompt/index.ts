
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('CHATGPT_API');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, questionText } = await req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: `당신은 초등학교 저학년 학생들을 위한 AI 선생님입니다. 학생들이 작성한 AI 프롬프트를 평가해주세요.

평가 기준:
1. 명확성: AI가 이해하기 쉽게 써졌는지
2. 안전성: 안전하고 건전한 내용인지
3. 정중함: 예의바른 표현을 사용했는지

점수는 50점부터 시작해서:
- 정중한 표현 사용: +20점
- 구체적이고 명확한 요청: +20점
- 충분히 자세한 설명: +10점
- 위험하거나 부적절한 내용: -30점

피드백은 매우 친근하고 격려하는 톤으로 1-2문장으로 작성해주세요. 학생들이 더 나은 프롬프트를 쓸 수 있도록 구체적인 조언을 포함해주세요.` 
          },
          { 
            role: 'user', 
            content: `질문: ${questionText}\n\n학생의 프롬프트: ${prompt}\n\n위 프롬프트를 평가해주세요. 점수(0-100)와 친근한 피드백을 JSON 형식으로 응답해주세요: {"score": 점수, "feedback": "피드백"}` 
          }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      const evaluation = JSON.parse(content);
      return new Response(JSON.stringify(evaluation), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      // 만약 JSON 파싱에 실패하면 기본값 반환
      return new Response(JSON.stringify({
        score: 75,
        feedback: "좋은 시도예요! 다음에는 더 구체적으로 써보세요! 😊"
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in evaluate-prompt function:', error);
    return new Response(JSON.stringify({ 
      score: 70,
      feedback: "좋은 프롬프트예요! 계속 연습해봐요! 💪"
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
