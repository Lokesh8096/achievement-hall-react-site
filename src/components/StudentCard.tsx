
import { Link } from "react-router-dom";
import { ExternalLink, Trophy } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

interface Student {
  id: string;
  name: string;
  image_url: string;
  score: number;
  team_name: string;
  project_link: string;
}

interface StudentCardProps {
  student: Student;
}

const StudentCard = ({ student }: StudentCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 75) return "text-yellow-400";
    if (score >= 60) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <Link to={`/student/${student.id}`}>
      <div className="cricket-card overflow-hidden group">
        <div className="relative">
          <ImageWithFallback
            src={student.image_url}
            alt={student.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
            <Trophy className="h-3 w-3 text-orange-500" />
            <span className={getScoreColor(student.score)}>{student.score}</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-200">
            {student.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-orange-500 font-medium px-3 py-1 bg-orange-500/20 rounded-full text-sm">
              {student.team_name}
            </span>
            <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-orange-500 transition-colors duration-200" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StudentCard;
