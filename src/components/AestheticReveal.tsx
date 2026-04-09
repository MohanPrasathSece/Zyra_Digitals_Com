import React from 'react';
import { motion } from 'framer-motion';

export const AestheticReveal = () => {
  return (
    <div className="fixed inset-0 z-[1000] pointer-events-none overflow-hidden">
      {/* Three staggered layers of panels with curved reveal */}
      <motion.div
        initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 100% 0% round 0% 0% 50% 50%)" }}
        transition={{ duration: 1.4, ease: [0.85, 0, 0.15, 1], delay: 0.1 }}
        className="absolute inset-0 bg-black z-[1003]"
      />
      
      <motion.div
        initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 100% 0% round 0% 0% 50% 50%)" }}
        transition={{ duration: 1.4, ease: [0.85, 0, 0.15, 1], delay: 0.2 }}
        className="absolute inset-x-0 inset-y-0 bg-gold z-[1002]"
      />
      
      <motion.div
        initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 100% 0% round 0% 0% 50% 50%)" }}
        transition={{ duration: 1.4, ease: [0.85, 0, 0.15, 1], delay: 0.3 }}
        className="absolute inset-0 bg-[#1a1a1a] z-[1001]"
      />
    </div>
  );
};
