import React from "react";
import careImage1 from "../assets/images/care1.png"; 
import careImage2 from "../assets/images/care2.png"; 
import careImage3 from "../assets/images/fabric2.png"; // blue fabric
import heart from "../assets/images/heart1.svg"; // blue fabric
import { useEffect } from "react";

const ProductCare = () => {

  // Scroll to top when component mounts
      useEffect(() => {
        window.scrollTo({top:0, behavior: "smooth"});
      },[]);

  return (
    <section className="bg-white py-8">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="bg-pink-100 py-4 px-6 text-center">
          <h2 className="text-2xl md:text-2xl lg:text-4xl font-tenor text-[#DB2961]">
            Product Care
          </h2>
        </div>
        {/* <div className="flex justify-center mt-4 mb-8">
          <img src={heart} alt="heart icon" className="w-10 h-10" />
        </div> */}

        {/* First Image */}
        <div className="flex flex-row w-full max-w-[90%] md:w-2/3 lg:w-1/2 h-[250px] md:h-[350px] xl:h-[400px] 2xl:h-[550px] mt-6 lg:mt-10 mb-6 lg:mb-10 mx-auto gap-4 lg:gap-6 2xl:gap-8">
          <div className="w-1/2 h-full">
            <img
              src={careImage1}
              alt="Fabric Care"
              className="w-full max-w-[96%] h-full object-cover mx-auto"
            />
          </div>
          <div className="w-1/2 h-full">
            <img
              src={careImage2}
              alt="Fabric Care"
              className="w-full max-w-[96%] h-full object-cover mx-auto"
            />
          </div>
        </div>

        <div className="space-y-6 mt-8 mb-8 text-sm md:text-base lg:text-lg 2xl:text-2xl w-full max-w-[90%] md:max-w-[80%] lg:max-w-[75%] xl:max-w-[70%] 2xl:max-w-[65%] mx-auto">
          <section>
            <h2 className="text-[#DB2961] inline m-0">Dry Clean Only:</h2>
            <p className="inline m-0 pl-2">
              All garments are designed for professional dry cleaning to
              maintain their original finish and quality.
            </p>
          </section>
          <section>
            <h2 className="text-[#DB2961] inline m-0">
              Avoid Hand or Machine Wash:
            </h2>
            <p className="inline m-0 pl-2">
              Washing at home may damage delicate fabrics, embroidery.
            </p>
          </section>
          <section>
            <h2 className="text-[#DB2961] inline m-0">Store with Care:</h2>
            <p className="inline m-0 pl-2">
              Keep your garments in a cool, dry place away from direct sunlight
              to prevent fading.
            </p>
          </section>
          <section>
            <h2 className="text-[#DB2961] inline m-0">
              Handle with Clean Hands:
            </h2>
            <p className="inline m-0 pl-2">
              Oils or residues from skin may affect fine materials.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
};

export default ProductCare;
