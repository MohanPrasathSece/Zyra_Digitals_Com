import { useState, useCallback, useMemo } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

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
    question: "What do you actually do?",
    answer: "We code custom websites, design clean brands, optimize SEO, and handle hosting. Simple as that. We make you look legendary online and bring in actual clients. No useless fluff."
  },
  {
    id: "faq-2",
    question: "How fast is the turnaround?",
    answer: "Usually 2 to 4 weeks. Branding takes 1 to 2 weeks. We move fast, but we don't cut corners."
  },
  {
    id: "faq-3",
    question: "Will you disappear after launch?",
    answer: "Hell no. We host your site, keep it secure, run updates, and make sure it never goes down. We're in this for the long haul."
  },
  {
    id: "faq-4",
    question: "What is your tech stack?",
    answer: "We use React, TypeScript, Tailwind, and custom code. No slow page builders or heavy WordPress themes that take a year to load."
  },
  {
    id: "faq-5",
    question: "How much is this gonna cost me?",
    answer: "We offer custom quotes based on what you actually need. No hidden fees, no billing surprises, just honest pricing."
  }
];

export const FAQ = ({
  title = "Still Got Questions?",
  subtitle = "We've got straight answers. No corporate jargon allowed.",
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
              <p className="section-description">
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
              Still got something else on your mind?
            </p>
            <Button 
              variant="gold" 
              size="lg" 
              onClick={() => window.location.href = '/contact'}
              className="h-14 px-10 rounded-md font-bold shadow-lg hover:shadow-gold/20"
            >
              Let's Make It Happen
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
