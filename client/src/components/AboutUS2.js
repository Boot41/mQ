import React from "react";

import MeetFounders from "./AboutUsComps/MeetFounders";
import TimelineComp from "./AboutUsComps/TimeLine";
import WhoAndWhat2 from "./AboutUsComps/WhoandWhat2";
import CompStats from "./AboutUsComps/CompanyStats";
// import Hero from "./AboutUsComps/AboutHero2";
import AboutHero from "./AboutUsComps/AboutHero";

function AboutUS2() {
  return (
    <>
      {/* Your content */}
      <div className="relative space-y-8 mt-20">
        <AboutHero />
        <CompStats />
        <div id="mission-vision">
          <WhoAndWhat2 />
        </div>
        <div id="t41-advantage">
          <MeetFounders />
        </div>
        {/* <div id="leadership">
          <TimelineComp />
        </div> */}
        <div id="our-journey">
          {/* Add the component or content related to "Our Journey" here */}
        </div>
      </div>
    </>
  );
}

export default AboutUS2;
