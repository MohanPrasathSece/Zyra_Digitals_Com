import { motion } from "framer-motion";

const technologies = [
    { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Postman", logo: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Canva", logo: "https://www.vectorlogo.zone/logos/canva/canva-icon.svg" },
    { name: "Unity3D", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
];

export const TechStack = () => {
    // Triple the array to ensure seamless infinite scroll
    const duplicatedIcons = [...technologies, ...technologies, ...technologies];

    return (
        <section className="py-10 bg-white overflow-hidden relative">
            <div className="relative flex items-center justify-center min-h-[350px]">
                {/* Slow Auto-Marquee Container */}
                <motion.div
                    className="flex gap-16 items-center whitespace-nowrap"
                    animate={{
                        x: [0, -100 * technologies.length], // Move exactly one set of icons
                    }}
                    transition={{
                        duration: 60, // Slow scroll
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {duplicatedIcons.map((tech, index) => (
                        <TechIcon key={`${tech.name}-${index}`} tech={tech} index={index} />
                    ))}
                </motion.div>
            </div>

            {/* Edge masks for smooth fade */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
        </section>
    );
};

const TechIcon = ({ tech, index }: { tech: { name: string; logo: string }; index: number }) => {
    return (
        <motion.div
            className="relative group flex flex-col items-center gap-4 px-6"
            animate={{
                y: [0, -80, 0, 80, 0], // Even bigger curves
            }}
            transition={{
                duration: 10, // Slower, more majestic wave
                repeat: Infinity,
                ease: [0.45, 0, 0.55, 1], // Custom cubic-bezier for a perfect sine-wave feel
                delay: index * 0.5, // Adjusted stagger for better wave formation
            }}
        >
            <div className="flex items-center justify-center transition-all duration-500 hover:scale-150">
                <img
                    src={tech.logo}
                    alt={tech.name}
                    className="w-28 h-28 object-contain transition-all duration-500"
                    title={tech.name}
                    loading="lazy"
                />
            </div>
            <span className="text-[11px] font-secondary font-bold text-foreground/40 uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {tech.name}
            </span>
        </motion.div>
    );
};
