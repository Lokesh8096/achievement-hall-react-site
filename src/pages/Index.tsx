
import Navbar from "@/components/Navbar";
import ImageCarousel from "@/components/ImageCarousel";
import StudentCard from "@/components/StudentCard";
import { sampleStudents } from "@/data/sampleData";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Carousel */}
      <section className="container mx-auto px-4 py-8">
        <ImageCarousel />
      </section>

      {/* Student Cards Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Top Performers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our exceptional students who have demonstrated outstanding skills and dedication in their projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">{sampleStudents.length}</div>
              <div className="text-blue-200">Total Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                {new Set(sampleStudents.map(s => s.team_name)).size}
              </div>
              <div className="text-blue-200">Active Teams</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                {Math.round(sampleStudents.reduce((sum, s) => sum + s.score, 0) / sampleStudents.length)}
              </div>
              <div className="text-blue-200">Average Score</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
