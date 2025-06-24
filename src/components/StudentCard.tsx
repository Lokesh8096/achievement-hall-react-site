
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

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
  return (
    <Link to={`/student/${student.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
        <div className="relative">
          <img
            src={student.image_url}
            alt={student.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {student.score}
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{student.name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-blue-600 font-medium">{student.team_name}</span>
            <ExternalLink className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StudentCard;
