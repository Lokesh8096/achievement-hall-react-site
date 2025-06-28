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
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    embedUrl:
      "https://www.youtube.com/embed/kkFLuxkxrVA?list=TLGGl4cFzafTuWQyNjA2MjAyNQ&autoplay=1",
    autoplay: true,
  },
  {
    videoUrl: "https://youtu.be/_omgmUTCvwY?si=TJckWHULOqu-Zq6P",
  },
  {
    videoUrl: "https://youtu.be/8dneZHv9vus?si=7L93RjFJFka-IThF",
  },
  {
    videoUrl: "https://youtu.be/TN3CYI4MRAw?si=rfX_z0KyrS_IUgwD",
  },
  {
    videoUrl: "https://youtu.be/YkeEdn5Cfiw?si=3a3Wj2731v2Ri36r",
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


      {/* Testimonials Grid */}
      <section className="container mx-auto px-4 py-16 bg-[#0f172a] text-white">
        {/* First video full width */}
        {first.autoplay && first.embedUrl && (
          <div className="w-full mb-12">
            <div className="relative w-full aspect-video overflow-hidden rounded-xl shadow-lg border border-gray-700">
              <iframe
                src={first.embedUrl}
                title="NIAT Club Elections 2024"
                className="w-full h-full rounded-xl"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
        {/* Remaining videos in grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {rest.map((testimonial, idx) => {
            if ("videoUrl" in testimonial) {
              const videoId = getYoutubeId(testimonial.videoUrl);
              const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              // idx+1 because rest starts from index 1 in the original array
              const realIdx = idx + 1;
              return (
                <div
                  key={testimonial.videoUrl}
                  className="overflow-hidden bg-[#1e293b] text-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-700 flex flex-col items-center"
                >
                  <div className="relative w-full aspect-video cursor-pointer" onClick={() => setPlaying(realIdx)}>
                    {playing === realIdx ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title={`Testimonial Video ${realIdx}`}
                        className="w-full h-full rounded-t-xl"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        <img
                          src={thumbnail}
                          alt={`Testimonial Video ${realIdx}`}
                          className="w-full h-full object-cover rounded-t-xl"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <Play className="h-16 w-16 text-white opacity-90" />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="w-full flex justify-center mt-12">
          <a
            href="https://apply.niatindia.com/login?utm_campaign=application&utm_source=hero-apply&utm_medium=website"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-colors duration-200"
          >
            Apply Now
          </a>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl opacity-90">
              Numbers that speak for our success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">2000+</div>
              <div className="text-blue-200">Students Trained</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
              <div className="text-blue-200">Placement Rate</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">150+</div>
              <div className="text-blue-200">Partner Companies</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.8/5</div>
              <div className="text-blue-200">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ready to Start Your Success Story?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of students who have transformed their careers with our
          comprehensive programs
        </p>
        <div className="space-x-4">
                    <button
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              onClick={() => {
                const targetUrl =
                  "https://apply.niatindia.com/login?utm_campaign=application&utm_source=hero-apply&utm_medium=website" ||
                  "https://www.niatindia.com/";
                window.open(targetUrl, "_blank");
              }}
            >
              Enroll Now
            </button>

            <button
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              onClick={() => {
                const targetUrl =
                  "https://www.niatindia.com/";
                window.open(targetUrl, "_blank");
              }}
            >
              Learn More
            </button>
          
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
