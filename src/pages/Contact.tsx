import { ContactForm } from "@/components/ContactForm";
import { FAQ } from "@/components/FAQ";
import { Mail, Phone, MapPin, Instagram, Linkedin, ExternalLink } from "lucide-react";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SEO } from "@/components/SEO";

const Contact = () => {
  useScrollToTop();

  const contactSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://www.zyradigitals.com/contact/#contactpage",
        "url": "https://www.zyradigitals.com/contact",
        "name": "Contact Zyra Digitals | Get a Quote",
        "isPartOf": { "@id": "https://www.zyradigitals.com/#website" },
        "description": "Get in touch with Zyra Digitals for premium website design, branding, and digital growth services.",
        "breadcrumb": { "@id": "https://www.zyradigitals.com/contact/#breadcrumb" }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.zyradigitals.com/contact/#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.zyradigitals.com/" },
          { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.zyradigitals.com/contact" }
        ]
      }
    ]
  };

  return (
    <div className="pt-20">
      <SEO
        title="Contact Zyra Digitals | Start Your Premium Project Today"
        description="Ready to elevate your digital presence? Contact Zyra Digitals for a free quote on website design, branding, and development. We're here to turn your vision into a high-performance brand."
        canonical="/contact"
        keywords="contact web designer, website design quote, get website developed, hire web developer, contact digital agency, website development inquiry, Zyra Digitals contact, web design consultation, Coimbatore website designer contact, professional web development services, start a startup project, hire brand architect"
        schema={contactSchema}
        publishedTime="2025-01-01T00:00:00Z"
        modifiedTime={new Date().toISOString()}
        section="Contact"
      />



      {/* Hero Section - Old Banner Style */}
      <AnimatedSection animation="fade-up" className="min-h-[70vh] flex items-center bg-gradient-to-br from-background via-secondary/20 to-gold/10 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gold/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-secondary/50 rounded-full px-4 py-2 mb-6">
              <ExternalLink className="text-foreground" size={16} />
              <span className="font-secondary text-sm text-foreground/80 font-medium">Contact Zyra</span>
            </div>

            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Let's Create <br />
              <span className="text-gold">Together</span>
              <span className="sr-only"> - Get a Quote for Website Design & Branding Services</span>
            </h1>

            <p className="font-secondary text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Have a project in mind? Reach out and let's create something exceptional with premium design and performance.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Form & Info - Old Two Column Style */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <AnimatedSection animation="fade-up" delay={0}>
              <div className="bg-card p-8 sm:p-10 rounded-2xl border border-border shadow-xl h-full">
                <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
                  Send a Message
                </h2>
                <ContactForm />
              </div>
            </AnimatedSection>

            {/* Contact Information */}
            <AnimatedSection animation="fade-up" delay={200}>
              <div className="space-y-12">
                <div>
                  <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                    Get in Touch
                  </h2>
                  <p className="font-secondary text-lg text-muted-foreground leading-relaxed">
                    Whether you have a detailed project brief or just an idea you'd like to explore,
                    we're here to help. Contact us through the form or reach out directly.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground text-xl mb-1 tracking-tight">Email</h3>
                      <a
                        href="mailto:zyradigitalsofficial@gmail.com"
                        className="font-secondary text-muted-foreground hover:text-gold transition-colors text-lg"
                      >
                        zyradigitalsofficial@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground text-xl mb-1 tracking-tight">Phone</h3>
                      <a
                        href="https://wa.me/9025421149"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-secondary text-muted-foreground hover:text-gold transition-colors text-lg"
                      >
                        WhatsApp: +91 90254 21149
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground text-xl mb-1 tracking-tight">Location</h3>
                      <p className="font-secondary text-muted-foreground text-lg leading-relaxed">
                        Remote • Worldwide
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-border/60">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-6 tracking-tight">
                    Business Hours
                  </h3>
                  <p className="font-secondary text-muted-foreground text-lg leading-relaxed italic">
                    Monday – Sunday: 6:00 AM – 10:00 PM IST
                  </p>
                </div>

                <div className="pt-10 border-t border-border/60">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-6 tracking-tight">
                    Follow Us
                  </h3>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://www.instagram.com/zyradigitals.co/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 py-3 px-5 rounded-xl border border-border hover:border-gold hover:bg-gold/5 transition-all duration-300 group"
                    >
                      <Instagram className="w-5 h-5 text-gold group-hover:rotate-12 transition-transform" />
                      <span className="font-secondary font-medium text-foreground">Instagram</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/zyra-digitals/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 py-3 px-5 rounded-xl border border-border hover:border-gold hover:bg-gold/5 transition-all duration-300 group"
                    >
                      <Linkedin className="w-5 h-5 text-gold group-hover:rotate-12 transition-transform" />
                      <span className="font-secondary font-medium text-foreground">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <AnimatedSection animation="fade-up">
        <FAQ
          title="Common Questions"
          subtitle="Find answers to common questions about our services and process"
          className="bg-secondary/30"
        />
      </AnimatedSection>
    </div>
  );
};

export default Contact;
