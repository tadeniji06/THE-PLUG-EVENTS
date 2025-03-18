import React, { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { aim, features } from "../../utils/constants";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Aim = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const featureRefs = useRef([]);
  const ctaRef = useRef(null);

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

    // Features animation - staggered entrance
    gsap.fromTo(
      featureRefs.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featureRefs.current[0],
          start: "top 80%",
        },
      }
    );

    // CTA animation
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.5,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 90%",
        },
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="py-24 px-4 bg-neutral-100">
      <div className="max-w-7xl mx-auto">
        {/* Main Aim Section */}
        <div className="text-center mb-20">
          <h2 
            ref={headingRef} 
            className="text-4xl md:text-5xl font-bold mb-6 relative inline-block"
          >
            <span className="gradient-text">Perfection Is What We Aim For</span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-secondary mt-3 rounded-full"></div>
          </h2>

          <p className="text-neutral-700 max-w-3xl mx-auto mt-8 leading-relaxed text-lg">
            {aim[0].body}
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featureRefs.current[index] = el)}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 text-center relative overflow-hidden group transform hover:-translate-y-2"
            >
              {/* Decorative arrow connecting cards */}
              {index < features.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-5 transform -translate-y-1/2 z-10">
                  <Icon
                    icon="material-symbols:arrow-right-alt-rounded"
                    className="text-3xl text-primary-blue"
                  />
                </div>
              )}

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-primary bg-opacity-5 rounded-bl-full transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-top-right"></div>

              {/* Icon with animated background */}
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-50 text-primary-blue mb-8 mx-auto group-hover:bg-gradient-primary group-hover:text-white transition-all duration-500 shadow-md">
                <Icon icon={feature.icon} className="text-4xl" />
              </div>

              <h3 className="text-2xl font-bold mb-4 text-primary-blue-dark group-hover:text-primary-blue transition-colors duration-300">
                {feature.title}
              </h3>

              <p className="text-neutral-700 leading-relaxed">
                {feature.description}
              </p>

              {/* Animated underline on hover */}
              <div className="w-0 h-1 bg-gradient-secondary mx-auto mt-6 group-hover:w-24 transition-all duration-500 rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div ref={ctaRef} className="text-center mt-20">
          <Link 
            to="/about" 
            className="inline-flex items-center bg-gradient-secondary hover:shadow-lg text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:translate-y-[-2px]"
          >
            Learn More About Us
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

export default Aim;
