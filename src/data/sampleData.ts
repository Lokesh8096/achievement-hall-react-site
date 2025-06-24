
export interface Student {
  id: number;
  name: string;
  image_url: string;
  score: number;
  team_name: string;
  project_link: string;
}

export const sampleStudents: Student[] = [
  {
    id: 1,
    name: "John Doe",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    score: 85,
    team_name: "Team Alpha",
    project_link: "https://example.com/project1"
  },
  {
    id: 2,
    name: "Jane Smith", 
    image_url: "https://images.unsplash.com/photo-1494790108755-2616b612b1b0?w=300&h=300&fit=crop&crop=face",
    score: 92,
    team_name: "Team Beta",
    project_link: "https://example.com/project2"
  },
  {
    id: 3,
    name: "Mike Johnson",
    image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face", 
    score: 78,
    team_name: "Team Alpha",
    project_link: "https://example.com/project3"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    image_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    score: 96,
    team_name: "Team Gamma",
    project_link: "https://example.com/project4"
  },
  {
    id: 5,
    name: "Alex Chen",
    image_url: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face",
    score: 89,
    team_name: "Team Beta",
    project_link: "https://example.com/project5"
  },
  {
    id: 6,
    name: "Emily Davis",
    image_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
    score: 94,
    team_name: "Team Gamma",
    project_link: "https://example.com/project6"
  }
];

export const getStudentById = (id: number): Student | undefined => {
  return sampleStudents.find(student => student.id === id);
};

export const getTeamRankings = () => {
  const teamStats = sampleStudents.reduce((acc, student) => {
    if (!acc[student.team_name]) {
      acc[student.team_name] = {
        name: student.team_name,
        totalScore: 0,
        memberCount: 0,
        members: []
      };
    }
    acc[student.team_name].totalScore += student.score;
    acc[student.team_name].memberCount += 1;
    acc[student.team_name].members.push(student);
    return acc;
  }, {} as Record<string, { name: string; totalScore: number; memberCount: number; members: Student[] }>);

  return Object.values(teamStats)
    .map(team => ({
      ...team,
      averageScore: Math.round(team.totalScore / team.memberCount)
    }))
    .sort((a, b) => b.averageScore - a.averageScore);
};
