import React, { useRef, useEffect } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

const SectionComponent = ({ id, children }) => {
  const ref = useRef(null);
  const { isIntersecting, hasBeenInViewFor2Seconds } = useIntersectionObserver(
    ref,
    {
      threshold: 0.1, // Adjust as needed
    }
  );

  useEffect(() => {
    if (hasBeenInViewFor2Seconds) {
      console.log(`Section ${id} has been in view for more than 2 seconds.`);
      // You can dispatch an action or update context here
    }
  }, [hasBeenInViewFor2Seconds, id]);

  return (
    <div ref={ref} id={id}>
      {children}
    </div>
  );
};

export default SectionComponent;
