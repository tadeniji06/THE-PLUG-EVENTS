import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { galleryImages } from "../../utils/constants";
import { gsap } from "gsap";

const EventGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const carouselRef = useRef(null);
  const captionRefs = useRef([]);

  // Animation setup
  useEffect(() => {
    // Heading animation
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      }
    );

    // Carousel animation
    gsap.fromTo(
      carouselRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  // Caption animation when slide changes
  useEffect(() => {
    if (captionRefs.current[currentIndex]) {
      gsap.fromTo(
        captionRefs.current[currentIndex],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.3 }
      );
    }
  }, [currentIndex]);

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % galleryImages.length
        );
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, galleryImages.length]);

  // Navigation functions
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    setIsAutoPlaying(false);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      goToNext();
    }
    if (touchStart - touchEnd < -50) {
      // Swipe right
      goToPrev();
    }
  };

  // Calculate which images to show in the preview
  const getVisibleImages = () => {
    const result = [];
    for (let i = 0; i < Math.min(5, galleryImages.length); i++) {
      result.push((currentIndex + i) % galleryImages.length);
    }
    return result;
  };

  // Toggle autoplay
  const toggleAutoplay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div ref={sectionRef} className="py-24 px-4 bg-gradient-to-b from-neutral-100 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">EVENT GALLERY</h2>
          <div className="flex justify-center mb-6">
            <div className="w-32 h-1 bg-gradient-secondary rounded-full"></div>
          </div>
          <p className="text-neutral-700 max-w-2xl mx-auto text-lg">
            Take a glimpse at some of our most memorable events. Each image
            tells a story of celebration, connection, and unforgettable
            experiences.
          </p>
        </div>

        {/* Main Carousel */}
        <div
          ref={carouselRef}
          className="relative overflow-hidden rounded-2xl shadow-2xl mb-12 h-[500px] md:h-[600px] group"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Image */}
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0"
              }`}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transform scale-100 transition-transform duration-10000 ease-in-out"
                style={{
                  transform: index === currentIndex ? "scale(1.05)" : "scale(1)",
                  transitionDuration: "10s"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70"></div>

              {/* Image Caption */}
              <div 
                ref={(el) => (captionRefs.current[index] = el)}
                className="absolute bottom-0 left-0 right-0 p-8 text-white"
              >
                <h3 className="text-3xl font-bold mb-3">{image.title}</h3>
                <p className="text-base md:text-lg opacity-90 max-w-2xl">
                  {image.description}
                </p>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-4 rounded-full z-20 hover:bg-primary-blue transition-all duration-300 opacity-70 group-hover:opacity-100 backdrop-blur-sm"
            aria-label="Previous image"
          >
            <Icon icon="mdi:chevron-left" className="text-2xl" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-4 rounded-full z-20 hover:bg-primary-blue transition-all duration-300 opacity-70 group-hover:opacity-100 backdrop-blur-sm"
            aria-label="Next image"
          >
            <Icon icon="mdi:chevron-right" className="text-2xl" />
          </button>

          {/* Autoplay control */}
          <button
            onClick={toggleAutoplay}
            className="absolute top-6 right-6 bg-black/30 text-white p-3 rounded-full z-20 hover:bg-primary-blue transition-all duration-300 backdrop-blur-sm"
            aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            <Icon 
              icon={isAutoPlaying ? "mdi:pause" : "mdi:play"} 
              className="text-xl" 
            />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary-yellow w-10"
                    : "bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Thumbnail Preview */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-12">
          {getVisibleImages().map((imageIndex, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-xl cursor-pointer transition-all duration-300 transform ${
                imageIndex === currentIndex
                  ? "ring-4 ring-primary-blue scale-105 shadow-lg"
                  : "opacity-70 hover:opacity-100 hover:scale-105"
              }`}
              onClick={() => goToSlide(imageIndex)}
            >
              <img
                src={galleryImages[imageIndex].src}
                alt={galleryImages[imageIndex].title}
                className="w-full h-24 md:h-32 object-cover"
              />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Link
            to="/events"
            className="bg-gradient-secondary hover:shadow-lg text-white font-bold py-4 px-10 rounded-full transition-all duration-300 inline-flex items-center transform hover:translate-y-[-2px]"
          >
            View Full Gallery
            <Icon
              icon="material-symbols:arrow-forward-rounded"
              className="ml-2 text-xl"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventGallery;
