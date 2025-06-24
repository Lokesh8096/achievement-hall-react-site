
import { useState, useEffect } from "react";

const images = [
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=400&fit=crop",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=400&fit=crop",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=400&fit=crop",
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-96 overflow-hidden rounded-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50 z-10"></div>
      
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Hall of Fame</h1>
          <p className="text-xl md:text-2xl opacity-90">Celebrating Student Excellence</p>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
