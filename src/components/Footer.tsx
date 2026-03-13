import { Link } from "react-router-dom";
import { Instagram, Linkedin, Send, MessageCircle, Facebook, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: "Footer Lead",
          email: email,
          message: "Interested in brand development or website design services (Sent via Footer)",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage("Thank you! We'll contact you soon.");
        setEmail("");
      } else {
        setSubmitMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="mt-8 mb-0 flex-shrink-0" role="contentinfo">
      <div className="w-full px-[15px] pb-0">
        {/* Mobile Footer */}
        <div
          ref={footerRef}
          className={`md:hidden bg-primary text-primary-foreground px-6 py-12 rounded-t-3xl rounded-b-none mb-0 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <div className="text-center space-y-6">
            <img src="/images/whitelogo.png" alt="Zyra Digitals logo" className="w-20 h-12 object-contain mx-auto" />

            <div className="space-y-3">
              <p className="text-lg text-primary-foreground/90">Need brand development or website design?</p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 pr-10 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:border-gold/50 focus:bg-primary-foreground/20 transition-all"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-foreground/60 hover:text-gold transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? <ArrowRight size={16} /> : <ArrowRight size={16} />}
                  </button>
                </div>
                {submitMessage && (
                  <p className={`text-xs ${submitMessage.includes("Thank") ? "text-gold" : "text-primary-foreground/70"}`}>
                    {submitMessage}
                  </p>
                )}
              </form>
            </div>

            <div className="flex justify-center gap-4">
              <a href="https://www.instagram.com/zyradigitals.co/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-primary-foreground/60 hover:text-gold transition-colors">
                <Instagram size={16} />
              </a>
              <a href="https://www.linkedin.com/company/zyra-digitals/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-primary-foreground/60 hover:text-gold transition-colors">
                <Linkedin size={16} />
              </a>
              <a href="https://wa.me/9025421149" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-primary-foreground/60 hover:text-gold transition-colors">
                <MessageCircle size={16} />
              </a>
              <a href="https://www.facebook.com/zyradigitals" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-primary-foreground/60 hover:text-gold transition-colors">
                <Facebook size={16} />
              </a>
            </div>

            <p className="text-xs text-primary-foreground/50">© {currentYear} Zyra Digitals</p>

            {/* Hidden SEO Text - Google Readable, User Invisible */}
            <div style={{ position: 'absolute', left: '-9999px', fontSize: '1px', opacity: 0 }} aria-hidden="true">
              Zyra Digitals is a leading website design and development company in Coimbatore, Tamil Nadu.
              Users also search for Zyra Digital, Zira Digitals, Zyra Digitels, Zyra Web Design, Zyra Digitalz,
              Zyra Digitel, Zyra Branding Agency, best website developers in Coimbatore, popular website design company,
              famous web designers in Coimbatore, professional web design services, top website development company.
            </div>
          </div>
        </div>

        {/* Desktop Footer */}
        <div
          className={`hidden md:block bg-primary text-primary-foreground rounded-t-[3rem] rounded-b-none px-8 py-20 mb-0 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              {/* Logo - Left */}
              <img src="/images/whitelogo.png" alt="Zyra Digitals logo" className="w-32 h-20 object-contain" />

              {/* Brand Development Form - Right */}
              <div className="max-w-md">
                <div className="text-right space-y-3 mb-4">
                  <p className="text-lg text-primary-foreground/90">Need brand development or website design?</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 px-4 py-3 pr-12 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:border-gold/50 focus:bg-primary-foreground/20 transition-all w-full"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-foreground/60 hover:text-gold transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? <ArrowRight size={18} /> : <ArrowRight size={18} />}
                    </button>
                  </div>
                  {submitMessage && (
                    <p className={`text-sm text-right ${submitMessage.includes("Thank") ? "text-gold" : "text-primary-foreground/70"}`}>
                      {submitMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-primary-foreground/20">
              <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-primary-foreground/60">
                <Link to="/" className="hover:text-gold transition-colors">Home - Best Web Design Coimbatore</Link>
                <Link to="/about" className="hover:text-gold transition-colors">About - Brand Architects</Link>
                <Link to="/services" className="hover:text-gold transition-colors">Digital Services & SEO</Link>
                <Link to="/portfolio" className="hover:text-gold transition-colors">Our Portfolio of Work</Link>
                <Link to="/contact" className="hover:text-gold transition-colors">Get a Free Quote</Link>
              </nav>

              <div className="flex gap-4">
                <a href="https://www.instagram.com/zyradigitals.co/" target="_blank" rel="noopener noreferrer" aria-label="Follow Zyra Digitals on Instagram" className="text-primary-foreground/60 hover:text-gold transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="https://www.linkedin.com/company/zyra-digitals/" target="_blank" rel="noopener noreferrer" aria-label="Connect with Zyra Digitals on LinkedIn" className="text-primary-foreground/60 hover:text-gold transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="https://wa.me/9025421149" target="_blank" rel="noopener noreferrer" aria-label="Contact Zyra Digitals on WhatsApp" className="text-primary-foreground/60 hover:text-gold transition-colors">
                  <MessageCircle size={20} />
                </a>
                <a href="https://www.facebook.com/zyradigitals" target="_blank" rel="noopener noreferrer" aria-label="Follow Zyra Digitals on Facebook" className="text-primary-foreground/60 hover:text-gold transition-colors">
                  <Facebook size={20} />
                </a>
              </div>
            </div>

            <div className="text-center mt-10">
              <p className="text-sm text-primary-foreground/60">© {currentYear} Zyra Digitals. All Rights Reserved.</p>
              <p className="text-xs text-primary-foreground/40 mt-2 italic px-4">Based in Coimbatore, Tamil Nadu, Serving Brands Globally.</p>

              {/* Hidden SEO Text - Google Readable, Contextual Information */}
              <div style={{ position: 'absolute', left: '-9999px', fontSize: '1px', opacity: 0 }} aria-hidden="true">
                Zyra Digitals (Zyra Digital, Zira Digitals, Zyra Digitels, Zyra Web Design, Zyra Digitalz, Zyra Digitel, Zyra Branding) is a top-tier website design and development agency in Coimbatore.
                We specialize in building high-performance websites using React, Next.js, WordPress, and WooCommerce.
                Voted as one of the best web design companies in Coimbatore, we provide professional UI/UX design, search engine optimization (SEO),
                and brand identity creation for businesses in Tamil Nadu and worldwide. Best website developers for e-commerce, portfolios, and corporate sites.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
