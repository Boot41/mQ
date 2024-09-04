import { useState, useEffect } from "react";

const useIntersectionObserver = (ref, options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasBeenInViewFor2Seconds, setHasBeenInViewFor2Seconds] =
    useState(false);

  useEffect(() => {
    let timer;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        timer = setTimeout(() => setHasBeenInViewFor2Seconds(true), 2000);
      } else {
        setIsIntersecting(false);
        setHasBeenInViewFor2Seconds(false);
        if (timer) clearTimeout(timer);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      if (timer) clearTimeout(timer);
    };
  }, [ref, options]);

  return { isIntersecting, hasBeenInViewFor2Seconds };
};

export default useIntersectionObserver;
