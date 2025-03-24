import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";
import { eventsData } from "../../utils/events";

gsap.registerPlugin(ScrollTrigger);

const RecentEvents = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const cardsRef = useRef([]);
  const buttonRef = useRef(null);

  // Get featured events from eventsData or fallback to first 3 events
  const recentEvents = eventsData
    .filter(event => event.featured)
    .slice(0, 3) || eventsData.slice(0, 3);

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

    // Button animation
    gsap.fromTo(
      buttonRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.6,
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 90%",
        },
      }
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Format date for display
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 bg-gradient-to-b from-white to-neutral-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold mb-6 relative inline-block"
          >
            <span className="gradient-text">FEATURED EVENTS</span>
            <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-secondary rounded-full transform scale-x-0 origin-left transition-transform duration-700 ease-out animate-expandWidth"></div>
          </h2>

          <p
            ref={subheadingRef}
            className="text-neutral-700 text-xl max-w-2xl mx-auto"
          >
            Explore some of our past and upcoming signature events that
            showcase our expertise in event planning and execution.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          {recentEvents.map((event, index) => (
            <div
              key={event.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border border-neutral-200"
            >
              {/* Event Image with Overlay */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="event-image w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                {/* Category Badge */}
                <div className="absolute top-5 right-5 bg-gradient-primary text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
                  {event.category}
                </div>

                {/* Date Badge */}
                <div className="absolute top-5 left-5 bg-white text-primary-blue-dark text-sm font-bold px-4 py-1.5 rounded-full flex items-center shadow-md">
                  <Icon icon="mdi:calendar" className="mr-1.5" />
                  {formatEventDate(event.date)}
                </div>
               
                {/* Event Title on Image */}
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-white/90 mb-3">
                    <Icon icon="mdi:map-marker" className="mr-1.5" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <p className="text-neutral-700 mb-6 line-clamp-3">{event.description}</p>

                <div className="flex justify-between items-center">
                  {event.ticketTypes && (
                    <div className="flex items-center text-neutral-600">
                      <Icon icon="mdi:ticket" className="mr-1.5 text-lg" />
                      <span className="font-medium">
                        From {event.ticketTypes[0]?.price || event.price}
                      </span>
                    </div>
                  )}

                  <Link
                    to={`/tickets/${event.id}`}
                    className="text-primary-blue font-semibold flex items-center hover:text-primary-blue-dark transition-colors duration-300 group"
                  >
                    View Details
                    <Icon
                      icon="material-symbols:arrow-forward-rounded"
                      className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Events Button */}
        <div ref={buttonRef} className="text-center mt-20">
          <Link to="/events" className="relative inline-block group">
            <span className="absolute inset-0 bg-primary-blue rounded-full transform scale-110 opacity-10 group-hover:scale-125 group-hover:opacity-20 transition-all duration-300"></span>
            <span className="relative bg-gradient-secondary hover:shadow-lg text-white font-bold py-4 px-10 rounded-full inline-flex items-center transition-all duration-300 shadow-md hover:shadow-xl transform hover:translate-y-[-2px]">
              View All Events
              <Icon
                icon="material-symbols:arrow-forward-rounded"
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
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
       
        .animate-expandWidth {
          animation: expandWidth 1.5s forwards 0.5s;
        }
      `}</style>
    </section>
  );
};

export default RecentEvents;
