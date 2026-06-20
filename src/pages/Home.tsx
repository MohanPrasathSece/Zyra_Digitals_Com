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
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LogoCarousel } from "@/components/LogoCarousel";
import { ServicesTicker } from "@/components/ServicesTicker";
import { Testimonials } from "@/components/Testimonials";
import { InternationalClients } from "@/components/InternationalClients";

const Home = () => {
  useScrollToTop();

  const services = [
    {
      icon: User,
      title: "Branding That Doesn't Suck",
      description: "Visual identity, logos, and style guides that make your competitors extremely jealous.",
    },
    {
      icon: Code,
      title: "Websites That Sell",
      description: "Custom, ultra-fast sites engineered to turn casual visitors into paying customers. No lag allowed.",
    },
    {
      icon: Briefcase,
      title: "SEO & Fast Hosting",
      description: "Rank #1 on Google and keep your site online 24/7. Speed is money, and we deliver both.",
    },
    {
      icon: ShoppingCart,
      title: "No-BS Digital Growth",
      description: "Real traffic, high conversions, and growth campaigns built to print money. No fake metric fluff.",
    },
  ];

  // Featured FAQs for home page
  const homeFAQs = [
    {
      id: "faq-home-1",
      question: "What do you actually do?",
      answer: "We code custom websites, design clean brands, optimize SEO, and handle hosting. Simple as that. We make you look legendary online and bring in actual clients. No useless fluff."
    },
    {
      id: "faq-home-2",
      question: "How fast is the turnaround?",
      answer: "Usually 2 to 4 weeks. Branding takes 1 to 2 weeks. We move fast, but we don't cut corners."
    },
    {
      id: "faq-home-3",
      question: "Will you disappear after launch?",
      answer: "Hell no. We host your site, keep it secure, run updates, and make sure it never goes down. We're in this for the long haul."
    },
    {
      id: "faq-home-4",
      question: "Why should I choose you over cheap agencies?",
      answer: "Because most agencies build slow sites using templates and charge you for 'meetings'. We write clean code, design from scratch, and build stuff that actually prints cash."
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
              <h2 className="section-title mb-6 leading-tight">
                Everything You Need <br />
                <span className="text-gold">To Dominate The Internet</span>
              </h2>
              <p className="section-description max-w-2xl mx-auto">
                We build fast websites, clean designs, and growth systems that actually make you money.
                As the leading <Link to="/services" className="text-gold hover:underline">web development company in Coimbatore</Link>, we ensure you stand out.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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

          <div className="text-center mt-12">
            <Button variant="ghost-gold" size="lg" asChild>
              <Link to="/services">See The Proof</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      <AnimatedSection animation="fade-up">
        <FAQ
          title="Still Got Questions?"
          subtitle="We've got straight answers. No corporate jargon allowed."
          faqs={homeFAQs}
          className="bg-gradient-to-br from-background via-primary/5 to-gold/5"
        />
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection animation="slide-up" className="py-20 bg-white text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Ready to Leave Your Competitors
            <span className="block">In The Dust?</span>
          </h2>
          <p className="font-secondary text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Stop settling for average. Let's build a website and brand that prints money.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="gold" size="lg" asChild>
              <Link to="/contact">Let's Talk Business</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-black text-black hover:bg-black hover:text-white px-8 py-3 rounded-lg transition-colors duration-200">
              <Link to="/portfolio">Show Me Proof</Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Home;

