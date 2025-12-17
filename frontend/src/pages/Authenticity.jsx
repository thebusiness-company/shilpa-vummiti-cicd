import React from 'react';
import a1 from '../assets/images/a1.png'
import a2 from '../assets/images/a2.png'
import { useEffect } from 'react';

const Authenticity = () => {

  // Scroll to top when component mounts
      useEffect(() => {
        window.scrollTo({top:0, behavior: "smooth"});
      },[]);

  return (
    <section className="px-4 md:px-12 lg:px-24 py-10 space-y-10 text-gray-800">
      {/* Section 1 */}
      <div className="space-y-4 text-start">
        <h2 className="text-xl md:text-3xl font-semibold">Our True Crafted Story</h2>
        <p className="text-sm md:text-lg mx-auto">
          At Shilpa Vummiti, authenticity is woven into every piece. From responsibly sourced materials to designs
          that reflect real lives, we’re on a journey to create clothing that’s honest, bold, and true to you.
        </p>
        <img
          src={a1}
          alt="Crafted Story"
          className="mx-auto w-full max-w-md md:max-w-lg "
        />
      </div>

      {/* Section 2 - Cost */}
      <div className="space-y-4 text-start">
        <h3 className="text-xl md:text-2xl font-semibold">Cost</h3>
        <p className="text-sm md:text-lg mx-auto">
          At Shilpa Vummiti, Our tailored, customized fits are crafted from the finest sustainable fabrics, designed
          to feel personal and last longer. Each garment is authenticated through rigorous quality checks, ensuring
          genuine craftsmanship. We keep our prices fair and transparent—reflecting the true cost of premium materials
          and ethical production—so you can invest in clothing that’s as real as you are, without breaking the bank.
          Discover style that’s accessible, honest, and built for you.
        </p>
      </div>

      {/* Section 3 - Sustainable Fabrics */}
      <div className="space-y-4 text-start">
        <h3 className="text-xl md:text-2xl font-semibold">Sustainable fabrics</h3>
        <p className="text-sm md:text-lg mx-auto">
          We believe true authenticity starts with the materials we choose. Our sustainable fabrics—sourced from
          eco-friendly fibers like organic cotton, recycled polyester, and Tencel—are crafted to minimize environmental
          impact while maximizing quality and comfort. Grown without harmful pesticides, recycled to reduce waste, or
          produced in low-impact processes, these fabrics reflect our commitment to the planet and the people who make
          our clothes. Each tailored, customized garment is made with premium, sustainable materials, authenticated
          through strict ethical standards to ensure genuine craftsmanship. Priced fairly to reflect their true value,
          our fabrics deliver long-lasting style you can feel good about, inside and out.
        </p>
        <img
          src={a2}
          alt="Sustainable Fabric"
          className="mx-auto w-full max-w-md md:max-w-lg "
        />
      </div>

      {/* Section 4 - No Shortcuts */}
      <div className="space-y-4 text-start">
        <h3 className="text-xl md:text-2xl font-semibold">No Shortcuts, Just Authentic Craftsmanship</h3>
        <p className="text-sm md:text-lg mx-auto">
          Our quality is non-negotiable. We craft tailored, customized fits with precision, using sustainable fabrics
          like organic cotton and recycled polyester. Authenticated through strict quality checks, every garment
          reflects our no-shortcuts philosophy. Fairly priced to honor ethical craftsmanship, our clothing offers
          lasting style you can trust.
        </p>
      </div>
    </section>
  );
};

export default Authenticity;
