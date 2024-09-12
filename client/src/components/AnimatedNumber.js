import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

export default function AILoader() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
          }, 1000); // Delay to show 100% briefly
          return 100;
        }
        return prevCount + 1;
      });
    }, 50); // Adjust this value to change the speed of the counter

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loading) {
      // Redirect to the LandingPage after loading is complete
      navigate('/');
    }
  }, [loading, navigate]);

  if (!loading) {
    return null; // Return null while redirecting
  }

  return (
    <div className="flex items-center justify-center w-full h-screen bg-black overflow-hidden">
      <div className="relative">
        <svg
          className="w-64 h-64 animate-pulse"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="haloGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#0000FF" stopOpacity="0.3" />
              <stop offset="70%" stopColor="#FF69B4" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FF69B4" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="40" fill="url(#haloGradient)" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-white">{count}</span>
        </div>
      </div>
      <style jsx>{`
        @keyframes glow {
          0% { filter: drop-shadow(0 0 5px #FF69B4); }
          50% { filter: drop-shadow(0 0 20px #FF69B4); }
          100% { filter: drop-shadow(0 0 5px #FF69B4); }
        }
        svg {
          animation: glow 3s infinite;
        }
      `}</style>
    </div>
  );
}
