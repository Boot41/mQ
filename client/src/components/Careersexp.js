import React from 'react';
import HeroSection from './Experiment/Craeershero';
import WhyChooseUsSection from './Experiment/ValueProp';
import FreightCompanySection from './Experiment/sectionone';
import UnmatchedServicesSection from './Experiment/sectiontwo';
import ContactForm from './Experiment/ContactExp';
import Resources from './Experiment/Resources';

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <WhyChooseUsSection />
      <FreightCompanySection />
      <Resources />
      <UnmatchedServicesSection />
      <ContactForm />
    </div>
  );
};

export default LandingPage;