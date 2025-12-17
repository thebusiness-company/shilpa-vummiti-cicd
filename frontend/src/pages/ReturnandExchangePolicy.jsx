import React from "react";
import Lock from "../assets/images/lock.svg";
import { useEffect } from "react";

const ReturnandExchangePolicy = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="bg-white w-full px-4 mt-8 lg:mt-12 mb-6 lg:mb-10 max-w-[94%] md:max-w-[90%]">
        <div className="bg-[#183028] text-white text-center py-4 mb-2 ">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-tenor font-medium">
            Return and Exchange Policy
          </h1>
        </div>

        <div className="flex flex-col items-center py-6 px-4 md:px-8 space-y-6 text-sm md:text-base lg:text-lg 2xl:text-2xl leading-relaxed">
          <img src={Lock} alt="Privacy icon" className="w-8 h-8" />

          <div className="w-full text-left space-y-6 ">
            <section>
              <ul className="list-inside list-disc space-y-4 small-bullet">
                <li>Bespoke garments cannot be exchanged.</li>
                <li>Items must be unused and unwashed. </li>
                <li>
                  Products should be returned with original tags attached.{" "}
                </li>
                <li>
                  The return request must be initiated within 3 days of
                  receiving the product.
                </li>
                <li>
                  You can exchange for a different size, subject to
                  availability.
                </li>
                <li>Exchanges are available for selected items. </li>
                <li>
                  Exchanges can be dispatched within 3 business days of
                  receiving the returned item.
                </li>
                <li>
                  Please mention your preferred refund method, either the
                  original source account or Brand Credits.
                </li>
                <li>
                  Refunds will be processed within 7 business days after we
                  receive the returned product.
                </li>
                <li>
                  We recommend keeping the return shipping receipt or tracking
                  details until your refund is confirmed.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnandExchangePolicy;
