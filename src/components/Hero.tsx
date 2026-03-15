import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FloatingOrb } from "@/components/FloatingOrb";
import { useState, useEffect, useRef } from "react";
import { Interactive3DHeroBackground } from "@/components/Interactive3DHeroBackground";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // Make hero visible immediately since it's the first section
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-32 md:pb-24">
        <Interactive3DHeroBackground />

      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 bg-background" />

      {/* Content */}
      <div
        ref={heroRef}
        className={`relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight">
          We Build <span className="text-metallic-gold">Brands</span>
          <span className="sr-only"> - Best Website Design & Web Development Agency</span>
        </h1>
        <p className="font-heading text-2xl sm:text-4xl lg:text-5xl text-foreground/80 mb-8 italic">
          That People Remember
        </p>
        <p className="font-secondary text-sm sm:text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
          We build high-performance websites, powerful brands, and growth systems. Website design, SEO, hosting, and strategic brand creation that works together.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="gold" size="lg" asChild className="h-16 px-10 text-sm sm:text-base [&_svg]:size-5">
            <Link to="/contact" className="flex items-center gap-2">
              Build Your Brand
              <ArrowRight size={16} />
            </Link>
          </Button>
          <Button variant="ghost-gold" size="lg" asChild className="h-16 px-10 text-sm sm:text-base">
            <Link to="/portfolio">Explore Our Work</Link>
          </Button>
        </div>
      </div>

      </section>
  );
};

