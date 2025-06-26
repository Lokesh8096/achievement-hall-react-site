import { useState, useEffect } from "react";

const images = [
  "https://framerusercontent.com/images/e3UvT1aA2EPeGadEJKZkm9dXY.jpg",
  "https://lh3.googleusercontent.com/p/AF1QipPPKazf2Ib6vOuFWbZfU9HqWVycR39Rz2Ks4dLb=s1360-w1360-h1020-rw",
  "https://lh3.googleusercontent.com/p/AF1QipNtN1V-cxIIcajdTGCk47fF-eCRlLStZhkeLBY3=s1360-w1360-h1020-rw",
  "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npXO4QuM_EnfycsyYypl_44ntcwSn4lbZ9uXpHx5UvF8FWmqjZs84fy0UcpoYX8tdQSXMwZCaGDcSNpPLR89Lm_8vIkj4Iwrl86q9t0oZoVHvDoS7wwtO95aoxAF0upRYgRYUiyucfvgfrz=s1360-w1360-h1020-rw",
  "https://lh3.googleusercontent.com/p/AF1QipNBuzOQSEzGFNQFA1zizhzSilyGsDZDLhini9P8=s1360-w1360-h1020-rw",
  "https://lh3.googleusercontent.com/p/AF1QipMfb67HeAJ7oA2z-b1iq5RA9XnI9srx7ILabQbV=s1360-w1360-h1020-rw",
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
      <div className="absolute"></div>

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
