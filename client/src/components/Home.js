// src/components/Home.js

import React from 'react';
import Hero from './Experiment/Hero';
import LatestInsights from './LandingpageComps/LatestInsights';
import FeaturedSolutionsSlider from "./Experiment/services";
import AutoPodsExp from './Experiment/Autopodsexp';
import ServicesSection from './LandingpageComps/ServicesPage'; // Updated this import to match the correct component name
import ContactForm from './Experiment/ContactExp'; // Ensure that this import path is correct based on your file structure

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <div className="py-20">
        <ServicesSection /> {/* Corrected from ServicesPage to ServicesSection */}
      </div>
      <AutoPodsExp />

      {/* Latest Insights Section */}
      <LatestInsights />
      <FeaturedSolutionsSlider />
      <ContactForm /> {/* Ensure that this matches the correct component name and import */}

      {/* Start Your Journey Section */}
    </div>
  );
};

export default Home;
