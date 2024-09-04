import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Experiment/header";
import Footer from "./components/FooterComps/Footer";
import Careersexp from "./components/Careersexp";
import Visualizingai from "./components/Visualizingai";
import AboutUS2 from "./components/AboutUS2";
import ContactUsHome from "./components/ContactUsHome";
import Services from "./components/Services";
import InsightsHome from "./components/InsightsHome";
import ai from "./assets/images/ai.gif";
import ReadMore from "./components/InsightsComps/ReadMore";
import LoginPage from "./components/Experiment/ContactExp";
import LandingPage from "./components/Landingpage";
import JobList from "./components/CareersComp/Openpositions";
import { LoadingScreen } from "./components/AnimatedNumber";

function App() {
  const [loading, setLoading] = useState(true);
  const [firstVisit, setFirstVisit] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (hasVisited) {
      setLoading(false);
      setFirstVisit(false);
    } else {
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
    setFirstVisit(false);
  };

  return (
    <Router>
      {loading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <>
          <Header className="mb-56" />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about-us" element={<AboutUS2 />} />
            <Route path="/visualizingai" element={<Visualizingai />} />
            <Route path="/careers" element={<Careersexp />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<LoginPage />} />
            <Route path="/openpositions" element={<JobList />} />
            <Route path="/insights" element={<InsightsHome />} />
            <Route path="/readmore" element={<ReadMore />} />
          </Routes>
          <Footer />
          <div className="fixed bottom-24 right-24 w-24 h-24 z-50">
            <img
              src={ai}
              alt="AI Assistant"
              className="w-full h-full object-contain bg-blend-lighten"
            />
          </div>
        </>
      )}
    </Router>
  );
}

export default App;
