import React from 'react';
import { motion } from 'framer-motion';

export const InterestingLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="relative w-24 h-24">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-dashed border-gold/30 rounded-full"
        />
        
        {/* Middle Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border-b-2 border-gold rounded-full"
        />
        
        {/* Inner Core */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-8 bg-gold rounded-full shadow-[0_0_20px_rgba(197,160,89,0.5)]"
        />
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 font-heading text-sm uppercase tracking-[0.3em] text-gold font-bold"
      >
        Loading Visuals
      </motion.p>
    </div>
  );
};
