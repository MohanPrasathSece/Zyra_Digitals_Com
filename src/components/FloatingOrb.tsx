import { useEffect, useRef, useState } from "react";

export const FloatingOrb = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [eye, setEye] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width; // -0.5..0.5
      const dy = (e.clientY - cy) / rect.height; // -0.5..0.5
      const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));

      setTilt({ x: clamp(-dy * 8, 8), y: clamp(dx * 8, 8) });
      setEye({ x: clamp(dx * 6, 6), y: clamp(dy * 6, 6) });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none select-none">
      <div
        className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-xl overflow-visible transform-gpu animate-float-slow"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        {/* sphere base */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-zinc-300" />
        {/* specular highlights */}
        <div className="absolute -top-1 -left-1 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/70 blur-[6px]" />
        <div className="absolute top-4 left-6 w-6 h-3 sm:w-7 sm:h-3.5 rounded-full bg-white/60 blur-[3px] rotate-[-20deg]" />
        {/* inner shading */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-black/10" />

        {/* eyes */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 sm:gap-5">
          {/* left eye + shadow */}
          <div className="relative" style={{ transform: `translate(${eye.x}px, ${eye.y}px)` }}>
            <div className="w-3 sm:w-3.5 h-7 sm:h-8 rounded-full bg-black/90 animate-blink-5s" />
            {/* eye shadow */}
            <div className="absolute left-1/2 top-full -translate-x-1/2 mt-1.5 w-6 sm:w-7 h-2 rounded-full bg-black/10 blur-[6px] opacity-60" />
          </div>
          {/* right eye + shadow */}
          <div className="relative" style={{ transform: `translate(${eye.x}px, ${eye.y}px)` }}>
            <div className="w-3 sm:w-3.5 h-7 sm:h-8 rounded-full bg-black/90 animate-blink-5s" />
            <div className="absolute left-1/2 top-full -translate-x-1/2 mt-1.5 w-6 sm:w-7 h-2 rounded-full bg-black/10 blur-[6px] opacity-60" />
          </div>
        </div>

        {/* subtle rim light removed for a cleaner, flatter edge like the reference */}
      </div>
    </div>
  );
};
