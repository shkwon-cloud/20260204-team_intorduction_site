// src/components/WeatherWidget.tsx
import useWeather from '../hooks/useWeather';

export default function WeatherWidget() {
    // 훅에서 로직을 빌려옵니다.
    const { currentTemp, hourlyTemps, loading, error, fetchWeather } = useWeather();

    return (
        <div className="border border-gray-200 rounded-xl p-6 text-center max-w-[350px] mx-auto bg-white shadow-md">
            <h3 className="text-xl font-bold mb-2">🌤️ 서울 날씨</h3>

            {/* 로딩 & 에러 처리 */}
            {loading && <p className="text-blue-600">데이터 배달 중... 🚚</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* 데이터가 있을 때만 화면 표시 */}
            {currentTemp !== null && (
                <div>
                    <h2 className="text-4xl font-bold text-blue-600 my-4">{currentTemp}°C</h2>

                    <div className="bg-gray-100 p-3 rounded-lg text-sm">
                        <p>🕛 자정: <strong>{hourlyTemps[0]}°C</strong></p>
                        <p>☀️ 점심: <strong>{hourlyTemps[12]}°C</strong></p>
                        <p>🌙 저녁: <strong>{hourlyTemps[18]}°C</strong></p>
                    </div>
                </div>
            )}

            <button
                onClick={fetchWeather}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition"
            >
                {currentTemp ? '새로고침' : '날씨 불러오기'}
            </button>
        </div>
    );
}