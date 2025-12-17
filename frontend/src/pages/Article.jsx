import React from 'react';
import Article1 from '../assets/images/Article1.png';
import Article2 from '../assets/images/summer.png';
import mobile from '../assets/images/summer1.png';
import ChennaiFav from './ChennaiFas';
const Article = () => {
  return (
    <>
      <div className="flex flex-col items-center px-4 py-2 w-full max-w-[90%] mx-auto lg: lg:py-12">
        {/* Logo */}
        <div className="mb-8 w-50 lg:w-md">
          <img
            src={Article1}
            alt="Summer Fashion"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Image */}
        <div className="hidden lg:block mb-6 w-full">
          <img
            src={Article2}
            alt="Summer Fashion"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="lg:hidden mb-6 w-full">
          <img
            src={mobile}
            alt="Summer Fashion"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Article */}
        <div className="w-full text-center ">
          <h2 className="text-[15px] lg:text-3xl mb-4 font-medium font-tenor">
            ARTICLES
          </h2>
          <p className="mb-4 text-start text-sm md:text-base lg:text-lg 2xl:text-2xl leading-relaxed">
            Birds chirp in the background, occasionally drowned by the roar of a
            waterfall. There’s the fragrance of lemon grass. Up ahead is green
            grass with pink, orange and red flowers strewn about. It’s a garden.
            Vibrant paper boats and jars with candles add to the visual appeal.
            A large branch sits dramatically in the centre.
          </p>
          <p className="text-start text-sm md:text-base lg:text-lg 2xl:text-2xl leading-relaxed">
            This doesn’t quite seem like the setting for the launch of a fashion
            collection. But, it is. At Kahloscope, a line launched by designer
            and stylist Shilpa Vummiti, clothes aren’t displayed on hangers or
            showcased in a fashion show. Instead, they are projected on a
            screen. It creates an illusion of the on-screen models being part of
            the artificial garden that’s been set up at Humming Room, an
            exhibition space on{" "}
            <span className="font-semibold">NEELANKARAI</span>.
          </p>
        </div>
      </div>
      <ChennaiFav />
    </>
  );
};

export default Article;
