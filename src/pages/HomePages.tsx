import WeatherWidget from '../components/WeatherWidget';

export default function HomePage() {
    return (
        <div style={{ textAlign: 'center' }}>
            <h2 className="text-2xl font-bold">🏠 메인 화면</h2>
            <p>우리 서비스에 오신 것을 환영합니다.</p>
            <hr style={{ margin: '20px 0' }} />

            {/* 위젯 부착! */}
            <WeatherWidget />
        </div>
    );
}