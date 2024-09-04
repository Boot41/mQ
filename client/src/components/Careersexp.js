import React from 'react';
import HeroSection from './Experiment/Craeershero';
import Values from './CareersComp/Values';
import FreightCompanySection from './Experiment/Testimonials';
import UnmatchedServicesSection from './Experiment/lifeatT41';
import ValueProp from './Experiment/ValueProp';
import JobListing from './Experiment/JobListings';
import Fun from './Experiment/Fun';
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