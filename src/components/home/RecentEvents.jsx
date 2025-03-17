import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Arena, IgboAmaka, GrandFiesta } from "../../utils/media";
import { Icon } from "@iconify/react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const RecentEvents = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const cardsRef = useRef([]);

  const recentEvents = [
    {
      id: 1,
      title: "Igbo Amaka Festival",
      date: "22 March 2025",
      location: "Lagos Cultural Center",
      image: IgboAmaka,
      category: "Cultural",
      attendees: 1200,
      description:
        "A celebration of Igbo culture featuring traditional music, dance, and cuisine.",
    },
    {
      id: 2,
      title: "Grand Fiesta",
      date: "15 April 2025",
      location: "Beachfront Resort",
      image: GrandFiesta,
      category: "Party",
      attendees: 850,
      description:
        "An exclusive beach party with top DJs, gourmet food, and spectacular fireworks.",
    },
    {
      id: 3,
      title: "Arena Concert Series",
      date: "7 June 2025",
      location: "National Stadium",
      image: Arena,
      category: "Concert",
      attendees: 5000,
      description:
        "A night of unforgettable performances from both local and international artists.",
    },
  ];

  useEffect(() => {
    // Main section entrance animation
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Heading animations
    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
      }
    );

    // Subheading animations
    gsap.fromTo(
      subheadingRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: subheadingRef.current,
          start: "top 85%",
        },
      }
    );

    // Card animations - staggered entrance
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 100,
          opacity: 0,
          rotateY: 15,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.2 + index * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );

      // Hover animation setup
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          scale: 1.03,
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          duration: 0.3,
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          duration: 0.3,
        });
      });
    });

    // Parallax effect on images
    cardsRef.current.forEach((card) => {
      const image = card.querySelector(".event-image");

      ScrollTrigger.create({
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(image, {
            y: progress * 30,
            duration: 0.1,
            ease: "none",
          });
        },
      });
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className='py-20 px-4 bg-gradient-to-b from-white to-gray-50 overflow-hidden'
    >
      <div className='max-w-7xl mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2
            ref={headingRef}
            className='text-4xl font-bold mb-4 relative inline-block'
          >
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-primary-blue to-blue-600'>
              RECENTLY PLANNED EVENTS
            </span>
            <div
              className='absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue to-blue-600 transform scale-x-0 origin-left transition-transform duration-700 ease-out'
              style={{ animation: "expandWidth 1.5s forwards 0.5s" }}
            ></div>
          </h2>

          <p
            ref={subheadingRef}
            className='text-gray-600 text-xl max-w-2xl mx-auto'
          >
            Explore some of our past and upcoming signature events that
            showcase our expertise in event planning and execution.
          </p>
        </div>

        {/* Events Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12'>
          {recentEvents.map((event, index) => (
            <div
              key={event.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className='bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300'
            >
              {/* Event Image with Overlay */}
              <div className='relative h-64 overflow-hidden'>
                <img
                  src={event.image}
                  alt={event.title}
                  className='event-image w-full h-full object-cover transition-transform duration-700'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70'></div>

                {/* Category Badge */}
                <div className='absolute top-4 right-4 bg-primary-blue text-white text-sm font-bold px-3 py-1 rounded-full'>
                  {event.category}
                </div>

                {/* Date Badge */}
                <div className='absolute top-4 left-4 bg-white text-primary-blue text-sm font-bold px-3 py-1 rounded-full flex items-center'>
                  <Icon icon='mdi:calendar' className='mr-1' />
                  {event.date}
                </div>
              </div>

              {/* Event Details */}
              <div className='p-6'>
                <h3 className='text-2xl font-bold mb-2 text-gray-800'>
                  {event.title}
                </h3>

                <div className='flex items-center text-gray-600 mb-3'>
                  <Icon icon='mdi:map-marker' className='mr-1' />
                  <span>{event.location}</span>
                </div>

                <p className='text-gray-600 mb-4'>{event.description}</p>

                <div className='flex justify-between items-center'>
                  <div className='flex items-center text-gray-500'>
                    <Icon icon='mdi:account-group' className='mr-1' />
                    <span>
                      {event.attendees.toLocaleString()} Attendees
                    </span>
                  </div>

                  <Link
                    to={`/events/${event.id}`}
                    className='text-primary-blue font-semibold flex items-center hover:underline'
                  >
                    View Details
                    <Icon
                      icon='material-symbols:arrow-forward-rounded'
                      className='ml-1'
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Events Button */}
        <div className='text-center mt-16'>
          <Link to='/events' className='relative inline-block group'>
            <span className='absolute inset-0 bg-primary-blue rounded-full transform scale-110 opacity-10 group-hover:scale-125 group-hover:opacity-20 transition-all duration-300'></span>
            <span className='relative bg-primary-yellow hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full inline-flex items-center transition-all duration-300 shadow-lg hover:shadow-xl'>
              View All Events
              <Icon
                icon='material-symbols:arrow-forward-rounded'
                className='ml-2 group-hover:translate-x-1 transition-transform duration-300'
              />
            </span>
          </Link>
        </div>
      </div>

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes expandWidth {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  );
};

export default RecentEvents;
