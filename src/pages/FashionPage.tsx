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
    const { currentTemp, aiRecommendation, loading: weatherLoading, fetchWeather } = useWeather();
    const [listLoading, setListLoading] = useState(true);

    // 1. 초기 멤버 목록 가져오기
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/members');
                console.log("멤버 데이터 수신:", response.data);
                const data = Array.isArray(response.data) ? response.data : response.data.members || [];
                setMembers(data);
                if (data.length > 0) {
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
                fetchWeather(detail.location, detail.style, detail.gender);
            } catch (err) {
                console.error("멤버 상세 정보 로드 실패:", err);
            }
        };
        fetchMemberInfo();
    }, [selectedUsername]);

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#fafaf9] text-slate-900 font-serif overflow-hidden">
            {/* Sidebar / Archive Navigator */}
            <aside className="w-full md:w-80 bg-white border-r border-slate-200 p-10 flex flex-col h-screen sticky top-0 overflow-y-auto z-10">
                <div className="mb-12">
                    <span className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-slate-400 block mb-4">Volume 01 / Archive</span>
                    <h2 className="text-4xl font-black mb-8 tracking-tighter uppercase leading-[0.85] border-b-8 border-black pb-6">
                        Fashion<br />Intelligence
                    </h2>
                </div>

                <div className="space-y-6 flex-1">
                    <div className="group">
                        <label className="text-[11px] font-sans font-bold uppercase tracking-widest text-slate-500 mb-3 block group-hover:text-black transition-colors">Select Subject</label>
                        <div className="relative">
                            <select
                                value={selectedUsername}
                                onChange={(e) => setSelectedUsername(e.target.value)}
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-none py-4 px-5 font-sans appearance-none focus:outline-none focus:border-black transition-all cursor-pointer text-sm font-bold tracking-tight"
                            >
                                {listLoading ? (
                                    <option>Loading Database...</option>
                                ) : (
                                    members.map(m => (
                                        <option key={m.username || m.id} value={m.username || m.id}>{m.name}</option>
                                    ))
                                )}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-900">
                                <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100 mt-12">
                        <p className="text-xs font-sans text-slate-400 leading-relaxed italic">
                            This archive cross-references team personality with real-time meteorological data to produce bespoke aesthetic recommendations.
                        </p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-200">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <span className="block text-[10px] font-bold font-sans uppercase">Editorial</span>
                            <span className="block text-[10px] font-medium font-sans text-slate-400">© 2024 AI Fashion Lab.</span>
                        </div>
                        <span className="text-2xl font-black italic">01</span>
                    </div>
                </div>
            </aside>

            {/* Main Content / The Page */}
            <main className="flex-1 p-6 md:p-20 overflow-y-auto bg-white/50 backdrop-blur-sm">
                {memberDetail ? (
                    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-right-12 duration-1000">
                        {/* Hero Header */}
                        <header className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-10 items-end border-b border-black pb-12">
                            <div className="md:col-span-8">
                                <span className="inline-block px-3 py-1 bg-black text-white text-[10px] font-sans font-black uppercase tracking-widest mb-6">Editorial Feature</span>
                                <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] uppercase mb-8">
                                    {memberDetail.name}
                                </h1>
                                <div className="flex items-center gap-6">
                                    <div className="h-px w-20 bg-black"></div>
                                    <p className="text-2xl text-slate-600 font-serif italic italic-600">
                                        The {memberDetail.role}
                                    </p>
                                </div>
                            </div>
                            <div className="md:col-span-4 text-left md:text-right border-l md:border-l-0 md:border-r-0 border-slate-200 pl-8 md:pl-0">
                                {weatherLoading ? (
                                    <div className="space-y-2 animate-pulse">
                                        <div className="h-12 bg-slate-100 w-24 ml-auto"></div>
                                        <div className="h-4 bg-slate-100 w-32 ml-auto"></div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col md:items-end">
                                        <span className="text-7xl font-sans font-black tracking-tighter">{currentTemp}°</span>
                                        <span className="text-sm font-sans font-black uppercase tracking-widest mt-2">{memberDetail.location} / Local Standard</span>
                                    </div>
                                )}
                            </div>
                        </header>

                        {/* Content Grid */}
                        <section className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
                            {/* Left Side: Visual & Meta */}
                            <div className="lg:col-span-5 space-y-12">
                                <div className="aspect-[3/4] bg-slate-100 border-4 border-black relative group shadow-2xl">
                                    <div className="absolute inset-4 border border-white/20 z-0"></div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-white flex items-center justify-center -z-10">
                                        <span className="text-slate-200 font-black text-8xl -rotate-45 uppercase opacity-30 select-none">Portrait</span>
                                    </div>
                                    {memberDetail.imageUrl && (
                                        <img src={memberDetail.imageUrl} alt={memberDetail.name} className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-multiply opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-700" />
                                    )}
                                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-black flex items-center justify-center p-4">
                                        <span className="text-white text-[10px] font-sans font-bold uppercase tracking-widest text-center">Reference Stylist Code: {memberDetail.style.slice(0, 3)}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-px bg-slate-200 border border-slate-200">
                                    <div className="bg-white p-6">
                                        <span className="block text-[10px] font-sans font-black uppercase text-slate-400 mb-2">Preferred Style</span>
                                        <span className="text-lg font-bold font-sans uppercase tracking-tight">{memberDetail.style}</span>
                                    </div>
                                    <div className="bg-white p-6">
                                        <span className="block text-[10px] font-sans font-black uppercase text-slate-400 mb-2">Gender Focus</span>
                                        <span className="text-lg font-bold font-sans uppercase tracking-tight">{memberDetail.gender}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Editorial Body */}
                            <div className="lg:col-span-7 space-y-16">
                                <div className="relative">
                                    <span className="absolute -top-10 -left-6 text-[120px] font-black text-slate-50 select-none z-[-1]">AI</span>
                                    <div className="bg-white p-12 border-4 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all">
                                        <h3 className="text-xs font-sans font-black uppercase tracking-[0.4em] mb-8 flex items-center gap-4">
                                            The Recommended Ensemble
                                            <div className="h-px flex-1 bg-slate-200"></div>
                                        </h3>

                                        {weatherLoading ? (
                                            <div className="space-y-6">
                                                <div className="h-8 bg-slate-100 animate-pulse w-full"></div>
                                                <div className="h-8 bg-slate-100 animate-pulse w-5/6"></div>
                                                <div className="h-8 bg-slate-100 animate-pulse w-4/6"></div>
                                            </div>
                                        ) : (
                                            <div className="relative">
                                                <span className="text-6xl text-slate-200 absolute -top-4 -left-6 font-serif select-none">“</span>
                                                <p className="text-2xl md:text-3xl leading-[1.4] text-slate-800 font-serif font-medium whitespace-pre-wrap relative z-10 italic">
                                                    {aiRecommendation}
                                                </p>
                                                <span className="text-6xl text-slate-200 absolute -bottom-10 right-0 font-serif translate-y-4 select-none">”</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-8 border-t border-black pt-12">
                                    <div className="flex items-start gap-10">
                                        <span className="text-5xl font-black text-black leading-none">02</span>
                                        <div className="space-y-4">
                                            <h4 className="text-lg font-black uppercase tracking-tight">Technical Analysis</h4>
                                            <p className="text-sm text-slate-500 font-sans leading-relaxed">
                                                Utilizing Gemini Advanced, we analyze local meteorological vectors including temperature, humidity, and wind chill to synthesize a sartorial recommendation that balances functional utility with {memberDetail.style} aesthetics.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Pagination / Footer */}
                        <footer className="mt-40 pt-10 border-t border-slate-200 flex justify-between items-center text-[10px] font-sans font-bold uppercase tracking-widest text-slate-400">
                            <span>Intelligence Report No. 88204</span>
                            <div className="flex gap-8">
                                <span>Page 174</span>
                                <span>Section Fashion</span>
                            </div>
                        </footer>
                    </div>
                ) : (
                    <div className="flex h-full items-center justify-center flex-col gap-8 opacity-20">
                        <div className="text-9xl font-black tracking-tighter uppercase grayscale">Select</div>
                        <p className="max-w-xs text-center font-sans font-black tracking-widest uppercase text-xs animate-pulse">Select a subject from the archive to begin aesthetic synthesis</p>
                    </div>
                )}
            </main>
        </div>
    );
}

