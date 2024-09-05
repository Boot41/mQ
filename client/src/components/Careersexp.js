import React from "react";
import HeroSection from "./CareersComp/Craeershero";// Assuming HeroSection is the correct component name
import Values from "./CareersComp/Values";
import Testimonials from "./CareersComp/Testimonials"; // Assuming FreightCompanySection is actually Testimonials
 // Assuming UnmatchedServicesSection is actually LifeAtT41
import JobListings from "./CareersComp/JobListings"; // Assuming JobListing is actually JobListings
import Fun from "./CareersComp/Fun";
import Boot41 from "./CareersComp/Boot41";
import { LifeAtT41 }  from "../InformationFiles/CareersInfo";


const CareersHome= () => {
  return (
    <div className="mt-32">
      <HeroSection />

      {/* Glassdoor Review Badge */}
      <div className="flex justify-center mt-8">
        <a
          href="https://www.glassdoor.com/Overview/Working-at-Think41-EI_IE9960597.11,18.htm"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            alt="Check us out on Glassdoor."
            src="https://www.glassdoor.co.in/pc-app/static/img/partnerCenter/badges/eng_CHECK_US_157x30.png"
            className="w-auto h-8"
          />
        </a>
      </div>

      <Values />
      {/* <LifeAtT41 /> */}
      <Boot41 />
      <Testimonials />
      <div className="py-20"></div>
      <JobListings />
      <Fun />
    </div>
  );
};

export default CareersHome;
