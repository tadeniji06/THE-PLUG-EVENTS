import React, { useState, useRef, useEffect } from "react";
import { logo, newLogo } from "../utils/media";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../utils/constants";
import gsap from "gsap";
import { Icon } from "@iconify/react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const headerRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (isOpen) {
      // Prevent body scrolling when menu is open
      document.body.style.overflow = "hidden";
      
      gsap.fromTo(
        menuRef.current,
        { x: "100%" },
        {
          x: "0%",
          duration: 0.5,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          display: "block",
        }
      );
      
      // Animate menu items
      gsap.fromTo(
        ".mobile-menu-item",
        { opacity: 0, x: 20 },
        { 
          opacity: 1, 
          x: 0, 
          stagger: 0.1,
          delay: 0.2,
          ease: "power2.out" 
        }
      );
    } else {
      // Restore body scrolling
      document.body.style.overflow = "auto";
      
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.in",
      });

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        display: "none",
      });
    }
  }, [isOpen]);

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white shadow-md py-2" 
          : "bg-white/90 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="relative z-50">
          <div className="w-[150px] h-[60px] cursor-pointer transition-transform duration-300 hover:scale-105">
            <img
              className="w-full h-full object-contain"
              src={newLogo}
              alt="The Plug Events Logo"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium text-base relative overflow-hidden group transition-colors duration-300 px-2 py-1 ${
                location.pathname === link.path 
                  ? "text-primary-blue" 
                  : "text-neutral-800 hover:text-primary-blue"
              }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                location.pathname === link.path ? "scale-x-100" : ""
              }`}></span>
            </Link>
          ))}
          <Link 
            to="/appointment"
            className="ml-4 font-semibold px-5 py-2.5 bg-gradient-secondary text-white rounded-lg shadow-md hover:shadow-lg transform hover:translate-y-[-2px] transition-all duration-300 flex items-center"
          >
          Make Enquiry
            <Icon icon="material-symbols:arrow-forward-rounded" className="ml-1" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden cursor-pointer z-50">
          <button
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className={`p-2 rounded-full transition-colors duration-300 ${
              isOpen ? "bg-neutral-100" : "hover:bg-neutral-100"
            }`}
            onClick={toggleMenu}
          >
            <Icon
              icon={isOpen ? "mdi:close" : "pajamas:hamburger"}
              className={`text-3xl transition-colors duration-300 ${
                isOpen ? "text-primary-blue" : "text-neutral-800"
              }`}
            />
          </button>
        </div>

        {/* Overlay */}
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black bg-opacity-50 hidden"
          onClick={toggleMenu}
        />

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className="fixed top-0 right-0 h-screen w-[300px] bg-white shadow-xl transform translate-x-full z-40 overflow-y-auto"
        >
          <div className="p-8 flex flex-col space-y-6 mt-16">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-menu-item font-medium text-xl transition-colors duration-300 p-2 border-b border-neutral-100 ${
                  location.pathname === link.path 
                    ? "text-primary-blue" 
                    : "text-neutral-800 hover:text-primary-blue"
                }`}
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/appointment"
              className="mobile-menu-item mt-6 font-semibold px-5 py-3 bg-gradient-primary text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center"
              onClick={toggleMenu}
            >
              Make Enquiry
            </Link>
            
            {/* Social Media Links */}
            <div className="mobile-menu-item mt-8 flex justify-center space-x-6">
              <a href="#" className="text-primary-blue hover:text-primary-blue-light transition-colors">
                <Icon icon="mdi:instagram" className="text-2xl" />
              </a>
              <a href="#" className="text-primary-blue hover:text-primary-blue-light transition-colors">
                <Icon icon="mdi:twitter" className="text-2xl" />
              </a>
              <a href="https://wa.link/kor2r4" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:text-primary-blue-light transition-colors">
                <Icon icon="mdi:whatsapp" className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
