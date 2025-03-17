import React, { useEffect, useRef, useState } from "react";
import { Qr } from "../../utils/media";
import { Icon } from "@iconify/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const qrRef = useRef(null);
  const formRef = useRef(null);
  const formElements = useRef([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          date: "",
          message: "",
        });
      }, 5000);
    }, 1500);
  };

  useEffect(() => {
    // Main section animation
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

    // Heading animation
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
      }
    );

    // QR code animation
    gsap.fromTo(
      qrRef.current,
      {
        opacity: 0,
        scale: 0.8,
        rotation: -5,
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1,
        delay: 0.4,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: qrRef.current,
          start: "top 80%",
        },
      }
    );

    // Form animation - staggered entrance for form elements
    gsap.fromTo(
      formElements.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
        },
      }
    );

    // Floating animation for QR code
    gsap.to(qrRef.current, {
      y: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className='py-20 px-4 bg-gradient-to-br from-blue-50 to-white'
    >
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 ref={headingRef} className='text-4xl font-bold mb-4'>
            Schedule an Appointment
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Ready to plan your next event? Book a consultation with our
            expert event planners to bring your vision to life.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* QR Code Section */}
          <div className='flex flex-col items-center justify-center'>
            <div
              ref={qrRef}
              className='relative p-6 bg-white rounded-2xl shadow-xl'
            >
              <img
                src={Qr}
                alt='Appointment QR Code'
                className='w-64 h-64 object-contain mx-auto'
              />

              {/* Decorative elements */}
              <div className='absolute -top-3 -left-3 w-8 h-8 bg-primary-blue rounded-full'></div>
              <div className='absolute -bottom-3 -right-3 w-8 h-8 bg-primary-blue rounded-full'></div>
              <div className='absolute -top-3 -right-3 w-6 h-6 bg-yellow-400 rounded-full'></div>
              <div className='absolute -bottom-3 -left-3 w-6 h-6 bg-yellow-400 rounded-full'></div>
            </div>

            <div className='mt-8 text-center'>
              <h3 className='text-2xl font-bold mb-3'>
                Scan & Book Instantly
              </h3>
              <p className='text-gray-600 mb-4'>
                Scan this QR code with your smartphone camera to instantly
                schedule an appointment with our team.
              </p>
              <div className='flex justify-center space-x-4 mt-6'>
                <a
                  href='#'
                  className='text-primary-blue hover:text-blue-700 transition-colors'
                >
                  <Icon icon='mdi:whatsapp' className='text-3xl' />
                </a>
                <a
                  href='#'
                  className='text-primary-blue hover:text-blue-700 transition-colors'
                >
                  <Icon icon='mdi:instagram' className='text-3xl' />
                </a>
                <a
                  href='#'
                  className='text-primary-blue hover:text-blue-700 transition-colors'
                >
                  <Icon icon='mdi:twitter' className='text-3xl' />
                </a>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div
            ref={formRef}
            className='bg-white p-8 rounded-2xl shadow-lg relative overflow-hidden'
          >
            {/* Success message */}
            {isSubmitted && (
              <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-95 z-10 animate-fadeIn'>
                <div className='text-center p-6'>
                  <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <Icon
                      icon='mdi:check-bold'
                      className='text-4xl text-green-600'
                    />
                  </div>
                  <h3 className='text-2xl font-bold text-gray-800 mb-2'>
                    Appointment Request Sent!
                  </h3>
                  <p className='text-gray-600'>
                    We'll get back to you within 24 hours to confirm your
                    appointment.
                  </p>
                </div>
              </div>
            )}

            {/* Decorative corner */}
            <div className='absolute top-0 right-0 w-32 h-32 bg-primary-blue bg-opacity-10 rounded-bl-full'></div>

            <h3 className='text-2xl font-bold mb-6 relative z-10'>
              Make an enquiry
            </h3>

            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                <div ref={(el) => (formElements.current[0] = el)}>
                  <label
                    className='block text-gray-700 mb-2'
                    htmlFor='name'
                  >
                    Full Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-blue focus:ring-2 focus:ring-blue-200 outline-none transition-all'
                    placeholder='Your name'
                    required
                  />
                </div>

                <div ref={(el) => (formElements.current[1] = el)}>
                  <label
                    className='block text-gray-700 mb-2'
                    htmlFor='email'
                  >
                    Email Address
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-blue focus:ring-2 focus:ring-blue-200 outline-none transition-all'
                    placeholder='your@email.com'
                    required
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                <div ref={(el) => (formElements.current[2] = el)}>
                  <label
                    className='block text-gray-700 mb-2'
                    htmlFor='phone'
                  >
                    Phone Number
                  </label>
                  <input
                    type='tel'
                    id='phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-blue focus:ring-2 focus:ring-blue-200 outline-none transition-all'
                    placeholder='Your phone number'
                  />
                </div>

                <div ref={(el) => (formElements.current[3] = el)}>
                  <label
                    className='block text-gray-700 mb-2'
                    htmlFor='eventType'
                  >
                    Event Type
                  </label>
                  <select
                    id='eventType'
                    name='eventType'
                    value={formData.eventType}
                    onChange={handleChange}
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-blue focus:ring-2 focus:ring-blue-200 outline-none transition-all appearance-none bg-white'
                    required
                  >
                    <option value='' disabled>
                      Select event type
                    </option>
                    <option value='wedding'>Wedding</option>
                    <option value='corporate'>Corporate Event</option>
                    <option value='birthday'>Birthday Party</option>
                    <option value='concert'>Concert</option>
                    <option value='other'>Other</option>
                  </select>
                </div>
              </div>

              <div
                ref={(el) => (formElements.current[4] = el)}
                className='mb-6'
              >
                <label className='block text-gray-700 mb-2' htmlFor='date'>
                  Preferred Date
                </label>
                <input
                  type='date'
                  id='date'
                  name='date'
                  value={formData.date}
                  onChange={handleChange}
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-blue focus:ring-2 focus:ring-blue-200 outline-none transition-all'
                  required
                />
              </div>

              <div
                ref={(el) => (formElements.current[5] = el)}
                className='mb-6'
              >
                <label
                  className='block text-gray-700 mb-2'
                  htmlFor='message'
                >
                  Tell us about your event
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  rows='4'
                  className='resize-none w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-blue focus:ring-2 focus:ring-blue-200 outline-none transition-all'
                  placeholder='Please share some details about your event...'
                ></textarea>
              </div>

              <div ref={(el) => (formElements.current[6] = el)}>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg text-white font-bold transition-all duration-300 relative overflow-hidden ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary-blue hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? (
                    <span className='flex items-center justify-center'>
                      <svg
                        className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                        ></circle>
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className='flex items-center justify-center'>
                      Book Appointment
                      <Icon
                        icon='material-symbols:arrow-forward-rounded'
                        className='ml-2'
                      />
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Custom animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Appointment;
