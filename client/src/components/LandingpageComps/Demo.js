import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';

const sections = [
  {
    id: 1,
    title: 'Recruit 41',
    description: "We're the world's largest marketplace of quality developers for early-stage startups. Need a hand with development? Grab one of ours!",
    splineUrl: 'https://my.spline.design/particles-4f046f32016dc78cfa95d216066d4be0/', // Example URL
    number: '01',
    zIndex: 'z-[2]',
  },
  {
    id: 2,
    title: 'Podcast',
    description: "We're the world's largest marketplace of quality developers for early-stage startups. Need a hand with development? Grab one of ours!",
    splineUrl: 'https://my.spline.design/particles-4f046f32016dc78cfa95d216066d4be0/', // Example URL
    number: '02',
    zIndex: 'z-[1]',
  },
  {
    id: 3,
    title: 'Automail',
    description: "We're the world's largest marketplace of quality developers for early-stage startups. Need a hand with development? Grab one of ours!",
    splineUrl: 'https://my.spline.design/particles-4f046f32016dc78cfa95d216066d4be0/', // Example URL
    number: '03',
    zIndex: 'z-0',
  },
];

const Demo = () => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold text-gray-700">Explore Our Latest Demos Now</h2>
      </div>

      {/* Cards Section */}
      <div className="relative z-0 space-y-14">
        {sections.map((section, index) => (
          <ScrollStackCard
            key={section.id}
            section={section}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

const ScrollStackCard = ({ section, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '0px 0px -30% 0px', threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section ref={ref} className="relative">
      <div
        className={`relative ${section.zIndex} bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden transition-transform duration-700 ease-in-out ${
          isVisible
            ? 'translate-y-0 opacity-100 animate-slide-in'
            : 'translate-y-[100%] opacity-0'
        }`}
        style={{ zIndex: sections.length - index }}
      >
        <div className="md:flex justify-between items-center">
          <div className="shrink-0 px-12 py-14 max-md:pb-0 md:pr-0">
            <div className="md:max-w-md">
              <div className="font-nycd text-xl text-slate-300 mb-2 relative inline-flex justify-center items-end">
                Demos
                <svg
                  className="absolute fill-slate-300 opacity-40 -z-10"
                  xmlns="http://www.w3.org/2000/svg"
                  width="88"
                  height="4"
                  viewBox="0 0 88 4"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                >
                  <path d="M87.343 2.344S60.996 3.662 44.027 3.937C27.057 4.177.686 3.655.686 3.655c-.913-.032-.907-1.923-.028-1.999 0 0 26.346-1.32 43.315-1.593 16.97-.24 43.342.282 43.342.282.904.184.913 1.86.028 1.999" />
                </svg>
              </div>
              <h1 className="text-4xl font-extrabold text-slate-50 mb-4">
                {section.title}
              </h1>
              <p className="text-slate-400 mb-6">{section.description}</p>
              <Link
                className="text-sm font-medium inline-flex items-center justify-center px-3 py-1.5 border border-slate-700 rounded-lg tracking-normal transition text-slate-300 hover:text-slate-50 group"
                to="/visualizingai"
              >
                Try Now
                <span
                  className="text-slate-600 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1"
                >
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="absolute left-12 bottom-0 h-14 flex items-center text-xs font-medium text-slate-400"
        >
          {section.number}
        </div>
      </div>
    </section>
  );
};

export default Demo;
