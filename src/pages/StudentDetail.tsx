
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import ImageWithFallback from "@/components/ImageWithFallback";
import { ArrowLeft, ExternalLink, Trophy, Users, Target } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Student {
  id: string;
  name: string;
  image_url: string;
  score: number;
  team_name: string;
  project_link: string;
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
          .from('students')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setStudent(data);
      } catch (error) {
        console.error('Error fetching student:', error);
        setStudent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 75) return "text-yellow-400";
    if (score >= 60) return "text-orange-400";
    return "text-red-400";
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return "Exceptional";
    if (score >= 75) return "Outstanding";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <Skeleton className="h-6 w-24 mb-8 bg-slate-600" />
          <div className="cricket-card overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <Skeleton className="w-full h-64 md:h-full bg-slate-600" />
              </div>
              <div className="md:w-2/3 p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <Skeleton className="h-8 w-48 mb-2 bg-slate-600" />
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-5 w-32 bg-slate-600" />
                      <Skeleton className="h-5 w-24 bg-slate-600" />
                    </div>
                  </div>
                  <Skeleton className="h-16 w-16 rounded-full bg-slate-600" />
                </div>
                <Skeleton className="h-32 w-full mb-8 bg-slate-600" />
                <Skeleton className="h-12 w-40 bg-slate-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="cricket-card p-12 max-w-md mx-auto">
            <Users className="h-16 w-16 text-slate-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Student Not Found</h1>
            <p className="text-slate-400 mb-6">The student you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate("/")}
              className="cricket-button-primary px-6 py-3 rounded-lg font-medium"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-orange-500 hover:text-orange-400 mb-8 transition-colors duration-200 font-medium"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className="cricket-card overflow-hidden">
          <div className="md:flex">
            {/* Student Image */}
            <div className="md:w-1/3 relative">
              <ImageWithFallback
                src={student.image_url}
                alt={student.name}
                className="w-full h-64 md:h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Student Information */}
            <div className="md:w-2/3 p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{student.name}</h1>
                  <div className="flex items-center space-x-4 text-slate-300">
                    <div className="flex items-center space-x-1">
                      <Users className="h-5 w-5 text-orange-500" />
                      <span className="font-medium">{student.team_name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-5 w-5 text-orange-500" />
                      <span className="font-medium">Score: <span className={getScoreColor(student.score)}>{student.score}</span></span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full text-2xl font-bold shadow-lg">
                  {student.score}
                </div>
              </div>

              {/* Performance Badge */}
              <div className="mb-6">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                  student.score >= 90 ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                  student.score >= 75 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                  student.score >= 60 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                  'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  <Target className="h-4 w-4 mr-2" />
                  {getPerformanceLevel(student.score)} Performance
                </span>
              </div>

              {/* Score Visualization */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-300">Performance Score</span>
                  <span className="text-sm text-slate-400">{student.score}/100</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-400 to-orange-600 h-4 rounded-full transition-all duration-1000 shadow-md"
                    style={{ width: `${student.score}%` }}
                  ></div>
                </div>
              </div>

              {/* Team Information */}
              <div className="bg-slate-800/50 rounded-lg p-6 mb-8 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                  <Users className="h-5 w-5 text-orange-500 mr-2" />
                  Team Information
                </h3>
                <p className="text-slate-300">
                  {student.name} is a valuable member of <span className="font-semibold text-orange-500">{student.team_name}</span>, 
                  contributing significantly to the team's overall performance with an individual score of <span className={getScoreColor(student.score)}>{student.score}</span>.
                </p>
              </div>

              {/* Project Link */}
              <a
                href={student.project_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 cricket-button-primary px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30"
              >
                <ExternalLink className="h-5 w-5" />
                <span>View Project</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
