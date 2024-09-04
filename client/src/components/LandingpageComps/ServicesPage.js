import React, { useState, useEffect } from "react";
import { ServicesData } from "../../InformationFiles/LandingPageInfo";
const ParallaxCard = ({ title, subtitle, image, link }) => {
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

  const handleClick = () => {
    window.location.href = `/services#${link}`;
  };

  return (
    <div
      id={title}
      className={`relative overflow-hidden rounded-lg shadow-lg w-[300px] h-[200px] transition-all duration-500 transform-gpu bg-black   ${
        inView ? "opacity-100" : "opacity-0"
      } hover:scale-105 hover:shadow-2xl group cursor-pointer `}
      onClick={handleClick}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "black",
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center "
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
      <div
        className="absolute inset-0 transition-transform duration-500 ease-in-out "
        style={{
          content: '""',
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          backgroundColor: "orange",
          transition: "left 0.5s ease",
          zIndex: -1,
          border: "1px solid white",
        }}
      />
      <div
        className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4 transition-colors duration-500 ease-in-out"
        style={{
          zIndex: 1,
        }}
      >
        <h2 className="text-xl font-bold  backdrop-blur-sm rounded-sm ">
          {title}
        </h2>
        <button
          // className="mt-4 relative border border-white text-sm text-white py-2 px-4 bg-transparent shadow-md "
          className="relative mt-4 border border-white text-sm text-white py-2 px-4 bg-transparent backdrop-blur-sm shadow-md transition-shadow duration-300 overflow-hidden before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-orange-500 before:transition-[left] before:duration-500 before:z-[-1] hover:before:left-0 hover:shadow-lg hover:bg-black"
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          {subtitle}
          <span
            className="absolute inset-0"
            style={{
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              backgroundColor: "orange",
              transition: "left 0.5s ease",
              zIndex: -1,
              "&:hover": {
                color: "white",
                backgroundColor: "transparent",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                backgroundColor: "orange",
                transition: "left 0.5s ease",
                zIndex: -1,
                border: "white",
              },
              "&:hover::before": {
                left: 0,
              },
            }}
          />
        </button>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <div className="ServicesSection -mt-36">
      <header className="text-center my-10">
        <h1 className="text-6xl text-orange-400 font-bold font-['Baskervville SC, serif']">
          Our Services
        </h1>
        <p className=" mt-2 text-gray-600">
          Discover the latest news and content for Microsoft 365 and discover
        </p>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 justify-center">
        {ServicesData.map((card, index) => (
          <div key={index}>
            <ParallaxCard
              title={card.title}
              subtitle={card.subtitle}
              image={card.image}
              link={card.link}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default ServicesSection;
