import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { categories } from "../../utils/constants";

const Categories = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className='py-16 px-4 bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold mb-4'>
            EXPLORE OUR SERVICES
          </h2>
          <div className='flex justify-center mb-4'>
            <div className='w-24 h-1 bg-primary-blue'></div>
          </div>
          <div className='mb-6'>
            {/* <Icon
              icon='fontisto:heartbeat-alt'
              className='text-5xl text-primary-blue text-center mx-auto'
            /> */}
          </div>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Discover the perfect event for every occasion. From
            electrifying concerts to memorable weddings, we've got you
            covered with our diverse range of event categories.
          </p>
        </div>

        {/* Categories Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12'>
          {categories.map((category, index) => (
            <div
              key={index}
              className='relative overflow-hidden rounded-lg shadow-lg group h-80'
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Background Image */}
              <div className='absolute inset-0 w-full h-full'>
                <img
                  src={category.image}
                  alt={category.title}
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-black opacity-60 group-hover:opacity-70 transition-opacity duration-300'></div>
              </div>

              {/* Content */}
              <div className='relative h-full flex flex-col justify-between p-6 text-white z-10'>
                <div className='flex items-center'>
                  <div
                    className={`${category.color} p-3 rounded-full mr-4`}
                  >
                    <Icon icon={category.icon} className='text-2xl' />
                  </div>
                  <h3 className='text-2xl font-bold'>{category.title}</h3>
                </div>

                <div
                  className={`transition-all duration-300 ${
                    hoveredCategory === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  <p className='mb-4'>{category.description}</p>
                  {/* <Link
                    to={`/events/category/${category.title.toLowerCase()}`}
                    className='inline-flex items-center text-white font-semibold group-hover:underline'
                  > */}
                  {/* <Icon
                    icon='material-symbols:arrow-forward-rounded'
                    className='ml-2'
                  /> */}
                  {/* </Link> */}
                </div>
              </div>

              {/* Decorative elements */}
              <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30'></div>
              <div
                className={`absolute bottom-0 left-0 w-0 h-1 ${category.color} group-hover:w-full transition-all duration-500`}
              ></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className='text-center mt-12'>
          <Link
            to='/events'
            className='bg-primary-yellow hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 inline-flex items-center'
          >
            View All Services
            <Icon
              icon='material-symbols:arrow-forward-rounded'
              className='ml-2'
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;
