import React, { useState, useEffect, useRef } from 'react';

const CompStats = () => {
  const stats = [
    { value: 130, label: 'Startups Financed' },
    { value: 20, label: 'Services Offered' },
    { value: 32, label: 'Team Members' },
    { value: 130, label: 'Investment Volume (M$)' },
    { value: 15, label: 'Countries Reached' },
  ];

  return (
    <section 
      className="relative bg-cover bg-center py-20" 
      style={{ backgroundImage: 'url("r3.webp")' }}
    >
      <div className="absolute inset-0 bg-white opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-7 sm:px-6 lg:px-9">
        <div className="flex overflow-x-auto space-x-6 pb-5">
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ stat }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 100;
    const stepValue = stat.value / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCount(Math.round(stepValue * currentStep));
      if (currentStep === steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, stat.value]);

  return (
    <div 
      ref={ref} 
      className="bg-transparent border-2 border-white rounded-lg p-6 flex flex-col items-center text-center w-80 h-40"
    >
      <div className="auto-mx text-4xl font-bold text-white mb-2">{count}</div>
      <div className="text-white text-lg font-medium">
        {stat.label}
      </div>
    </div>
  );
};

export default CompStats;
