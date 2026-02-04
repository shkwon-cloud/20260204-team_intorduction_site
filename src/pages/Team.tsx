// src/pages/TeamPage.tsx
import { useTeam } from '../hooks/useTeam';
import TeamCard from '../components/TeamCard';
import FilterSection from '../components/FilterSection';

const Team = () => {
    const { members, onlyOnline, toggleFilter } = useTeam();

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">Our Experts</h2>
                <p className="text-slate-400 text-lg">
                    Meet the world-class professionals who make our vision a reality every single day.
                </p>
            </div>

            <FilterSection onlyOnline={onlyOnline} onToggle={toggleFilter} />

            {members.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {members.map((member) => (
                        <TeamCard key={member.id} member={member} />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center space-y-4">
                    <div className="text-slate-800 text-6xl">∅</div>
                    <p className="text-slate-500 font-medium text-lg">No online members found at the moment.</p>
                </div>
            )}
        </div>
    );
};

// src/pages/Team.tsx
export default Team;
