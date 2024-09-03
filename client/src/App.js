import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Header from "./components/Experiment/header";
import Header from "./components/Header";
import Footer from "./components/FooterComps/Footer";
// import LandingPage from "./components/Landingpage";
// import CareersPage from "./components/Careers";
import Careersexp from "./components/Careersexp";
import Visualizingai from "./components/Visualizingai";
import AboutUS2 from "./components/AboutUS2";
import ContactUsHome from "./components/ContactUsHome";
import Services from "./components/Services";
import InsightsHome from "./components/InsightsHome";
// import { ai } from "./assets/images/ai.gif";
import ai from "./assets/images/ai.gif";
import ReadMore from "./components/InsightsComps/ReadMore";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import Home from "./components/Home";
import LandingPage from "./components/Landingpage";

function App() {
  return (
    <Router>
      <Header className="mb-56" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about-us" element={<AboutUS2 />} />
        <Route path="/visualizingai" element={<Visualizingai />} />
        <Route path="/careers" element={<Careersexp />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactUsHome />} />
        <Route path="/insights" element={<InsightsHome />} />
        <Route path="/readmore" element={<ReadMore />} />
      </Routes>
      <Footer />
      {/* Floating GIF */}
      <div className="fixed bottom-24 right-24 w-24 h-24 z-50">
        <img
          src={ai}
          alt="AI Assistant"
          className="w-full h-full object-contain bg-blend-lighten"
        />
      </div>
    </Router>
  );
}

export default App;
