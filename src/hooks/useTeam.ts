import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import type { TeamMember } from '../types/team.ts';

export const useTeam = () => {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [onlyOnline, setOnlyOnline] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/members');
                // 데이터가 배열인지 확인 (FastAPI가 { members: [] } 형태로 줄 수도 있음)
                const data = Array.isArray(response.data) ? response.data : response.data.members || [];
                setMembers(data);
            } catch (err) {
                console.error("멤버 목록 전역 로드 실패:", err);
                setError("팀원 목록을 불러오는데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    const filteredMembers = useMemo(() => {
        return onlyOnline
            ? members.filter(member => member.isOnline)
            : members;
    }, [onlyOnline, members]);

    const toggleFilter = () => setOnlyOnline(prev => !prev);

    return {
        members: filteredMembers,
        onlyOnline,
        toggleFilter,
        loading,
        error
    };
};
