
import Navbar from "@/components/Navbar";
import ImageCarousel from "@/components/ImageCarousel";
import StudentCard from "@/components/StudentCard";
import SearchAndFilter from "@/components/SearchAndFilter";
import { useStudents } from "@/hooks/useStudents";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useMemo } from "react";
import { Trophy, Users, Target } from "lucide-react";

const Index = () => {
  const { students, loading } = useStudents();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [scoreRange, setScoreRange] = useState<[number, number]>([0, 100]);

  const teams = useMemo(() => {
    return Array.from(new Set(students.map(s => s.team_name))).filter(Boolean);
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTeam = !selectedTeam || student.team_name === selectedTeam;
      const matchesScore = student.score >= scoreRange[0] && student.score <= scoreRange[1];
      
      return matchesSearch && matchesTeam && matchesScore;
    });
  }, [students, searchQuery, selectedTeam, scoreRange]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedTeam("");
    setScoreRange([0, 100]);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      {/* Hero Section with Carousel */}
      <section className="container mx-auto px-4 py-8">
        <div className="cricket-card p-8 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Hall of <span className="text-orange-500">Fame</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Celebrating our top performers and their outstanding achievements in technology and innovation.
            </p>
          </div>
        </div>
        <ImageCarousel />
      </section>

      {/* Search and Filter Section */}
      <section className="container mx-auto px-4">
        <SearchAndFilter
          onSearch={setSearchQuery}
          onFilterByTeam={setSelectedTeam}
          onFilterByScore={setScoreRange}
          onClearFilters={handleClearFilters}
          teams={teams}
          searchQuery={searchQuery}
          selectedTeam={selectedTeam}
          scoreRange={scoreRange}
        />
      </section>

      {/* Student Cards Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Top Performers
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Meet our exceptional students who have demonstrated outstanding skills and dedication in their projects.
          </p>
          {filteredStudents.length !== students.length && (
            <p className="text-orange-500 mt-2">
              Showing {filteredStudents.length} of {students.length} students
            </p>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="cricket-card overflow-hidden">
                <Skeleton className="h-48 w-full bg-slate-600" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2 bg-slate-600" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-1/2 bg-slate-600" />
                    <Skeleton className="h-4 w-4 bg-slate-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="text-center py-16">
            <div className="cricket-card p-12 max-w-md mx-auto">
              <Users className="h-16 w-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Students Found</h3>
              <p className="text-slate-400 mb-4">
                {searchQuery || selectedTeam || scoreRange[0] > 0 || scoreRange[1] < 100
                  ? "Try adjusting your filters to see more results."
                  : "No students have been added yet."}
              </p>
              <button
                onClick={handleClearFilters}
                className="cricket-button-primary px-4 py-2 rounded-lg"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        )}
      </section>

      {/* Statistics Section */}
      {!loading && students.length > 0 && (
        <section className="bg-slate-800 border-t border-orange-500/30 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="cricket-card p-8">
                <Trophy className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">{students.length}</div>
                <div className="text-slate-300">Total Students</div>
              </div>
              <div className="cricket-card p-8">
                <Users className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">
                  {new Set(students.map(s => s.team_name)).size}
                </div>
                <div className="text-slate-300">Active Teams</div>
              </div>
              <div className="cricket-card p-8">
                <Target className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">
                  {students.length > 0 ? Math.round(students.reduce((sum, s) => sum + s.score, 0) / students.length) : 0}
                </div>
                <div className="text-slate-300">Average Score</div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
