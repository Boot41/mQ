import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

const ParallaxCard = ({ title, description, image }) => {
  const [inView, setInView] = useState(false);

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

  return (
    <div
      id={title}
      className={`relative overflow-hidden rounded-lg shadow-lg w-[250px] h-[200px] transition-transform duration-500 transform-gpu ${
        inView ? "opacity-100" : "opacity-0"
      } group hover:scale-105 hover:shadow-2xl cursor-pointer`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      {/* Content container */}
      <div className="absolute inset-0 flex flex-col justify-end text-white">
        {/* Title and line container */}
        <div className="bg-gradient-to-t from-black to-transparent p-4 transition-transform duration-300 ease-in-out transform group-hover:translate-y-[-70px]">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <div className="border-t border-white w-16 transition-all duration-300 group-hover:w-full"></div>
        </div>

        {/* Description (initially hidden, revealed on hover) */}
        <div className="bg-black bg-opacity-80 p-4 absolute inset-x-0 bottom-0 transition-transform duration-300 ease-in-out transform translate-y-full group-hover:translate-y-0">
          <p className="text-sm mb-4">{description}</p>
          <div className="flex items-center text-orange-400 font-semibold">
            Learn More <ChevronRight className="ml-2" size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const updatedServicesData = [
    {
      title: "POC to Production",
      image: "ai1.png",
      description:
        "Think41 transforms GenAI MVPs into scalable, production-ready systems, ensuring efficient transitions while maintaining quality and cost-effectiveness. We help turn your AI innovations into impactful solutions.",
    },
    {
      title: "Conversational AI at Scale",
      image: "ai3.jpg",
      description:
        "Think41 excels in perfecting the final 25% of GenAI voice systems, creating scalable, low-cost solutions with human-like latency, reactions, and conversational flow. Our Recruit41 bot showcases this expertise by conducting nuanced, human-like interviews beyond basic Q&A.",
    },
    {
      title: "Custom Agent Development",
      image: "r4.jpg",
      description:
        "Think41 builds autonomous AI agents that predict, recommend, and adapt, seamlessly integrating with your systems to automate tasks and enhance decision-making. Experience the future of automation with rQ.",
    },
  ];

  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-5xl text-gray-800 font-bold font-['Baskervville SC, serif'] mb-4">
            Our Services
          </h1>
          <div className="w-24 h-1 bg-orange-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the latest innovations in AI and how we can transform your business.
          </p>
        </header>
        <section className="flex flex-wrap justify-center gap-12">
          {updatedServicesData.map((card, index) => (
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
