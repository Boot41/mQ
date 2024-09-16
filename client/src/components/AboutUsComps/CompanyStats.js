import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';

const LazyLoad = lazy(() => import('react-lazyload'));

// Inline critical CSS
const criticalStyles = `
  .stat-section {
    position: relative;
    padding: 5rem 0;
    background-image: url("r3-compressed.webp");
    background-size: cover;
    background-position: center;
  }
  .stat-overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.2);
  }
  .stat-container {
    position: relative;
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1rem;
  }
  .stat-list {
    display: flex;
    overflow-x: auto;
    gap: 1.5rem;
    padding-bottom: 1.25rem;
  }
  .stat-item {
    flex: 0 0 auto;
    background-color: transparent;
    border: 2px solid white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 20rem;
    height: 10rem;
  }
  .stat-value {
    font-size: 2.25rem;
    font-weight: bold;
    color: white;
    margin-bottom: 0.5rem;
  }
  .stat-label {
    color: white;
    font-size: 1.125rem;
    font-weight: 500;
  }
`;

const CompStats = () => {
  const stats = [
    { value: 130, label: 'Startups Financed' },
    { value: 20, label: 'Services Offered' },
    { value: 32, label: 'Team Members' },
    { value: 130, label: 'Investment Volume (M$)' },
    { value: 15, label: 'Countries Reached' },
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyLoad height={200} once>
        <style>{criticalStyles}</style>
        <section className="stat-section">
          <div className="stat-overlay"></div>
          <div className="stat-container">
            <div className="stat-list">
              {stats.map((stat, index) => (
                <StatItem key={index} stat={stat} />
              ))}
            </div>
          </div>
        </section>
      </LazyLoad>
    </Suspense>
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
    <div ref={ref} className="stat-item">
      <div className="stat-value">{count}</div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
};

export default CompStats;
