import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export const LoadingScreen = ({ onComplete }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 5,
      onComplete,
    });

    return controls.stop;
  }, [count, onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
      <motion.div className="text-white text-4xl font-bold">
        {rounded}
      </motion.div>
    </div>
  );
};
