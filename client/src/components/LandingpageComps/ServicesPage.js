import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import axios from "axios";
import { ServicesData } from "../../InformationFiles/LandingPageInfo";
import { API_BASE_URL } from '../../lib/config';
import { useChat } from '../../context/ChatContext';
import { motion } from 'framer-motion';

const ParallaxCard = ({ title, description, image }) => {
  const [inView, setInView] = useState(false);
  const { addMessage, toggleChat } = useChat();

  useEffect(() => {
    const handleScroll = () => {
      const card = document.getElementById(title);
      if (card) {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        setInView(isVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [title]);

  const handleClick = async () => {
    try {
      addMessage({ type: "user", content: `Tell me more about ${title}` });
      toggleChat();

      const response = await axios.post(
         `${API_BASE_URL}/api/know-more-about-service/`,
        {
          service_name: title,
          model_name: "4o-mini",
        }
      );

      addMessage({ type: "assistant", content: response.data.response });
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error making API call:", error);
      addMessage({
        type: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      });
    }
  };

  return (
    <div
      id={title}
      className={`relative overflow-hidden rounded-lg shadow-lg w-[250px] h-[200px] transition-transform duration-500 transform-gpu ${
        inView ? "opacity-100" : "opacity-0"
      } group hover:scale-105 hover:shadow-2xl cursor-pointer`}
      style={{ fontFamily: 'inherit' }} // Apply uniform font
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      {/* Content container */}
      <div className="relative h-full" style={{ fontFamily: 'inherit' }}>
        {/* Title and line container */}
        <div className="relative h-full">
          <div
            className={`absolute bottom-0 w-full transition-transform duration-300 ease-in-out transform ${
              inView ? "translate-y-0" : "translate-y-full"
            } group-hover:translate-y-full group-hover:opacity-0 z-20`} // Updated class to hide on hover
          >
            <div className="bg-gradient-to-t from-black to-transparent p-4" style={{ fontFamily: 'inherit' }}>
              <h2 className="text-xl font-bold mb-2 text-white" style={{ fontFamily: 'inherit' }}>{title}</h2>
              <motion.div 
                className="border-t border-white mb-4"
                initial={{ width: '4rem' }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Description container */}
        <div
          className={`absolute bottom-0 w-full bg-black bg-opacity-80 p-4 transition-transform duration-300 ease-in-out transform ${
            inView ? "translate-y-full" : "translate-y-full"
          } group-hover:translate-y-0 group-hover:z-30`}
        >
          <p className="text-sm mb-4 text-white" style={{ fontFamily: 'inherit' }}>{description}</p>
          <div 
            className="flex items-center text-orange-400 font-semibold cursor-pointer"
            onClick={handleClick}
            style={{ fontFamily: 'inherit' }}
          >
            Learn More <ChevronRight className="ml-2" size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const [updatedServicesData, setUpdatedServicesData] = useState([]);

  return (
    <div className="mb-10 bg-gray-200 relative">
      <div className="container mx-auto px-4" style={{ fontFamily: 'inherit' }}>  {/* Apply uniform font */}
        <header className="text-center mb-16">
          <h1 className="text-6xl text-gray-800 font-bold font-['Baskervville SC, serif'] mb-4" style={{ fontFamily: 'inherit' }}>
            Our Key Differentiator
          </h1>
          <div className="w-24 h-1 bg-orange-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto" style={{ fontFamily: 'inherit' }}>
            Think41 excels in turning Generative AI MVPs into scalable,
            production-ready solutions, seamlessly integrating them across your
            organization. Our expertise extends to perfecting Conversational AI
            with human-like interactions and developing custom autonomous agents
            that predict, recommend, and adapt. Experience the future of
            AI-driven efficiency and automation with our innovative solutions.
          </p>
        </header>
        <section className="flex flex-wrap justify-center gap-12">
          {ServicesData.map((card, index) => (
            <div key={index} className="flex justify-center">
              <ParallaxCard
                title={card.title}
                image={card.image}
                description={card.description}
              />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ServicesSection;
