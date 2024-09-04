import React from "react";
import { motion } from "framer-motion";

import MeetFounders from "./AboutUsComps/MeetFounders";
import TimelineComp from "./AboutUsComps/TimeLine";
import WhoAndWhat2 from "./AboutUsComps/WhoandWhat2";
import CompStats from "./AboutUsComps/CompanyStats";
import Hero from "./AboutUsComps/AboutHero2";
// import AboutHero from "./AboutUsComps/AboutHero";


const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function AboutUS2() {
  return (
    <>
      {/* Your content */}
      <div className="relative space-y-8">
        <Hero />
        <CompStats />
        <motion.div
          id="mission-vision"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <WhoAndWhat2 />
        </motion.div>
        <motion.div
          id="t41-advantage"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          
          <MeetFounders />
        </motion.div>
        <motion.div
          id="leadership"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <TimelineComp />
        </motion.div>
        <motion.div
          id="our-journey"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Add the component or content related to "Our Journey" here */}
        </motion.div>
      </div>
    </>
  );
}

export default AboutUS2;
