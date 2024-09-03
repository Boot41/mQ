import React, { useEffect, useRef } from "react";

const ScrollAnimation = ({ children }) => {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength + " " + pathLength;
    path.style.strokeDashoffset = pathLength;

    const handleScroll = () => {
      const scrollPercentage =
        (document.documentElement.scrollTop + document.body.scrollTop) /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight);
      const drawLength = pathLength * scrollPercentage;
      path.style.strokeDashoffset = pathLength - drawLength;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 right-0 w-[20vw] h-full pointer-events-none z-50">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 333 2097"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 right-0"
      >
        <path
          ref={pathRef}
          d="M5 0.5V475H275V312H328V661.5H275V537H5V724H328V777H165.5V839.5L323.5 836.5V876.5H5V904.5H43.5V978.5H287V911H323.5V1068H287V1013H43.5V1068H5V1122H328V1176H5V2096.5"
          stroke="url(#paint0_linear_22_5)"
          strokeWidth="9"
        />
        <defs>
          <linearGradient
            id="paint0_linear_22_5"
            x1="166.5"
            y1="0.5"
            x2="166.5"
            y2="2097"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#D97C7C" />
            <stop offset="0.72" stopColor="#CE0505" />
            <stop offset="1" stopColor="#8A0303" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ScrollAnimation;
