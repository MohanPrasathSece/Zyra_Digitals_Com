import { SEO } from "@/components/SEO";
import { AnimatedSection } from "@/components/AnimatedSection";
import { User, Target, Zap, Award, ArrowRight, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const About = () => {
  useScrollToTop();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const expertise = [
    {
      icon: Target,
      title: "Strategic Branding",
      description: "We craft brand strategies that resonate with your target audience and drive business growth."
    },
    {
      icon: Zap,
      title: "Web Development",
      description: "High-performance websites that serve as the foundation of your digital presence."
    },
    {
      icon: User,
      title: "User Experience",
      description: "Intuitive designs that create meaningful connections between your brand and customers."
    },
    {
      icon: Award,
      title: "Digital Growth",
      description: "SEO and marketing strategies that ensure your brand gets discovered and remembered."
    },
  ];

  const achievements = [
    "Built 50+ high-performance websites",
    "Helped 30+ brands establish their digital presence",
    "Achieved 100% client satisfaction rate",
    "Specialized in brand-first development approach",
    "Expert in SEO and performance optimization",
    "Committed to ongoing support and growth",
  ];

  const aboutSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://www.zyradigitals.com/about/#aboutpage",
        "url": "https://www.zyradigitals.com/about",
        "name": "About Zyra Digitals | Premium Website Design & Development Company",
        "isPartOf": { "@id": "https://www.zyradigitals.com/#website" },
        "description": "Zyra Digitals is a leading website design and development company based in Coimbatore, Tamil Nadu. Founded by Mohan Prasath S, we specialize in professional web development, branding, and digital solutions.",
        "breadcrumb": { "@id": "https://www.zyradigitals.com/about/#breadcrumb" },
        "specialty": ["Website Design", "Web Development", "Brand Identity", "UI/UX Design", "SEO Optimization"],
        "areaServed": { "@type": "City", "name": "Coimbatore" }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.zyradigitals.com/about/#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.zyradigitals.com/" },
          { "@type": "ListItem", position: 2, name: "About", item: "https://www.zyradigitals.com/about" }
        ]
      },
      {
        "@type": "Person",
        "name": "Mohan Prasath S",
        "jobTitle": "Founder",
        "worksFor": { "@id": "https://www.zyradigitals.com/#organization" }
      }
    ]
  };

  return (
    <div className="pt-20">
      <SEO
        title="About Zyra Digitals | Premium Brand Architects & Web Experts"
        description="Learn about Zyra Digitals, the leading website design and branding agency in Coimbatore. Founded by Mohan Prasath S, we help businesses transform into powerful brands through strategic design and cutting-edge technology."
        canonical="/about"
        keywords="Zyra Digitals about, Zyra Digital company, Zira Digitals agency, website design company Coimbatore, best web developers, professional branding agency, famous web design company, website development experts, digital agency team, Mohan Prasath S founder, brand architects Coimbatore, luxury web design India, startup growth partner"
        schema={aboutSchema}
        publishedTime="2025-01-01T00:00:00Z"
        modifiedTime={new Date().toISOString()}
      />


      {/* Hero Section - Full Screen Banner */}
      <section className="min-h-screen bg-background relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="min-h-screen flex items-start justify-center pt-20">
            <div className="max-w-7xl mx-auto w-full">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 bg-secondary/50 rounded-full px-4 py-2 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Star className="text-foreground" size={16} />
                  <span className="font-secondary text-sm text-foreground/80 font-medium">Brand Architects</span>
                </motion.div>

                <motion.h1
                  className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  More Than an Agency.
                  <span className="block text-gold mt-2">We're</span> Brand Architects.
                  <span className="sr-only"> - Best Web Design Company & Branding Agency in India</span>
                </motion.h1>

                <motion.p
                  className="font-secondary text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  At Zyra Digitals, we believe a strong brand is not just how it looks — it's how it feels, functions, and performs across every digital touchpoint.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.7 }}
                >
                  <Button variant="gold" size="lg" asChild className="h-16 px-8 text-base">
                    <Link to="/contact" className="flex items-center gap-2">
                      Start Your Brand Journey
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="lg" asChild className="h-16 px-8 text-base border border-border">
                    <Link to="/portfolio">View Our Work</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <AnimatedSection animation="fade-up" className="py-20 bg-gradient-to-br from-secondary/30 to-gold/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-foreground mb-4">Our Achievements</h2>
              <p className="font-secondary text-lg text-muted-foreground">
                Building success stories one brand at a time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <AnimatedSection key={index} animation="slide-up" delay={index * 50}>
                  <div className="flex items-start gap-3 p-4 bg-background/50 backdrop-blur border border-border rounded-lg">
                    <CheckCircle className="text-gold flex-shrink-0 mt-1" size={20} />
                    <span className="font-secondary text-foreground">{achievement}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Expertise Section */}
      <AnimatedSection animation="slide-up" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-foreground mb-4">Our Expertise</h2>
              <p className="font-secondary text-lg text-muted-foreground max-w-2xl mx-auto">
                We combine strategic thinking with technical excellence to build brands that scale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {expertise.map((item, index) => {
                const Icon = item.icon;
                return (
                  <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                    <div className="group p-6 bg-secondary/30 border border-border rounded-xl hover:bg-secondary/50 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:scale-[1.02]">
                      <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                        <Icon className="text-gold" size={24} />
                      </div>
                      <h3 className="font-subheading text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="font-secondary text-base text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Our Process Section */}
      <AnimatedSection animation="slide-up" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-foreground mb-6">Our Process</h2>
            <p className="font-secondary text-lg text-muted-foreground">How we transform your vision into reality</p>
          </div>

          <div className="relative max-w-7xl mx-auto px-4">
            {/* The Rope (Curved Dotted Line - Multi-Strand Professional Effect) */}
            <div className="hidden md:block absolute top-[40px] left-0 w-full h-[500px] z-0 pointer-events-none">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1200 500">
                {/* Glow layer */}
                <path
                  d="M 0 80 Q 600 550, 1200 100"
                  fill="none"
                  stroke="rgba(184, 149, 81, 0.2)"
                  strokeWidth="12"
                  className="blur-[6px]"
                />
                {/* Main Strand */}
                <path
                  d="M 0 80 Q 600 550, 1200 100"
                  fill="none"
                  stroke="#9CA3AF"
                  strokeWidth="6"
                  strokeDasharray="30 20"
                  strokeLinecap="round"
                />
                {/* Fiber Strand 1 */}
                <path
                  d="M 0 82 Q 600 552, 1200 102"
                  fill="none"
                  stroke="#4B5563"
                  strokeWidth="3"
                  strokeDasharray="15 35"
                  strokeDashoffset="10"
                  strokeLinecap="round"
                />
                {/* Fiber Strand 2 (Highlights) */}
                <path
                  d="M 0 78 Q 600 548, 1200 98"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                  strokeDasharray="10 40"
                  strokeDashoffset="20"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              </svg>
            </div>

            <div className="flex flex-col md:flex-row gap-12 md:gap-6 relative z-10">
              {[
                {
                  id: 1,
                  title: "Design Idea",
                  desc: "We craft brand strategies that resonate with your target audience and drive business growth through comprehensive brand identity analysis, audience research, competitor insights, strategic positioning, and visual development.",
                  rotation: "-rotate-2",
                  desktopOffset: 120
                },
                {
                  id: 2,
                  title: "Development",
                  desc: "High-performance websites that serve as the foundation of your digital presence with custom designs, responsive layouts, e-commerce solutions, CMS integration, and SEO optimization for maximum impact.",
                  rotation: "rotate-2",
                  desktopOffset: 240
                },
                {
                  id: 3,
                  title: "Testing",
                  desc: "Intuitive designs that create meaningful connections between your brand and customers through strategic social media presence, compelling content marketing, targeted email campaigns, and analytics tracking.",
                  rotation: "-rotate-1",
                  desktopOffset: 245
                },
                {
                  id: 4,
                  title: "Launch",
                  desc: "SEO and marketing strategies that ensure your brand gets discovered and remembered through continuous performance monitoring, conversion optimization, and strategic refinement for sustained growth.",
                  rotation: "rotate-3",
                  desktopOffset: 135
                }
              ].map((step, index) => (
                <div key={step.id} className="flex-1" style={{ marginTop: windowWidth > 768 ? `${step.desktopOffset}px` : '0px' }}>
                  <AnimatedSection animation="fade-up" delay={index * 150}>
                    <div className="relative pt-6 md:pt-3">
                      {/* Rope for Mobile (Vertical) */}
                      <div className="md:hidden absolute top-0 left-1/2 -translate-x-1/2 h-6 w-px border-l-4 border-dashed border-gray-300"></div>

                      {/* Hole at top center */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-[3px] border-gray-400 flex items-center justify-center z-20 shadow-sm transition-transform duration-500 hover:scale-110">
                        <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
                      </div>

                      {/* Card container with gray border casing */}
                      <div className="bg-gray-100 rounded-2xl p-1 shadow-sm group mt-4">
                        {/* The hanging card */}
                        <div className="transition-all duration-300 ease-premium hover:scale-[1.02] cursor-default">
                          <div className="bg-white border-2 border-gray-300 rounded-xl p-6 lg:p-7 shadow-md min-h-[320px] md:min-h-[380px] lg:min-h-[350px] flex flex-col hover:shadow-2xl transition-all duration-500 ease-premium relative overflow-hidden">
                            {/* Subtle background number */}
                            <div className="absolute -right-4 -bottom-4 text-8xl font-bold text-gray-50 group-hover:text-gray-100 transition-colors duration-500 pointer-events-none">
                              {step.id}
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                              <div className="flex items-center gap-3 mb-6">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white font-bold text-sm">
                                  {step.id}
                                </span>
                                <h3 className="font-heading font-bold text-foreground text-xl lg:text-2xl">{step.title}</h3>
                              </div>
                              <div className="flex-1">
                                <p className="font-secondary text-muted-foreground leading-relaxed text-sm lg:text-[15px]">
                                  {step.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* Connector rope for mobile between cards */}
                  {index < 3 && (
                    <div className="md:hidden flex justify-center h-12">
                      <div className="w-px h-full border-l-4 border-dashed border-gray-300"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection animation="slide-up" className="py-20 bg-gradient-to-br from-gold/10 to-gold/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-foreground mb-6">
              Ready to Build Your Brand?
            </h2>
            <p className="font-secondary text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's create a brand that people remember. Your journey starts here.
            </p>
            <Button variant="gold" size="lg" asChild className="h-16 px-8">
              <Link to="/contact" className="flex items-center gap-2">
                Start Your Brand Journey
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default About;
