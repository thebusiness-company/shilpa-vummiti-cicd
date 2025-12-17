import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import press1 from '../assets/images/press1.jpeg';
import press2 from '../assets/images/press2.jpeg';
import press3 from '../assets/images/press3.jpeg';
import press4 from '../assets/images/press4.png';
import press5 from '../assets/images/press5.jpg';
import press6 from '../assets/images/press6.jpg';
import press7 from '../assets/images/press7.jpg';


const pressImages = [
  press6,
  press3,
  press5,
  press2,
  press7,
  press4,
  press1,
  
];

const ThePress = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="px-4 py-10 sm:px-6 lg:px-16 bg-white text-black md:flex md:flex-col md:justify-center md:items-center lg:justify-center lg:items-center w-full max-w-[90%] lg:max-w-[80%] mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-center mb-10 lg:underline font-tenor">
          THE PRESS
        </h2>

        <div className="grid grid-cols-6 gap-4 md:gap-6 lg:gap-8 ">
          {/* Top Row - 2 items, each spans 3 columns on large screens */}
          <div className="col-span-3">
            <img
              src={pressImages[0]}
              alt="Press 1"
              className="w-41 h-28 lg:w-130 lg:h-87 object-cover border cursor-pointer"
              onClick={() => setSelectedImage(pressImages[0])}
            />
          </div>
          <div className="col-span-3">
            <img
              src={pressImages[1]}
              alt="Press 2"
              className="w-41 h-28 lg:w-130 lg:h-87 object-cover border cursor-pointer"
              onClick={() => setSelectedImage(pressImages[1])}
            />
          </div>

          {/* Middle Row - 3 items, each spans 2 columns on large screens */}
          <div className="col-span-2">
            <img
              src={pressImages[2]}
              alt="Press 3"
              className="w-26 h-21 lg:w-88 lg:h-66 object-cover border cursor-pointer"
              onClick={() => setSelectedImage(pressImages[2])}
            />
          </div>
          <div className="col-span-2">
            <img
              src={pressImages[3]}
              alt="Press 4"
              className="w-26 h-21 lg:w-88 lg:h-66 object-cover border cursor-pointer"
              onClick={() => setSelectedImage(pressImages[3])}
            />
          </div>
          <div className="col-span-2">
            <img
              src={pressImages[4]}
              alt="Press 5"
              className="w-26 h-21 lg:w-88 lg:h-66 object-cover border cursor-pointer"
              onClick={() => setSelectedImage(pressImages[4])}
            />
          </div>

          {/* Bottom Row - 2 items, each spans 3 columns */}
          <div className="col-span-3">
            <img
              src={pressImages[5]}
              alt="Press 6"
              className="w-41 h-53 lg:w-130 lg:h-165 object-cover border cursor-pointer"
              onClick={() => setSelectedImage(pressImages[5])}
            />
          </div>
          <div className="col-span-3">
            <img
              src={pressImages[6]}
              alt="Press 7"
              className="w-41 h-53 lg:w-130 lg:h-165 object-cover border cursor-pointer"
              onClick={() => setSelectedImage(pressImages[6])}
            />
          </div>
        </div>

        {/* Fullscreen Popup Preview */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 bg-white/95 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.img
                src={selectedImage}
                alt="Preview"
                className="max-w-[90%] max-h-[90%] "
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                transition={{ duration: 0.3 }}
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-30 right-5 lg:right-20 xl:right-60 bg-black p-2 text-white rounded-full shadow-md hover:bg-[white] hover:text-black transition"
              >
                <X size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="w-full max-w-[90%] text-center sm:px-6  bg-white text-black mx-auto">
        <p className="mt-2 mb-16 px-4 text-sm md:text-base lg:text-lg 2xl:text-2xl leading-relaxed">
          While this fast pace encourages creativity and innovation, it also
          raises concerns about sustainability, burnout, and the loss of
          timeless design. City-based designers talk to DT Next about whether
          this trend marks progress or signals a warning.
        </p>
        {/* <p className="mt-2 mb-16 px-4 text-sm md:text-base lg:text-lg 2xl:text-2xl leading-relaxed">
          "From Easter egg painting to painting on fabric", that’s how my
          journey began. What started as a playful experiment grew into a
          passion for fashion and design that now finds expression in every
          creation. Runway Rush, a one-page story featured in DT Next, captured
          this spirit through the eyes of a stylist, exploring the constant
          craving for newness in fashion. Indulge - The New Indian Express
          shared another side of the journey, in “How Shilpa Found the Perfect
          Palette,” celebrating the evolution of colour and creativity behind
          the brand.
        </p> */}
      </div>
    </>
  );
};

export default ThePress;
