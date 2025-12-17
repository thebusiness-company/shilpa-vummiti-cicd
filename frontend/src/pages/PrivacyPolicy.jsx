import React from "react";
import  Lock  from "../assets/images/lock.svg";
import { useEffect } from "react";

const PrivacyPolicy = () => {
  // Scroll to top when component mounts
    useEffect(() => {
      window.scrollTo({top:0, behavior: "smooth"});
    },[]);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="bg-white w-full px-4 mt-8 lg:mt-12 mb-6 lg:mb-10 max-w-[94%] md:max-w-[90%]">
        <div className="bg-[#183028] text-white text-center py-4 mb-2 ">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-tenor font-medium">
            Privacy Policy
          </h1>
        </div>

        <div className="flex flex-col items-center py-6 px-4 md:px-8 space-y-6 text-sm md:text-base lg:text-lg 2xl:text-2xl leading-relaxed">
          <img src={Lock} alt="Privacy icon" className="w-8 h-8" />

          <div className="w-full text-left space-y-6 ">
            <section className="mt-3">
              <p className="text-center ">
                This Privacy Policy describes how our Company collects, uses,
                discloses, and safeguards personal information obtained from
                users you when accessing or using our website, visiting our
                boutiques, or engaging our bespoke fashion and wardrobe
                consulting services. By accessing our website or providing
                information to us, you acknowledge that you have read and
                understood this Privacy Policy and agree to its terms.
              </p>
            </section>

            <section className="space-y-4 mt-10">
              <h2 className="text-lg md:text-xl 2xl:text-3xl">1. Scope</h2>
              <p className=" ">
                This Policy applies to all personal data collected through our
                website, digital platforms, and in-store interactions in India.
                It governs how we handle data belonging to customers, visitors,
                and subscribers.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-lg md:text-xl 2xl:text-3xl">
                2. Information We Collect
              </h2>
              <h3 className="font-semibold">2.1 Personal Information</h3>
              <p className=" ">
                We may collect the following categories of personal information:
              </p>
              <ul className="list-inside list-decimal space-y-4">
                <li>Name, email address, contact number;</li>
                <li>Billing and shipping addresses;</li>
                <li>
                  Payment and transaction details (processed securely via
                  third-party gateways);
                </li>
                <li>
                  Measurements, style preferences, or event information provided
                  for bespoke or consulting services.
                </li>
              </ul>
              <h3 className="font-semibold">2.2 Technical and Usage Data</h3>
              <p>Automatically collected information may include:</p>
              <ul className="list-inside list-decimal space-y-4">
                <li>IP address, browser type, device identifiers;</li>
                <li>
                  Access dates and times, referring URLs, and website activity;
                </li>
                <li>
                  Cookies and analytics data used to improve performance and
                  user experience.
                </li>
              </ul>
              <h3 className="font-semibold">
                2.3 Communication and Marketing Data
              </h3>
              <p>
                Information provided when subscribing to newsletters,
                participating in promotions, or contacting customer support.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-lg md:text-xl 2xl:text-3xl">
                3. Purpose of Processing
              </h2>
              <p>
                Personal data is processed solely for legitimate business
                purposes, including:
              </p>
              <ul className="list-inside list-disc space-y-4 small-bullet">
                <li>Order processing, fulfillment, and delivery;</li>
                <li>
                  Providing bespoke design and wardrobe consulting services;
                </li>
                <li>Responding to queries or service requests;</li>
                <li>
                  Sending service updates, transactional messages, and (where
                  consented) marketing communications;
                </li>
                <li>
                  Performing analytics to improve our collections, website, and
                  customer service;
                </li>
                <li>
                  Complying with legal or regulatory requirements and preventing
                  fraud.
                </li>
              </ul>
            </section>
            <section className="space-y-4">
              <h2 className="text-lg md:text-xl 2xl:text-3xl">
                4. Lawful Basis for Processing
              </h2>
              <p>
                Processing is carried out under one or more of the following
                lawful bases:
              </p>
              <ul className="list-inside list-disc space-y-4 small-bullet">
                <li>Performance of a contract with you;</li>
                <li>Your explicit consent;</li>
                <li>Compliance with a legal obligation;</li>
                <li>
                  Legitimate business interests pursued by us (provided such
                  interests do not override your rights).
                </li>
              </ul>
            </section>
            <section className="space-y-4">
              <h2 className="text-lg md:text-xl 2xl:text-3xl">
                5. Data Sharing and Disclosure
              </h2>
              <p>We may share personal information only as necessary with:</p>
              <ul className="list-inside list-disc space-y-4 small-bullet">
                <li>
                  Service Providers: logistics partners, payment processors, and
                  IT service providers who perform functions on our behalf;
                </li>
                <li>
                  Analytics and Marketing Partners: for site optimization and
                  performance tracking;
                </li>
                <li>
                  Legal Authorities: when disclosure is required by applicable
                  law or judicial process.
                </li>
                <li>
                  All third parties are contractually bound to maintain data
                  confidentiality and security.
                </li>
              </ul>
            </section>
            <section className="space-y-4">
              <h2 className="text-lg md:text-xl 2xl:text-3xl">
                6. International Data Transfers
              </h2>
              <p>
                Personal data collected in India may be processed or stored in
                other jurisdictions in accordance with applicable data
                protection laws. Appropriate safeguards are implemented to
                ensure equivalent protection.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-lg md:text-xl 2xl:text-3xl">
                7. Data Retention
              </h2>
              <p>
                We retain personal data only for as long as necessary to fulfill
                the purposes outlined herein or as required by law. Once
                retention is no longer necessary, data is securely deleted or
                anonymized.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-lg md:text-xl 2xl:text-3xl">
                8. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures
                to safeguard data against unauthorized access, alteration,
                disclosure, or destruction. All financial transactions are
                encrypted and processed through PCI-DSS-compliant gateways; card
                details are never stored on our servers.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-lg md:text-xl 2xl:text-3xl">
                9. Cookies and Tracking Technologies
              </h2>
              <p>
                Cookies are employed to enhance user experience, analyze website
                traffic, and retain cart preferences.
              </p>
              <p>
                You may modify browser settings to decline cookies; however,
                some features may become unavailable.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-lg md:text-xl 2xl:text-3xl">
                10. Your Rights
              </h2>
              <p>Subject to applicable law, you may:</p>
              <ul className="list-inside list-disc space-y-4 small-bullet">
                <li>Access and obtain a copy of your personal data;</li>
                <li>
                  Request correction or deletion of inaccurate or obsolete data;
                </li>
                <li>
                  Withdraw consent to processing where consent is the lawful
                  basis;
                </li>
                <li>Opt out of marketing communications.</li>
              </ul>
              <p>
                Requests may be sent to our official email address. We may
                require reasonable verification of identity before acting upon
                such requests.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-lg md:text-xl 2xl:text-3xl">
                11. Children’s Data
              </h2>
              <p>
                Our website and services are intended for individuals aged 18
                and above. We do not knowingly collect personal data from
                minors.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-lg md:text-xl 2xl:text-3xl">
                12. Updates to This Policy
              </h2>
              <p>
                We may amend this Privacy Policy periodically to reflect changes
                in regulations or operations. The revised version will be posted
                on this page with the updated effective date.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-lg md:text-xl 2xl:text-3xl">
                13. Contact Information
              </h2>
              <p>
                For inquiries or concerns regarding this Privacy Policy or data
                handling practices, please contact:
              </p>
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
              <h2 className="text-lg md:text-xl 2xl:text-3xl">
                14. Commitment to Transparency
              </h2>
              <p>
                At Shilpa Vummiti, we uphold the same principles of integrity
                and craftsmanship in our data practices as in our designs. We
                are committed to transparency, accountability, and the
                responsible handling of all customer information
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
