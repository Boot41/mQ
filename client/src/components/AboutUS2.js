import React from "react";

import MeetFounders from "./AboutUsComps/MeetFounders";

import WhoAndWhat2 from "./AboutUsComps/WhoandWhat2";
import CompStats from "./AboutUsComps/CompanyStats";
// import Hero from "./AboutUsComps/AboutHero2";
import AboutHero from "./AboutUsComps/AboutHero";

import SectionComponent from "./TrackUserComps/SectionComponent";
import WhyUsSection from "./AboutUsComps/Whyus";
import StatsSection from "./AboutUsComps/Stats";

function AboutUS2() {
  return (
    <>
      {/* Your content */}
      <div className="relative space-y-8 mt-20">
        <SectionComponent id="aboutus-hero">
          <AboutHero />
        </SectionComponent>

        <WhyUsSection />

        <SectionComponent id="mission-vision">
          <div id="mission-vision">
            <WhoAndWhat2 />
          </div>
        </SectionComponent>
        <SectionComponent id="comp-stats">
          <CompStats />
        </SectionComponent>
        <StatsSection/>
        <SectionComponent id="meetfounders-section">
          <div id="t41-advantage">
            <MeetFounders />
          </div>
        </SectionComponent>
      </div>
    </>
  );
}

export default AboutUS2;
