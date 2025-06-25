import Navbar from "@/components/Navbar";
import ImageCarousel from "@/components/ImageCarousel";
import StudentCard from "@/components/StudentCard";
import { useStudents } from "@/hooks/useStudents";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { students, loading } = useStudents();

  return (
    <div className="min-h-screen bg-[#172134] text-gray-800 bg-cover bg-center bg-no-repeat " >
      <Navbar />
      
      {/* Hero Section with Carousel */}
      <section className="container mx-auto px-4 py-8">
        <ImageCarousel />
      </section>

      {/* Student Cards Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-white">
            Our Top Performers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-white">
            Meet our exceptional students who have demonstrated outstanding
            skills and dedication in their projects.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <Skeleton className="h-48 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        )}
      </section>

      {/* Statistics Section */}
      {!loading && (
        <section className="bg-[#111826] text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">{students.length}</div>
                <div className="text-blue-200">Total Students</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">
                  {new Set(students.map((s) => s.team_name)).size}
                </div>
                <div className="text-blue-200">Active Teams</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">
                  {students.length > 0
                    ? Math.round(
                        students.reduce((sum, s) => sum + s.score, 0) /
                          students.length
                      )
                    : 0}
                </div>
                <div className="text-blue-200">Average Score</div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
