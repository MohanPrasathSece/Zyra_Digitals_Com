import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface PerspectiveGalleryProps {
  items: string[];
}

export const PerspectiveGallery: React.FC<PerspectiveGalleryProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-white">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {items.map((item, index) => {
          // Calculate start and end points for each card's animation
          const start = index / items.length;
          const end = (index + 1) / items.length;
          
          // Perspective and Transform effects
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const y = useTransform(smoothProgress, [start, end], [1000, 0]);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const scale = useTransform(smoothProgress, [start, end], [0.8, 1]);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const opacity = useTransform(smoothProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const rotateX = useTransform(smoothProgress, [start, end], [45, 0]);
          
          return (
            <motion.div
              key={index}
              style={{
                y,
                scale,
                opacity,
                rotateX,
                perspective: 1000,
                zIndex: items.length - index
              }}
              className="absolute w-[80%] max-w-[500px] aspect-[3/4] rounded-2xl shadow-2xl overflow-hidden border border-border/50 bg-white"
            >
              <img 
                src={item} 
                alt={`Poster ${index + 1}`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <div className="text-white">
                   <p className="text-gold font-bold mb-2">Design 0{index + 1}</p>
                   <h3 className="text-2xl font-heading font-bold">Premium Poster Artwork</h3>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Dynamic Progress Indicator */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
          {items.map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-8 rounded-full bg-gold/20 overflow-hidden"
            >
              <motion.div
                className="w-full h-full bg-gold origin-top"
                style={{
                  scaleY: useTransform(
                    smoothProgress,
                    [i / items.length, (i + 1) / items.length],
                    [0, 1]
                  )
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
