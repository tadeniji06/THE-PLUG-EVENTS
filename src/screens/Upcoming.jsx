import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";
import QRCode from "react-qr-code";
import { eventsData } from "../utils/events"; // Import the events data

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Upcoming = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const eventRefs = useRef([]);
  const communityRef = useRef(null);
  const [daysLeft, setDaysLeft] = useState({});

  // Use the imported eventsData instead of hardcoded data
  // Filter and sort events to show upcoming ones
  const upcomingEvents = eventsData
    .map(event => ({
      id: event.id,
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      image: event.image,
      category: event.category,
      price: event.price,
      description: event.description,
      ticketLink: `/tickets/${event.id}`,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Calculate days left for each event
  useEffect(() => {
    const calculateDaysLeft = () => {
      const daysLeftObj = {};

      upcomingEvents.forEach((event) => {
        const eventDate = new Date(event.date);
        const currentDate = new Date();

        // Reset time part for accurate day calculation
        eventDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        // Calculate difference in milliseconds and convert to days
        const diffTime = eventDate - currentDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        daysLeftObj[event.id] = diffDays;
      });

      setDaysLeft(daysLeftObj);
    };

    calculateDaysLeft();

    // Update days left every day
    const interval = setInterval(calculateDaysLeft, 86400000);

    return () => clearInterval(interval);
  }, []); // Removed upcomingEvents from dependency array

  // Animations
  useEffect(() => {
    // Section animation
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Heading animations
    gsap.fromTo(
      headingRef.current,
      { y: 30, opacity: 0 },
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
      { y: 20, opacity: 0 },
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

    // Event card animations
    eventRefs.current.forEach((card, index) => {
      if (card) { // Add null check
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.3 + index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      }
    });

    // Community section animation
    gsap.fromTo(
      communityRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.6,
        scrollTrigger: {
          trigger: communityRef.current,
          start: "top 85%",
        },
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <section
      ref={sectionRef}
      className='py-24 px-4 bg-gradient-to-b from-neutral-100 to-white'
    >
      <div className='max-w-7xl mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2
            ref={headingRef}
            className='text-4xl md:text-5xl font-bold mb-4 gradient-text'
          >
            Upcoming Events
          </h2>
          <div className='w-32 h-1 bg-gradient-secondary mx-auto rounded-full mb-6'></div>
          <p
            ref={subheadingRef}
            className='text-neutral-700 text-lg max-w-3xl mx-auto'
          >
            Don't miss out on our exciting upcoming events. Secure your
            tickets early and join our WhatsApp community for exclusive
            updates and special offers.
          </p>
        </div>

        {/* Events List */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20'>
          {upcomingEvents.map((event, index) => (
            <div
              key={event.id}
              ref={(el) => (eventRefs.current[index] = el)}
              className='bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border border-neutral-200 flex flex-col md:flex-row'
            >
              {/* Event Image */}
              <div className='relative md:w-2/5'>
                <img
                  src={event.image}
                  alt={event.title}
                  className='w-full h-full object-cover min-h-[200px]'
                />
                <div className='absolute inset-0 bg-gradient-to-r from-black/60 to-transparent'></div>

                {/* Category Badge */}
                <div className='absolute top-4 left-4 bg-gradient-primary text-white text-sm font-bold px-3 py-1 rounded-full shadow-md'>
                  {event.category}
                </div>

                {/* Days Left Badge */}
                <div className='absolute bottom-4 left-4'>
                  <div className='bg-white text-primary-blue-dark font-bold px-4 py-2 rounded-lg shadow-md flex items-center'>
                    <Icon
                      icon='mdi:calendar-clock'
                      className='mr-2 text-xl'
                    />
                    <span>
                      {daysLeft[event.id] > 0
                        ? `${daysLeft[event.id]} days left`
                        : daysLeft[event.id] === 0
                        ? "Today!"
                        : "Event passed"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className='p-6 md:w-3/5 flex flex-col justify-between'>
                <div>
                  <h3 className='text-2xl font-bold mb-2 text-primary-blue-dark'>
                    {event.title}
                  </h3>

                  <div className='flex items-center text-neutral-700 mb-2'>
                    <Icon icon='mdi:calendar' className='mr-2 text-lg' />
                    <span>
                      {formatDate(event.date)} at {event.time}
                    </span>
                  </div>

                  <div className='flex items-center text-neutral-700 mb-4'>
                    <Icon icon='mdi:map-marker' className='mr-2 text-lg' />
                    <span>{event.location}</span>
                  </div>

                  <p className='text-neutral-600 mb-4 line-clamp-2'>
                    {event.description}
                  </p>

                  <div className='flex items-center text-neutral-700 mb-6'>
                    <Icon icon='mdi:ticket' className='mr-2 text-lg' />
                    <span className='font-medium'>{event.price}</span>
                  </div>
                </div>

                <div className='flex justify-between items-center'>
                  <Link
                    to={event.ticketLink}
                    className='bg-gradient-primary hover:shadow-lg text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 inline-flex items-center transform hover:translate-y-[-2px]'
                  >
                    Get Tickets
                    <Icon icon='mdi:ticket' className='ml-2' />
                  </Link>

                  <Link
                    to={event.ticketLink}
                    className='text-primary-blue font-semibold flex items-center hover:text-primary-blue-dark transition-colors duration-300 group'
                  >
                    Details
                    <Icon
                      icon='material-symbols:arrow-forward-rounded'
                      className='ml-1 group-hover:translate-x-1 transition-transform duration-300'
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Community Section */}
        <div
          ref={communityRef}
          className='bg-gradient-primary text-white p-8 md:p-12 rounded-2xl shadow-xl mt-16'
        >
          <div className='grid grid-cols-1 md:grid-cols-3 gap-10 items-center'>
            <div className='md:col-span-2'>
              <h3 className='text-3xl font-bold mb-4'>
                Join Our Community
              </h3>
              <p className='text-white/90 mb-6 text-lg'>
                Be Part of the Experience! Stay ahead with exclusive
                updates, early access to tickets, and special offers.
                Connect with like-minded event enthusiasts and never miss
                out on the latest happenings. Join our WhatsApp community
                today for real-time updates and VIP perks!
              </p>

              <div className='flex flex-wrap gap-4'>
                <a
                  href='https://chat.whatsapp.com/Frm5qlLussrK1XSFVIupex'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl transform hover:translate-y-[-2px]'
                >
                  <Icon icon='mdi:whatsapp' className='mr-2 text-xl' />
                  Join WhatsApp Community
                </a>

                <a
                  href="https://wa.me/+2348123456789?text=I'm%20interested%20in%20your%20upcoming%20events"
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-white text-primary-blue font-bold py-3 px-6 rounded-lg transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl transform hover:translate-y-[-2px]'
                >
                  <Icon icon='mdi:message' className='mr-2 text-xl' />
                  Message Us Directly
                </a>
              </div>
            </div>

            <div className='flex justify-center'>
              <div className='bg-white p-4 rounded-xl shadow-lg'>
                <QRCode
                  value='https://chat.whatsapp.com/Frm5qlLussrK1XSFVIupex'
                  size={180}
                  bgColor='#FFFFFF'
                  fgColor='#000000'
                  level='H'
                />
                <p className='text-center mt-3 text-neutral-800 font-medium'>
                  Scan to Join
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className='text-center mt-20'>
          <Link
            to='/events'
            className='bg-gradient-secondary hover:shadow-lg text-white font-bold py-4 px-10 rounded-full transition-all duration-300 inline-flex items-center transform hover:translate-y-[-2px]'
          >
            View All Events
            <Icon
              icon='material-symbols:arrow-forward-rounded'
              className='ml-2 text-xl'
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Upcoming;
