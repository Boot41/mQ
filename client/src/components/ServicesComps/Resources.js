import React, { useEffect } from 'react';
import LazyLoad from 'react-lazyload';
const Resource = ({ category, title, description, image }) => (
  <div className="relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col w-[300px] h-96 transform transition-transform duration-300 hover:scale-105">
    <LazyLoad height={200} once>
    <div className="relative h-1/2 parallax-bg" style={{ backgroundImage: `url(${image})` }}>
      <span className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white px-2 py-1 text-sm">
        {category}
      </span>
    </div>
    </LazyLoad>
    <div className="p-4 flex-1">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <a href="#" className="text-blue-500 font-semibold">
        Learn more &rarr;
      </a>
    </div>
  </div>
);

const CaseStudiesGrid = () => {
  const handleScroll = () => {
    const elements = document.querySelectorAll('.parallax-bg');
    elements.forEach(element => {
      const scrollPosition = window.scrollY;
      element.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const caseStudies = [
    {
      id: 1,
      category: 'Category 1',
      title: 'Driving banking and financial services with data and AI',
      description: 'Brief description of case study 1.',
      image: 'r2.jpg',
    },
    {
      id: 2,
      category: 'Category 2',
      title: 'Defining the journey to AIOps',
      description: 'Brief description of case study 2.',
      image: 'r1.jpg',
    },
    {
      id: 3,
      category: 'Category 3',
      title: 'Moving beyond data basics to data-driven transformation',
      description: 'Brief description of case study 3.',
      image: 'r3.webp',
    },
    {
      id: 4,
      category: 'Category 4',
      title: 'Driving ESG results with data & AI',
      description: 'Brief description of case study 4.',
      image: 'r4.png',
    },
    {
      id: 5,
      category: 'Category 5',
      title: 'Top 5 tips to stop derailing your Data & AI strategy',
      description: 'Brief description of case study 5.',
      image: 'r5.png',
    },
    {
      id: 6,
      category: 'Category 6',
      title: 'Frost & Sullivan whitepaper - Target key goals and challenges',
      description: 'Brief description of case study 6.',
      image: 'r6.png',
    },
  ];

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Resources</h2>
        <div className="flex flex-wrap mx-4">
          {caseStudies.map((study) => (
            <div key={study.id} className="w-1/3 px-5 mb-8">
              <Resource {...study} />
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        /* Parallax effect */
        .parallax-bg {
          background-attachment: fixed;
          background-size: cover;
          background-position: center;
          transition: background-position 0.1s ease-in-out;
        }

        /* Hover effect */
        .transform {
          transform: scale(1);
        }

        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default CaseStudiesGrid;
