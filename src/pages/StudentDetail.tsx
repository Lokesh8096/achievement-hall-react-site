import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { ArrowLeft, ExternalLink, Trophy, Users, GraduationCap, Award, Code } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getHackathonName } from "@/lib/hackathons";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Student {
  id: string;
  name: string;
  image_url: string;
  score: number;
  team_name: string;
  project_link: string;
  hackathon_count: number;
  college?: string | null;
}

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from("students")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setStudent({
          ...(data as any),
          hackathon_count: (data as any).hackathon_count ?? 1
        });
      } catch (error) {
        console.error("Error fetching student:", error);
        setStudent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white pt-16">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <Skeleton className="h-6 w-24 mb-8 bg-[#1e293b]" />
          <div className="bg-[#1e293b] rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <Skeleton className="w-full h-64 md:h-full bg-[#0f172a]" />
              </div>
              <div className="md:w-2/3 p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <Skeleton className="h-8 w-48 mb-2 bg-[#0f172a]" />
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-5 w-32 bg-[#0f172a]" />
                      <Skeleton className="h-5 w-24 bg-[#0f172a]" />
                    </div>
                  </div>
                  <Skeleton className="h-16 w-16 rounded-full bg-[#0f172a]" />
                </div>
                <Skeleton className="h-32 w-full mb-8 bg-[#0f172a]" />
                <Skeleton className="h-12 w-40 bg-[#0f172a]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white pt-16">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Student Not Found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pt-16">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 mb-8 transition-colors duration-200 group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back</span>
        </button>

        {/* Main Card */}
        <Card className="bg-[#1e293b] border-gray-700/50 shadow-2xl overflow-hidden">
          <div className="lg:flex">
            {/* Student Image Section */}
            <div className="lg:w-2/5 relative">
              <div className="relative w-full h-96 lg:h-full min-h-[400px] overflow-hidden">
                <img
                  src={student.image_url}
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] via-transparent to-transparent"></div>
                {/* Score Badge on Image */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-[#1e293b]/90 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300">Performance Score</span>
                      <span className="text-lg font-bold text-blue-400">{student.score}/100</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${student.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Information Section */}
            <div className="lg:w-3/5 p-8 lg:p-12">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {student.name}
                </h1>
                
                {/* Badges Row */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30 px-4 py-1.5">
                    <Trophy className="h-4 w-4 mr-2" />
                    Score: {student.score}%
                  </Badge>
                  <Badge className="bg-[#1e293b] text-gray-300 border-gray-700/50 px-4 py-1.5">
                    <Users className="h-4 w-4 mr-2" />
                    {student.team_name}
                  </Badge>
                  <Badge className="bg-[#1e293b] text-gray-300 border-gray-700/50 px-4 py-1.5">
                    <Award className="h-4 w-4 mr-2" />
                    {getHackathonName(student.hackathon_count)}
                  </Badge>
                  {student.college && (
                    <Badge className="bg-[#1e293b] text-gray-300 border-gray-700/50 px-4 py-1.5">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      {student.college}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Information Cards */}
              <div className="space-y-6 mb-8">
                {/* Team Information Card */}
                <Card className="bg-[#0f172a]/50 border-gray-700/30">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-blue-400" />
                      Team Information
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {student.name} is a valuable member of{" "}
                      <span className="font-semibold text-blue-400">
                        {student.team_name}
                      </span>
                      , contributing significantly to the team's overall performance
                      with an individual score of <span className="font-semibold text-blue-400">{student.score}%</span>.
                    </p>
                  </CardContent>
                </Card>

                {/* Hackathon Information Card */}
                <Card className="bg-[#0f172a]/50 border-gray-700/30">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Code className="h-5 w-5 mr-2 text-blue-400" />
                      Hackathon Participation
                    </h3>
                    <p className="text-gray-300">
                      Participated in <span className="font-semibold text-blue-400">{getHackathonName(student.hackathon_count)}</span>
                      {student.college && (
                        <> from <span className="font-semibold text-blue-400">{student.college}</span></>
                      )}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Project Link Button */}
              <a
                href={student.project_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-blue-500/50 hover:border-blue-400 w-full lg:w-auto"
              >
                <ExternalLink className="h-5 w-5" />
                <span>View Project</span>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDetail;
