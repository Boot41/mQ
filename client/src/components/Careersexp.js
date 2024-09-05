import React from "react";
import HeroSection from "./CareersComp/Craeershero";// Assuming HeroSection is the correct component name
import Values from "./CareersComp/Values";
import Testimonials from "./CareersComp/Testimonials"; // Assuming FreightCompanySection is actually Testimonials
 // Assuming UnmatchedServicesSection is actually LifeAtT41
import JobListings from "./CareersComp/JobListings"; // Assuming JobListing is actually JobListings
import Fun from "./CareersComp/Fun";
import Boot41 from "./CareersComp/Boot41";
import { LifeAtT41 }  from "../InformationFiles/CareersInfo";
import GlassdoorRating from "./CareersComp/Glassdoor";


const CareersHome= () => {
  return (
    <div className="mt-32">
      <HeroSection />

      {/* Glassdoor Review Badge */}
    <GlassdoorRating />
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
