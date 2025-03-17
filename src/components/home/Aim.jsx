import React from "react";
import { Icon } from "@iconify/react";
import { aim, features } from "../../utils/constants";
import { Link } from "react-router-dom";

const Aim = () => {
  return (
    <div className='py-16 px-4 max-w-7xl mx-auto'>
      {/* Main Aim Section */}
      <div className='text-center mb-16'>
        <h2 className='text-4xl font-bold mb-4 relative inline-block'>
          Perfection Is What We Aim For
          <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary-blue mt-2'></div>
        </h2>

        <div className='mt-6'>
          <Icon
            icon='fontisto:heartbeat-alt'
            className='text-5xl text-primary-blue text-center mx-auto'
          />
        </div>

        <p className='text-gray-600 max-w-3xl mx-auto mt-6 leading-relaxed'>
          {aim[0].body}
        </p>
      </div>

      {/* Features Section */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mt-12'>
        {features.map((feature, index) => (
          <div
            key={index}
            className='bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center relative overflow-hidden group'
          >
            {/* Decorative arrow connecting cards */}
            {index < features.length - 1 && (
              <div className='hidden md:block absolute top-1/2 -right-5 transform -translate-y-1/2 z-10'>
                <Icon
                  icon='material-symbols:arrow-right-alt-rounded'
                  className='text-3xl text-primary-blue'
                />
              </div>
            )}

            {/* Icon with animated background */}
            <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-primary-blue mb-6 mx-auto group-hover:bg-primary-blue group-hover:text-white transition-all duration-300'>
              <Icon icon={feature.icon} className='text-4xl' />
            </div>

            <h3 className='text-xl font-bold mb-3'>{feature.title}</h3>

            <p className='text-gray-600'>{feature.description}</p>

            {/* Animated underline on hover */}
            <div className='w-0 h-1 bg-primary-blue mx-auto mt-4 group-hover:w-16 transition-all duration-300'></div>
          </div>
        ))}
      </div>

      {/* Call to action */}
      <div className='text-center mt-16'>
        <button className='bg-primary-blue hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 flex items-center mx-auto'>
          <Link to={"/about"}> Learn More About Us</Link>
          <Icon
            icon='material-symbols:arrow-forward-rounded'
            className='ml-2'
          />
        </button>
      </div>
    </div>
  );
};

export default Aim;
