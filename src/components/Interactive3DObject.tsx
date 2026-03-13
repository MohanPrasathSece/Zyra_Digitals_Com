import { useRef, useEffect, useState } from 'react';

export const Interactive3DObject = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const x = (event.clientX - centerX) / (rect.width / 2);
        const y = (event.clientY - centerY) / (rect.height / 2);
        
        setMousePosition({ x: x * 15, y: -y * 15 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-96 flex items-center justify-center perspective-1000">
      <div 
        className="relative w-64 h-64 transform-gpu transition-transform duration-300 ease-out preserve-3d"
        style={{
          transform: `rotateY(${mousePosition.x}deg) rotateX(${mousePosition.y}deg)`,
        }}
      >
        {/* Main sphere */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 shadow-2xl animate-spin-slow">
          <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-white/80 to-gray-200/60 shadow-inner"></div>
        </div>

        {/* Golden frame elements */}
        <div className="absolute top-8 left-1/2 w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 transform -translate-x-1/2 shadow-lg"></div>
        <div className="absolute top-1/2 right-8 w-1 h-32 bg-gradient-to-b from-yellow-400 to-yellow-600 transform -translate-y-1/2 shadow-lg"></div>
        
        {/* Corner frame */}
        <div className="absolute top-6 right-6 w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg"></div>
        <div className="absolute top-6 right-6 w-1 h-16 bg-gradient-to-b from-yellow-400 to-yellow-600 shadow-lg"></div>

        {/* Blue diagonal element */}
        <div className="absolute top-4 left-4 w-20 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transform rotate-45 shadow-lg"></div>

        {/* Small indicator boxes */}
        <div className="absolute bottom-12 left-20 w-4 h-8 bg-gradient-to-b from-green-400 to-green-600 shadow-lg transform translate-z-8"></div>
        <div className="absolute bottom-12 right-20 w-4 h-8 bg-gradient-to-b from-gray-700 to-gray-900 shadow-lg transform translate-z-8"></div>

        {/* Red bottom element */}
        <div className="absolute bottom-4 left-1/2 w-1 h-12 bg-gradient-to-b from-red-400 to-red-600 transform -translate-x-1/2 shadow-lg"></div>

        {/* Additional geometric elements for depth */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gold rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse shadow-lg"></div>
        
        {/* Floating elements */}
        <div className="absolute top-16 left-16 w-3 h-3 bg-blue-500 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-16 right-16 w-2 h-2 bg-yellow-500 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};
