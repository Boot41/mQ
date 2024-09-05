import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CompStats = () => {
  const stats = [
    { value: 130, label: 'Financed More Startups' },
    { value: 20, label: 'Services Offered' },
    { value: 32, label: 'Team Members' },
    { value: 130, label: 'Volume Of Investment' },
  ];

  return (
    <div className="w-full bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          About Venture Capital
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          Capital Group is a distinguished venture capital company that
          specializes in providing early-stage and growth-stage funding to
          transformative startups across various sectors. With a proven track
          record of successful investments, we are committed to fueling the
          growth of innovative ventures that bring disruptive solutions to the
          market.
        </p>
        <div className="flex justify-between items-center">
          {stats.map((stat, index) => (
            <StatCircle key={index} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCircle = ({ stat }) => {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = stat.value;
    if (start === end) return;

    const incrementTime = (2 / end) * 1000;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [inView, stat.value]);

  const size = 200;
  const strokeWidth = 8; // Thinner stroke
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const maxValue = 150;
  const progressOffset = circumference * (1 - stat.value / maxValue);
  const progressAngle = 2 * Math.PI * (stat.value / maxValue);

  return (
    <div ref={ref} className="text-center">
      <div className="relative inline-block">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Animated progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(251, 146, 60, 1)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: progressOffset }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          {/* Knob at the end of progress */}
          <motion.circle
            cx={size / 2 + radius * Math.sin(progressAngle)}
            cy={size / 2 - radius * Math.cos(progressAngle)}
            r={strokeWidth / 2 + 2}
            fill="rgba(251, 146, 60, 1)"
            initial={{ scale: 0 }}
            animate={{ scale: 1, cx: size / 2 + radius * Math.sin(progressAngle), cy: size / 2 - radius * Math.cos(progressAngle) }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <span className="text-black font-bold text-4xl">{count}</span>
          <span className="text-gray-800 text-sm mt-2 text-center">{stat.label}</span>
        </div>
      </div>
    </div>
  );
};

export default CompStats;
