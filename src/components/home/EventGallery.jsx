import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { galleryImages } from "../../utils/constants";
const EventGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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
    for (let i = 0; i < galleryImages.length; i++) {
      result.push((currentIndex + i) % galleryImages.length);
    }
    return result;
  };

  return (
    <div className='py-16 px-4 bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold mb-4'>EVENT GALLERY</h2>
          <div className='flex justify-center mb-4'>
            <div className='w-24 h-1 bg-primary-blue'></div>
          </div>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Take a glimpse at some of our most memorable events. Each image
            tells a story of celebration, connection, and unforgettable
            experiences.
          </p>
        </div>

        {/* Main Carousel */}
        <div
          className='relative overflow-hidden rounded-xl shadow-xl mb-8 h-[500px]'
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
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-black bg-opacity-30'></div>

              {/* Image Caption */}
              <div className='absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black to-transparent'>
                <h3 className='text-2xl font-bold mb-2'>{image.title}</h3>
                <p className='text-sm md:text-base opacity-90'>
                  {image.description}
                </p>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-20 hover:bg-opacity-70 transition-all duration-300'
            aria-label='Previous image'
          >
            <Icon icon='mdi:chevron-left' className='text-2xl' />
          </button>
          <button
            onClick={goToNext}
            className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-20 hover:bg-opacity-70 transition-all duration-300'
            aria-label='Next image'
          >
            <Icon icon='mdi:chevron-right' className='text-2xl' />
          </button>

          {/* Indicators */}
          <div className='absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20'>
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white scale-125"
                    : "bg-white bg-opacity-50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Thumbnail Preview */}
        <div className='grid grid-cols-3 gap-4 mb-8'>
          {getVisibleImages().map((imageIndex, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-lg cursor-pointer transition-all duration-300 ${
                imageIndex === currentIndex
                  ? "ring-4 ring-primary-blue"
                  : "opacity-70 hover:opacity-100"
              }`}
              onClick={() => goToSlide(imageIndex)}
            >
              <img
                src={galleryImages[imageIndex].src}
                alt={galleryImages[imageIndex].title}
                className='w-full h-32 object-cover'
              />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className='text-center mt-8'>
          <Link
            to='/gallery'
            className='bg-primary-yellow hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 inline-flex items-center'
          >
            View More
            <Icon
              icon='material-symbols:arrow-forward-rounded'
              className='ml-2'
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventGallery;
