// SectionComponent.js
import React, { useRef, useEffect } from "react";
import useIntersectionObserver from "./useIntersectionObserver";
import { useSection } from "./SectionContext";

const SectionComponent = ({ id, children }) => {
  const ref = useRef(null);
  const { setCurrentSection } = useSection();
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

  useEffect(() => {
    if (isVisible) {
      setCurrentSection(id);
    }
  }, [isVisible, id, setCurrentSection]);

  return (
    <div ref={ref} id={id}>
      {children}
    </div>
  );
};

export default SectionComponent;
