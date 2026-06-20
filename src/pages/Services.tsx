import { Code, User, Briefcase, ShoppingCart, Search, Server, RefreshCw, Bot, CheckCircle, ArrowRight, Zap, Shield, Palette, TrendingUp, Bookmark, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SEO } from "@/components/SEO";

const Services = () => {
  useScrollToTop();

  const coreServices = [
    {
      icon: Palette,
      title: "Branding That Doesn't Suck",
      description: "Visual identity, logos, and style guides that make your competitors extremely jealous.",
      features: ["Vibe & Positioning", "Logo & Visual Identity", "Brand Style Guides", "Bold Messaging"],
    },
    {
      icon: Code,
      title: "Websites That Sell",
      description: "Custom, ultra-fast sites engineered to turn casual visitors into paying customers. No lag allowed.",
      features: ["Custom Code (No Templates)", "High Conversions", "SEO-Ready Launch", "Speed Optimized"],
    },
    {
      icon: Briefcase,
      title: "Zero-Frustration UX",
      description: "Websites so easy to use that checking out is a breeze. Zero friction, pure conversions.",
      features: ["User Flow Maps", "Sleek Interfaces", "High-Converting Layouts", "Pixel-Perfect Designs"],
    },
    {
      icon: Search,
      title: "Google Domination (SEO)",
      description: "Rank high on Google so you stop wasting money chasing leads. They will find you on autopilot.",
      features: ["Keyword Target Plans", "Technical Audits", "SEO-Optimized Layouts", "Google Analytics Setup"],
    },
    {
      icon: TrendingUp,
      title: "Real Analytics, No Fluff",
      description: "We don't do 'likes' or 'impressions'. We set up systems to track what actually brings in cash.",
      features: ["Conversion Track Setup", "Google Analytics 4", "Search Console Integrations", "Sales Tracking"],
    },
    {
      icon: Server,
      title: "Bulletproof Hosting",
      description: "We keep your site secure, online 24/7, and lightning-fast. No server headaches for you.",
      features: ["Super-Fast Hosting", "SSL & Security Checks", "Routine Backups", "Real Human Tech Support"],
    }
  ];

  const additionalServices = [
    { icon: Search, title: "Web Apps & Dashboards", description: "Custom digital tools and dashboards built to automate your business operations." },
    { icon: Server, title: "Long-Term Scaling", description: "We stay in your corner with regular updates, speed optimizations, and ongoing support." },
    { icon: RefreshCw, title: "Brand Reboots", description: "Breathe new life into your outdated brand identity and clunky old website." },
    { icon: Bot, title: "Tool Integrations", description: "Connect your site to marketing systems, Stripe, CRM tools, or anything else you need." }
  ];

  const processSteps = [
    { step: "01", title: "The Brainstorm", description: "We map out your goals, target audience, and competitive edge. No generic plans." },
    { step: "02", title: "The Blueprint", description: "We outline the exact visual direction and site structure so there are no surprises." },
    { step: "03", title: "The Design", description: "We craft custom, stunning visuals and layouts that look incredibly premium." },
    { step: "04", title: "The Code", description: "We write clean, lightweight code to build an ultra-fast website from scratch." },
    { step: "05", title: "The Takeoff", description: "We launch your site, set up Google tracking, and watch your business scale." }
  ];

  const whatsappHref = `https://wa.me/9025421149?text=${encodeURIComponent("Hi, I'm interested in your web development services. Can we discuss my project?")}`;

  const servicesSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://www.zyradigitals.com/services/#service",
        "url": "https://www.zyradigitals.com/services",
        "name": "Digital Agency Services | Zyra Digitals",
        "isPartOf": { "@id": "https://www.zyradigitals.com/#website" },
        "description": "Comprehensive digital solutions including web development, branding, and SEO.",
        "provider": { "@id": "https://www.zyradigitals.com/#organization" },
        "breadcrumb": { "@id": "https://www.zyradigitals.com/services/#breadcrumb" },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Digital Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Website Development"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Brand Identity & Design"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "SEO Optimization"
              }
            }
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.zyradigitals.com/services/#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.zyradigitals.com/" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://www.zyradigitals.com/services" }
        ]
      }
    ]
  };

  return (
    <div className="pt-20">
      <SEO
        title="Our Services | Full-Stack Web Development & Strategic Branding"
        description="Explore the comprehensive digital services offered by Zyra Digitals. From premium website design and e-commerce development to strategic branding and SEO optimization, we provide end-to-end digital growth solutions."
        canonical="/services"
        keywords="website design services, web development company, professional website developers, best web design agency, custom website development, UI/UX design services, SEO optimization, digital branding, e-commerce development, responsive web design, website designers Coimbatore, famous website development, popular web design services, Zyra Digitals services, frontend development, backend development, brand evolution, digital growth analytics"
        schema={servicesSchema}
        publishedTime="2025-01-01T00:00:00Z"
        modifiedTime={new Date().toISOString()}
      />
      
      
      {/* Hero Section */}
      <AnimatedSection animation="fade-up" className="py-24 bg-gradient-to-br from-background to-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-secondary/50 rounded-full px-4 py-2 mb-6">
              <Zap size={16} className="text-foreground" />
              <span className="font-secondary text-sm text-foreground/80">Zero Corporate BS</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Services That <span className="text-gold">Crush</span> The Norms
              <span className="sr-only"> - Branding, Digital Solutions & Web Development</span>
            </h1>
            <p className="font-secondary text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              We design premium brands and code ultra-fast custom websites that get you actual clients. No slow templates, no endless meetings.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="gold" size="lg" asChild>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Let's Talk Business <ArrowRight size={18} />
                </a>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link to="/portfolio">See The Proof</Link>
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Core Services - Modern Card Grid */}
      <AnimatedSection animation="slide-up" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-4 py-2 mb-6">
              <Palette size={16} className="text-gold" />
              <span className="font-secondary text-sm text-gold font-medium">What We're Good At</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-foreground mb-4">Core Services</h2>
            <p className="font-secondary text-lg text-muted-foreground max-w-2xl mx-auto">
              No generic packages. Just high-performance systems custom-built for your business.
            </p>
          </div>

          {/* Mobile: Sticky Stack Effect */}
          <div className="md:hidden flex flex-col gap-4 relative pb-20">
            {coreServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="sticky"
                  style={{ top: `${6 + index * 1.5}rem` }}
                >
                  <AnimatedSection
                    animation="fade-up"
                    delay={index * 50}
                  >
                    <div className="group bg-card rounded-2xl border border-border/60 p-6 shadow-sm shadow-black/5 hover:shadow-xl hover:shadow-gold/5 hover:border-gold/20 transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:scale-[1.02]">
                      {/* Header */}
                      <div className="mb-6">
                        <div className="w-12 h-12 bg-secondary/50 rounded-xl flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                          <Icon size={24} className="text-foreground/80 group-hover:text-gold transition-colors duration-300" />
                        </div>
                      </div>

                      <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                        {service.title}
                      </h3>
                      <p className="font-secondary text-muted-foreground leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-3 mb-8 border-t border-border/40 pt-6">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-gold/50 rounded-full group-hover:bg-gold transition-colors duration-500 ease-premium"></div>
                            <span className="font-secondary text-sm text-foreground/70">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button variant="outline" className="w-full border-border hover:border-gold/50 hover:bg-gold/5 hover:text-foreground transition-all duration-500 ease-premium" asChild>
                        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                          Get Started
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-500 ease-premium" />
                        </a>
                      </Button>

                      {/* Shuttle line */}
                      <div className="mt-4 overflow-hidden h-[2px] w-full max-w-[40px]">
                        <div className="h-full w-full bg-gold -translate-x-full transition-transform duration-500 ease-premium group-hover:translate-x-0" />
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              );
            })}
          </div>

          {/* Desktop: Animated Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {coreServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                  <div className="group h-full bg-card rounded-2xl border border-border/60 p-8 hover:border-gold/20 hover:shadow-xl hover:shadow-gold/5 transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:scale-[1.02] flex flex-col">
                    {/* Header */}
                    <div className="mb-8">
                      <div className="w-14 h-14 bg-secondary/50 rounded-2xl flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                        <Icon size={28} strokeWidth={1.5} className="text-foreground/80 group-hover:text-gold transition-colors duration-300" />
                      </div>
                    </div>

                    <h3 className="font-heading text-2xl font-bold text-foreground mb-3 group-hover:text-foreground/90">
                      {service.title}
                    </h3>
                    <p className="font-secondary text-muted-foreground text-base leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-8 border-t border-border/40 pt-8 mt-auto">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 group/feature">
                          <CheckCircle size={16} className="text-foreground/30 group-hover/feature:text-gold/60 transition-colors duration-300" />
                          <span className="font-secondary text-sm text-foreground/70 group-hover/feature:text-foreground/90 transition-colors duration-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full bg-foreground text-background hover:bg-gold hover:text-white transition-all duration-300 h-12 rounded-lg" asChild>
                      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        Get Started
                        <ArrowRight size={18} />
                      </a>
                    </Button>

                    {/* Shuttle line */}
                    <div className="mt-8 overflow-hidden h-[2px] w-full max-w-[40px]">
                      <div className="h-full w-full bg-gold -translate-x-full transition-transform duration-500 ease-premium group-hover:translate-x-0" />
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Additional Services - Minimal Grid */}
      <AnimatedSection animation="fade-up" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">Extra Value Add-Ons</h2>
            <p className="font-secondary text-lg text-muted-foreground">
              Boost your site with these specialized integrations and ongoing upgrades.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <AnimatedSection key={index} animation="slide-up" delay={index * 100}>
                  <div
                    className="group flex items-start gap-4 rounded-lg border border-border bg-background p-6 transition-all duration-200 hover:border-foreground/30 hover:shadow-md hover:bg-secondary/20"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-md bg-secondary border border-border flex items-center justify-center transition-colors group-hover:bg-foreground/5">
                      <Icon size={20} strokeWidth={1.75} className="text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-subheading text-lg font-semibold text-foreground mb-1">{service.title}</h3>
                      <p className="font-secondary text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Why Choose Us */}
      <AnimatedSection animation="slide-up" className="py-20 bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">Why Zyra Digitals?</h2>
            <p className="font-secondary text-lg text-muted-foreground">We skip the agencies' bullshit meetings and focus entirely on speed and performance.</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <AnimatedSection animation="fade-up" delay={0}>
                <div className="group relative bg-card border border-border rounded-xl p-8 hover:border-foreground/20 transition-all duration-300 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-foreground/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="inline-flex items-center justify-center rounded-full bg-foreground/10 border-2 border-foreground/20 w-16 h-16 mb-6 group-hover:border-foreground/40 transition-colors duration-300">
                      <Zap size={28} className="text-foreground" />
                    </div>
                    <h3 className="font-subheading text-xl font-semibold text-foreground mb-3">Speed That Kills</h3>
                    <p className="font-secondary text-muted-foreground mb-4">Most custom projects launched in 2 to 4 weeks. No dragging feet, no delays.</p>
                    <div className="flex items-center gap-2 text-sm text-foreground/60">
                      <div className="w-2 h-2 bg-foreground/40 rounded-full"></div>
                      <span>Zero Lazy Templates</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Card 2 */}
              <AnimatedSection animation="fade-up" delay={100}>
                <div className="group relative bg-card border border-border rounded-xl p-8 hover:border-foreground/20 transition-all duration-300 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-foreground/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="inline-flex items-center justify-center rounded-full bg-foreground/10 border-2 border-foreground/20 w-16 h-16 mb-6 group-hover:border-foreground/40 transition-colors duration-300">
                      <Palette size={28} className="text-foreground" />
                    </div>
                    <h3 className="font-subheading text-xl font-semibold text-foreground mb-3">Pure Custom Builds</h3>
                    <p className="font-secondary text-muted-foreground mb-4">Built completely from scratch. Sleek, premium layout designed solely for your brand vibe.</p>
                    <div className="flex items-center gap-2 text-sm text-foreground/60">
                      <div className="w-2 h-2 bg-foreground/40 rounded-full"></div>
                      <span>Original Code Only</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Card 3 */}
              <AnimatedSection animation="fade-up" delay={200}>
                <div className="group relative bg-card border border-border rounded-xl p-8 hover:border-foreground/20 transition-all duration-300 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-foreground/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="inline-flex items-center justify-center rounded-full bg-foreground/10 border-2 border-foreground/20 w-16 h-16 mb-6 group-hover:border-foreground/40 transition-colors duration-300">
                      <Shield size={28} className="text-foreground" />
                    </div>
                    <h3 className="font-subheading text-xl font-semibold text-foreground mb-3">We Don't Ghost</h3>
                    <p className="font-secondary text-muted-foreground mb-4">Get 30 days of free post-launch support. Ongoing scaling and maintenance options available.</p>
                    <div className="flex items-center gap-2 text-sm text-foreground/60">
                      <div className="w-2 h-2 bg-foreground/40 rounded-full"></div>
                      <span>Reliable Partnership</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection animation="slide-up" className="py-20 bg-white text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Ready to Crush Your
              <span className="block">Competition?</span>
            </h2>
            <p className="font-secondary text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Stop settling for slow sites and boring templates. Let's build a digital presence that actually drives business growth.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="gold" size="lg" asChild>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Let's Talk Business <ArrowRight size={18} />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-black text-black hover:bg-black hover:text-white px-8 py-3 rounded-lg transition-colors duration-200">
                <Link to="/portfolio">Show Me Proof</Link>
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Services;
