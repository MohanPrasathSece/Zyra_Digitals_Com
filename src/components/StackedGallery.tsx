import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface CardProps {
  image: string;
  index: number;
  total: number;
  progress: any;
}

const Card: React.FC<CardProps> = ({ image, index, total, progress }) => {
  const start = index / total;
  const end = (index + 1) / total;
  
  // Sticky stacking logic
  const scale = useTransform(progress, [start, end], [1, 1 - (total - index) * 0.05]);
  const y = useTransform(progress, [start, end], [0, -40 * (total - index)]);
  const opacity = useTransform(progress, [start, start + 0.05], [0, 1]);
  
  return (
    <motion.div
      style={{
        scale,
        y,
        opacity,
        zIndex: index,
        top: `calc(15vh + ${index * 20}px)`,
      }}
      className="sticky w-full max-w-[500px] mx-auto group"
    >
      <img 
        src={image} 
        alt={`Poster ${index + 1}`} 
        className="w-full flex-shrink-0 transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none shadow-2xl rounded-xl"
      />
    </motion.div>
  );
};

export const StackedGallery: React.FC<{ items: string[] }> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative h-[700vh] bg-white pb-[20vh]">
      {items.map((item, index) => (
        <Card 
          key={index} 
          image={item} 
          index={index} 
          total={items.length} 
          progress={scrollYProgress} 
        />
      ))}
    </div>
  );
};
