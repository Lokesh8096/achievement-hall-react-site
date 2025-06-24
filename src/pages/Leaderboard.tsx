
import Navbar from "@/components/Navbar";
import { getTeamRankings } from "@/data/sampleData";
import { Trophy, Medal, Award } from "lucide-react";

const Leaderboard = () => {
  const teamRankings = getTeamRankings();

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Team Leaderboard</h1>
          <p className="text-lg text-gray-600">Rankings based on team average scores</p>
        </div>

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
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-bold text-gray-900">Complete Rankings</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Average Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Members
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teamRankings.map((team, index) => {
                  const rank = index + 1;
                  return (
                    <tr key={team.name} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-gray-900 mr-2">#{rank}</span>
                          {rank <= 3 && getBadgeIcon(rank)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-semibold text-gray-900">{team.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-bold text-blue-600">{team.averageScore}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{team.memberCount} members</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{team.totalScore}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
