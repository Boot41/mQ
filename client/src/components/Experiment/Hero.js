import React from 'react';

const VisualizeAIButton = () => {
  return (
    <button className="mx-auto flex items-center justify-between border border-white text-white rounded-full px-6 py-2  hover:bg-white hover:text-black group">
      <span className="mr-5">Visualize AI</span>
      <span className="flex items-center justify-center w-6 h-6 border border-white rounded-full group-hover:border-black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-4 transform rotate-30 group-hover:stroke-black"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </button>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Background SVG */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: '#4299e1', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#1a202c', stopOpacity: 1 }} />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad1)" />
        <circle cx="10%" cy="90%" r="30%" fill="#2c5282" fillOpacity="0.2" />
        <circle cx="90%" cy="10%" r="30%" fill="#2c5282" fillOpacity="0.2" />
        <circle cx="50%" cy="50%" r="40%" stroke="#4299e1" strokeWidth="0.5" fill="none" />
        <circle cx="50%" cy="50%" r="35%" stroke="#4299e1" strokeWidth="0.3" fill="none" />
        <circle cx="50%" cy="50%" r="30%" stroke="#4299e1" strokeWidth="0.1" fill="none" />
      </svg>

      {/* Main Hero Content */}
      <main className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">Supercharge Your Business</h1>
          <p className="text-xl mb-8 text-gray-300">
            Discover AI-driven insights to navigate the complex world of cryptocurrency, crypto trading, NFTs, and market analysis.
          </p>
          {/* Replace the "Get Started" button with the Visualize AI button */}
          <VisualizeAIButton />
        </div>
      </main>
    </section>
  );
};

export default Hero;
