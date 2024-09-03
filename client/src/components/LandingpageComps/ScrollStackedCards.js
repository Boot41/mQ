import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css'; // Ensure this imports your global styles

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
        <div className="flex flex-col justify-center items-center p-12">
          <div className="text-center md:max-w-md">
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
            <div className="mt-6">
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
        <div className="absolute left-12 bottom-0 h-14 flex items-center text-xs font-medium text-slate-400">
          {section.number}
        </div>
      </div>
    </section>
  );
};

export default ScrollStackCard;
