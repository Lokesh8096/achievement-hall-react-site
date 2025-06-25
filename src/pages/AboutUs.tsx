
import Navbar from "@/components/Navbar";
import { Info, Users, Target, Award, MapPin, Phone, Mail, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AboutUs = () => {
  const achievements = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "2000+ Students",
      description: "Successfully trained and placed"
    },
    {
      icon: <Award className="h-8 w-8 text-green-600" />,
      title: "95% Success Rate",
      description: "Industry-leading placement record"
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      title: "Global Reach",
      description: "Students across 15+ countries"
    },
    {
      icon: <Target className="h-8 w-8 text-orange-600" />,
      title: "Industry Focus",
      description: "Real-world project experience"
    }
  ];

  const programs = [
    {
      title: "Full Stack Development",
      description: "Master modern web technologies including React, Node.js, and databases",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"
    },
    {
      title: "Data Science & Analytics",
      description: "Learn Python, machine learning, and data visualization techniques",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
    },
    {
      title: "Mobile App Development",
      description: "Build native and cross-platform mobile applications",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop"
    },
    {
      title: "DevOps & Cloud",
      description: "Master deployment, CI/CD, and cloud infrastructure",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-[#172134]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Info className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About NxtWave</h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Transforming lives through technology education. We're on a mission to bridge the gap between 
              traditional education and industry requirements.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 inline-block">
              <p className="text-lg font-semibold">
                "Empowering the next generation of tech professionals"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-white">Our Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-white">
              <p>
                Founded with a vision to democratize quality tech education, NxtWave has been at the forefront 
                of educational innovation since our inception. We recognized the growing gap between what 
                traditional institutions teach and what the industry actually needs.
              </p>
              <p>
                Our journey began with a simple question: "How can we prepare students for real-world challenges 
                they'll face in their tech careers?" This led us to develop a unique, project-based learning 
                approach that combines theoretical knowledge with practical application.
              </p>
              <p>
                Today, we're proud to have trained over 2000 students who are now working at top companies 
                worldwide, contributing to cutting-edge projects and making a real impact in their fields.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop"
              alt="Our team and students"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
              <div className="text-2xl font-bold">2019</div>
              <div className="text-sm">Founded</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mission & Vision</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Driving our purpose and shaping our future
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-l-4 border-l-blue-600 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To provide world-class, industry-relevant education that empowers individuals to build 
                  successful careers in technology. We focus on practical skills, real-world projects, 
                  and comprehensive mentorship to ensure our students are job-ready from day one.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-600 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Globe className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To become the leading platform for technology education globally, creating a world where 
                  quality tech education is accessible to everyone, regardless of their background or 
                  location. We envision a future where our graduates lead innovation in technology.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-white">Our Achievements</h2>
          <p className="text-xl text-gray-600 text-white">Numbers that reflect our commitment to excellence</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  {achievement.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive programs designed to meet industry demands
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-video">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                  <p className="text-gray-600">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl opacity-90">Ready to start your journey with us?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <MapPin className="h-8 w-8 mx-auto mb-4 text-blue-400" />
              <h3 className="text-lg font-semibold mb-2">Our Location</h3>
              <p className="opacity-90">
                123 Tech Street<br />
                Hyderabad, Telangana<br />
                India - 500001
              </p>
            </div>

            <div className="text-center">
              <Phone className="h-8 w-8 mx-auto mb-4 text-green-400" />
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="opacity-90">
                +91 9876543210<br />
                +91 8765432109<br />
                Mon-Fri 9AM-6PM
              </p>
            </div>

            <div className="text-center">
              <Mail className="h-8 w-8 mx-auto mb-4 text-purple-400" />
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="opacity-90">
                info@nxtwave.co.in<br />
                support@nxtwave.co.in<br />
                careers@nxtwave.co.in
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mr-4">
              Contact Us
            </button>
            {/* <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
              Schedule a Call
            </button> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
