import React, { useState, useEffect } from "react";
import { useSection } from "../../src/components/TrackUserComps/SectionContext";
import ServicesPage from "./LandingpageComps/ServicesPage";
import SectionComponent from "./TrackUserComps/SectionComponent";
import LatestInsights from "./LandingpageComps/LatestInsights";
import About from "./LandingpageComps/About";
import Autopods from "./LandingpageComps/Autopods";
import Demo2 from "./LandingpageComps/Demo2";
import HeroSection2 from "./LandingpageComps/HeroSection";
import PressSection from "./LandingpageComps/PressSection";
import BlobComponent from "./BlobComponents/BlobComponent";

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

  const { currentSection } = useSection();

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
      <SectionComponent id="hero-section">
        <HeroSection2 />
      </SectionComponent>

      <SectionComponent id="about-section">
        <About className="-mb-28" />
      </SectionComponent>

      <SectionComponent id="autopods-section">
        <Autopods className=" mb-28" />
      </SectionComponent>

      <SectionComponent id="services-section">
        <div className="py-20">
          <ServicesPage />
        </div>
      </SectionComponent>

      <SectionComponent id="press-section">
        <PressSection />
      </SectionComponent>

      <SectionComponent id="demo-section">
        <div className="min-h-screen ">
          <Demo2 />
        </div>
      </SectionComponent>

      <SectionComponent id="latest-insights-section">
        <LatestInsights />
      </SectionComponent>
      <BlobComponent />
    </div>
  );
};

export default LandingPage;
