import React from "react";
import HeroSection from "./CareersComp/Craeershero"; // Assuming HeroSection is the correct component name
import Values from "./CareersComp/Values";
import Testimonials from "./CareersComp/Testimonials"; // Assuming FreightCompanySection is actually Testimonials
// Assuming UnmatchedServicesSection is actually LifeAtT41
import JobListings from "./CareersComp/JobListings"; // Assuming JobListing is actually JobListings
import Fun from "./CareersComp/Fun";
import Boot41 from "./CareersComp/Boot41";
import SectionComponent from "./TrackUserComps/SectionComponent";
import { LifeAtT41 } from "../InformationFiles/CareersInfo";
import GlassdoorRating from "./CareersComp/Glassdoor";
import OurAds from "./CareersComp/lifeatT41";

// import { LifeAtT41 } from "../InformationFiles/CareersInfo"

const CareersHome = () => {
  return (
    <div className="mt-32">
      <SectionComponent id="careers-hero">
        <HeroSection />
      </SectionComponent>

    <GlassdoorRating />
    
      <SectionComponent id="values-careers" className="container">
        <Values />
      </SectionComponent>
      <SectionComponent id="lifeatthink41-careers">
      <OurAds />
      </SectionComponent>
     
      <SectionComponent id="boot41-careers" className="container">
        <Boot41 />
      </SectionComponent>

      <SectionComponent id="testimonials-careers " className="py-8 px-4">
        <Testimonials />
      </SectionComponent>

      <div className="py-20 px-10"></div>
      <SectionComponent id="joblisting-careers" className="py-8 px-20">
        <JobListings />
      </SectionComponent>
      {/* <SectionComponent id="fun-careers">
        <Fun />
      </SectionComponent> */}
    </div>
  );
};

export default CareersHome;