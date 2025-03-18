import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { hero1, hero2, hero3 } from "../../utils/media";
import { gsap } from "gsap";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRefs = useRef([]);
  const titleRefs = useRef([]);
  const descRefs = useRef([]);
  const btnRef = useRef(null);

  const slides = [
    {
      image: hero1,
      title: "Exclusive Events",
      description:
        "Join our premium events curated for the ultimate experience",
    },
    {
      image: hero2,
      title: "Live Performances",
      description:
        "Experience the best live performances from top artists",
    },
    {
      image: hero3,
      title: "Networking Opportunities",
      description:
        "Connect with industry professionals and expand your network",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 7000); // Increased to 7 seconds for better viewing experience

    return () => clearInterval(interval);
  }, [slides.length]);

  // Animation for slide content
  useEffect(() => {
    // Animate current slide content
    if (titleRefs.current[currentSlide] && descRefs.current[currentSlide]) {
      gsap.fromTo(
        titleRefs.current[currentSlide],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3 }
      );
      
      gsap.fromTo(
        descRefs.current[currentSlide],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5 }
      );
      
      gsap.fromTo(
        btnRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.7 }
      );
    }
  }, [currentSlide]);

  // Manual navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative h-[80vh] overflow-hidden">
      {/* Carousel slides */}
      <div className="h-full w-full relative">
        {slides.map((slide, index) => (
          <div
            key={index}
            ref={(el) => (slideRefs.current[index] = el)}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Image with overlay */}
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay instead of flat black */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>

              {/* Text content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                <h1 
                  ref={(el) => (titleRefs.current[index] = el)}
                  className="text-5xl md:text-7xl font-bold mb-6 tracking-tight gradient-text"
                >
                  {slide.title}
                </h1>
                <p 
                  ref={(el) => (descRefs.current[index] = el)}
                  className="text-xl md:text-2xl mb-10 max-w-2xl text-neutral-100"
                >
                  {slide.description}
                </p>
                <div ref={btnRef}>
                  <Link
                    to="/events"
                    className="bg-gradient-secondary hover:shadow-lg text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:translate-y-[-2px] inline-flex items-center"
                  >
                    Event Gallery
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 ml-2" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows - enhanced */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-primary-blue text-white p-3 rounded-full z-20 transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-primary-blue text-white p-3 rounded-full z-20 transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Enhanced dots indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary-yellow w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/40 to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
    </div>
  );
};

export default Hero;
