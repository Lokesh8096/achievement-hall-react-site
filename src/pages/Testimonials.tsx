import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import {
  MessageSquare,
  Play,
  Video,
  Users,
  Code,
  Database,
  Smartphone,
  Star,
  Clock,
  Eye,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    embedUrl:
      "https://youtu.be/kkFLuxkxrVA?list=TLGGl4cFzafTuWQwMzA3MjAyNQ",
    autoplay: true,
    title: "NIAT Club Elections 2024",
    description: "Witness the democratic process in action",
  },
  {
    videoUrl: "https://youtu.be/_omgmUTCvwY?si=TJckWHULOqu-Zq6P",
    title: "Student Success Story",
    description: "How our programs transform careers",
  },
  {
    videoUrl: "https://youtu.be/8dneZHv9vus?si=7L93RjFJFka-IThF",
    title: "Industry Expert Interview",
    description: "Insights from leading professionals",
  },
  {
    videoUrl: "https://youtu.be/TN3CYI4MRAw?si=rfX_z0KyrS_IUgwD",
    title: "Campus Life Experience",
    description: "A day in the life of our students",
  },
  {
    videoUrl: "https://youtu.be/YkeEdn5Cfiw?si=3a3Wj2731v2Ri36r",
    title: "Alumni Achievement",
    description: "Success stories from our graduates",
  },
];

function getYoutubeId(url: string) {
  // Extract the video ID from the URL
  const match = url.match(/(?:youtu.be\/|v=)([\w-]{11})/);
  return match ? match[1] : "";
}

const Testimonials = () => {
  const [playing, setPlaying] = useState<number | null>(null);

  useEffect(() => {
    // Autoplay the first video on mount
    setPlaying(0);
  }, []);

  // Separate the first video and the rest
  const first = testimonials[0];
  const rest = testimonials.slice(1);

  const getSectorIcon = (sector: string) => {
    switch (sector) {
      case "Web Development":
        return <Code className="h-4 w-4" />;
      case "Data Science":
        return <Database className="h-4 w-4" />;
      case "Mobile Development":
        return <Smartphone className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getSectorColor = (sector: string) => {
    switch (sector) {
      case "Web Development":
        return "bg-blue-100 text-blue-800";
      case "Data Science":
        return "bg-green-100 text-green-800";
      case "Mobile Development":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-orange-100 text-orange-800";
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pt-16">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Video className="h-12 w-12 text-blue-400 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Student Testimonials
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Hear directly from our students and alumni about their transformative journey
            </p>
            <div className="flex items-center justify-center space-x-6 text-blue-300">
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-2 fill-yellow-400 text-yellow-400" />
                <span>4.8/5 Rating</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>2500+ Students</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                <span>95% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0f172a] to-transparent"></div>
      </section>

      {/* Testimonials Grid */}
      <section className="container mx-auto px-4 py-20 bg-[#0f172a] text-white">
        {/* First video full width */}
        {first.autoplay && first.embedUrl && (
          <div className="w-full mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Testimonial</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                {first.description}
              </p>
            </div>
            <div className="relative w-full aspect-video overflow-hidden rounded-2xl shadow-2xl border border-gray-700">
              <iframe
                src={`https://www.youtube.com/embed/${getYoutubeId(first.embedUrl)}?autoplay=1`}
                title={first.title}
                className="w-full h-full rounded-2xl"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="text-center mt-6">
              <h3 className="text-xl font-semibold text-white mb-2">{first.title}</h3>
              <p className="text-gray-400">{first.description}</p>
            </div>
          </div>
        )}

        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">More Success Stories</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover how our programs have shaped careers and transformed lives
          </p>
        </div>

        {/* Remaining videos in grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {rest.map((testimonial, idx) => {
            if ("videoUrl" in testimonial) {
              const videoId = getYoutubeId(testimonial.videoUrl);
              const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              // idx+1 because rest starts from index 1 in the original array
              const realIdx = idx + 1;
              return (
                <Card
                  key={testimonial.videoUrl}
                  className="overflow-hidden bg-[#1e293b] text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-blue-500/50 group"
                >
                  <div className="relative w-full aspect-video cursor-pointer" onClick={() => setPlaying(realIdx)}>
                    {playing === realIdx ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title={testimonial.title}
                        className="w-full h-full rounded-t-xl"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        <img
                          src={thumbnail}
                          alt={testimonial.title}
                          className="w-full h-full object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/70 transition-all duration-300 rounded-t-xl">
                          <div className="bg-blue-600 rounded-full p-4 group-hover:bg-blue-500 transition-all duration-300 group-hover:scale-110">
                            <Play className="h-8 w-8 text-white" fill="white" />
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>3:45</span>
                        </div>
                      </>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {testimonial.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{testimonial.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>1.2K views</span>
                      </div>
                      <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                        Featured
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            }
            return null;
          })}
        </div>

        <div className="w-full flex justify-center mt-16">
          <a
            href="https://apply.niatindia.com/login?utm_campaign=application&utm_source=hero-apply&utm_medium=website"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-blue-500 hover:border-blue-400"
          >
            Apply Now
          </a>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-br from-[#25637d] to-[#1e4a5f] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Impact</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Numbers that speak for our success and the trust students place in our programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="text-5xl md:text-6xl font-bold mb-3 text-blue-200">2500+</div>
              <div className="text-blue-100 text-lg font-medium">Students Trained</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="text-5xl md:text-6xl font-bold mb-3 text-blue-200">95%</div>
              <div className="text-blue-100 text-lg font-medium">Placement Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="text-5xl md:text-6xl font-bold mb-3 text-blue-200">200+</div>
              <div className="text-blue-100 text-lg font-medium">Partner Companies</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="text-5xl md:text-6xl font-bold mb-3 text-blue-200">4.8/5</div>
              <div className="text-blue-100 text-lg font-medium">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Start Your Success Story?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students who have transformed their careers with our
            comprehensive programs. Take the first step towards your dream career today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <button
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-blue-500 hover:border-blue-400 min-w-[160px] text-lg"
              onClick={() => {
                const targetUrl = "https://apply.niatindia.com/login?utm_campaign=application&utm_source=hero-apply&utm_medium=website";
                window.open(targetUrl, "_blank");
              }}
            >
              Enroll Now
            </button>

            <button
              className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 hover:border-blue-700 px-10 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 min-w-[160px] text-lg"
              onClick={() => {
                const targetUrl = "https://www.niatindia.com/";
                window.open(targetUrl, "_blank");
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
