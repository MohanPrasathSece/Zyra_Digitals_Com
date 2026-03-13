import { useState } from "react";
import type React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Scroll to top if clicking the same route; also close mobile menu
  const handleNavClick = (to: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === to) {
      e.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // WhatsApp CTA
  const WHATSAPP_NUMBER = "9025421149"; // digits only; include country code if needed
  const WHATSAPP_MESSAGE = "Hi, I'm interested in working with Zyra Digitals. Please share more details.";
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-[4.75rem] md:h-[5.5rem]">
          {/* Logo */}
          <Link to="/" onClick={handleNavClick('/')} className="flex items-center hover-scale my-2 md:my-3" aria-label="Zyra Digitals Home">
            <img
              src="/zyra_digitals_grey_bg-removebg-preview.png"
              alt="Zyra Digitals - Best Web Design Agency Coimbatore"
              className="h-10 md:h-[4.5rem] w-auto object-contain shrink-0"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={handleNavClick(link.to)}
                className={`font-body text-base font-medium transition-colors ${isActive(link.to)
                  ? "text-gold"
                  : "text-foreground hover:text-gold"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="gold" size="lg" asChild>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">Work with us</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-gold transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen ? 'true' : 'false'}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={handleNavClick(link.to)}
                  className={`font-body text-base font-medium transition-colors ${isActive(link.to)
                    ? "text-gold"
                    : "text-foreground hover:text-gold"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button variant="gold" size="lg" asChild className="w-fit">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
                  Work with us
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

