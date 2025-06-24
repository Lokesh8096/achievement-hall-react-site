
import { useParams, useNavigate } from "react-router-dom";
import { getStudentById } from "@/data/sampleData";
import Navbar from "@/components/Navbar";
import { ArrowLeft, ExternalLink, Trophy, Users } from "lucide-react";

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = getStudentById(Number(id));

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Student Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Student Image */}
            <div className="md:w-1/3">
              <img
                src={student.image_url}
                alt={student.name}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>

            {/* Student Information */}
            <div className="md:w-2/3 p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{student.name}</h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="h-5 w-5" />
                      <span className="font-medium">{student.team_name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-5 w-5" />
                      <span className="font-medium">Score: {student.score}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-600 text-white px-6 py-3 rounded-full text-2xl font-bold">
                  {student.score}
                </div>
              </div>

              {/* Score Visualization */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Performance Score</span>
                  <span className="text-sm text-gray-500">{student.score}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${student.score}%` }}
                  ></div>
                </div>
              </div>

              {/* Team Information */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Information</h3>
                <p className="text-gray-600">
                  {student.name} is a valuable member of <span className="font-semibold text-blue-600">{student.team_name}</span>, 
                  contributing significantly to the team's overall performance with an individual score of {student.score}.
                </p>
              </div>

              {/* Project Link */}
              <a
                href={student.project_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
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
