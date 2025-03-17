import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const NotFound = () => {
  useEffect(() => {
    // Update document title for the 404 page
    document.title = "Page Not Found | THE PLUG EVENTS";
    
    return () => {
      // Reset title when component unmounts
      document.title = "THE PLUG EVENTS";
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-16">
      <div className="max-w-md w-full text-center">
        {/* 404 Number with animated gradient */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-blue to-primary-yellow animate-pulse">
              404
            </span>
          </div>
        </div>
        
        {/* Error icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-primary-blue bg-opacity-10 flex items-center justify-center">
            <Icon 
              icon="mdi:map-marker-off" 
              className="text-5xl text-primary-blue"
            />
          </div>
        </div>
        
        {/* Error message */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/"
            className="bg-primary-blue hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-full transition duration-300 inline-flex items-center"
          >
            <Icon icon="mdi:home" className="mr-2" />
            Back to Home
          </Link>
          
          <Link 
            to="/contact"
            className="bg-white border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white font-bold py-3 px-6 rounded-full transition duration-300 inline-flex items-center"
          >
            <Icon icon="mdi:message" className="mr-2" />
            Contact Support
          </Link>
        </div>
        
        {/* Decorative elements */}
        <div className="mt-16 flex justify-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary-blue"></div>
          <div className="w-3 h-3 rounded-full bg-primary-yellow"></div>
          <div className="w-3 h-3 rounded-full bg-primary-blue"></div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-24 h-24 rounded-full bg-primary-blue opacity-5"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-primary-yellow opacity-5"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-primary-blue opacity-5"></div>
    </div>
  );
};

export default NotFound;
