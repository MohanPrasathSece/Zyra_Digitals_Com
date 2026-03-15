import { useState, useCallback, useMemo } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string | React.ReactNode;
  subtitle?: string;
  faqs?: FAQItem[];
  className?: string;
}

const defaultFAQs: FAQItem[] = [
  {
    id: "faq-1",
    question: "What services do you offer?",
    answer: "We specialize in high-performance website development, brand identity design, SEO optimization, and premium hosting solutions. Whether you need a personal portfolio, a corporate site, or a complex e-commerce platform, we deliver clean code and exceptional design."
  },
  {
    id: "faq-2",
    question: "How long does a typical project take?",
    answer: "Timelines vary by scope: websites generally take 2-4 weeks, brand identity 1-2 weeks, and full digital ecosystems 4-6 weeks. We prioritize quality while maintaining lean timelines to get your project live efficiently."
  },
  {
    id: "faq-3",
    question: "Do you provide ongoing support after launch?",
    answer: "Absolutely. We offer comprehensive post-launch support including performance monitoring, security updates, and feature additions. We don't just launch and leave—we partner with you for long-term growth."
  },
  {
    id: "faq-4",
    question: "What technologies do you use?",
    answer: "We use a modern tech stack focused on performance and scalability, primarily React, TypeScript, Tailwind CSS, and Framer Motion for animations. For e-commerce, we specialize in high-converting Shopify and WooCommerce implementations."
  },
  {
    id: "faq-5",
    question: "What is your pricing structure?",
    answer: "Our pricing is project-based and reflects the custom nature of our work. We provide transparent, detailed quotes based on your specific requirements and value-delivered. Contact us for a bespoke estimate."
  }
];

export const FAQ = ({
  title = "Got Questions?",
  subtitle = "Everything you need to know about working with Zyra Digitals.",
  faqs = defaultFAQs,
  className = ""
}: FAQProps) => {
  const [openItem, setOpenItem] = useState<string>("");
  
  // Memoize toggle function to prevent unnecessary re-renders
  const toggleItem = useCallback((id: string) => {
    setOpenItem(prev => prev === id ? "" : id);
  }, []);
  
  // Detect if device is mobile for performance optimizations
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  }, []);
  
  // Optimized animation variants for mobile vs desktop
  const animationVariants = useMemo(() => ({
    container: {
      initial: { opacity: 0, y: isMobile ? 10 : 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: isMobile ? 0.3 : 0.5 }
    },
    item: {
      initial: { opacity: 0, y: isMobile ? 10 : 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: isMobile ? 0.2 : 0.3 }
    },
    content: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: isMobile ? 0.15 : 0.2 }
    }
  }), [isMobile]);

  return (
    <section id="faq" className={`py-24 relative overflow-hidden ${className}`}>
      {/* Background Decorative Elements - Simplified for mobile */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className={`absolute top-[-10%] right-[-10%] rounded-full bg-gold/5 ${isMobile ? 'w-[30%] blur-[60px]' : 'w-[40%] blur-[120px]'}`} />
        <div className={`absolute bottom-[-10%] left-[-10%] rounded-full bg-primary/5 ${isMobile ? 'w-[30%] blur-[60px]' : 'w-[40%] blur-[120px]'}`} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              {...animationVariants.container}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-gold/20">
                <HelpCircle size={14} />
                Frequently Asked Questions
              </div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                {title}
              </h2>
              <p className="font-secondary text-lg text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            </motion.div>
          </div>

          {/* FAQ List */}
          <div className={`space-y-${isMobile ? '3' : '4'} max-w-3xl mx-auto`}>
            {faqs.map((faq, index) => {
              const isOpen = openItem === faq.id;
              const itemDelay = isMobile ? 0 : index * 0.05;

              return (
                <motion.div
                  key={faq.id}
                  {...animationVariants.item}
                  viewport={{ once: true }}
                  transition={{ ...animationVariants.item.transition, delay: itemDelay }}
                  className={`border-b transition-all ${isMobile ? 'duration-200' : 'duration-300'} ${isOpen
                    ? "border-gold pb-4"
                    : "border-gray-200 pb-3 hover:border-gray-300"
                  }`}
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className={`w-full text-left flex items-center justify-between gap-4 py-3 ${isMobile ? 'px-2' : 'px-0'} group`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <span className={`${isMobile ? 'text-base' : 'text-lg'} font-medium transition-colors ${isMobile ? 'duration-200' : 'duration-300'} ${isOpen 
                      ? "text-gold" 
                      : "text-gray-900 group-hover:text-gold"
                    }`}>
                      {faq.question}
                    </span>
                    
                    <ChevronDown 
                      size={isMobile ? 18 : 20} 
                      className={`flex-shrink-0 transition-transform ${isMobile ? 'duration-200' : 'duration-300'} ${isOpen ? 'rotate-180 text-gold' : 'text-gray-400 group-hover:text-gold'}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        {...animationVariants.content}
                        className={`overflow-hidden ${isMobile ? 'pt-3' : 'pt-4'}`}
                        id={`faq-answer-${faq.id}`}
                      >
                        <div className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 leading-relaxed ${isMobile ? 'px-2' : 'px-0'}`}>
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-16"
            {...animationVariants.container}
            viewport={{ once: true }}
            transition={{ ...animationVariants.container.transition, delay: isMobile ? 0.2 : 0.4 }}
          >
            <p className="font-secondary text-muted-foreground mb-6">
              Couldn't find what you're looking for?
            </p>
            <button
              onClick={() => window.location.href = '/contact'}
              className="px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-gold transition-all duration-300 shadow-lg hover:shadow-gold/20"
            >
              Get in Touch with Us
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

