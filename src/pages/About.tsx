// src/pages/About.tsx
const About = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-24 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <section className="text-center space-y-8">
                <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white uppercase italic">
                    We move <br />
                    <span className="text-indigo-500">the world.</span>
                </h2>
                <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
                    Our team unites the brightest minds in engineering and design to solve the
                    most complex challenges of the digital age.
                </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-4 p-8 border border-white/5 rounded-3xl bg-white/[0.02]">
                    <div className="text-indigo-500 text-3xl font-black">01.</div>
                    <h4 className="text-xl font-bold text-white">Innovation</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        We don't follow trends. We set them by constantly pushing the boundaries of what's possible.
                    </p>
                </div>
                <div className="space-y-4 p-8 border border-white/5 rounded-3xl bg-white/[0.02] transform md:translate-y-8">
                    <div className="text-indigo-500 text-3xl font-black">02.</div>
                    <h4 className="text-xl font-bold text-white">Integrity</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Transparency and trust are at the core of everything we build and every relationship we form.
                    </p>
                </div>
                <div className="space-y-4 p-8 border border-white/5 rounded-3xl bg-white/[0.02]">
                    <div className="text-indigo-500 text-3xl font-black">03.</div>
                    <h4 className="text-xl font-bold text-white">Impact</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Every line of code we write is designed to have a meaningful and positive impact on the world.
                    </p>
                </div>
            </div>

            <section className="pt-24 border-t border-white/5 flex flex-col items-center space-y-8">
                <h3 className="text-3xl font-bold text-white">Ready to join us?</h3>
                <button className="px-12 py-5 bg-white text-black font-black rounded-full hover:bg-slate-200 transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-white/10">
                    CAREERS AT INTEL TEAM
                </button>
            </section>
        </div>
    );
};

export default About;
