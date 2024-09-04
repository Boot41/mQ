import React from 'react';
import HeroSection from './CareersComp/Craeershero';
import Values from './CareersComp/Values';
import FreightCompanySection from './CareersComp/Testimonials';
import UnmatchedServicesSection from './CareersComp/lifeatT41';
import ValueProp from './CareersComp/ValueProp'
import JobListing from './CareersComp/JobListings';
import Fun from './CareersComp/Fun';
import Boot41 from './CareersComp/Boot41';

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <Values />
      <UnmatchedServicesSection />
      <Boot41 />
      <FreightCompanySection />
      <div className="py-20"></div>
      {/* <ValueProp /> */}
      <JobListing />
      <Fun />
    </div>
  );
};

export default LandingPage;