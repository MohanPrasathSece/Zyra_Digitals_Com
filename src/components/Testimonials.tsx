import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useState, useEffect } from "react";

interface Testimonial {
    quote: string;
    author: string;
    role: string;
    avatarInitial: string;
}

const testimonials: Testimonial[] = [
    {
        quote:
            "Absolutely mind blowing work and very cooperative as well. Great rates and work ethic—never faced any issue and the responses were always on time. Loved working with Zyra Digitals for the MVP of my startup!",
        author: "Aryan Kapoor",
        role: "Founder, Nexus",
        avatarInitial: "A",
    },
    {
        quote:
            "Zyra Digitals are the best. They completed the website within the deadline and delivered a clean, professional, and user-friendly experience. I highly recommend them to anyone looking to create premium websites.",
        author: "James Wilson",
        role: "Marketing Head, Elevate",
        avatarInitial: "J",
    },
    {
        quote:
            "This agency understands every detail and made my website and my friend's website at a very reasonable price, which looks very premium. Highly recommended!",
        author: "Ishaan Verma",
        role: "CEO, Zentry",
        avatarInitial: "I",
    },
];

export const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-24 bg-secondary/10 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                            What Our <span className="text-gold">Clients Say</span>
                        </h2>
                        <p className="font-secondary text-lg text-muted-foreground max-w-2xl mx-auto">
                            Don't just take our word for it. Hear from the visionary founders and businesses we've helped grow.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="bg-card border border-border rounded-[2rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden"
                    >
                        {/* Background Decorative Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

                        <div className="flex flex-col items-center text-center relative z-10">
                            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-8 border border-gold/20">
                                <Quote className="text-gold" size={32} />
                            </div>

                            <blockquote className="font-heading text-xl sm:text-2xl md:text-3xl leading-relaxed text-foreground mb-10 font-medium italic">
                                "{testimonials[currentIndex].quote}"
                            </blockquote>

                            <div className="flex items-center gap-4 text-left">
                                <div className="w-14 h-14 bg-gradient-to-br from-gold to-gold/60 rounded-full flex items-center justify-center shadow-lg border-2 border-white/10">
                                    <span className="font-heading text-xl font-bold text-white">
                                        {testimonials[currentIndex].avatarInitial}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-heading text-lg font-bold text-foreground">
                                        {testimonials[currentIndex].author}
                                    </h4>
                                    <p className="font-secondary text-sm text-gold font-medium">
                                        {testimonials[currentIndex].role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-3 mt-10">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-gold w-8" : "bg-gold/20 w-2.5 hover:bg-gold/40"
                                    }`}
                                aria-label={`Switch to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
