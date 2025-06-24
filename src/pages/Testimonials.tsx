
import Navbar from "@/components/Navbar";
import { MessageSquare } from "lucide-react";

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <MessageSquare className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Testimonials</h1>
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <p className="text-lg text-gray-600 mb-4">
              Testimonials content coming in next phase
            </p>
            <p className="text-gray-500">
              This section will showcase student feedback, success stories, and testimonials from our Hall of Fame members.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
