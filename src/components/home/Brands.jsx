import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CY, Indomie, PayKode, DeRock, torley, teez } from "../../utils/media";

const Brands = () => {
  const images = [CY, Indomie, PayKode, DeRock, torley, teez];
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  useEffect(() => {
    // Duplicate the images to create a seamless loop
    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach(item => {
      const duplicatedItem = item.cloneNode(true);
      scrollerRef.current.appendChild(duplicatedItem);
    });

    // Set up GSAP animation
    const scrollTween = gsap.to(scrollerRef.current, {
      x: `-50%`,
      ease: "none",
      duration: 5,
      repeat: -1, // Infinite repeat
      paused: true
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
  }, []);

  return (
    <div className="py-12 overflow-hidden">
      <div className="text-center mb-8">
        <span className="text-4xl font-bold gradient-text">PARTNERED BRANDS</span>
      </div>

      <div 
        ref={containerRef}
        className="relative overflow-hidden w-full"
      >
        <div 
          ref={scrollerRef}
          className="flex items-center whitespace-nowrap"
        >
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 px-8">
              <img 
                src={image} 
                alt={`Brand ${index + 1}`} 
                className="h-28 md:h-28 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
