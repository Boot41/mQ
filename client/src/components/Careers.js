import React, { useState } from "react";
import { Link } from "react-router-dom";
import CareersHero from "./CareersComp/Heropage";
import JobList from "./CareersComp/Openpositions";
import Values from "./CareersComp/Values";
import StepSection from "./CareersComp/ValueProp";
import { ProcessSection } from "./CareersComp/ValueProp";
import Boot41 from "./CareersComp/Boot41";

const Newsletter = () => (
  <div className="w-full bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">
        DON’T SEE A POSITION YOU FIT INTO?
      </h1>
      <p className="text-lg text-gray-300 mb-6">
        We want to hear from you anyway.
      </p>
      <button className="px-6 py-2 border border-white text-white hover:bg-white hover:text-gray-800 transition">
        CONTACT
      </button>
    </div>
  </div>
);

const App = () => (
  <div className="mt-20">
    <CareersHero />
    <Values />
    <ProcessSection />
    <StepSection />
    <Boot41 />
    <JobList />
    <Newsletter />
  </div>
);

export default App;
