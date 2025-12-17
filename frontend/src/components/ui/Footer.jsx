import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="bg-white text-black px-6 pt-10 pb-10 md:pb-4 md:px-14 border-t text-base">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* ABOUT SHILPA VUMMITI */}
        <div className="space-y-6">
          <div>
            <Link to={"/about#About"}>
              <h3 className="font-bold uppercase text-sm tracking-widest underline">
                About Shilpa Vummiti
              </h3>
            </Link>
          </div>
          <ul className="space-y-2">
            <div>
              <Link to={"/about#Press"}>
                <li className="hover:opacity-70 transition-opacity duration-300 cursor-pointer">
                  Press
                </li>
              </Link>
            </div>
            {/* <div>
              <Link to={"/authenticity"}>
                <li className="hover:opacity-70 transition-opacity duration-300 cursor-pointer">
                  Authenticity
                </li>
              </Link>
            </div> */}
            <div className="hidden md:block">
              <a
                href="https://www.instagram.com/shilpavummiti/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity duration-300"
              >
                <span className="flex items-center gap-2">
                  Follow us <FaInstagram size={16} />
                </span>
              </a>
            </div>
          </ul>
        </div>

        {/* SERVICES */}
        <div className="space-y-6">
          <h3 className="font-bold uppercase text-sm tracking-widest">
            Services
          </h3>
          <ul className="space-y-2">
            <div>
              <Link to={"/personalization"}>
                <li className="hover:opacity-70 transition-opacity duration-300 cursor-pointer">
                  Customization
                </li>
              </Link>
            </div>
            <div>
              <Link to={"/shipping-policy"}>
                <li className="hover:opacity-70 transition-opacity duration-300 cursor-pointer">
                  Shipping & Return Policy
                </li>
              </Link>
            </div>
            <div>
              <Link to={"/returns-exchange"}>
                <li className="hover:opacity-70 transition-opacity duration-300 cursor-pointer">
                  Return & Exchange Policy
                </li>
              </Link>
            </div>
          </ul>
        </div>

        {/* HELP */}
        <div className="space-y-6">
          <h3 className="font-bold uppercase text-sm tracking-widest">Help</h3>
          <ul className="space-y-2">
            <div>
              <a
                href="https://wa.me/+919600014187" // Replace with your number
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <li className="hover:opacity-70 transition-opacity duration-300 cursor-pointer">
                  Chat With Advisor
                </li>
              </a>
            </div>
            <div>
              <Link to={"/privacy"}>
                <li className="hover:opacity-70 transition-opacity duration-300 cursor-pointer">
                  Privacy Policy
                </li>
              </Link>
            </div>
            <div>
              <Link to={"/care"}>
                <li className="hover:opacity-70 transition-opacity duration-300 cursor-pointer">
                  Product Care
                </li>
              </Link>
            </div>
            {/* Store - google map link only in mobile view */}
            <div className="block md:hidden">
              <a
                href="https://www.google.com/maps/place/Shilpa+Vummiti/@12.9494135,80.2572095,20.6z/data=!4m6!3m5!1s0x3a525d3570739b3b:0x47e1dd7f8cb185b4!8m2!3d12.9493885!4d80.2574075!16s%2Fg%2F11vq7jqy08?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="leading-relaxed hover:opacity-70 block cursor-pointer"
              >
                <li className="hover:opacity-70 transition-opacity duration-300 cursor-pointer">
                  Store
                </li>
              </a>
            </div>
          </ul>
        </div>

        {/* CONNECT only in Desktop View*/}
        <div className="space-y-6 hidden md:block">
          <h3 className="font-bold uppercase text-sm tracking-widest">
            Connect
          </h3>
          <a
            href="https://www.google.com/maps/place/Shilpa+Vummiti/@12.9494135,80.2572095,20.6z/data=!4m6!3m5!1s0x3a525d3570739b3b:0x47e1dd7f8cb185b4!8m2!3d12.9493885!4d80.2574075!16s%2Fg%2F11vq7jqy08?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="leading-relaxed hover:opacity-70 block cursor-pointer"
          >
            <span className="block underline">
              4/200, Ground Floor, 1st Cross Rd,
            </span>
            <span className="block underline">
              Sri Kapaleeswarar Nagar, Neelankarai,
            </span>
            <span className="block underline">Chennai, Tamil Nadu 600041</span>
          </a>
          <div className="pt-10">
            <Link to={"/terms"}>
              <p className="hover:opacity-70 transition-opacity duration-300 cursor-pointer">
                Terms & Conditions
              </p>
            </Link>
          </div>
        </div>
        {/* Mobile View of follow us and terms & conditions */}
        <div className="flex flex-col items-end md:hidden text-left">
          <ul className="text-left">
            {/* Follow Us only visible in Mobile View */}
            <li>
              <a
                href="https://www.instagram.com/shilpavummiti/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity duration-300"
              >
                <span className="flex flex-row gap-1 items-center">
                  Follow Us <FaInstagram size={16} />
                </span>
              </a>
            </li>
            {/* Terms & Conditions visible in both devices at the end */}
            <div className="mt-2">
              <Link to={"/terms"}>
                <li className="hover:opacity-70 transition-opacity duration-300 cursor-pointer underline">
                  Terms & Conditions
                </li>
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
