import { motion } from "framer-motion";

interface LogoCarouselProps {
    title?: string;
}

export const LogoCarousel = ({ title = "Brands We've Empowered" }: LogoCarouselProps) => {
    const brandLogos = [
        { name: "404", src: "/images/brands/404-logo-removebg-preview.png" },
        { name: "Blue & Black Logo", src: "/images/brands/Blue_and_Black_Minimalist_Brand_Logo-removebg-preview.png" },
        { name: "Ajanta", src: "/images/brands/ajanta.png" },
        { name: "Crowdverse", src: "/images/brands/crowdverse.png" },
        { name: "Ecom", src: "/images/brands/ecom.png" },
        { name: "Elevate", src: "/images/brands/elevate.png" },
        { name: "Femtricks", src: "/images/brands/femtricks.png" },
        { name: "Happy Dental", src: "/images/brands/happydental_newlogo-removebg-preview.png" },
        { name: "KPJ", src: "/images/brands/kpj_new_logo-removebg-preview.png" },
        { name: "New Logo", src: "/images/brands/new_logo-removebg-preview.png" },
        { name: "Nirvana", src: "/images/brands/nirvana.png" },
        { name: "Seek Buy Love", src: "/images/brands/seekbuylove.png" },
        { name: "Sevakai", src: "/images/brands/sevakai black.png" },
        { name: "SKR", src: "/images/brands/skr_logo-removebg-preview.png" },
        { name: "Sky Logo", src: "/images/brands/skylogo.png" },
    ];

    // Duplicate logos for infinite effect
    const duplicatedLogos = [...brandLogos, ...brandLogos, ...brandLogos];

    return (
        <div className="mt-8 lg:mt-12 py-16 lg:py-40 bg-white overflow-hidden relative border-y border-gray-100">
            {/* Decorative center title */}
            <div className="container mx-auto px-4 mb-12 lg:mb-20 text-center relative z-20">
                <span className="font-heading text-xs lg:text-sm font-bold tracking-[0.5em] uppercase text-gold mb-4 block">
                    Trusted By
                </span>
                <h2 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 tracking-tighter">
                    {title}
                </h2>
            </div>

            <div className="relative">
                {/* Edge masks for smooth fade */}
                <div className="absolute inset-y-0 left-0 w-20 lg:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-20 lg:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-3 lg:gap-14 items-center whitespace-nowrap px-4 lg:px-10"
                    animate={{
                        x: [0, -3000], // Adjusted movement for the updated count
                    }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {duplicatedLogos.map((brand, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center min-w-[150px] lg:min-w-[300px] h-24 lg:h-40 opacity-100 transition-all duration-500 hover:scale-110 group"
                        >
                            <img
                                src={brand.src}
                                alt={`${brand.name} logo - Trusted by Zyra Digitals`}
                                className="max-h-16 lg:max-h-36 max-w-[120px] lg:max-w-[280px] object-contain drop-shadow-[0_4px_25px_rgba(0,0,0,0.06)] transition-all"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
