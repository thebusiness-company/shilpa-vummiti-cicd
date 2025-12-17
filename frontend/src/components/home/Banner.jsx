import React from "react";
import bannerImage from "../../assets/images/banner.png";

const FashionBanner = ({ scrollToCategory }) => {
  return (
    <div className="bg-[#FFFFFF] relative w-full h-[200px] sm:h-[350px] md:h-[500px] lg:h-screen max-w-[393px] sm:max-w-full mx-auto mt-4">
      <img
        src={bannerImage}
        alt="Fashion Banner"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 flex items-center justify-end px-3 sm:px-6 md:px-10">
        <div className="text-white text-center max-w-[180px] sm:max-w-xs md:max-w-sm lg:mr-20">
          <div className="p-1 sm:p-3 md:p-4 md:mt-24">
            <button
              onClick={scrollToCategory}
              className="inline-block text-white bg-black border border-white text-xs sm:text-sm md:text-lg lg:text-xl  hover:bg-gray-300 hover:scale-105 transition-all duration-300 py-0.5 px-3 md:px-6 cursor-pointer"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionBanner;
