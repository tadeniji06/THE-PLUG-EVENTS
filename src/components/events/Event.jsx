import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";
import { Arena, IgboAmaka, GrandFiesta } from "../../utils/media";
import QRCode from "react-qr-code";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Event = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [selectedTicketType, setSelectedTicketType] = useState("standard");

  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const detailsRef = useRef(null);
  const ticketsRef = useRef(null);
  const relatedRef = useRef(null);

  // Mock events data - in a real app, you would fetch this from an API
  const eventsData = [
    {
      id: "igbo-amaka",
      title: "Igbo Amaka Festival",
      date: "2025-04-13",
      time: "12:00 PM",
      endTime: "10:00 PM",
      location: "Lagos Cultural Center",
      address: "123 Cultural Avenue, Lagos Island, Lagos",
      image: IgboAmaka,
      gallery: [IgboAmaka, Arena, GrandFiesta],
      category: "Cultural",
      price: "₦5,000",
      description:
        "A celebration of Igbo culture featuring traditional music, dance, and cuisine. Join us for this immersive cultural experience.",
      longDescription: `
        <p>The Igbo Amaka Festival is a vibrant celebration of Igbo culture, traditions, and heritage. This day-long event brings together people from all walks of life to experience the rich cultural tapestry of the Igbo people.</p>
        
        <p>Attendees will enjoy:</p>
        <ul>
          <li>Traditional Igbo music and dance performances</li>
          <li>Authentic Igbo cuisine and food demonstrations</li>
          <li>Cultural exhibitions and art displays</li>
          <li>Traditional fashion showcase</li>
          <li>Interactive workshops on Igbo language and customs</li>
        </ul>
        
        <p>This festival is perfect for families, cultural enthusiasts, and anyone interested in experiencing the vibrant traditions of the Igbo people. Don't miss this opportunity to immerse yourself in one of Nigeria's most celebrated cultures.</p>
      `,
      organizer: "Cultural Heritage Foundation",
      ticketTypes: [
        {
          name: "Standard",
          price: "₦5,000",
          description: "General admission",
        },
        {
          name: "VIP",
          price: "₦15,000",
          description:
            "Priority seating, exclusive lounge access, and complimentary refreshments",
        },
        {
          name: "Family Pack",
          price: "₦18,000",
          description: "Admission for 2 adults and 2 children (under 12)",
        },
      ],
      features: [
        { icon: "mdi:food", text: "Traditional Cuisine" },
        { icon: "mdi:music", text: "Live Performances" },
        { icon: "mdi:account-group", text: "Cultural Workshops" },
        { icon: "mdi:shopping", text: "Artisan Market" },
      ],
      faqs: [
        {
          question: "Is the event family-friendly?",
          answer:
            "Yes, the Igbo Amaka Festival is designed for all ages with activities for children and adults alike.",
        },
        {
          question: "Are there food options available?",
          answer:
            "Yes, there will be various food vendors offering traditional Igbo cuisine as well as other Nigerian dishes.",
        },
        {
          question: "What should I wear?",
          answer:
            "While there's no strict dress code, attendees are encouraged to wear traditional Igbo attire to fully embrace the cultural experience.",
        },
      ],
    },
    {
      id: "grand-fiesta",
      title: "Grand Fiesta",
      date: "2024-11-28",
      time: "8:00 PM",
      endTime: "4:00 AM",
      location: "Beachfront Resort",
      address: "Beachfront Resort, Victoria Island, Lagos",
      image: GrandFiesta,
      gallery: [GrandFiesta, IgboAmaka, Arena],
      category: "Party",
      price: "₦10,000",
      description:
        "An exclusive beach party with top DJs, gourmet food, and spectacular fireworks. The most anticipated end-of-year celebration.",
      longDescription: `
        <p>Grand Fiesta is the ultimate beach party experience, bringing together the best music, food, and entertainment for an unforgettable night under the stars.</p>
        
        <p>What to expect:</p>
        <ul>
          <li>World-class DJs spinning the latest hits</li>
          <li>Gourmet food stations with international cuisine</li>
          <li>Premium open bar with signature cocktails</li>
          <li>Spectacular fireworks display at midnight</li>
          <li>Exclusive VIP areas with bottle service</li>
        </ul>
        
        <p>This is the most anticipated end-of-year celebration, perfect for those looking to dance the night away in a luxurious beachfront setting. Dress to impress and prepare for a night of non-stop entertainment.</p>
      `,
      organizer: "Luxury Events Nigeria",
      ticketTypes: [
        {
          name: "Standard",
          price: "₦10,000",
          description: "General admission",
        },
        {
          name: "VIP",
          price: "₦25,000",
          description:
            "VIP area access, complimentary drinks, and express entry",
        },
        {
          name: "VVIP",
          price: "₦50,000",
          description:
            "Exclusive beachfront cabana, premium bottle service, and personal attendant",
        },
      ],
      features: [
        { icon: "mdi:music", text: "Top DJs" },
        { icon: "mdi:food-variant", text: "Gourmet Food" },
        { icon: "mdi:glass-cocktail", text: "Premium Bar" },
        { icon: "mdi:firework", text: "Fireworks Show" },
      ],
      faqs: [
        {
          question: "What is the dress code?",
          answer:
            "The dress code is upscale beach party attire. Think stylish resort wear with a touch of glamour.",
        },
        {
          question: "Is there parking available?",
          answer:
            "Yes, complimentary valet parking is available for all guests.",
        },
        {
          question: "What time do the fireworks start?",
          answer:
            "The fireworks display is scheduled for midnight, weather permitting.",
        },
      ],
    },
    {
      id: "arena-concert",
      title: "Arena Concert Series",
      date: "2025-02-14",
      time: "7:00 PM",
      endTime: "11:00 PM",
      location: "National Stadium",
      address: "National Stadium, Surulere, Lagos",
      image: Arena,
      gallery: [Arena, GrandFiesta, IgboAmaka],
      category: "Concert",
      price: "₦7,500 - ₦25,000",
      description:
        "A night of unforgettable performances from both local and international artists. Valentine's special edition.",
      longDescription: `
        <p>The Arena Concert Series returns with a special Valentine's Day edition, featuring an incredible lineup of both local and international artists for a night of unforgettable music.</p>
        
        <p>This year's lineup includes:</p>
        <ul>
          <li>Grammy-winning international headliner (to be announced)</li>
          <li>Top Nigerian artists and bands</li>
          <li>Emerging talent showcase</li>
          <li>Special Valentine's themed performances</li>
        </ul>
        
        <p>Whether you're celebrating with a loved one or coming with friends, this concert promises to be the highlight of your Valentine's Day. With state-of-the-art sound and lighting, the Arena Concert Series delivers a world-class concert experience right here in Lagos.</p>
      `,
      organizer: "Soundwave Productions",
      ticketTypes: [
        {
          name: "Regular",
          price: "₦7,500",
          description: "General admission standing",
        },
        {
          name: "Premium",
          price: "₦15,000",
          description: "Seated area with good views",
        },
        {
          name: "Gold",
          price: "₦25,000",
          description:
            "Front section seating with exclusive merchandise pack",
        },
      ],
      features: [
        { icon: "mdi:account-music", text: "Live Performances" },
        { icon: "mdi:speaker", text: "Premium Sound" },
        { icon: "mdi:spotlight", text: "Light Show" },
        { icon: "mdi:gift", text: "Valentine's Special" },
      ],
      faqs: [
        {
          question: "Can I bring my camera?",
          answer:
            "Small personal cameras are allowed, but professional photography equipment requires press credentials.",
        },
        {
          question: "What time do doors open?",
          answer:
            "Doors open at 5:30 PM, two hours before the show starts.",
        },
        {
          question: "Is there a bag policy?",
          answer:
            "Yes, bags larger than 12x12 inches are not permitted. All bags will be subject to search.",
        },
      ],
    },
  ];

  // Find the event based on the eventId parameter
  useEffect(() => {
    // In a real app, you would fetch the event data from an API
    const foundEvent = eventsData.find((e) => e.id === eventId);

    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      // If event not found, redirect to events page
      navigate("/events");
    }

    setLoading(false);
  }, [eventId, navigate]);

  // Animations
  useEffect(() => {
    if (!loading && event) {
      // Hero section animation
      gsap.fromTo(
        heroRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
        }
      );

      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
        }
      );

      // Content sections animations
      gsap.fromTo(
        detailsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.5,
          scrollTrigger: {
            trigger: detailsRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ticketsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: ticketsRef.current,
            start: "top 80%",
          },
        }
      );

      if (relatedRef.current) {
        gsap.fromTo(
          relatedRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            scrollTrigger: {
              trigger: relatedRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [loading, event]);

  // Format date for display
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Calculate total price
  const calculateTotal = () => {
    if (!event) return 0;

    const selectedType = event.ticketTypes.find(
      (type) => type.name.toLowerCase() === selectedTicketType
    );

    if (!selectedType) return 0;

    const price = parseInt(selectedType.price.replace(/[^\d]/g, ""));
    return price * ticketQuantity;
  };

  // Handle ticket quantity change
  const handleQuantityChange = (change) => {
    const newQuantity = ticketQuantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setTicketQuantity(newQuantity);
    }
  };

  // Get related events (excluding current event)
  const getRelatedEvents = () => {
    if (!event) return [];
    return eventsData.filter((e) => e.id !== event.id).slice(0, 2);
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-blue'></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <h2 className='text-3xl font-bold mb-4'>Event Not Found</h2>
        <p className='mb-6'>
          The event you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to='/events'
          className='bg-gradient-primary hover:shadow-lg text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center'
        >
          Browse All Events
          <Icon
            icon='material-symbols:arrow-forward-rounded'
            className='ml-2'
          />
        </Link>
      </div>
    );
  }

  return (
    <div className='bg-neutral-50'>
      {/* Hero Section */}
      <div
        ref={heroRef}
        className='relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden'
      >
        <img
          src={event.image}
          alt={event.title}
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent'></div>

        <div className='absolute inset-0 flex flex-col justify-end p-6 md:p-16 max-w-7xl mx-auto'>
          <div ref={titleRef}>
            <div className='flex items-center mb-4'>
              <span className='bg-gradient-primary text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md mr-3'>
                {event.category}
              </span>
              <span className='bg-white text-primary-blue-dark text-sm font-bold px-4 py-1.5 rounded-full shadow-md flex items-center'>
                <Icon icon='mdi:calendar' className='mr-1.5' />
                {formatDate(event.date)}
              </span>
            </div>

            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4'>
              {event.title}
            </h1>

            <div className='flex flex-wrap items-center gap-4 text-white'>
              <div className='flex items-center'>
                <Icon
                  icon='mdi:clock-outline'
                  className='mr-1.5 text-xl'
                />
                <span>
                  {event.time} - {event.endTime}
                </span>
              </div>

              <div className='flex items-center'>
                <Icon icon='mdi:map-marker' className='mr-1.5 text-xl' />
                <span>{event.location}</span>
              </div>

              <div className='flex items-center'>
                <Icon
                  icon='mdi:ticket-outline'
                  className='mr-1.5 text-xl'
                />
                <span>From {event.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
          {/* Left Column - Event Details */}
          <div className='lg:col-span-2'>
            {/* Event Description */}
            <div
              ref={detailsRef}
              className='bg-white rounded-2xl shadow-md p-8 mb-10'
            >
              <h2 className='text-3xl font-bold mb-6 text-primary-blue-dark'>
                About This Event
              </h2>

              <div
                className='prose prose-lg max-w-none mb-8'
                dangerouslySetInnerHTML={{ __html: event.longDescription }}
              ></div>

              {/* Event Features */}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-10'>
                {event.features.map((feature, index) => (
                  <div
                    key={index}
                    className='flex flex-col items-center text-center'
                  >
                    <div className='w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white mb-3'>
                      <Icon icon={feature.icon} className='text-3xl' />
                    </div>
                    <span className='font-medium'>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Gallery */}
            <div className='bg-white rounded-2xl shadow-md p-8 mb-10'>
              <h2 className='text-2xl font-bold mb-6 text-primary-blue-dark'>
                Event Gallery
              </h2>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {event.gallery.map((image, index) => (
                  <div
                    key={index}
                    className='rounded-lg overflow-hidden h-48 transition-transform duration-300 hover:scale-105'
                  >
                    <img
                      src={image}
                      alt={`${event.title} gallery ${index + 1}`}
                      className='w-full h-full object-cover'
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className='bg-white rounded-2xl shadow-md p-8 mb-10'>
              <h2 className='text-2xl font-bold mb-6 text-primary-blue-dark'>
                Frequently Asked Questions
              </h2>

              <div className='space-y-6'>
                {event.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className='border-b border-neutral-200 pb-6 last:border-0 last:pb-0'
                  >
                    <h3 className='text-xl font-bold mb-2'>
                      {faq.question}
                    </h3>
                    <p className='text-neutral-700'>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Organizer */}
            <div className='bg-white rounded-2xl shadow-md p-8'>
              <h2 className='text-2xl font-bold mb-6 text-primary-blue-dark'>
                Event Organizer
              </h2>

              <div className='flex items-center'>
                <div className='w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white mr-4'>
                  <Icon icon='mdi:account-group' className='text-3xl' />
                </div>
                <div>
                  <h3 className='text-xl font-bold'>{event.organizer}</h3>
                  <p className='text-neutral-600'>Event Organizer</p>
                </div>
              </div>

              <div className='mt-6'>
                <a
                  href="https://wa.me/+2348123456789?text=I'm%20interested%20in%20your%20event"
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center text-primary-blue font-medium hover:text-primary-blue-dark transition-colors'
                >
                  <Icon icon='mdi:message' className='mr-2' />
                  Contact Organizer
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Ticket Booking */}
          <div className='lg:col-span-1'>
            <div
              ref={ticketsRef}
              className='bg-white rounded-2xl shadow-md p-8 sticky top-24'
            >
              <h2 className='text-2xl font-bold mb-6 text-primary-blue-dark'>
                Get Tickets
              </h2>

              {/* Ticket Types */}
              <div className='space-y-4 mb-8'>
                {event.ticketTypes.map((ticket, index) => (
                  <div
                    key={index}
                    className={`border rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                      selectedTicketType === ticket.name.toLowerCase()
                        ? "border-primary-blue bg-blue-50"
                        : "border-neutral-200 hover:border-primary-blue-light"
                    }`}
                    onClick={() =>
                      setSelectedTicketType(ticket.name.toLowerCase())
                    }
                  >
                    <div className='flex justify-between items-center mb-2'>
                      <h3 className='font-bold text-lg'>{ticket.name}</h3>
                      <span className='font-bold text-lg'>
                        {ticket.price}
                      </span>
                    </div>
                    <p className='text-neutral-600 text-sm'>
                      {ticket.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Ticket Quantity */}
              <div className='mb-8'>
                <label className='block text-neutral-700 font-medium mb-2'>
                  Quantity
                </label>
                <div className='flex items-center'>
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className='w-10 h-10 rounded-l-lg bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors'
                    disabled={ticketQuantity <= 1}
                  >
                    <Icon icon='mdi:minus' />
                  </button>
                  <div className='w-16 h-10 flex items-center justify-center border-t border-b border-neutral-200'>
                    {ticketQuantity}
                  </div>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className='w-10 h-10 rounded-r-lg bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors'
                    disabled={ticketQuantity >= 10}
                  >
                    <Icon icon='mdi:plus' />
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className='border-t border-neutral-200 pt-6 mb-8'>
                <div className='flex justify-between items-center mb-2'>
                  <span className='text-neutral-600'>Subtotal</span>
                  <span className='font-medium'>
                    ₦{calculateTotal().toLocaleString()}
                  </span>
                </div>
                <div className='flex justify-between items-center mb-2'>
                  <span className='text-neutral-600'>Booking Fee</span>
                  <span className='font-medium'>
                    ₦{(calculateTotal() * 0.05).toLocaleString()}
                  </span>
                </div>
                <div className='flex justify-between items-center text-lg font-bold mt-4'>
                  <span>Total</span>
                  <span>
                    ₦{(calculateTotal() * 1.05).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Book Now Button */}
              <button className='w-full bg-gradient-secondary hover:shadow-lg text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center transform hover:translate-y-[-2px]'>
                Book Now
                <Icon icon='mdi:ticket' className='ml-2 text-xl' />
              </button>

              {/* WhatsApp Community */}
              <div className='mt-8 pt-8 border-t border-neutral-200'>
                <h3 className='font-bold text-lg mb-4'>
                  Join Event Community
                </h3>
                <a
                  href='https://chat.whatsapp.com/Frm5qlLussrK1XSFVIupex'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center'
                >
                  <Icon icon='mdi:whatsapp' className='mr-2 text-xl' />
                  Join WhatsApp Community
                </a>
              </div>

              {/* Share */}
              <div className='mt-8 pt-8 border-t border-neutral-200'>
                <h3 className='font-bold text-lg mb-4'>
                  Share This Event
                </h3>
                <div className='flex justify-center space-x-4'>
                  <a
                    href='#'
                    className='w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors'
                  >
                    <Icon icon='mdi:facebook' />
                  </a>
                  <a
                    href='#'
                    className='w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors'
                  >
                    <Icon icon='mdi:twitter' />
                  </a>
                  <a
                    href={`https://wa.me/?text=Check out this event: ${event.title} - ${window.location.href}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-[#128C7E] transition-colors'
                  >
                    <Icon icon='mdi:whatsapp' />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Events */}
        <div ref={relatedRef} className='mt-16'>
          <h2 className='text-3xl font-bold mb-8 text-center gradient-text'>
            You May Also Like
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {getRelatedEvents().map((relatedEvent) => (
              <div
                key={relatedEvent.id}
                className='bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border border-neutral-200 flex flex-col md:flex-row'
              >
                {/* Event Image */}
                <div className='relative md:w-2/5'>
                  <img
                    src={relatedEvent.image}
                    alt={relatedEvent.title}
                    className='w-full h-full object-cover min-h-[200px]'
                  />
                  <div className='absolute inset-0 bg-gradient-to-r from-black/60 to-transparent'></div>

                  {/* Category Badge */}
                  <div className='absolute top-4 left-4 bg-gradient-primary text-white text-sm font-bold px-3 py-1 rounded-full shadow-md'>
                    {relatedEvent.category}
                  </div>
                </div>

                {/* Event Details */}
                <div className='p-6 md:w-3/5 flex flex-col justify-between'>
                  <div>
                    <h3 className='text-xl font-bold mb-2 text-primary-blue-dark'>
                      {relatedEvent.title}
                    </h3>

                    <div className='flex items-center text-neutral-700 mb-2'>
                      <Icon icon='mdi:calendar' className='mr-2 text-lg' />
                      <span>{formatDate(relatedEvent.date)}</span>
                    </div>

                    <p className='text-neutral-600 mb-4 line-clamp-2'>
                      {relatedEvent.description}
                    </p>
                  </div>

                  <Link
                    to={`/tickets/${relatedEvent.id}`}
                    className='bg-gradient-primary hover:shadow-lg text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 inline-flex items-center transform hover:translate-y-[-2px] self-start'
                  >
                    View Event
                    <Icon
                      icon='material-symbols:arrow-forward-rounded'
                      className='ml-2'
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Events Button */}
        <div className='text-center mt-16'>
          <Link
            to='/events'
            className='bg-white border border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white font-bold py-3 px-8 rounded-full transition-all duration-300 inline-flex items-center'
          >
            <Icon
              icon='material-symbols:arrow-back-rounded'
              className='mr-2'
            />
            Back to All Events
          </Link>
        </div>
      </div>

      {/* Location Map Section */}
      <div className='bg-white py-16'>
        <div className='max-w-7xl mx-auto px-4'>
          <h2 className='text-3xl font-bold mb-8 text-center'>
            Event Location
          </h2>

          <div className='bg-neutral-100 rounded-2xl p-4 h-[400px] flex items-center justify-center'>
            <div className='text-center'>
              <Icon
                icon='mdi:map-marker'
                className='text-6xl text-primary-blue mx-auto mb-4'
              />
              <h3 className='text-xl font-bold mb-2'>{event.location}</h3>
              <p className='text-neutral-600 mb-6'>{event.address}</p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  event.address
                )}`}
                target='_blank'
                rel='noopener noreferrer'
                className='bg-gradient-primary hover:shadow-lg text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 inline-flex items-center'
              >
                <Icon icon='mdi:directions' className='mr-2' />
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Community CTA */}
      <div className='bg-gradient-primary text-white py-16'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-10 items-center'>
            <div className='md:col-span-2'>
              <h2 className='text-3xl font-bold mb-4'>
                Join Our Event Community
              </h2>
              <p className='text-white/90 mb-6 text-lg'>
                Stay updated with exclusive content, early bird tickets,
                and connect with fellow event enthusiasts. Join our
                WhatsApp community for real-time updates and special
                offers.
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
                  Message Message Us Directly
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
      </div>
    </div>
  );
};

export default Event;
