import React, { useEffect } from "react";

const ShippingPolicySection = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({top:0, behavior: "smooth"});
  },[]);

  return (
    <section className="bg-white py-10 px-4 md:px-16 lg:px-20">
      <div className=" mx-auto">
        <div className="bg-pink-100 py-4 ">
          <h1 className="text-center text-2xl md:text-3xl lg:text-4xl text-[#183028] font-tenor">
            Shipping Policy
          </h1>
        </div>

        <div className="bg-white p-6 text-sm md:text-base lg:text-lg 2xl:text-2xl leading-relaxed text-left space-y-4 mt-4">
          <section className="space-y-2">
            <h2 className="font-semibold">Shipping Charges</h2>
            <p>
              We offer free shipping on all orders with a total value above
              ₹10,000 (after applying any discounts or promotional offers). For
              orders valued below ₹10,000, a standard shipping fee will apply.
              This fee will be clearly displayed at checkout before you confirm
              your purchase.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-semibold">Delivery Locations and Timelines </h2>
            <p>
              We ship products worldwide. Depending on your location, the
              average delivery timeline ranges from 7 to 10 working days. Orders
              placed during festivals, sale periods, or promotional events may
              take slightly longer to reach you.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-semibold">Order Processing and Tracking </h2>
            <p>
              Once your order is confirmed, it will be processed and dispatched
              within 3 business days. Most items will be dispatched within this
              timeframe, while bespoke garments may take longer. We will share
              your tracking details via WhatsApp, including for international
              deliveries.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-semibold">Third-Party Logistics Partners </h2>
            <p>
              To ensure efficient and timely deliveries, we work with trusted
              logistics partners. These partners may access limited customer
              data, strictly for the purpose of order fulfilment, tracking, and
              improving delivery accuracy. Your information is handled with the
              highest level of confidentiality and in accordance with our
              Privacy Policy.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-semibold">Policy Updates </h2>
            <p>
              Delivery timelines are estimates and may vary due to external
              factors. Shilpa Vummiti reserves the right to revise or update
              this Shipping Policy at any time without prior notice. Any changes
              will be reflected on our website immediately.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
};

export default ShippingPolicySection;
