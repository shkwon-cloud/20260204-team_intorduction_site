// src/hooks/useWeather.ts
import { useState } from 'react';
import axios from 'axios';

// 1. Gemini SDK 불러오기
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function useWeather() {
    // 1. 상태(State) 바구니들
    const [currentTemp, setCurrentTemp] = useState<number | null>(null);
    const [hourlyTemps, setHourlyTemps] = useState<number[]>([]);

    // 2. 옷차림 추천을 담을 State 추가
    const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ============================================================
    // 함수 A: 데이터 심부름꾼 (getWeatherData)
    // 역할: 오직 Axios로 데이터를 가져와서 리턴만 함 (State 모름)
    // ============================================================
    const getWeatherData = async () => {
        const url = "https://api.open-meteo.com/v1/forecast?latitude=37.5&longitude=126.9&current_weather=true&hourly=temperature_2m";
        const response = await axios.get(url);
        return response.data; // 데이터를 밖으로 던져줍니다.
    };


    // ============================================================
    // 함수 C: AI 스타일리스트 (getAiRecommendation) - NEW! ⭐
    // 역할: 기온을 입력받아 Gemini에게 옷차림을 물어봄
    // ============================================================
    const getAiRecommendation = async (temp: number) => {
        try {
            // 1. API Key로 Gemini 연결 (Vite 방식)
            const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            // 2. 프롬프트 작성 (구체적일수록 좋습니다)
            const prompt = `현재 서울 기온이 섭씨 ${temp}도야. 이 날씨에 어울리는 한국의 20대 남성 옷차림을 3줄 이내로 간결하게 추천해줘. 말투는 친근한 스타일리스트처럼 해줘.`;

            // 3. 질문하고 답변 받기
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // 4. 답변을 State에 저장
            setAiRecommendation(text);

        } catch (error) {
            console.error("AI 추천 실패:", error);
            setAiRecommendation("AI 스타일리스트가 잠시 자리를 비웠어요. 😅");
        }
    };




    // ============================================================
    // 함수 B: 화면 관리자 (fetchWeather)
    // 역할: 로딩 켜고, 심부름꾼(A) 시키고, 받아온 걸 State에 담음
    // ============================================================
    const fetchWeather = async () => {
        try {
            setLoading(true);
            setError(null);
            setCurrentTemp(null);
            setHourlyTemps([]);

            // 추천 멘트도 초기화
            setAiRecommendation(null);

            // 1. 심부름꾼에게 다녀오라고 시킴
            const data = await getWeatherData();

            // 2. 받아온 데이터를 State에 예쁘게 정리
            setCurrentTemp(data.current_weather.temperature);
            setHourlyTemps(data.hourly.temperature_2m);

            // ★ 중요: 날씨 데이터를 받자마자 AI에게 추천을 의뢰합니다.
            // (await를 걸지 않아서, 날씨가 먼저 뜨고 AI 답변은 나중에 뜹니다)
            getAiRecommendation(data.current_weather.temperature);

        } catch (err) {
            setError("날씨 데이터를 가져오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // 컴포넌트는 심부름꾼(getWeatherData)은 몰라도 되고, 
    // 관리자(fetchWeather)와 결과값들만 알면 됩니다.
    //return { currentTemp, hourlyTemps, loading, error, fetchWeather };
    return { currentTemp, hourlyTemps, aiRecommendation, loading, error, fetchWeather };

}