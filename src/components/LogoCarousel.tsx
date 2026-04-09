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

    // Split logos into two different groups for the two rows
    const row1Logos = brandLogos.slice(0, 8);
    const row2Logos = brandLogos.slice(8);

    return (
        <div className="mt-8 lg:mt-12 py-16 lg:py-40 bg-white overflow-hidden relative border-y border-gray-100">
            {/* Decorative center title */}
            <div className="container mx-auto px-4 mb-28 lg:mb-48 text-center relative z-20">
                <span className="font-heading text-xs lg:text-sm font-bold tracking-[0.5em] uppercase text-gold mb-4 block">
                    Trusted By
                </span>
                <h2 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 tracking-tighter">
                    {title}
                </h2>
            </div>

            <div className="relative space-y-8 lg:space-y-12">
                {/* Edge masks for smooth fade */}
                <div className="absolute inset-y-0 left-0 w-20 lg:w-48 bg-gradient-to-r from-white via-white/40 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-20 lg:w-48 bg-gradient-to-l from-white via-white/40 to-transparent z-10 pointer-events-none" />

                {/* First Row: Moving Left */}
                <motion.div
                    className="flex gap-4 lg:gap-8 items-center whitespace-nowrap"
                    animate={{
                        x: [0, -1800],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {[...row1Logos, ...row1Logos, ...row1Logos, ...row1Logos].map((brand, index) => (
                        <div
                            key={`row1-${index}`}
                            className="flex items-center justify-center min-w-[100px] lg:min-w-[180px] h-16 lg:h-28 opacity-100 transition-all duration-500 hover:scale-110"
                        >
                            <img
                                src={brand.src}
                                alt={brand.name}
                                className="max-h-10 lg:max-h-20 max-w-[100px] lg:max-w-[160px] object-contain transition-all cursor-pointer"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </motion.div>

                {/* Second Row: Moving Right */}
                <motion.div
                    className="flex gap-4 lg:gap-8 items-center whitespace-nowrap"
                    animate={{
                        x: [-1800, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {[...row2Logos, ...row2Logos, ...row2Logos, ...row2Logos].map((brand, index) => (
                        <div
                            key={`row2-${index}`}
                            className="flex items-center justify-center min-w-[100px] lg:min-w-[180px] h-16 lg:h-28 opacity-100 transition-all duration-500 hover:scale-110"
                        >
                            <img
                                src={brand.src}
                                alt={brand.name}
                                className="max-h-10 lg:max-h-20 max-w-[100px] lg:max-w-[160px] object-contain transition-all cursor-pointer"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
