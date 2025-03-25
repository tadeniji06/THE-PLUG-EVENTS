import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  CY,
  Indomie,
  PayKode,
  DeRock,
  torley,
  teez,
  Fidelity,
  MTN,
  Opay,
  SS,
  Trace,
} from "../../utils/media";

const Brands = () => {
  const images = [
    CY,
    Indomie,
    PayKode,
    DeRock,
    torley,
    teez,
    Fidelity,
    MTN,
    Opay,
    SS,
    Trace,
  ];
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation for desktop
  useEffect(() => {
    if (isMobile) return; // Skip animation for mobile
    
    // Clear any existing children first
    if (scrollerRef.current) {
      const originalContent = Array.from(scrollerRef.current.children);
      
      // Duplicate the images to create a seamless loop
      originalContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current.appendChild(duplicatedItem);
      });

      // Set up GSAP animation
      const scrollTween = gsap.to(scrollerRef.current, {
        x: `-50%`,
        ease: "none",
        duration: 20, // Slower for better visibility
        repeat: -1, // Infinite repeat
        paused: true,
      });

      // Start the animation
      scrollTween.play();

      // Pause on hover for better user experience
      containerRef.current.addEventListener("mouseenter", () => scrollTween.pause());
      containerRef.current.addEventListener("mouseleave", () => scrollTween.play());

      // Clean up
      return () => {
        scrollTween.kill();
        containerRef.current?.removeEventListener("mouseenter", () => scrollTween.pause());
        containerRef.current?.removeEventListener("mouseleave", () => scrollTween.play());
      };
    }
  }, [isMobile]);

  return (
    <div className="py-12 overflow-hidden">
      <div className="text-center mb-8">
        <span className="text-4xl font-bold gradient-text">
          PARTNERED BRANDS
        </span>
      </div>

      {isMobile ? (
        // Mobile grid layout
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center p-4 bg-gray-100 bg-opacity-10 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={image}
                alt={`Brand ${index + 1}`}
                className="h-16 sm:h-20 object-contain"
              />
            </div>
          ))}
        </div>
      ) : (
        // Desktop scrolling layout
        <div ref={containerRef} className="relative overflow-hidden w-full">
          <div
            ref={scrollerRef}
            className="flex items-center whitespace-nowrap"
          >
            {images.map((image, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 px-8 mx-2 bg-gray-100 bg-opacity-10 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <img
                  src={image}
                  alt={`Brand ${index + 1}`}
                  className="h-24 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Brands;
