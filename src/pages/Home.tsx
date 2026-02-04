// src/pages/Home.tsx
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-12 animate-in fade-in zoom-in duration-1000">
            <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-tight">
                    NEXT GEN <br />
                    <span className="text-indigo-500">TEAM ALPHA</span>
                </h1>
                <p className="max-w-xl mx-auto text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
                    Pioneering the future of digital architecture. We build systems that don't just work—they inspire.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                    to="/team"
                    className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all transform hover:-translate-y-1 active:scale-95"
                >
                    VIEW OUR TEAM
                </Link>
                <Link
                    to="/about"
                    className="w-full sm:w-auto px-10 py-4 border border-white/10 text-white font-black rounded-xl hover:bg-white/5 transition-all active:scale-95"
                >
                    OUR MISSION
                </Link>
            </div>

            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                <div className="text-sm font-black tracking-widest uppercase">Intel</div>
                <div className="text-sm font-black tracking-widest uppercase">Google</div>
                <div className="text-sm font-black tracking-widest uppercase">Meta</div>
                <div className="text-sm font-black tracking-widest uppercase">Apple</div>
            </div>
        </div>
    );
};

export default Home;
