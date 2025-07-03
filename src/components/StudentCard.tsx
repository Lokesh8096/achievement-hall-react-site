import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

interface Student {
  id: string;
  name: string;
  image_url: string;
  score: number;
  team_name: string;
  project_link: string;
  hackathon_count: number;
}

interface StudentCardProps {
  student: Student;
}

const StudentCard = ({ student }: StudentCardProps) => {
  return (
    <Link to={`/student/${student.id}`}>
      <div className="bg-[#abb2b9] rounded-xl border-4 border-yellow-300 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden w-full group">
        {/* Image */}
        <div className="relative h-72 sm:h-80 md:h-96">
          <img
            src={student.image_url}
            alt={student.name}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Label */}
          <p className="text-sm text-gray-500"></p>

          {/* Score and Bar */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
              {student.score}%
            </span>
            <div className="w-full ml-3 bg-gray-200 rounded-full h-3 relative">
              <div
                className="bg-gradient-to-r from-green-900 to-green-400 h-3 rounded-full transition-all duration-300"
                style={{ width: `${student.score}%` }}
              ></div>
            </div>
          </div>

          {/* Name */}
          <h3 className="text-xl font-bold text-blue-900 leading-tight">
            {student.name}
          </h3>

          {/* Team & Link */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-gray-700 font-semibold">
              {student.team_name}
            </span>
            <ExternalLink className="h-4 w-4 text-gray-400 transition-colors duration-300 group-hover:text-red-600" />
          </div>

          {/* Hackathon Count */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-white-400">Hackathon-{student.hackathon_count}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StudentCard;
