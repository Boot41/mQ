import React, { useState, useEffect } from "react";
// import HeroSection from "./LandingpageComps/HeroSection";
import ServicesPage from "./LandingpageComps/ServicesPage";
import Demo from "./LandingpageComps/Demo";
import LatestInsights from "./LandingpageComps/LatestInsights";
import About from "./LandingpageComps/About";
import Autopods from "./LandingpageComps/Autopods";
// import HeroSection from "./LandingpageComps/HeroSection";
import ContactUsCareers from "./ContactUsComps/ContactUsCareers";
import ConnectSection from "./LandingpageComps/Contactus";

import Demo2 from "./LandingpageComps/Demo2";
import MeetTeam from "./LandingpageComps/MeetTeam";

import FeaturedSolutionsSlider from "./Experiment/services";
import GradientBackground from "./Experiment/Hero";
import Hero from "./Experiment/Hero";
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
      {/* Hero Section */}
      {/* <Hero /> */}
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
      {/* <MeetTeam /> */}

      {/* Demo Section */}

      {/* Opportunities for Students Section */}
      {/* <div className="flex justify-center items-center py-16 ">
        <div className="flex items-center bg-white rounded-lg shadow-lg overflow-hidden w-3/4 mx-auto">
          <img
            src="students.jpg"
            alt="Students and Graduates"
            className="w-2/5 object-cover"
          />
          <div className="p-8 w-1/2">
            <h2 className="text-2xl font-bold mb-2">
              Opportunities for Students and Graduates
            </h2>
            <p className="text-lg mb-4">
              We offer a variety of opportunities for students and graduates to
              jumpstart their careers. Explore roles in various fields and gain
              hands-on experience with real projects. Join a diverse team
              focused on innovation and collaboration.
            </p>
            <a
              href="/careers"
              className="text-orange-500 font-semibold hover:underline"
            >
              Learn more about our programs →
            </a>
          </div>
        </div>
      </div> */}

      {/* Latest Insights Section */}
      <LatestInsights />
      {/* <FeaturedSolutionsSlider /> */}
      {/* <ConnectSection /> */}

      {/* Start Your Journey Section */}
    </div>
  );
};

export default LandingPage;
