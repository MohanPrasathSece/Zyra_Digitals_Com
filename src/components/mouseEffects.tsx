'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import gsap from 'gsap';
import { createPortal } from 'react-dom';

export interface BlobCursorProps {
  blobType?: 'circle' | 'square';
  fillColor?: string;
  trailCount?: number;
  sizes?: number[];
  innerSizes?: number[];
  innerColor?: string;
  opacities?: number[];
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  filterId?: string;
  filterStdDeviation?: number;
  filterColorMatrixValues?: string;
  useFilter?: boolean;
  fastDuration?: number;
  slowDuration?: number;
  fastEase?: string;
  slowEase?: string;
  zIndex?: number;
}

export function BlobCursor({
  blobType = 'circle',
  fillColor = '#5227FF',
  trailCount = 3,
  sizes = [60, 125, 75],
  innerSizes = [20, 35, 25],
  innerColor = 'rgba(255,255,255,0.8)',
  opacities = [0.6, 0.6, 0.6],
  shadowColor = 'rgba(0,0,0,0.75)',
  shadowBlur = 5,
  shadowOffsetX = 10,
  shadowOffsetY = 10,
  filterId = 'blob',
  filterStdDeviation = 30,
  filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10',
  useFilter = true,
  fastDuration = 0.1,
  slowDuration = 0.5,
  fastEase = 'power3.out',
  slowEase = 'power1.out',
  zIndex = 100
}: BlobCursorProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOverHero, setIsOverHero] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Detect if mouse is over hero section (only on desktop)
      const heroSection = document.querySelector('section[class*="hero"], [class*="hero"], div[class*="hero"]');
      let isOver = false;
      if (heroSection && !isMobile) {
        const rect = heroSection.getBoundingClientRect();
        isOver = e.clientY >= rect.top && e.clientY <= rect.bottom && 
                e.clientX >= rect.left && e.clientX <= rect.right;
      }
      setIsOverHero(isOver);

      // Don't move blobs if over hero section (desktop only)
      if (isOver) return;

      const x = e.clientX;
      const y = e.clientY;

      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        gsap.to(el, {
          x: x,
          y: y,
          duration: isLead ? fastDuration : slowDuration,
          ease: isLead ? fastEase : slowEase
        });
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;

      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        gsap.to(el, {
          x: x,
          y: y,
          duration: isLead ? fastDuration : slowDuration,
          ease: isLead ? fastEase : slowEase
        });
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [fastDuration, slowDuration, fastEase, slowEase, isMobile]);

  // Don't render on mobile or when over hero section (desktop only)
  if (isMobile || isOverHero) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none"
      style={{ zIndex }}
    >
      {useFilter && (
        <svg className="absolute w-0 h-0">
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />
            <feColorMatrix in="blur" values={filterColorMatrixValues} />
          </filter>
        </svg>
      )}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden select-none cursor-default"
        style={{ filter: useFilter ? `url(#${filterId})` : undefined }}
      >
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={el => {
              blobsRef.current[i] = el;
            }}
            className="absolute will-change-transform transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: sizes[i],
              height: sizes[i],
              borderRadius: blobType === 'circle' ? '50%' : '0',
              backgroundColor: fillColor,
              opacity: opacities[i],
              boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 0 ${shadowColor}`
            }}
          >
            <div
              className="absolute"
              style={{
                width: innerSizes[i],
                height: innerSizes[i],
                top: (sizes[i] - innerSizes[i]) / 2,
                left: (sizes[i] - innerSizes[i]) / 2,
                backgroundColor: innerColor,
                borderRadius: blobType === 'circle' ? '50%' : '0'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// MouseEffects component to be used across all pages
const MouseEffects = () => {
  return createPortal(
    <BlobCursor
      blobType="circle"
      fillColor="#8e7c0b"
      trailCount={3}
      sizes={[40, 80, 60]}
      innerSizes={[15, 25, 20]}
      innerColor="rgba(255,255,255,0.8)"
      opacities={[0.6, 0.6, 0.6]}
      shadowColor="rgba(0,0,0,0.75)"
      shadowBlur={5}
      shadowOffsetX={10}
      shadowOffsetY={10}
      filterId="blob"
      filterStdDeviation={30}
      filterColorMatrixValues="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10"
      useFilter={true}
      fastDuration={0.1}
      slowDuration={0.5}
      fastEase="power3.out"
      slowEase="power1.out"
      zIndex={99999}
    />,
    document.body
  );
};

export default MouseEffects;
