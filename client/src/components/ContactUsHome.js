import React, { useState } from "react";

import ImageComp from "./ContactUsComps/ImageComp";
import ContactUsCareers from "./ContactUsComps/ContactUsCareers";
import ContactUsGen from "./ContactUsComps/ContactUS";
import ContactUsService from "./ContactUsComps/ContactUsService";

function ContactUsHome() {
  const [activeTab, setActiveTab] = useState("contents");

  const Header = ({ activeTab, onTabChange }) => {
    return (
      <nav className="flex justify-around p-4 bg-gray-100 ">
        <button
          className={`px-4 py-2 ${
            activeTab === "services" ? "bg-orange-500 text-white" : "text-black"
          }`}
          onClick={() => onTabChange("services")}
        >
          Get Service
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "genQuery" ? "bg-orange-500 text-white" : "text-black"
          }`}
          onClick={() => onTabChange("genQuery")}
        >
          General Query
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "careers" ? "bg-orange-500 text-white" : "text-black"
          }`}
          onClick={() => onTabChange("careers")}
        >
          Careers
        </button>
      </nav>
    );
  };

  const getContent = () => {
    switch (activeTab) {
      case "services":
        return <ContactUsGen />;
      case "genQuery":
        // Replace with the appropriate component for the "users" tab
        return <ContactUsService />; // Placeholder, replace with actual component
      case "careers":
        return <ContactUsCareers />;
      default:
        return <ContactUsGen />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen overflow-hidden">
      <div className="lg:w-1/2 w-full h-full overflow-hidden">
        <ImageComp className="w-full h-full object-cover" />
      </div>
      <div className="lg:w-1/2 w-full h-full flex flex-col mt-20 ">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 overflow-scroll ">{getContent()}</div>
      </div>
    </div>
  );
}

export default ContactUsHome;
