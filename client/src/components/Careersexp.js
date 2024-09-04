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
