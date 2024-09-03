import React from 'react';

const caseStudies = [
  {
    title: "Financial Services",
    description: "Emirates NBD Boosts Performance and Lowers Licensing Costs",
    image: "a1.png",
    cta: "Read the Case Study",
    size: "large"
  },
  {
    title: "Media and Entertainment",
    description: "Respawn Entertainment Builds Star Wars Jedi: Survivor with AMD",
    image: "a2.png",
    cta: "Watch the Video",
    size: "small"
  },
  {
    title: "Design & Manufacturing",
    description: "STMicroelectronics Boosts Chip Design Speed with AMD EPYC™ CPUs",
    image: "a3.png",
    cta: "Read the Case Study",
    size: "large"
  },
  {
    title: "Transportation",
    description: "JR Kyushu, TAI Use AMD AI to Inspect Bullet Train Tracks",
    image: "a4.png",
    cta: "Read the Case Study",
    size: "small"
  }
];

const Resources = () => {
  return (
    <section className="bg-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Case Studies</h2>
          <a href="#" className="text-indigo-500 hover:underline">View All</a>
        </div>
        <div className="grid grid-cols-5 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className={`relative bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg ${
                index === 0 || index === 3 ? 'col-span-3' : 'col-span-2'
              }`}
            >
              <img
                src={study.image}
                alt={study.title}
                className="w-65 h-60 object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 p-6 flex flex-col justify-end">
                <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                <p className="mb-4">{study.description}</p>
                <a href="#" className="bg-transparent border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black self-start">
                  {study.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
