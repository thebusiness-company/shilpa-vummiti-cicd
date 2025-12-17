import React from "react";
import shilpa from '../../assets/images/shilpa1.png';
import { Link } from "react-router-dom";

const MeetShilpa = () => {
    return (
        <div className="relative w-full max-w-[393px] sm:max-w-full mx-auto h-[203px] sm:h-[300px] md:h-[400px] lg:h-screen overflow-hidden mt-8 md:mt-12 lg:mt-14 md:mb-2">
          {/* Image */}
          <img
            src={shilpa}
            alt="Fashion Banner"
            className="w-full h-full object-cover lg:object-fill xl:object-cover transition-all duration-700 ease-in-out"
          />
    
          {/* Overlay Content */}
          <div className="absolute inset-0 flex items-center justify-end mr-10 lg:mr-42">
              
               <div className="text-end">
                <Link to={"about/"}>
                 <button className="text-end bg-[#DB2961]/20 hover:bg-[#183028]/40 hover:text-[white] cursor-pointer px-2 py-1 lg:px-4 lg:py-2 text-xs sm:text-base transition mt-25 md:mt-36 lg:mt-72">
                 Read More
                 </button>
                </Link>
              </div>
          </div>
        </div>
      );
    };

export default MeetShilpa;
