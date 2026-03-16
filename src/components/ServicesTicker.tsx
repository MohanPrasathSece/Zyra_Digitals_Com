import { motion } from "framer-motion";

export const ServicesTicker = () => {
  const services = [
    "WEB DESIGN",
    "DEVELOPMENT", 
    "SEO OPTIMIZATION",
    "BRAND STRATEGY",
    "POSTER DESIGN",
    "LOGO DESIGN",
    "BANNER DESIGN",
    "HOSTING",
    "DEPLOYMENT",
    "FRONTEND DESIGN",
    "E-COMMERCE SOLUTIONS"
  ];

  // Duplicate services for infinite scroll effect
  const duplicatedServices = [...services, ...services, ...services];

  return (
    <div className="w-full py-8 bg-black overflow-hidden">
      <div className="relative">
        <motion.div
          className="flex gap-8 lg:gap-16 items-center whitespace-nowrap"
          animate={{
            x: [0, -2800], // Adjust based on content width
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedServices.map((service, index) => (
            <div
              key={index}
              className="flex items-center text-white font-heading text-4xl lg:text-6xl font-bold tracking-tight leading-tight"
            >
              {service}
              {index < duplicatedServices.length - 1 && (
                <span className="mx-4 lg:mx-8 text-white/60">•</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
