// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Team from './pages/Team';
import About from './pages/About';
import WeatherPage from './pages/WeatherPage'; // 임포트 추가


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="team" element={<Team />} />
          <Route path="about" element={<About />} />
          {/* 날씨 페이지 경로 추가 */}
          <Route path="weather" element={<WeatherPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
