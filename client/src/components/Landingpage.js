import React, { useState, useEffect } from "react";

import ServicesPage from "./LandingpageComps/ServicesPage";

import LatestInsights from "./LandingpageComps/LatestInsights";
import About from "./LandingpageComps/About";
import Autopods from "./LandingpageComps/Autopods";

import Demo2 from "./LandingpageComps/Demo2";

import HeroSection2 from "./LandingpageComps/HeroSection";
import PressSection from "./Experiment/PressSection";

const LandingPage = () => {
  const [showChat, setShowChat] = useState(false);
  const [clickedButton, setClickedButton] = useState(null);
  const [parallax, setParallax] = useState(false);

  const handleToggleChat = () => {
    setShowChat((prevShowChat) => !prevShowChat);
  };

  const handleClick = (buttonName) => {
    setClickedButton(buttonName);
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero-section");
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const isVisible = rect.bottom <= 0;
        setParallax(isVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <HeroSection2 />

      {/* About Section */}
      <About />

      {/* AI Tools Section */}
      <Autopods />

      {/* Services Section */}
      <div className="py-20">
        <ServicesPage />
      </div>

      <PressSection />

      <div className="min-h-screen ">
        <Demo2 />
      </div>

      {/* Latest Insights Section */}
      <LatestInsights />
      {/* <FeaturedSolutionsSlider /> */}
      {/* <ConnectSection /> */}

      {/* Start Your Journey Section */}
    </div>
  );
};

export default LandingPage;
