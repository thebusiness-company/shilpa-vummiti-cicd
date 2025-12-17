import React from "react";
import p1 from "../assets/images/p1.png";
import p2 from "../assets/images/p2.png";
import p3 from "../assets/images/p3.png";
import p4 from "../assets/images/p4.png";
import { useEffect } from "react";

const PersonalizationSection = () => {

  // Scroll to top when component mounts
      useEffect(() => {
        window.scrollTo({top:0, behavior: "smooth"});
      },[]);

  return (
    <section className="px-2 py-8 w-full max-w-[90%] mx-auto bg-white text-center">
      <h2 className="text-2xl lg:text-3xl mb-6 mt-4 md:mb-10 xl:mb-14 font-tenor">
        Personalization
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
        <img
          src={p1}
          alt="Look 1"
          className="w-full h-full max-h-[300px] md:max-h-[450px] lg:max-h-[500px] 2xl:max-h-[650px]"
        />
        <img
          src={p2}
          alt="Look 2"
          className="w-full h-full max-h-[300px] md:max-h-[450px] lg:max-h-[500px] 2xl:max-h-[650px]"
        />

        <img
          src={p3}
          alt="Look 3"
          className="w-full h-full max-h-[300px] md:max-h-[450px] lg:max-h-[500px] 2xl:max-h-[650px]"
        />
        <img
          src={p4}
          alt="Look 4"
          className="w-full h-full max-h-[300px] md:max-h-[450px] lg:max-h-[500px] 2xl:max-h-[650px]"
        />
      </div>

      <p className="text-sm md:text-base lg:text-xl 2xl:text-2xl font-medium mb-6 font-tenor">
        Looking For A One-Of-A-Kind Dress That Perfectly Fits Your Style And
        Body?
      </p>

      <p className="w-full mx-auto text-sm md:text-base lg:text-lg 2xl:text-2xl leading-relaxed mb-6">
        Our customized dress stitching services are just what you need! Our
        skilled tailors work with you to design a dress that matches your
        vision, using a standard process and the latest techniques. From casual
        to formal, our customized dresses will make you stand out. Order online
        and get your dream dress custom-made for you!
      </p>

      <div className=" text-sm md:text-base lg:text-lg 2xl:text-2xl leading-relaxed mb-4">
        <p>
          <strong>Note:</strong>
        </p>
        <ol className="list-decimal list-inside text-center w-full mx-auto mt-8 space-y-1">
          <li>
            If you are in Chennai, we offer free fabric pickup & delivery.
          </li>
          <li>
            If you are outside Chennai, you can send the fabric to us, and we
            will ship back the finished product via courier.
          </li>
          <li>
            The costs below are only for stitching (the customer must provide
            fabric). If you need additional customization, let us know.
          </li>
        </ol>
      </div>

      <a
        href="https://wa.me/+919600014187" // Replace with your number
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <button className="bg-[#DB2961]/20 hover:bg-[#183028]/40 text-[#DB2961] hover:text-[white] cursor-pointer px-6 py-2 mt-4 shadow-sm text-sm lg:text-base 2xl:text-lg">
          Click Here
        </button>
      </a>
    </section>
  );
};

export default PersonalizationSection;
