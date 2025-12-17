import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {

  // Scroll to top when component mounts
      useEffect(() => {
        window.scrollTo({top:0, behavior: "smooth"});
      },[]);

  return (
    <div className="flex justify-center min-h-screen px-4 py-10 bg-white">
      <div className="w-full text-center text-sm md:text-base lg:text-lg 2xl:text-2xl max-w-[90%] mx-auto leading-relaxed">
        <strong>
          <h1 className="text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 lg:mb-8 font-medium">
            Terms & Conditions
          </h1>
        </strong>
        <div className="w-full text-left space-y-6">
          <p className="mb-6">
            Welcome to Shilpa Vummiti. These Terms and Conditions govern your
            use of our website and services. By accessing or using our website,
            you agree to comply with and be bound by these Terms. Please read
            them carefully before using our platform.
          </p>
          <section className="space-y-4">
            <h2 className="text-lg md:text-xl 2xl:text-3xl">
              1. General Information
            </h2>
            <p>
              The website{" "}
              <Link
                to={"/"}
                className="underline lg:no-underline lg:hover:underline"
              >
                https://Shilpavummiti.com
              </Link>{" "}
              is operated by Shilpa Vummiti, a Chennai-based fashion label
              offering bespoke and ready-to-wear apparel, accessories, and
              styling services.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-lg md:text-xl 2xl:text-3xl">
              2. Use of the Website
            </h2>
            <p>
              You agree to use this website only for lawful purposes and in
              accordance with these Terms.
            </p>
            <p>You must not:</p>
            <ul className="list-inside list-disc space-y-4 small-bullet">
              <li>
                Reproduce, distribute, or exploit any content for commercial
                purposes without prior written consent.
              </li>
              <li>
                Upload or transmit any harmful, offensive, or misleading
                material.
              </li>
              <li>
                Attempt to gain unauthorized access to our systems or data.
              </li>
              <li>
                We reserve the right to restrict or terminate access to users
                who violate these Terms.
              </li>
            </ul>
          </section>
          <section className="space-y-4">
            <h2 className="text-lg md:text-xl 2xl:text-3xl">
              3. Products and Services
            </h2>
            <ul className="list-inside space-y-4 small-bullet">
              <li>
                <span>a. Product Descriptions</span>
                <p className="ml-6 mt-2">
                  Reproduce, distribute, or exploit any content for commercial
                  purposes without prior written consent.
                </p>
              </li>
              <li>
                <span>b. Availability</span>
                <p className="ml-6 mt-2">
                  All items are subject to availability. We may discontinue or
                  update products without prior notice.
                </p>
              </li>
              <li>
                <span>c. Bespoke and Custom Orders</span>
                <p className="ml-6 mt-2">
                  Custom-made pieces are crafted exclusively for the client.
                  Once an order is confirmed, changes, cancellations, or refunds
                  may not be possible.
                </p>
              </li>
            </ul>
          </section>
          <section className="space-y-4">
            <h2 className="text-lg md:text-xl 2xl:text-3xl">
              4. Pricing and Payment
            </h2>
            <p>
              All prices are displayed in Indian Rupees (INR) and include
              applicable taxes unless otherwise stated.
            </p>
            <p>
              We use trusted third-party payment gateways to process
              transactions securely. Your card or payment details are not stored
              on our servers.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-lg md:text-xl 2xl:text-3xl">
              5. Shipping and Delivery
            </h2>
            <p>
              We aim to dispatch ready-to-ship products within the timeline
              mentioned on the product page.
            </p>
            <p>
              For custom orders, delivery time may vary depending on design
              complexity and production schedules.
            </p>
            <p>
              Shipping charges, if applicable, will be displayed at checkout.
            </p>
            <p>
              Delays caused by courier services, weather, or unforeseen
              circumstances are beyond our control, but we’ll do our best to
              assist in tracking your order.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-lg md:text-xl 2xl:text-3xl">
              6. Returns, Exchanges, and Cancellations
            </h2>
            <p>
              Due to the nature of bespoke and handcrafted garments, returns or
              exchanges are not accepted once an order is confirmed.
            </p>
            <p>
              For ready-to-wear items, returns may be accepted only in cases of
              manufacturing defects, subject to our review and approval.
            </p>
            <p>
              To raise a concern, contact us within 48 hours of delivery with
              clear images of the issue.
            </p>
            <p>
              All accepted returns must be unused, unwashed, and in original
              packaging.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-lg md:text-xl 2xl:text-3xl">
              7. Intellectual Property Rights
            </h2>
            <p>
              All designs, images, content, and materials available on this site
              are the exclusive property of Shilpa Vummiti.
            </p>
            <p>
              You may not reproduce, republish, or modify any part of this site
              for commercial purposes without express written permission.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-lg md:text-xl 2xl:text-3xl">
              8. Limitation of Liability
            </h2>
            <p>
              While we strive to ensure a seamless user experience, we are not
              liable for:
            </p>
            <ul className="list-inside list-disc space-y-4 small-bullet">
              <li>
                Any indirect, incidental, or consequential damages arising from
                the use of our website or products.
              </li>
              <li>
                Technical errors, downtime, or inaccuracies beyond our control.
              </li>
              <li>
                Losses due to misuse of purchased products or unauthorized
                website access.
              </li>
              <li>
                Your use of this website is at your own discretion and risk.
              </li>
            </ul>
          </section>
          <section className="space-y-4">
            <h2 className="text-lg md:text-xl 2xl:text-3xl">
              9. Third-Party Links
            </h2>
            <p>
              Our website may contain links to third-party sites for your
              convenience.
            </p>
            <p>
              We are not responsible for their content, privacy practices, or
              terms. Please review their policies before engaging with them.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-lg md:text-xl 2xl:text-3xl">
              10. Privacy and Data Protection
            </h2>
            <p>
              Your personal data is handled in accordance with our Privacy
              Policy
            </p>
            <p>
              By using our site, you consent to the collection and use of your
              information as described there.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-lg md:text-xl 2xl:text-3xl">
              11. Governing Law and Jurisdiction
            </h2>
            <p>These Terms are governed by the laws of India.</p>
            <p>
              Any disputes arising out of or relating to this website or our
              services shall be subject to the exclusive jurisdiction of the
              courts in Chennai, Tamil Nadu.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-lg md:text-xl 2xl:text-3xl">
              12. Changes to These Terms
            </h2>
            <p>
              We reserve the right to update or modify these Terms at any time
              without prior notice.
            </p>
            <p>
              Any changes will be reflected on this page with the updated
              Effective Date. Continued use of the site implies your acceptance
              of the revised Terms.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-lg md:text-xl 2xl:text-3xl">
              13. Contact Information
            </h2>
            <p className="font-semibold">Shilpa Vummiti</p>
            {/* <p>Email: </p> */}
            <a
              href="https://www.google.com/maps/place/Shilpa+Vummiti/@12.9494135,80.2572095,20.6z/data=!4m6!3m5!1s0x3a525d3570739b3b:0x47e1dd7f8cb185b4!8m2!3d12.9493885!4d80.2574075!16s%2Fg%2F11vq7jqy08?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="leading-relaxed underline lg:no-underline lg:hover:underline cursor-pointer"
            >
              Address: 4/200, Ground Floor, 1st Cross Rd, Sri Kapaleeswarar
              Nagar, Neelankarai, Chennai, Tamil Nadu 600041
            </a>
          </section>
          <section className="space-y-4">
            <h2 className="text-lg md:text-xl 2xl:text-3xl">14. Brand Ethos</h2>
            <p>
              At Shilpa Vummiti, each creation embodies craftsmanship,
              sustainability, and individuality. Our brand philosophy extends
              beyond design — it’s about building trust, promoting mindful
              fashion, and celebrating self-expression.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
