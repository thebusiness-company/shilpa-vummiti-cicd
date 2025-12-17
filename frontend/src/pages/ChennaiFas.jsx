import React from 'react';
import shilpa from '../assets/images/shilpavummiti.png';
const ChennaiFav = () => {
  return (
    <div className="w-full max-w-[90%] py-5 mx-auto">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-20 justify-center">
        {/* Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={shilpa} // Replace with actual image path
            alt="Fashion Designer"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* About Me Text */}
        <div className="w-full px-4 lg:px-0 lg:w-1/2 lg:grid lg:grid-rows-2">
          <h2 className="text-base md:text-3xl lg:text-5xl text-center mb-2 lg:text-left lg:mt-10 tracking-wider font-tenor">
            CHENNAI
          </h2>
          <p className=" lg:mb-6 text-sm md:text-base lg:text-lg 2xl:text-2xl leading-relaxed ">
            CHENNAI: The demand for constant newness is reshaping the fashion
            industry, pushing brands to roll out fresh collections more
            frequently to keep up with changing tastes. To stay ahead of trends,
            designers are using social media, following global styles, and
            constantly reworking their ideas.
          </p>
        </div>
      </div>

      {/* Description Below */}
      <div className="mt-8 px-4 lg:px-0 space-y-2 text-sm md:text-base lg:text-lg 2xl:text-2xl leading-relaxed">
        <p className=" lg:mb-4">
          While this fast pace encourages creativity and innovation, it also
          raises concerns about sustainability, burnout, and the loss of
          timeless design. City-based designers talk to DT Next about whether
          this trend marks progress or signals a warning.
        </p>
        <p className="text-gray-700 italic border-l-4 border-gray-950 pl-4 ">
          “As a stylist, I’m seeing firsthand how the constant demand for
          newness is reshaping fashion in India. Collections are dropping
          faster, trends shift overnight, and younger consumers are setting the
          pace. Brands are scrambling to stay relevant, and creatives like us
          are constantly reinventing to keep up.”
        </p>
      </div>
    </div>
  );
};

export default ChennaiFav;
