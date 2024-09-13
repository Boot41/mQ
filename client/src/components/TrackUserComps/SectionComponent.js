import React, { useRef, useEffect } from "react";
import useIntersectionObserver from "./useIntersectionObserver";
import { useSection } from "./SectionContext";

const SectionComponent = ({ id, children }) => {
  const ref = useRef(null);
  const { isIntersecting, hasBeenInViewFor2Seconds } = useIntersectionObserver(
    ref,
    { threshold: 0.1 }
  );

  const { setCurrentSection } = useSection();

  useEffect(() => {
    if (hasBeenInViewFor2Seconds) {
      // console.log(`Section ${id} has been in view for more than 2 seconds.`);
      setCurrentSection(id);
    }
  }, [hasBeenInViewFor2Seconds, id, setCurrentSection]);

  return (
    <div ref={ref} id={id}>
      {children}
    </div>
  );
};

export default SectionComponent;
