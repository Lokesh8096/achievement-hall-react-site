import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ImageCarousel from "@/components/ImageCarousel";
import StudentCard from "@/components/StudentCard";
import { useStudents } from "@/hooks/useStudents";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, Loader2 } from "lucide-react"; // optional for dropdown arrow

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const Index = () => {
  const { students, loading } = useStudents();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [displayCount, setDisplayCount] = useState(20);
  const [selectedHackathon, setSelectedHackathon] = useState('All');

  const uniqueTeams = [...new Set(students.map((s) => s.team_name))];

  const filteredStudents = students.filter((student) => {
    const matchesName = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = selectedTeam === "All" || student.team_name === selectedTeam;
    const matchesHackathon = selectedHackathon === 'All' || student.hackathon_count === Number(selectedHackathon);
    return matchesName && matchesTeam && matchesHackathon;
  });

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(20);
  }, [searchTerm, selectedTeam, selectedHackathon]);

  const displayedStudents = filteredStudents.slice(0, displayCount);
  const hasMoreStudents = displayCount < filteredStudents.length;

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + 20, filteredStudents.length));
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedTeam("All");
    setSelectedHackathon('All');
    setDisplayCount(20);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pt-16">
      <Navbar />

      {/* Carousel Section */}
      <section className="container mx-auto px-4 py-8">
        <ImageCarousel />
      </section>

      {/* Filter & Search Section */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Left: Dropdown + Search */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Team Dropdown using Shadcn UI */}
          <Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      className="w-64 justify-between bg-[#1e293b] text-white border border-gray-600 text-sm font-medium"
    >
      {selectedTeam === "All" ? "All Teams" : selectedTeam}
      <ChevronDown className="ml-2 h-4 w-4 text-white" />
    </Button>
  </PopoverTrigger>

  <PopoverContent
    className="w-64 p-0 max-h-64 overflow-y-auto no-scrollbar bg-[#1e293b] text-white border border-gray-600 z-50"
    align="start"
  >
    <div className="flex flex-col text-sm">
      <button
        onClick={() => {
          setSelectedTeam("All");
          setOpen(false);
        }}
        className={`text-left px-4 py-2 hover:bg-blue-800 ${
          selectedTeam === "All" ? "bg-blue-900 font-semibold" : ""
        }`}
      >
        All Teams
      </button>
      {uniqueTeams.map((team) => (
        <button
          key={team}
          onClick={() => {
            setSelectedTeam(team);
            setOpen(false);
          }}
          className={`text-left px-4 py-2 hover:bg-blue-800 ${
            selectedTeam === team ? "bg-blue-900 font-semibold" : ""
          }`}
        >
          {team}
        </button>
      ))}
    </div>
  </PopoverContent>
</Popover>

            {/* Hackathon Dropdown */}
            <select
              value={selectedHackathon}
              onChange={e => setSelectedHackathon(e.target.value)}
              className="px-4 py-2 rounded-md bg-[#1e293b] text-white border border-gray-600 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Hackathons</option>
              <option value={1}>Hackathon-1</option>
              <option value={2}>Build-for-Telangana</option>
            </select>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by student name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-md bg-[#1e293b] text-white border border-gray-600 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Right: Reset Button */}
          <button
            onClick={resetFilters}
            className="px-6 py-2 rounded-full border text-sm font-semibold text-blue-400 border-gray-600 hover:bg-blue-900 transition"
          >
            Reset Filters
          </button>
        </div>
      </section>

      {/* Student Cards Section */}
      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-[#1e293b] rounded-xl shadow-md overflow-hidden"
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
          <>
           

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayedStudents.length > 0 ? (
                displayedStudents.map((student) => (
                  <StudentCard key={student.id} student={student} />
                ))
              ) : (
                <div className="text-white col-span-full text-center text-xl">
                  No students found.
                </div>
              )}
            </div>
          </>
        )}
      </section>

      {/* Load More Button */}
      {!loading && hasMoreStudents && (
        <section className="container mx-auto px-4 py-6 text-center">
          <div className="space-y-4">
            <Button
              onClick={loadMore}
              variant="outline"
              className="px-8 py-3 text-blue-400 border-gray-600 hover:bg-blue-900 hover:text-white transition-colors"
            >
              Load More Students
            </Button>
          </div>
        </section>
      )}

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
