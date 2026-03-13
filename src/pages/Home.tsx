import { Hero } from "@/components/Hero";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code, User, Briefcase, ShoppingCart, ExternalLink } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { FAQ } from "@/components/FAQ";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Typewriter } from "@/components/Typewriter";
import { SEO } from "@/components/SEO";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { motion } from "framer-motion";
import { LogoCarousel } from "@/components/LogoCarousel";
import { TechStack } from "@/components/TechStack";

const Home = () => {
  useScrollToTop();

  const services = [
    {
      icon: User,
      title: "Brand Identity & Design",
      description: "Strategic brand creation with visual identity, messaging, and design that connects emotionally.",
    },
    {
      icon: Code,
      title: "Website Development",
      description: "High-performance, conversion-focused websites built with clean code and modern technologies.",
    },
    {
      icon: Briefcase,
      title: "SEO & Hosting",
      description: "SEO optimization and reliable hosting solutions that ensure your brand performs and scales online.",
    },
    {
      icon: ShoppingCart,
      title: "Digital Growth",
      description: "Comprehensive digital strategies that drive traffic, conversions, and long-term brand growth.",
    },
  ];

  // Featured FAQs for home page
  const homeFAQs = [
    {
      id: "faq-home-1",
      question: "What services do you offer?",
      answer: "We offer comprehensive digital solutions: website development (our core), brand identity & design, SEO optimization, hosting solutions, and digital growth strategies. We create websites that perform and brands that connect."
    },
    {
      id: "faq-home-2",
      question: "How long does a typical project take?",
      answer: "Project timelines vary: websites typically take 2-4 weeks, brand identity 1-2 weeks, and full digital ecosystems 4-6 weeks. We provide detailed timelines during consultation based on your specific needs."
    },
    {
      id: "faq-home-3",
      question: "Do you provide ongoing support and hosting?",
      answer: "Yes, we offer comprehensive ongoing support including website maintenance, SEO optimization, reliable hosting, performance monitoring, and feature updates to ensure your digital presence continues to grow."
    },
    {
      id: "faq-home-4",
      question: "What makes your approach different?",
      answer: "We combine technical excellence with strategic thinking. We build high-performance websites and powerful brands that work together seamlessly, ensuring your digital presence is both technically sound and emotionally resonant."
    }
  ];

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.zyradigitals.com/#organization",
        "name": "Zyra Digitals",
        "alternateName": [
          "Zyra Digital",
          "Zira Digitals",
          "Zyra Digitels",
          "Zyra Web Design",
          "Zyra Digitalz",
          "Zyra Digitel",
          "Zyra Branding",
          "Zyra Web",
          "Zyra Digital Agency",
          "Zira Digital"
        ],
        "url": "https://www.zyradigitals.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.zyradigitals.com/favicon.png",
          "width": "512",
          "height": "512"
        },
        "founder": {
          "@type": "Person",
          "name": "Mohan Prasath S"
        },
        "sameAs": [
          "https://www.instagram.com/zyradigitals.co/",
          "https://www.linkedin.com/company/zyra-digitals/"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.zyradigitals.com/#website",
        "url": "https://www.zyradigitals.com/",
        "name": "Zyra Digitals",
        "publisher": { "@id": "https://www.zyradigitals.com/#organization" }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.zyradigitals.com/#service",
        "name": "Zyra Digitals",
        "image": "https://www.zyradigitals.com/favicon.png",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Coimbatore",
          "addressRegion": "Tamil Nadu",
          "addressCountry": "IN"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Coimbatore"
          },
          {
            "@type": "State",
            "name": "Tamil Nadu"
          }
        ],
        "telephone": "+91-9025421149",
        "url": "https://www.zyradigitals.com/"
      },
      {
        "@type": "FAQPage",
        "mainEntity": homeFAQs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <div>
      <SEO
        schema={homeSchema}
        title="Zyra Digitals | Best Website Design & Development Company in Coimbatore"
        description="Zyra Digitals (Zyra Digital) is the top-rated website design and development agency in Coimbatore. We craft ultra-premium, high-performance websites and powerful brand identities for modern businesses worldwide."
        keywords="Zyra Digitals, Zyra Digital, Zira Digitals, Zyra Digitels, Zyra Web Design, best website design company Coimbatore, website development Coimbatore, web design agency Coimbatore, professional website developers, famous web design company, popular website development, top web designers in Coimbatore, best website design company, web development agency, branding and digital solutions, website designer near me, web development company in India, premium UI/UX design, Mohan Prasath S, Tamil Nadu website design, Coimbatore digital agency, modern website design, responsive web development, e-commerce website development Coimbatore, SEO services Coimbatore, business growth systems, high-performance web agency"
        publishedTime="2025-01-01T00:00:00Z"
        modifiedTime={new Date().toISOString()}
      />

      {/* Hero Section */}
      <Hero />

      <AnimatedSection animation="fade-up">
        <LogoCarousel />
      </AnimatedSection>

      {/* Services Preview - Enhanced for SEO */}
      <section id="services-preview" className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                Everything Your <br />
                <span className="text-gold">Digital Presence</span> Needs
              </h2>
              <p className="font-secondary text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                We build exceptional websites, powerful brands, and high-performance growth systems.
                As the leading <Link to="/services" className="text-gold hover:underline">web development company in Coimbatore</Link>, we ensure your brand stands out.
              </p>
            </motion.div>
          </div>

          {/* Mobile: Simple Minimal Layout */}
          <div className="md:hidden space-y-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <ServiceCard {...service} index={index} />
              </div>
            ))}
          </div>

          {/* Desktop: Animated Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((service, index) => (
              <AnimatedSection
                key={index}
                animation="fade-up"
                delay={index * 100}
              >
                <ServiceCard {...service} index={index} />
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center">
            <Button variant="ghost-gold" size="lg" asChild>
              <Link to="/services">Explore Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      <AnimatedSection animation="fade-up">
        <TechStack />
      </AnimatedSection>

      <AnimatedSection animation="fade-up">
        <FAQ
          title="Common Questions"
          subtitle="Quick answers to help you get started with your project"
          faqs={homeFAQs}
          className="bg-gradient-to-br from-background via-primary/5 to-gold/5"
        />
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection animation="slide-up" className="py-20 bg-white text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Ready to Build a Brand
            <span className="block">That Stands Out?</span>
          </h2>
          <p className="font-secondary text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Let's turn your vision into a brand that performs, scales, and lasts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="gold" size="lg" asChild>
              <Link to="/contact">Start Your Brand Journey</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-black text-black hover:bg-black hover:text-white px-8 py-3 rounded-lg transition-colors duration-200">
              <Link to="/portfolio">Explore Our Work</Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Home;

