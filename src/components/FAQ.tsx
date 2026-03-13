import { useState } from "react";
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
  const [openItem, setOpenItem] = useState<string>("faq-1");

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? "" : id);
  };

  return (
    <section id="faq" className={`py-24 relative overflow-hidden ${className}`}>
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] aspect-square rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] aspect-square rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
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
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openItem === faq.id;

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group rounded-2xl border transition-all duration-300 ${isOpen
                    ? "bg-card border-gold/30 shadow-xl shadow-gold/5"
                    : "bg-white border-border hover:border-gold/20 hover:shadow-lg"
                    }`}
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4"
                  >
                    <span className={`font-secondary text-lg sm:text-xl font-bold transition-colors duration-300 ${isOpen ? "text-gold" : "text-foreground group-hover:text-gold"
                      }`}>
                      {faq.question}
                    </span>
                    <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${isOpen
                      ? "bg-gold border-gold text-white rotate-180"
                      : "bg-secondary/10 border-border text-foreground group-hover:border-gold/30 group-hover:text-gold"
                      }`}>
                      <ChevronDown size={20} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-8 sm:px-8 sm:pb-10 pt-0">
                          <div className="w-full h-px bg-gradient-to-r from-gold/20 to-transparent mb-6" />
                          <p className="font-secondary text-muted-foreground leading-relaxed text-base sm:text-lg">
                            {faq.answer}
                          </p>
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
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

