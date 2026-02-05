import WeatherWidget from '../components/WeatherWidget';

export default function TeamPage() {
    return (
        <div style={{ textAlign: 'center' }}>
            <h2 className="text-2xl font-bold">😎 팀 소개</h2>
            <p>개발자: Bong</p>

            {/* 여기에도 부착! */}
            <WeatherWidget />
        </div>
    );
}