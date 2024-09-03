import React from 'react';
import Resources from './ServicesComps/Resources';
import Value from './ServicesComps/Value';
import ServiceProvided from './ServicesComps/Serviceprovided';
import HeroSection from './ServicesComps/Hero';
import TrustworthyInnovation from './ServicesComps/Overview';
import EventsSection from './ServicesComps/Latest';

const services= () => {
  return (
    <div className="mx-auto px-4 py-8 ">
         <HeroSection /> 
         <TrustworthyInnovation />
         <ServiceProvided />
      <Resources />
      <div className="px-0">
      <Value /></div>
      <EventsSection />
      
    </div>
  );
};

export default services;
