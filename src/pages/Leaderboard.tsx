
import Navbar from "@/components/Navbar";
import { useStudents } from "@/hooks/useStudents";
import { Trophy, Medal, Award, Crown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Leaderboard = () => {
  const { students, loading } = useStudents();

  const getTeamRankings = () => {
    const teamMap = new Map();
    
    students.forEach(student => {
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
        return <Crown className="h-8 w-8 text-yellow-400" />;
      case 2:
        return <Trophy className="h-8 w-8 text-slate-300" />;
      case 3:
        return <Medal className="h-8 w-8 text-amber-600" />;
      default:
        return <Award className="h-6 w-6 text-orange-500" />;
    }
  };

  const getBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500 to-yellow-600 border-yellow-400";
      case 2:
        return "bg-gradient-to-r from-slate-400 to-slate-500 border-slate-300";
      case 3:
        return "bg-gradient-to-r from-amber-500 to-amber-600 border-amber-400";
      default:
        return "cricket-card";
    }
  };

  const getRankDisplay = (rank: number) => {
    if (rank <= 3) {
      return (
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">#{rank}</span>
          {getBadgeIcon(rank)}
        </div>
      );
    }
    return <span className="text-xl font-bold text-orange-500">#{rank}</span>;
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="cricket-card p-8 mb-8">
            <Trophy className="h-16 w-16 text-orange-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-4">Team Leaderboard</h1>
            <p className="text-lg text-slate-300">Rankings based on team average scores</p>
          </div>
        </div>

        {loading ? (
          <>
            {/* Top 3 Teams Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="cricket-card p-6 text-center">
                  <Skeleton className="h-8 w-8 mx-auto mb-4 bg-slate-600" />
                  <Skeleton className="h-8 w-32 mx-auto mb-2 bg-slate-600" />
                  <Skeleton className="h-8 w-16 mx-auto mb-2 bg-slate-600" />
                  <Skeleton className="h-4 w-24 mx-auto bg-slate-600" />
                </div>
              ))}
            </div>

            {/* Table Skeleton */}
            <div className="cricket-card overflow-hidden">
              <div className="cricket-table-header px-6 py-4">
                <Skeleton className="h-6 w-48 bg-slate-600" />
              </div>
              <div className="p-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-6 py-4 border-b border-slate-600 last:border-b-0">
                    <Skeleton className="h-6 w-12 bg-slate-600" />
                    <Skeleton className="h-6 w-32 bg-slate-600" />
                    <Skeleton className="h-6 w-16 bg-slate-600" />
                    <Skeleton className="h-6 w-20 bg-slate-600" />
                    <Skeleton className="h-6 w-16 bg-slate-600" />
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
                    className={`${getBadgeColor(rank)} border-2 text-white rounded-xl p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20`}
                  >
                    <div className="flex justify-center mb-6">
                      {getBadgeIcon(rank)}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{team.name}</h3>
                    <div className="text-4xl font-bold mb-2 text-white">{team.averageScore}</div>
                    <div className="text-sm opacity-90 mb-1">Average Score</div>
                    <div className="text-sm opacity-75">{team.memberCount} Members</div>
                  </div>
                );
              })}
            </div>

            {/* Full Rankings Table */}
            <div className="cricket-card overflow-hidden">
              <div className="cricket-table-header px-6 py-4">
                <h2 className="text-xl font-bold text-orange-500">Complete Rankings</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="cricket-table-header">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">
                        Team Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">
                        Average Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">
                        Members
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">
                        Total Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-600">
                    {teamRankings.map((team, index) => {
                      const rank = index + 1;
                      return (
                        <tr key={team.name} className="cricket-table-row">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getRankDisplay(rank)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-lg font-semibold text-white">{team.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-lg font-bold text-orange-500">{team.averageScore}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-slate-300">{team.memberCount} members</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-slate-400">{team.totalScore}</div>
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
