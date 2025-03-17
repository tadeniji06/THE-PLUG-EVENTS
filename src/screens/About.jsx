import React, { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { logoH, owoh, GP } from "../utils/media";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const whyChooseUsRef = useRef(null);
  const whoWeAreRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const teamMembersRef = useRef([]);

  // Team members data
  const teamMembers = [
    {
      name: "MITCHELL CHUKWUDALI",
      position: "CEO & Founder",
      description: "Some text that describes me lorem ipsum ipsum lorem.",
      image: logoH,
      social: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      name: "GODSPOWER ANIEKAN",
      position: "MANAGER AND HEAD OF DEVELOPER",
      description: "Some text that describes me lorem ipsum ipsum lorem.",
      image: GP,
      social: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      name: "MITCHY OWOH",
      position: "STRATEGIST AND HEAD OF PR",
      description: "Some text that describes me lorem ipsum ipsum lorem.",
      image: owoh,
      social: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
  ];

  // Company values
  const values = [
    "100% Quality Services.",
    "100% Detailed planning.",
    "100% Integrity.",
    "100% Working Ability.",
    "100% Excellence.",
    "Delivering beyond possible solutions.",
  ];

  useEffect(() => {
    // Main section animation
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

    // Heading animation
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

    // Why Choose Us section animation
    gsap.fromTo(
      whyChooseUsRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: whyChooseUsRef.current,
          start: "top 80%",
        },
      }
    );

    // Who We Are section animation
    gsap.fromTo(
      whoWeAreRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: whoWeAreRef.current,
          start: "top 80%",
        },
      }
    );

    // Values section animation
    gsap.fromTo(
      valuesRef.current.children,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 80%",
        },
      }
    );

    // Team section animation
    gsap.fromTo(
      teamRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 85%",
        },
      }
    );

    // Team members animation
    teamMembersRef.current.forEach((member, index) => {
      gsap.fromTo(
        member,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2 + index * 0.2,
          scrollTrigger: {
            trigger: member,
            start: "top 85%",
          },
        }
      );
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className='py-20 px-4 bg-white'>
      <div className='max-w-7xl mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2
            ref={headingRef}
            className='text-4xl font-bold mb-4 relative inline-block'
          >
            About Us
            <div className='absolute bottom-0 left-0 right-0 h-1 bg-primary-blue mt-2'></div>
          </h2>
          <p className='text-gray-600 max-w-3xl mx-auto mt-4'>
            We are passionate about creating unforgettable experiences and
            delivering excellence in every event we plan.
          </p>
        </div>

        {/* Two Column Section - Why Choose Us & Who We Are */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20'>
          {/* Why Choose Us */}
          <div
            ref={whyChooseUsRef}
            className='bg-gray-50 p-8 rounded-2xl shadow-lg relative overflow-hidden'
          >
            {/* Decorative element */}
            <div className='absolute top-0 left-0 w-32 h-32 bg-primary-blue opacity-10 rounded-br-full'></div>

            <h3 className='text-2xl font-bold mb-6 text-primary-blue relative z-10'>
              Why Choose Us
            </h3>

            <p className='text-gray-700 mb-6 leading-relaxed'>
              As professionals, we save you time, energy, and ensure you
              stay within budget and meets business objectives.
            </p>

            <div className='flex items-start space-x-4 mb-6'>
              <div className='bg-primary-blue rounded-full p-2 mt-1'>
                <Icon
                  icon='mdi:clock-time-four'
                  className='text-white text-xl'
                />
              </div>
              <div>
                <h4 className='font-bold text-gray-800 mb-1'>
                  Time Efficiency
                </h4>
                <p className='text-gray-600'>
                  We handle all the details so you can focus on enjoying
                  your event.
                </p>
              </div>
            </div>

            <div className='flex items-start space-x-4 mb-6'>
              <div className='bg-primary-blue rounded-full p-2 mt-1'>
                <Icon icon='mdi:cash' className='text-white text-xl' />
              </div>
              <div>
                <h4 className='font-bold text-gray-800 mb-1'>
                  Budget Management
                </h4>
                <p className='text-gray-600'>
                  We work within your budget to deliver maximum value.
                </p>
              </div>
            </div>

            <div className='flex items-start space-x-4'>
              <div className='bg-primary-blue rounded-full p-2 mt-1'>
                <Icon icon='mdi:target' className='text-white text-xl' />
              </div>
              <div>
                <h4 className='font-bold text-gray-800 mb-1'>
                  Goal-Oriented
                </h4>
                <p className='text-gray-600'>
                  We ensure your event meets all business and personal
                  objectives.
                </p>
              </div>
            </div>
          </div>

          {/* Who We Are */}
          <div
            ref={whoWeAreRef}
            className='bg-gray-50 p-8 rounded-2xl shadow-lg relative overflow-hidden'
          >
            {/* Decorative element */}
            <div className='absolute top-0 right-0 w-32 h-32 bg-primary-blue opacity-10 rounded-bl-full'></div>

            <h3 className='text-2xl font-bold mb-6 text-primary-blue relative z-10'>
              Who We Are
            </h3>

            <p className='text-gray-700 mb-6 leading-relaxed'>
              Founded in 2017, we are an entertainment conglomerate that
              deals on every aspect of entertainment. We have proficient
              teams devoted to providing innovation and solving
              entertainment issues of our clients.
            </p>

            <p className='text-gray-700 mb-6 leading-relaxed'>
              If you're looking to plan and package your event or to brand
              and popularize your business, then we're your plug. With a
              team that's well qualified, our primary concern is giving
              your brand the befitting identity.
            </p>

            <div className='flex items-center space-x-2 text-primary-blue'>
              <Icon icon='mdi:calendar' className='text-xl' />
              <span className='font-bold'>Established 2017</span>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className='mb-20'>
          <h3 className='text-2xl font-bold mb-8 text-center'>
            Our Core Values
          </h3>

          <div
            ref={valuesRef}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          >
            {values.map((value, index) => (
              <div
                key={index}
                className='bg-gray-50 p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300'
              >
                <div className='bg-primary-blue bg-opacity-10 p-3 rounded-full'>
                  <Icon
                    icon={
                      index === 0
                        ? "mdi:check-decagram"
                        : index === 1
                        ? "mdi:clipboard-check"
                        : index === 2
                        ? "mdi:shield-check"
                        : index === 3
                        ? "mdi:lightning-bolt"
                        : index === 4
                        ? "mdi:trophy"
                        : "mdi:rocket-launch"
                    }
                    className='text-2xl text-primary-blue'
                  />
                </div>
                <p className='font-medium text-gray-800'>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Team */}
        <div ref={teamRef}>
          <h3 className='text-2xl font-bold mb-8 text-center'>
            Meet Our Team
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {teamMembers.map((member, index) => (
              <div
                key={index}
                ref={(el) => (teamMembersRef.current[index] = el)}
                className='bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group'
              >
                <div className='relative h-64 overflow-hidden'>
                  <img
                    src={member.image}
                    alt={member.name}
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60'></div>

                  {/* Social Media Icons */}
                  <div className='absolute bottom-4 left-0 right-0 flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <a
                      href={member.social.twitter}
                      className='bg-white text-blue-400 p-2 rounded-full hover:bg-blue-400 hover:text-white transition-colors duration-300'
                    >
                      <Icon icon='mdi:twitter' className='text-lg' />
                    </a>
                    <a
                      href={member.social.linkedin}
                      className='bg-white text-blue-700 p-2 rounded-full hover:bg-blue-700 hover:text-white transition-colors duration-300'
                    >
                      <Icon icon='mdi:linkedin' className='text-lg' />
                    </a>
                    <a
                      href={member.social.instagram}
                      className='bg-white text-pink-600 p-2 rounded-full hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-white transition-colors duration-300'
                    >
                      <Icon icon='mdi:instagram' className='text-lg' />
                    </a>
                  </div>
                </div>

                <div className='p-6'>
                  <h4 className='text-xl font-bold mb-1'>{member.name}</h4>
                  <p className='text-primary-blue text-sm font-medium mb-4'>
                    {member.position}
                  </p>
                  {/* <p className='text-gray-600'>{member.description}</p> */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className='mt-16 text-center'>
          <a
            href='/contact'
            className='bg-primary-blue hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 inline-flex items-center'
          >
            Get in Touch
            <Icon
              icon='material-symbols:arrow-forward-rounded'
              className='ml-2'
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
