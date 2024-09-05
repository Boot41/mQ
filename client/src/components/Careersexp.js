import React from "react";
import HeroSection from "./CareersComp/Heropage";
import Values from "./CareersComp/Values";
import FreightCompanySection from "./CareersComp/Testimonials";
import UnmatchedServicesSection from "./CareersComp/lifeatT41";
import JobListing from "./CareersComp/JobListings";
import Fun from "./CareersComp/Fun";
import Boot41 from "./CareersComp/Boot41";

const LandingPage = () => {
  return (
    <div className="mt-32">
      <HeroSection />

      {/* Glassdoor Review Badge */}
      <div className="flex justify-center mt-8">
        <a href="https://www.glassdoor.com/Overview/Working-at-Think41-EI_IE9960597.11,18.htm" target="_blank" rel="noopener noreferrer">
          <img
            alt="Check us out on Glassdoor."
            src="https://www.glassdoor.co.in/pc-app/static/img/partnerCenter/badges/eng_CHECK_US_157x30.png"
            className="w-auto h-8"
          />
        </a>
      </div>

      <Values />
      <UnmatchedServicesSection />
      <Boot41 />
      <FreightCompanySection />
      <div className="py-20"></div>
      <JobListing />
      <Fun />
    </div>
  );
};

export default LandingPage;
