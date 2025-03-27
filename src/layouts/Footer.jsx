import {
  socialLinks,
  AboutUs,
  NewsLetter,
  navLinks,
} from "../utils/constants";
import { logo, newLogo } from "../utils/media";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='bg-footer-bg text-white py-12 mt-4'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* About Us Column */}
          <div className='flex flex-col'>
            <div className='mb-6'>
              <img
                src={logo}
                alt='The Plug Events'
                className='h-12 mb-4'
              />
            </div>
            <h3 className='text-xl font-semibold mb-4 pb-2 border-b-2 border-white inline-block'>
              About Us
            </h3>
            <p className='mb-6'>{AboutUs[0].body}</p>
            <div className='flex gap-3 mt-2'>
              {socialLinks.slice(0, 5).map((link, index) => (
                <a
                  key={index}
                  href={link.path}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={link.name}
                  className='w-10 h-10 rounded-full bg-white text-primary-blue flex items-center justify-center hover:bg-gray-200 transition-colors'
                >
                  <Icon icon={link.icon} className='text-xl' />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className='flex flex-col'>
            <h3 className='text-xl font-semibold mb-4 pb-2 border-b-2 border-white inline-block'>
              Quick Links
            </h3>
            <div className='grid grid-cols-2 gap-2'>
              <div>
                {navLinks.slice(0, 3).map((link, index) => (
                  <div key={index} className='mb-3'>
                    <Link
                      to={link.path}
                      className='flex items-center hover:text-gray-300 transition-colors group'
                    >
                      <Icon
                        icon='mdi:chevron-right'
                        className='mr-1 group-hover:translate-x-1 transition-transform'
                      />
                      <span>{link.name}</span>
                    </Link>
                  </div>
                ))}
              </div>
              <div>
                {[
                  // { name: "FAQ", path: "/faq" },
                  { name: "About Us", path: "/about" },
                  { name: "Contact Us", path: "/contact" },
                ].map((link, index) => (
                  <div key={index} className='mb-3'>
                    <Link
                      to={link.path}
                      className='flex items-center hover:text-gray-300 transition-colors group'
                    >
                      <Icon
                        icon='mdi:chevron-right'
                        className='mr-1 group-hover:translate-x-1 transition-transform'
                      />
                      <span>{link.name}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          {/* <div className='flex flex-col'>
            <h3 className='text-xl font-semibold mb-4 pb-2 border-b-2 border-white inline-block'>
              Newsletter
            </h3>
            <p className='mb-6 capitalize'>{NewsLetter[0].body}</p>
            <form className='flex flex-col mt-2'>
              <div className='flex'>
                <input
                  type='email'
                  placeholder='Email Address'
                  className='py-2 px-4 bg-white text-gray-800 flex-grow rounded-l focus:outline-none'
                  required
                />
                <button
                  type='submit'
                  className='bg-white text-primary-blue px-4 py-2 rounded-r hover:bg-gray-200 transition-colors flex items-center'
                >
                  <Icon icon='mdi:send' className='text-xl' />
                </button>
              </div>
              <p className='text-xs mt-2 text-gray-300'>
                By subscribing, you agree to our Privacy Policy.
              </p>
            </form>
          </div> */}
        </div>

        {/* Copyright */}
        <div className='mt-12 pt-4 border-t border-blue-400 text-center'>
          <p>
            © Copyright {year} | All Rights Reserved by{" "}
            <a
              href='https://adnom.netlify.app'
              target='_blank'
              rel='noopener noreferrer'
              className='font-bold hover:underline'
            >
              Adnom
            </a>
          </p>
        </div>
      </div>

      {/* Scroll to top button */}
      <div className='fixed bottom-6 right-6'>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className='bg-white text-primary-blue p-3 rounded-full hover:bg-gray-200 transition-colors shadow-lg'
          aria-label='Scroll to top'
        >
          <Icon icon='mdi:chevron-up' className='text-xl' />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
