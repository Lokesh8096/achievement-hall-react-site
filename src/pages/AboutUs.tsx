import Navbar from "@/components/Navbar";
import { Info, Users, Target, Award, MapPin, Phone, Mail, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Placeholder data (replace image URLs as needed)
const founders = [
  { name: "Rahul Attuluri", role: "Co-founder & CEO", img: "https://cdn.prod.website-files.com/5fa61cbbf0d432b3230f62b1/60c850da06434330f2d0e443_Rahual%20(1).avif", desc: "Past: CyberEye (CTO), Amazon, Bwin | Alum: IIIT Hyderabad" },
  { name: "Sashank Gajjala", role: "Co-founder & Head, Customer Experience", img: "https://cdn.prod.website-files.com/5fa61cbbf0d432b3230f62b1/60c850dabd2f7b0a911018b7_Shashank%20(1).png", desc: "Past: iB Hubs (VP, Student Relations) | Alum: IIT Bombay (AIR 119)" },
  { name: "Anupam Pedarla", role: "Co-founder & COO", img: "https://cdn.prod.website-files.com/5fa61cbbf0d432b3230f62b1/60c850dafd2c72608a074545_anupam.avif", desc: "Past: iB Hubs (VP, Global Business) | Alum: IIT Kharagpur" },
];
const advisor = { name: "Vivek Kumar Sinha", role: "Mentor and Pedagogy Expert", img: "https://cdn.prod.website-files.com/5fa61cbbf0d432b3230f62b1/60c850da15cbcc55b78e9c2a_SVK%20Sir%20Photo%20(2).avif", desc: "Profound Academician with 30+ Years Experience" };
const awards = [
  { img: "https://nxtwave.imgix.net/ccbp-website/intensive/landingpage/award1-desktop-2x.png", alt: "Award 1" },
  { img: "https://nxtwave.imgix.net/ccbp-website/intensive/landingpage/award2-desktop-2x.png", alt: "Award 2" },
];
const fundraise = {
  amount: "INR 275 Crores",
  lead: "Greater Pacific Capital",
  partners: [
    { img: "https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/oris-partner.png", alt: "Orios" },
    { img: "https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/better-partner.png", alt: "Better Capital" },
  ],
};
const investors = [
  { name: "Rehan Yar Khan", role: "Managing Partner, Orios", img: "https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/investors/Rehan+Yar+Khan.png" },
  { name: "Anup Jain", role: "Managing Partner, Orios", img: "https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/investors/anup-jain.png" },
  { name: "Rajeev Suri", role: "Managing Partner, Orios", img: "https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/investors/rajeev+suri.png" },
  { name: "Vineet Bhansali", role: "Vice President, Orios", img: "https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/investors/vinit-bhansali.png" },
  { name: "Vaibhav Domkundwar", role: "Founder & CEO, Better Capital", img: "https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/investors/Vaibhav+Domkundwar.png" },
  { name: "Vikram Kailas", role: "Cofounder, Mytrah Energy", img: "https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/investors/Vikram-Kailas.png" },
  { name: "Umang Kumar", role: "Cofounder & President, CarDekho", img: "https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/investors/Umang.png" },
  { name: "Ravi Bhushan", role: "Founder & CEO, BrightChamps", img: "https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/investors/Ravi+Bhusan.png" },
  { name: "Nandu Nandkishore", role: "Professor ISB & Former Global CEO Nestle Nutrition", img: "https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/investors/Nandkishore.png" },
  { name: "Anupam Mittal", role: "Founder, Shaadi.com", img: "https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/investors/anupam_mittal.png" },
  { name: "Ramakanth Sharma", role: "Founder & COO, LivSpace", img: "https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/investors/Ramakanth+Sharma.png" },
  { name: "Chakradhar Gade", role: "Cofounder, Country Delight", img: "https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/investors/chakradhar+gade.png" },
  { name: "Vikas Malpani", role: "Cofounder of CommonFloor, Leher App", img: "https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/investors/Vikas+Malpani.png" },
  { name: "Rajesh Sawhney", role: "Founder, GSF Accelerator", img: "https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/investors/Rajesh+Sawhney.png" },
  { name: "Shajikumar Devakar", role: "Executive Director, IIFL Wealth", img: "https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/investors/Shajikumar+Devakar.png" },
  { name: "Giridhar Malpani", role: "Founder, Climber Capital", img: "https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/investors/Giridhar+Malpani.png" },
];
const recognisedBy = [
  { img: "https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/recognised-by-logos.png", alt: "Recognised By Government of India" },
];
const mentorCompanies = "https://nxtwave.imgix.net/ccbp-website/Home/Mentor+Community/mentor-community-companies.png";
const mentors = [
  { name: "Srividya Pranavi", role: "Machine Learning Scientist, Apple", edu: "Carnegie Mellon University, IIT Kharagpur", img: "https://nxtwave.imgix.net/ccbp-website/Home/Master-classes/Srividya+Pranavi.png" },
  { name: "Sravya Nimmagadda", role: "Senior Deep Learning Scientist, NVIDIA", edu: "Stanford, IIT Madras", img: "https://nxtwave.imgix.net/ccbp-website/Home/Master-classes/Sravya+Nimmagadda.png" },
  { name: "Priyatham Bollimpalli", role: "Data & Applied Scientist II, Microsoft", edu: "Carnegie Mellon University, IIT Guwahati", img: "https://nxtwave.imgix.net/ccbp-website/Home/Master-classes/Priyatham+Bollimpalli.png" },
  { name: "Vamsi Krishna", role: "AI & Quantum Computing, Google", edu: "Georgia Institute of Technology, IIT Madras", img: "https://nxtwave.imgix.net/ccbp-website/Home/Master-classes/vamsi-krishna.png" },
];
const featuredIn = "https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/intensive/as-seen-in/featured-in-section-desktop.png";

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
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Navbar />
      
      {/* Hero Section */}
  
      {/* Welcome/Intro Card */}
      <section className="flex justify-center py-14 px-4 bg-transparent">
        <div className="w-full max-w-4xl bg-[#1e293b] rounded-2xl shadow-lg p-12 border border-gray-800">
          <div className="mb-8">
            <div className="font-semibold text-2xl text-blue-400 mb-6">Welcome!</div>
            <div className="space-y-6 text-lg text-gray-200">
              <p>I'm Rahul Attuluri, CEO of NxtWave<span className="text-blue-400"></span> Disruptive Technologies.</p>
              <p>We are on a mission to bridge the gap between industry & academia by rapidly building industry-relevant skills in people.</p>
              <p>For the first time in India, we've introduced Industry-Ready Certification (IRC) which represents your industry readiness. We've designed programs to help anyone gear up for 4.0 Revolution.</p>
              <p>For students right after Intermediate/12th, get ready for a high-paid job with CCBP 4.0 Academy. Learn 4 hours/week alongside your academics and become 4.0 industry-ready.</p>
              <p>For those looking for a Tech Job, enroll in Intensive program. Learn with a Proven Curriculum and become a software developer.</p>
              <p>For students, we invite you to join India's Largest 4.0 Tech Student Community to grow faster with the right ecosystem of forward-thinking and tech-savvy minds.</p>
              <p>Wishing you tremendous success in your career!</p>
              <p>Best</p>
            </div>
          </div>
          <div className="flex items-center mt-10">
            <img src="https://cdn.prod.website-files.com/5fa61cbbf0d432b3230f62b1/60a92de792855225437dd569_Group%201.avif" alt="Founder" className="rounded-full mr-3 border-2 border-blue-500 w-16 h-16" />
            <div>
              <div className="font-bold text-white">Rahul Attuluri</div>
              <div className="text-gray-400 text-sm">CEO, NxtWave<span className="text-blue-400"></span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders & Advisor */}
      <section className="flex flex-col items-center py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-blue-300">Founders</h2>
        <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl">
          {founders.map((f) => (
            <div key={f.name} className="bg-[#1e293b] rounded-xl shadow-lg p-8 flex flex-col items-center w-72 border border-gray-700">
              <img src={f.img} alt={f.name} className="rounded-full w-32 h-32 mb-4 border-2 border-blue-500 object-cover" />
              <div className="font-bold text-lg text-white mb-1">{f.name}</div>
              <div className="text-blue-400 mb-2 text-center">{f.role}</div>
              <div className="text-gray-400 text-sm text-center">{f.desc}</div>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mt-16 mb-4 text-blue-300">Advisor</h2>
        <div className="bg-[#1e293b] rounded-xl shadow-lg p-8 flex flex-col items-center w-72 border border-gray-700">
          <img src={advisor.img} alt={advisor.name} className="rounded-full w-32 h-32 mb-4 border-2 border-blue-500 object-cover" />
          <div className="font-bold text-lg text-white mb-1">{advisor.name}</div>
          <div className="text-blue-400 mb-2 text-center">{advisor.role}</div>
          <div className="text-gray-400 text-sm text-center">{advisor.desc}</div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-12 px-4 flex flex-col items-center bg-[#111827]">
        <h2 className="text-2xl font-bold mb-8 text-orange-400 text-center">Recognized as the Greatest Brand in Education</h2>
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {awards.map((a, i) => (
            <img key={i} src={a.img} alt={a.alt} className="h-20 object-contain" />
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-5xl bg-[#1e293b] rounded-xl p-8 border border-gray-700">
          <img src="https://nxtwave.imgix.net/ccbp-website/Home/award-section/award-image.png" alt="Trophy" className="h-16" />
          <div>
            <div className="text-gray-300">Recognised as</div>
            <div className="text-xl font-bold text-white">Best Tech Skilling EdTech Company of the year 2022</div>
          </div>
          <img src="https://nxtwave.imgix.net/ccbp-website/Home/award-section/award-logo.png" alt="Award Logo" className="h-20" />
        </div>
      </section>

      {/* Fundraise Announcement */}
      <section className="py-12 px-4 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-orange-400 text-center">Announcing Our Latest Fundraise</h2>
        <div className="text-3xl font-bold text-white mb-2">{fundraise.amount}</div>
        <div className="text-lg text-gray-300 mb-4">Led by <span className="text-blue-400">{fundraise.lead}</span></div>
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {fundraise.partners.map((p, i) => (
            <img key={i} src={p.img} alt={p.alt} className="h-12 object-contain" />
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl mt-8">
          {investors.map((inv) => (
            <div key={inv.name} className="bg-[#1e293b] rounded-xl shadow p-4 flex flex-col items-center border border-gray-700">
              <img src={inv.img} alt={inv.name} className="rounded-full w-16 h-16 mb-2 object-cover" />
              <div className="font-bold text-white text-center text-sm">{inv.name}</div>
              <div className="text-gray-400 text-xs text-center">{inv.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Recognised By */}
      <section className="py-12 px-4 flex flex-col items-center">
        <div className="text-lg text-gray-300 mb-4">Recognised by</div>
        <div className="flex flex-wrap justify-center gap-8">
          {recognisedBy.map((r, i) => (
            <img key={i} src={r.img} alt={r.alt} className="h-12 object-contain" />
          ))}
        </div>
      </section>

      {/* Mentor Community */}
      <section className="py-12 px-4 flex flex-col items-center bg-[#111827]">
        <h2 className="text-2xl font-bold mb-4 text-blue-300">Mentor Community</h2>
        <div className="text-gray-300 mb-8 text-center max-w-2xl">Our mentor community strongly believes in the power of sharing! We collaborate with professionals from great companies to guide you on this exciting journey.</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-6xl">
          {mentors.map((m) => (
            <div key={m.name} className="bg-[#1e293b] rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-700">
              <img src={m.img} alt={m.name} className="rounded-full w-20 h-20 mb-3 object-cover" />
              <div className="font-bold text-white text-center mb-1">{m.name}</div>
              <div className="text-blue-400 text-center mb-1 text-sm">{m.role}</div>
              <div className="text-gray-400 text-xs text-center">{m.edu}</div>
            </div>
          ))}
        </div>
        <div
  className="text-gray-400 mt-6 cursor-pointer hover:underline"
  onClick={() => window.open("https://www.niatindia.com", "_blank")}
>
  and many more...
</div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] py-10 px-4 mt-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <img src="https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Nxtwave_White_logo.svg" alt="Nxtwave" className="h-10 mb-4" />
            <div className="text-gray-400 text-sm">NIAT,Kapil Kavuri Hub, Nanakramguda, Financial District, Hyderabad 500032.</div>
            <div className="flex gap-4 mt-4">
              <a href="https://www.facebook.com/NxtWave-106729994530632/" target="_blank" rel="noopener noreferrer"><img src="https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/facebook-icon.svg" alt="Facebook" className="h-6" /></a>
              <a href="https://www.instagram.com/ccbp_nxtwave/" target="_blank" rel="noopener noreferrer"><img src="https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/instgram-icon.svg" alt="Instagram" className="h-6" /></a>
              <a href="https://twitter.com/nxtwave_tech" target="_blank" rel="noopener noreferrer"><img src="https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/twitterimage.svg" alt="Twitter" className="h-6" /></a>
              <a href="https://www.linkedin.com/company/nxtwavetech" target="_blank" rel="noopener noreferrer"><img src="https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/linkedin-icon.svg" alt="LinkedIn" className="h-6" /></a>
              <a href="https://www.youtube.com/c/NxtWaveTech" target="_blank" rel="noopener noreferrer"><img src="https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/youtube-icon.svg" alt="YouTube" className="h-6" /></a>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="text-gray-400 text-sm">support@nxtwave.tech</div>
            <div className="text-gray-400 text-sm">+919390111761 (WhatsApp only)</div>
            <div className="flex gap-2 mt-2">
              <img src="https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/visa-icon.svg" alt="Visa" className="h-6" />
              <img src="https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/master-card-icon.svg" alt="MasterCard" className="h-6" />
              <img src="https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/payment-method-icon.svg" alt="Payment" className="h-6" />
              <img src="https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/Razor-pay-icon.svg" alt="Razorpay" className="h-6" />
              <img src="https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/upi-icon.svg" alt="UPI" className="h-6" />
              <img src="https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/ccbp-website/Home/rupay-icon.svg" alt="Rupay" className="h-6" />
            </div>
          </div>
        </div>
        <div className="text-center text-gray-600 text-xs mt-8">© {new Date().getFullYear()} NxtWave. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default AboutUs;