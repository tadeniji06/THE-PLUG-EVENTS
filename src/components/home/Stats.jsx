import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
// import { statsData } from "../../utils/constants";

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
    projects: 50,
    attendees: 50000,
    clients: 40,
    years: 6,
  };

  // Animation for counting up
  useEffect(() => {
    const duration = 2000; // 2 seconds duration
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      setCounts({
        projects: Math.floor(progress * targetCounts.projects),
        attendees: Math.floor(progress * targetCounts.attendees),
        clients: Math.floor(progress * targetCounts.clients),
        years: Math.floor(progress * targetCounts.years),
      });

      if (frame === totalFrames) {
        clearInterval(timer);
        setCounts(targetCounts);
      }
    }, frameDuration);

    return () => clearInterval(timer);
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
    <div className='bg-primary-blue text-white py-16 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {statsData.map((stat, index) => (
            <div
              key={index}
              className='flex flex-col items-center text-center p-6 rounded-lg bg-blue-800 bg-opacity-30 hover:bg-opacity-50 transition-all duration-300 transform hover:-translate-y-1'
            >
              <div className='mb-4 bg-white bg-opacity-10 p-4 rounded-full'>
                <Icon icon={stat.icon} className='text-5xl' />
              </div>

              <div className='stat-value text-4xl font-bold mb-2'>
                {stat.value.toLocaleString()}
                {stat.suffix}
              </div>

              <div className='stat-label text-lg opacity-90'>
                {stat.label}
              </div>

              {/* Decorative underline */}
              <div className='w-16 h-1 bg-white bg-opacity-50 mt-4'></div>
            </div>
          ))}
        </div>
      </div>

      {/*subtle wave pattern at the bottom */}
      <div className='w-full overflow-hidden mt-12'>
        <svg
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'
          className='w-full h-12 text-white opacity-10'
        >
          <path
            d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'
            fill='currentColor'
          />
        </svg>
      </div>
    </div>
  );
};

export default Stats;
