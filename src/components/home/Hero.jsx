import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { hero1, hero2, hero3 } from "../../utils/media";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

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
    <div className='relative h-[40vh] overflow-hidden'>
      {/* Carousel slides */}
      <div className='h-full w-full relative'>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Image with overlay */}
            <div className='relative w-full h-full'>
              <img
                src={slide.image}
                alt={slide.title}
                className='w-full h-full object-cover'
              />
              {/* Dark overlay */}
              <div className='absolute inset-0 bg-black bg-opacity-50'></div>

              {/* Text content */}
              <div className='absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4'>
                <h1 className='text-4xl md:text-6xl font-bold mb-4'>
                  {slide.title}
                </h1>
                <p className='text-xl md:text-2xl mb-8 max-w-2xl'>
                  {slide.description}
                </p>
                <Link
                  to='/events'
                  className='bg-primary-yellow hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full transition duration-300'
                >
                  Event Gallery
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-20 hover:bg-opacity-70'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 19l-7-7 7-7'
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-20 hover:bg-opacity-70'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 5l7 7-7 7'
          />
        </svg>
      </button>

      {/* Dots indicators */}
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20'>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide
                ? "bg-white"
                : "bg-white bg-opacity-50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
