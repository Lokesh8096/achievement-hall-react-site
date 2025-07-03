import Navbar from "@/components/Navbar";
import { useStudents } from "@/hooks/useStudents";
import { Trophy, Medal, Award } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const Leaderboard = () => {
  const { students, loading } = useStudents();
  const [selectedHackathon, setSelectedHackathon] = useState('All');

  const filteredStudents = selectedHackathon === 'All'
    ? students
    : students.filter(s => s.hackathon_count === Number(selectedHackathon));

  const getTeamRankings = () => {
    const teamMap = new Map();
    
    filteredStudents.forEach(student => {
      if (teamMap.has(student.team_name)) {
        const team = teamMap.get(student.team_name);
        team.totalScore += student.score;
        team.memberCount += 1;
      } else {
        teamMap.set(student.team_name, {
          name: student.team_name,
          totalScore: student.score,
          memberCount: 1
        });
      }
    });

    const teams = Array.from(teamMap.values()).map(team => ({
      ...team,
      averageScore: Math.round(team.totalScore / team.memberCount)
    }));

    return teams.sort((a, b) => b.averageScore - a.averageScore);
  };

  const teamRankings = loading ? [] : getTeamRankings();

  const getBadgeIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-8 w-8 text-yellow-500" />;
      case 2:
        return <Medal className="h-8 w-8 text-gray-400" />;
      case 3:
        return <Award className="h-8 w-8 text-amber-600" />;
      default:
        return null;
    }
  };

  const getBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500";
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600";
      default:
        return "bg-gradient-to-r from-blue-400 to-blue-600";
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pt-16">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-white">Team Leaderboard</h1>
          <p className="text-lg text-gray-600 text-white">Rankings based on team average scores</p>
          {/* Hackathon Filter Dropdown */}
          <div className="mt-6 flex justify-center">
            <select
              value={selectedHackathon}
              onChange={e => setSelectedHackathon(e.target.value)}
              className="px-4 py-2 rounded-md bg-[#1e293b] text-white border border-gray-600 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Hackathons</option>
              {[1,2].map(count => (
                <option key={count} value={count}>{`Hackathon-${count}`}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <>
            {/* Top 3 Teams Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-xl p-6 text-center">
                  <Skeleton className="h-8 w-8 mx-auto mb-4 bg-white/20" />
                  <Skeleton className="h-8 w-32 mx-auto mb-2 bg-white/20" />
                  <Skeleton className="h-8 w-16 mx-auto mb-2 bg-white/20" />
                  <Skeleton className="h-4 w-24 mx-auto bg-white/20" />
                </div>
              ))}
            </div>

            {/* Table Skeleton */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b">
                <Skeleton className="h-6 w-48" />
              </div>
              <div className="p-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-6 py-4 border-b last:border-b-0">
                    <Skeleton className="h-6 w-12" />
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Top 3 Teams */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {teamRankings.slice(0, 3).map((team, index) => {
                const rank = index + 1;
                return (
                  <div
                    key={team.name}
                    className={`${getBadgeColor(rank)} text-white rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300`}
                  >
                    <div className="flex justify-center mb-4">
                      {getBadgeIcon(rank)}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{team.name}</h3>
                    <div className="text-3xl font-bold mb-2">{team.averageScore}</div>
                    <div className="text-sm opacity-90">Average Score</div>
                    <div className="text-sm opacity-90">{team.memberCount} Members</div>
                  </div>
                );
              })}
            </div>

            {/* Full Rankings Table */}
<div className="bg-[#818ea1] rounded-xl shadow-lg overflow-hidden">
  <div className="px-6 py-4 border-b border-gray-700">
    <h2 className="text-xl font-bold text-white">Complete Rankings</h2>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full text-white">
      <thead className="bg-[#111827] border-b border-gray-700">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-white-400 uppercase tracking-wider">Rank</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white-400 uppercase tracking-wider">Team Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white-400 uppercase tracking-wider">Average Score</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white-400 uppercase tracking-wider">Members</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-700">
        {teamRankings.map((team, index) => {
          const rank = index + 1;
          return (
            <tr key={team.name} className="hover:bg-[#374151]">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="text-lg font-bold text-white mr-2">#{rank}</span>
                  {rank <= 3 && getBadgeIcon(rank)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-lg font-semibold text-white">{team.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-lg font-bold text-yellow-300">{team.averageScore}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">{team.memberCount} members</div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>

          </>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
