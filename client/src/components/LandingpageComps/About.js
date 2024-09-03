import React from "react";

const About = () => {
  const services = [
    {
      image: "p1.png",
      title: "AI-Driven User Experiences",
      description:
        "Deliver a simple, intuitive interface coupled with powerful AI-driven features. Transform user interactions into insightful, actionable experiences.",
    },
    {
      image: "p2.png",
      title: "AI-Powered Ecosystem Integration",
      description:
        "Seamlessly integrate with partner ecosystems. Elevate your operations with real-time insights and collaborative AI-driven solutions.",
    },
    {
      image: "p3.png",
      title: "AI-Augmented Decision Making",
      description:
        "Empower your business with AI-enhanced decision-making tools. Leverage predictive analytics and intelligent insights to drive smarter, faster decisions.",
    },
    {
      image: "p4.png",
      title: "Generative AI Innovation",
      description:
        "Unleash the full potential of generative AI to create transformative solutions. Drive creativity, efficiency, and success in diverse applications.",
    },
  ];

  return (
    <div className=" rounded-t-3xl ">
      <div className="container mx-auto px-4">
        {/* Fixed layout for services with exactly 3 items per row */}
        {/* <div className="flex justify-center">
          <h1 className="text-center text-2xl text-black border-b-2  inline-block border-gray-500 pb-2">
            Transformative Impact: Revolutionizing Your Business with AI
          </h1>
        </div> */}
        <div className="flex flex-wrap justify-center py-20 w-full">
          {services.map((service, index) => (
            <div key={index} className="w-1/4 px-4 mb-8 flex-shrink-0 ">
              <div className="flex flex-col items-center">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-20 h-20 mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold mb-2 text-center text-black">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center text-base">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
