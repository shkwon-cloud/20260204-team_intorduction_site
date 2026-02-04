interface Member {
    id: number;
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
}

const members: Member[] = [
    {
        id: 1,
        name: 'Alex Rivera',
        role: 'Lead Architect',
        bio: 'Specializes in cloud infrastructure and distributed systems.',
        imageUrl: 'https://i.pravatar.cc/300?u=alex',
    },
    {
        id: 2,
        name: 'Sarah Chen',
        role: 'UI/UX Designer',
        bio: 'Passionate about creating intuitive and beautiful user interfaces.',
        imageUrl: 'https://i.pravatar.cc/300?u=sarah',
    },
    {
        id: 3,
        name: 'Jordan Lee',
        role: 'Frontend Developer',
        bio: 'Expert in React, Tailwind CSS, and performance optimization.',
        imageUrl: 'https://i.pravatar.cc/300?u=jordan',
    },
    {
        id: 4,
        name: 'Mikael Sund',
        role: 'Product Manager',
        bio: 'Bridge between users and technical teams across global markets.',
        imageUrl: 'https://i.pravatar.cc/300?u=mikael',
    },
];

const Team = () => {
    return (
        <div className="space-y-12">
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold">Meet Our Team</h2>
                <p className="text-slate-400">The talented people behind the project.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {members.map((member) => (
                    <div
                        key={member.id}
                        className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10"
                    >
                        <div className="aspect-square bg-slate-800 overflow-hidden">
                            <img
                                src={member.imageUrl}
                                alt={member.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-6 space-y-2">
                            <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                            <p className="text-sm font-medium text-indigo-400 uppercase tracking-wider">{member.role}</p>
                            <p className="text-sm text-slate-400 line-clamp-2">{member.bio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;
