import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Experiment/header";
import Footer from "./components/FooterComps/Footer";
import Careersexp from "./components/Careersexp";
import Visualizingai from "./components/Visualizingai";
import AboutUS2 from "./components/AboutUS2";
import Services from "./components/Services";
import InsightsHome from "./components/InsightsHome";
import ai from "./assets/images/ai.gif";
import ReadMore from "./components/InsightsComps/ReadMore";
import LandingPage from "./components/Landingpage";
import JobList from "./components/CareersComp/Openpositions";
import { LoadingScreen } from "./components/AnimatedNumber";
import ContactUs from "./components/ContactUsComps/ContactUs";
import { SectionProvider } from "../src/components/TrackUserComps/SectionContext"; // Import the SectionProvider
import CareersHome from "./components/Careersexp";
import BlobComponent from "./components/BlobComponents/BlobComponent";
import ReadMoreBlog from "./components/LandingpageComps/ReadMore";
import { ChatProvider } from "./context/ChatContext";

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
        <ChatProvider>
          <SectionProvider>
            <Header className="mb-56" />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about-us" element={<AboutUS2 />} />
              <Route path="/visualizingai" element={<Visualizingai />} />
              <Route path="/careers" element={<CareersHome />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/openpositions" element={<JobList />} />
              <Route path="/insights" element={<InsightsHome />} />
              <Route path="/readmore" element={<ReadMore />} />
              <Route path="/ReadmoreBlogs" element={<ReadMoreBlog />} />
            </Routes>
            <Footer />
            <BlobComponent />
          </SectionProvider>
        </ChatProvider>
      )}
    </Router>
  );
}

export default App;
