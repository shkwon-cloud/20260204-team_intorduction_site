// src/pages/FashionPage.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import useWeather from '../hooks/useWeather';

interface Member {
    username?: string;
    id?: number;
    name: string;
}

interface MemberDetail {
    username: string;
    name: string;
    location: string;
    style: string;
    gender: string;
    role: string;
    imageUrl?: string;
}

export default function FashionPage() {
    const [members, setMembers] = useState<Member[]>([]);
    const [selectedUsername, setSelectedUsername] = useState<string>('');
    const [memberDetail, setMemberDetail] = useState<MemberDetail | null>(null);
    const { currentTemp, aiRecommendation, loading: weatherLoading, error: weatherError, fetchWeather } = useWeather();
    const [listLoading, setListLoading] = useState(true);

    // 1. 초기 멤버 목록 가져오기
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/members');
                console.log("멤버 데이터 수신:", response.data);

                // 데이터가 배열인 경우와 { members: [] } 형태인 경우 모두 대응
                const data = Array.isArray(response.data) ? response.data : response.data.members || [];

                setMembers(data);
                if (data.length > 0) {
                    // username이 없을 경우 id를 사용하도록 유연하게 처리
                    setSelectedUsername(data[0].username || data[0].id?.toString() || '');
                }
            } catch (err) {
                console.error("멤버 목록 로드 실패:", err);
            } finally {
                setListLoading(false);
            }
        };
        fetchMembers();
    }, []);


    // 2. 멤버 선택 시 세부 정보 및 날씨 가져오기
    useEffect(() => {
        if (!selectedUsername) return;

        const fetchMemberInfo = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/members/${selectedUsername}`);
                const detail = response.data;
                setMemberDetail(detail);

                // 날씨 및 AI 추천 호출
                fetchWeather(detail.location, detail.style, detail.gender);
            } catch (err) {
                console.error("멤버 상세 정보 로드 실패:", err);
            }
        };
        fetchMemberInfo();
    }, [selectedUsername]);

    return (
        <div className="flex flex-col md:flex-row min-h-[80vh] bg-[#fdfdfd] text-slate-900 font-serif">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-8 flex flex-col">
                <h2 className="text-3xl font-black mb-8 tracking-tighter uppercase border-b-4 border-black pb-2">
                    Team<br />Archive
                </h2>

                <div className="space-y-4">
                    <label className="text-xs font-sans font-bold uppercase tracking-widest text-slate-400">Select Member</label>
                    <div className="relative">
                        <select
                            value={selectedUsername}
                            onChange={(e) => setSelectedUsername(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 px-4 font-sans appearance-none focus:outline-none focus:ring-2 focus:ring-black transition"
                        >
                            {listLoading ? (
                                <option>Loading...</option>
                            ) : (
                                members.map(m => (
                                    <option key={m.username || m.id} value={m.username || m.id}>{m.name}</option>
                                ))
                            )}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-100 flex flex-col gap-4">
                    <div className="flex justify-between items-center text-xs font-sans">
                        <span className="text-slate-400">EST. 2024</span>
                        <span className="font-bold">EDITION 01</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 md:p-16 overflow-y-auto">
                {memberDetail ? (
                    <div className="max-w-4xl mx-auto">
                        <header className="mb-12 border-b border-slate-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <p className="text-sm font-sans font-black uppercase tracking-[0.3em] text-blue-600 mb-2">Today's Ensemble</p>
                                <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none uppercase">
                                    {memberDetail.name}
                                </h1>
                                <p className="mt-4 text-xl text-slate-500 italic font-serif">
                                    The {memberDetail.role} based in {memberDetail.location}.
                                </p>
                            </div>
                            <div className="text-right">
                                {weatherLoading ? (
                                    <p className="text-slate-400 animate-pulse font-sans">Loading Weather...</p>
                                ) : weatherError ? (
                                    <p className="text-red-400 font-sans">{weatherError}</p>
                                ) : (
                                    <div className="flex flex-col items-end">
                                        <span className="text-5xl font-black font-sans">{currentTemp}°C</span>
                                        <span className="text-xs font-sans uppercase tracking-widest font-bold bg-black text-white px-2 py-1 mt-2">
                                            {memberDetail.location}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </header>

                        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                            {/* Visual Asset (Placeholder/Mockup for actual fashion magazine feel) */}
                            <div className="aspect-[3/4] bg-slate-100 border border-slate-200 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-white flex items-center justify-center">
                                    <span className="text-slate-300 font-black text-6xl rotate-12 opacity-50 uppercase">Visual</span>
                                </div>
                                {/* In a real app, this would be memberDetail.imageUrl */}
                                <div className="absolute bottom-6 left-6 text-xs font-sans font-bold text-slate-400 uppercase tracking-tighter">
                                    Ref: {memberDetail.style} / {memberDetail.gender}
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="bg-white p-6 border-l-8 border-black shadow-sm">
                                    <h3 className="text-xs underline font-sans font-black uppercase tracking-widest mb-4">The Editorial Recommendation</h3>
                                    {weatherLoading ? (
                                        <div className="space-y-3">
                                            <div className="h-4 bg-slate-100 animate-pulse w-full"></div>
                                            <div className="h-4 bg-slate-100 animate-pulse w-5/6"></div>
                                            <div className="h-4 bg-slate-100 animate-pulse w-4/6"></div>
                                        </div>
                                    ) : (
                                        <p className="text-xl md:text-2xl leading-relaxed text-slate-800 font-serif whitespace-pre-wrap">
                                            "{aiRecommendation}"
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="border border-slate-200 p-4">
                                        <span className="block text-[10px] font-sans font-bold uppercase text-slate-400 mb-1">Preferred Style</span>
                                        <span className="text-lg font-bold font-sans uppercase">{memberDetail.style}</span>
                                    </div>
                                    <div className="border border-slate-200 p-4">
                                        <span className="block text-[10px] font-sans font-bold uppercase text-slate-400 mb-1">Gender Focus</span>
                                        <span className="text-lg font-bold font-sans uppercase">{memberDetail.gender}</span>
                                    </div>
                                </div>

                                <footer className="pt-8 border-t border-slate-100">
                                    <p className="text-[10px] font-sans text-slate-400 leading-tight">
                                        © 2024 Fashion Editorial Team. All recommendations are powered by Gemini AI based on hyper-local weather conditions in {memberDetail.location}.
                                    </p>
                                </footer>
                            </div>
                        </section>
                    </div>
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <p className="text-slate-400 font-sans tracking-widest animate-pulse">SELECT A TEAM MEMBER FROM THE ARCHIVE</p>
                    </div>
                )}
            </main>
        </div>
    );
}
