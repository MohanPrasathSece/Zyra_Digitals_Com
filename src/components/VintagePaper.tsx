import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VintagePaperProps {
  children: React.ReactNode;
  onComplete?: () => void;
}

export const VintagePaper = ({ children, onComplete }: VintagePaperProps) => {
  const [isUnfolding, setIsUnfolding] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowContent(true);
    }, 800);

    const timer2 = setTimeout(() => {
      setIsUnfolding(false);
      onComplete?.();
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black pointer-events-none">
      {/* Vintage Paper Unfolding Animation */}
      <AnimatePresence>
        {isUnfolding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Paper Container */}
            <motion.div
              initial={{ 
                scale: 0.1, 
                rotateY: -180,
                rotateX: 45,
                opacity: 0
              }}
              animate={{ 
                scale: 1,
                rotateY: 0,
                rotateX: 0,
                opacity: 1
              }}
              transition={{ 
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="relative w-[90%] max-w-4xl h-[80vh] max-h-[800px]"
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Main Paper Sheet with Damaged Edges */}
              <motion.div
                initial={{ clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" }}
                animate={{ 
                  clipPath: [
                    "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
                    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                  ]
                }}
                transition={{ 
                  duration: 1.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="absolute inset-0 bg-gradient-to-br from-amber-950 via-amber-900 to-amber-950"
                style={{
                  boxShadow: `
                    inset 0 0 100px rgba(0,0,0,0.3),
                    inset 0 0 50px rgba(139,69,19,0.2),
                    0 0 150px rgba(0,0,0,0.8),
                    0 0 50px rgba(0,0,0,0.5)
                  `,
                  filter: `
                    contrast(1.1) 
                    brightness(0.9) 
                    sepia(0.3)
                  `
                }}
              >
                {/* Damaged/Torn Edges Effect */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 600"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <filter id="roughPaper">
                      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                      <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="1">
                        <feDistantLight azimuth="45" elevation="60" />
                      </feDiffuseLighting>
                    </filter>
                    <filter id="edgeDamage">
                      <feTurbulence type="turbulence" baseFrequency="0.08" numOctaves="2" result="turbulence" />
                      <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="8" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                  </defs>
                  
                  {/* Paper Texture */}
                  <rect width="400" height="600" fill="#8B4513" opacity="0.1" filter="url(#roughPaper)" />
                  
                  {/* Damaged Edges */}
                  <path
                    d="M 5,5 Q 15,8 25,3 T 45,7 Q 55,12 65,5 T 85,9 Q 95,15 105,8 T 125,12 Q 135,18 145,11 T 165,15 Q 175,20 185,13 T 205,17 Q 215,22 225,15 T 245,19 Q 255,24 265,17 T 285,21 Q 295,26 305,19 T 325,23 Q 335,28 345,21 T 365,25 Q 375,30 385,23 T 395,27 L 395,395 Q 385,388 375,395 T 355,391 Q 345,386 335,393 T 315,389 Q 305,384 295,391 T 275,387 Q 265,382 255,389 T 235,385 Q 225,380 215,387 T 195,383 Q 185,378 175,385 T 155,381 Q 145,376 135,383 T 115,379 Q 105,374 95,381 T 75,377 Q 65,372 55,379 T 35,375 Q 25,370 15,377 T 5,373 Z"
                    fill="none"
                    stroke="#000"
                    strokeWidth="2"
                    opacity="0.3"
                    filter="url(#edgeDamage)"
                  />
                </svg>

                {/* Cross-way Fold Lines */}
                <div className="absolute inset-0">
                  {/* Vertical Center Fold */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-black/20 transform -translate-x-1/2" />
                  
                  {/* Horizontal Center Fold */}
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-black/20 transform -translate-y-1/2" />
                  
                  {/* Diagonal Folds */}
                  <div 
                    className="absolute top-0 left-0 w-full h-0.5 bg-black/10 transform rotate-45 origin-center"
                    style={{
                      top: '50%',
                      left: '50%',
                      width: '141%',
                      transform: 'translate(-50%, -50%) rotate(45deg)'
                    }}
                  />
                  <div 
                    className="absolute top-0 left-0 w-full h-0.5 bg-black/10 transform -rotate-45 origin-center"
                    style={{
                      top: '50%',
                      left: '50%',
                      width: '141%',
                      transform: 'translate(-50%, -50%) rotate(-45deg)'
                    }}
                  />
                </div>

                {/* Aging Spots and Stains */}
                <div className="absolute inset-0 opacity-30">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full bg-amber-950"
                      style={{
                        width: `${Math.random() * 60 + 20}px`,
                        height: `${Math.random() * 60 + 20}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.3 + 0.1,
                        filter: 'blur(8px)'
                      }}
                    />
                  ))}
                </div>

                {/* Content Appears After Unfolding */}
                <AnimatePresence>
                  {showContent && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center p-12"
                    >
                      <div className="text-center text-amber-100">
                        <motion.h1
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
                          style={{
                            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                            fontFamily: 'serif'
                          }}
                        >
                          Zyra Digitals
                        </motion.h1>
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.7 }}
                          className="font-serif text-xl md:text-2xl lg:text-3xl mb-8 italic"
                          style={{
                            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                            fontFamily: 'serif'
                          }}
                        >
                          Crafted with Ancient Wisdom
                        </motion.p>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.9 }}
                          className="text-amber-200/80 max-w-2xl mx-auto"
                        >
                          <p className="font-serif text-lg leading-relaxed">
                            We build digital masterpieces that stand the test of time, 
                            combining modern technology with timeless craftsmanship.
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Paper Shadow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="absolute inset-0 bg-black rounded-lg transform translate-y-8"
                style={{
                  filter: 'blur(20px)',
                  zIndex: -1
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
