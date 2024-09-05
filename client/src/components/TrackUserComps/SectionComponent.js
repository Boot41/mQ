import React, { useRef, useEffect } from "react";
import useIntersectionObserver from "./useIntersectionObserver";
import BlobComponent from "../BlobComponents/BlobComponent";

const SectionComponent = ({ id, children }) => {
  const ref = useRef(null);
  const { isIntersecting, hasBeenInViewFor2Seconds } = useIntersectionObserver(
    ref,
    { threshold: 0.1 }
  );

  const blobRef = useRef(null);

  useEffect(() => {
    if (hasBeenInViewFor2Seconds) {
      console.log(`Section ${id} has been in view for more than 2 seconds.`);
      if (blobRef.current) {
        // Call a method or handle data in BlobComponent
        blobRef.current.handleIdChange(id);
      }
    }
  }, [hasBeenInViewFor2Seconds, id]);

  return (
    <div ref={ref} id={id}>
      {children}
      {/* BlobComponent is not rendered, just using the ref */}
      <BlobComponent ref={blobRef} />
    </div>
  );
};

export default SectionComponent;
