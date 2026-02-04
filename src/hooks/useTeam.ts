// src/hooks/useTeam.ts
import { useState, useMemo } from 'react';
import { TeamMember } from '../types/team';

const MOCK_MEMBERS: TeamMember[] = [
    {
        id: 1,
        name: 'Alex Rivera',
        role: 'Lead Architect',
        bio: 'Specializes in cloud infrastructure and distributed systems.',
        imageUrl: 'https://i.pravatar.cc/300?u=alex',
        isOnline: true,
    },
    {
        id: 2,
        name: 'Sarah Chen',
        role: 'UI/UX Designer',
        bio: 'Passionate about creating intuitive and beautiful user interfaces.',
        imageUrl: 'https://i.pravatar.cc/300?u=sarah',
        isOnline: false,
    },
    {
        id: 3,
        name: 'Jordan Lee',
        role: 'Frontend Developer',
        bio: 'Expert in React, Tailwind CSS, and performance optimization.',
        imageUrl: 'https://i.pravatar.cc/300?u=jordan',
        isOnline: true,
    },
    {
        id: 4,
        name: 'Mikael Sund',
        role: 'Product Manager',
        bio: 'Bridge between users and technical teams across global markets.',
        imageUrl: 'https://i.pravatar.cc/300?u=mikael',
        isOnline: false,
    },
];

export const useTeam = () => {
    const [onlyOnline, setOnlyOnline] = useState(false);

    const filteredMembers = useMemo(() => {
        return onlyOnline
            ? MOCK_MEMBERS.filter(member => member.isOnline)
            : MOCK_MEMBERS;
    }, [onlyOnline]);

    const toggleFilter = () => setOnlyOnline(prev => !prev);

    return {
        members: filteredMembers,
        onlyOnline,
        toggleFilter,
    };
};
