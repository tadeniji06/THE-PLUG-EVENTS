import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Stats = () => {
  // State for animated counters
  const [counts, setCounts] = useState({
    projects: 0,
    attendees: 0,
    clients: 0,
    years: 0,
  });

  // Target values for counters
  const targetCounts = {
    projects: 30,
    attendees: 40000,
    clients: 22,
    years: 6,
  };

  const sectionRef = useRef(null);
  const statRefs = useRef([]);

  // Animation for counting up
  useEffect(() => {
    // Only start counting when section is in view
    const countingTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      onEnter: () => startCounting(),
      once: true
    });

    const startCounting = () => {
      const duration = 2500; // 2.5 seconds duration for smoother counting
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;

      const timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const easedProgress = easeOutCubic(progress);

        setCounts({
          projects: Math.floor(easedProgress * targetCounts.projects),
          attendees: Math.floor(easedProgress * targetCounts.attendees),
          clients: Math.floor(easedProgress * targetCounts.clients),
          years: Math.floor(easedProgress * targetCounts.years),
        });

        if (frame === totalFrames) {
          clearInterval(timer);
          setCounts(targetCounts);
        }
      }, frameDuration);

      return () => clearInterval(timer);
    };

    // Easing function for smoother animation
    function easeOutCubic(x) {
      return 1 - Math.pow(1 - x, 3);
    }

    // Animate stat cards
    gsap.fromTo(
      statRefs.current,
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
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    return () => {
      countingTrigger.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Stats data
  const statsData = [
    {
      icon: "eos-icons:project",
      value: counts.projects,
      label: "Completed Projects",
      suffix: "+",
    },
    {
      icon: "mdi:account-group",
      value: counts.attendees,
      label: "Total Attendees",
      suffix: "+",
    },
    {
      icon: "mdi:emoticon-happy-outline",
      value: counts.clients,
      label: "Happy Clients",
      suffix: "+",
    },
    {
      icon: "mdi:calendar-clock",
      value: counts.years,
      label: "Years of Experience",
      suffix: "",
    },
  ];

  return (
    <div ref={sectionRef} className="bg-gradient-primary text-white py-20 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-white opacity-5">
        <div className="w-full h-full" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")"}}>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Impact in Numbers
          </h2>
          <div className="w-24 h-1 bg-primary-yellow mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div
              key={index}
              ref={(el) => (statRefs.current[index] = el)}
              className="flex flex-col items-center text-center p-8 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl border border-white border-opacity-10"
            >
              <div className="mb-6 bg-gradient-secondary p-5 rounded-full shadow-lg">
                <Icon icon={stat.icon} className="text-5xl" />
              </div>

              <div className="stat-value text-5xl font-bold mb-3 gradient-text">
                {stat.value.toLocaleString()}
                {stat.suffix}
              </div>

              <div className="stat-label text-xl font-medium">
                {stat.label}
              </div>

              {/* Decorative underline */}
              <div className="w-16 h-1 bg-primary-yellow bg-opacity-70 mt-5 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced wave pattern at the bottom */}
      <div className="w-full overflow-hidden mt-16 absolute bottom-0 left-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 text-white opacity-10"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};

export default Stats;
