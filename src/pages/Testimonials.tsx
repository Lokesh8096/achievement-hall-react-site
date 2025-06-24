
import Navbar from "@/components/Navbar";
import { MessageSquare, Play, Users, Code, Database, Smartphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Full Stack Developer",
      company: "Tech Innovators Inc.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      quote: "The comprehensive curriculum and hands-on projects at Niat transformed my career. I went from a complete beginner to landing my dream job as a Full Stack Developer.",
      sector: "Web Development",
      videoId: "dQw4w9WgXcQ"
    },
    {
      id: 2,
      name: "Rahul Kumar",
      role: "Data Scientist",
      company: "Analytics Pro Solutions",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote: "The data science program opened doors I never knew existed. The practical approach and real-world projects gave me the confidence to excel in my field.",
      sector: "Data Science",
      videoId: "dQw4w9WgXcQ"
    },
    {
      id: 3,
      name: "Anitha Reddy",
      role: "Mobile App Developer",
      company: "NextGen Apps",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: "Learning mobile development here was an incredible journey. The mentorship and project-based learning approach made all the difference in my career.",
      sector: "Mobile Development",
      videoId: "dQw4w9WgXcQ"
    },
    {
      id: 4,
      name: "Vikram Singh",
      role: "DevOps Engineer",
      company: "Cloud Solutions Ltd.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      quote: "The DevOps track here is exceptional. I learned everything from CI/CD to cloud deployment, which directly helped me secure my current role.",
      sector: "DevOps",
      videoId: "dQw4w9WgXcQ"
    }
  ];

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <MessageSquare className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Student Success Stories</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Hear from our graduates who have transformed their careers and achieved their dreams
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                {/* Video Section */}
                <div className="relative aspect-video bg-gray-900">
                  <iframe
                    src={`https://www.youtube.com/embed/${testimonial.videoId}`}
                    title={`${testimonial.name} Testimonial`}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="absolute top-4 right-4">
                    <Play className="h-8 w-8 text-white opacity-75" />
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                      <p className="text-gray-600">{testimonial.role}</p>
                      <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-700 mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <Badge className={`${getSectorColor(testimonial.sector)} flex items-center space-x-1 w-fit`}>
                    {getSectorIcon(testimonial.sector)}
                    <span>{testimonial.sector}</span>
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl opacity-90">Numbers that speak for our success</p>
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
          Join thousands of students who have transformed their careers with our comprehensive programs
        </p>
        <div className="space-x-4">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Enroll Now
          </button>
          <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
