import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

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
    const [isInView, setIsInView] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setIsInView(true);
                    setHasAnimated(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [hasAnimated]);

    return (
        <>
            {/* Invisible trigger element */}
            <div ref={sectionRef} className="absolute top-1/2 left-0 w-full h-1 pointer-events-none" />

            {/* Full-page tech rainstorm overlay */}
            <div className="fixed inset-0 z-50 pointer-events-none">
                {technologies.map((tech, index) => (
                    <FullPageFallingTechIcon 
                        key={tech.name} 
                        tech={tech} 
                        index={index}
                        isInView={isInView}
                    />
                ))}
            </div>
        </>
    );
};

const FullPageFallingTechIcon = ({ 
    tech, 
    index, 
    isInView
}: { 
    tech: { name: string; logo: string }; 
    index: number;
    isInView: boolean;
}) => {
    // Completely random coordinates and physics
    const startX = Math.random() * 100; // Completely random starting position
    const endX = Math.random() * 100; // Random ending position
    const fallDelay = Math.random() * 2; // Random delay up to 2 seconds
    
    // Random bounce sequence with unpredictable collision points
    const generateRandomFallSequence = () => {
        const sequence = [-100]; // Start way above viewport
        
        // Generate 6-8 random collision points throughout page height
        const numBounces = 6 + Math.floor(Math.random() * 3); // 6-8 bounces
        
        for (let i = 0; i < numBounces; i++) {
            const collisionHeight = Math.random() * 800 + 100; // Random heights between 100-900px
            sequence.push(collisionHeight);
            
            // Random bounce back up (or sometimes continue down)
            const bounceBack = collisionHeight - (Math.random() * 50 + 20);
            sequence.push(bounceBack);
        }
        
        // Final landing at random bottom position
        sequence.push(900 + Math.random() * 200);
        
        return sequence;
    };

    const fallSequence = generateRandomFallSequence();
    const bounceDuration = 8 + Math.random() * 4; // Random duration 8-12 seconds

    // Random rotation sequence
    const generateRandomRotation = () => {
        const rotations = [0];
        for (let i = 0; i < fallSequence.length - 1; i++) {
            rotations.push(Math.random() * 720 - 360); // Random rotations
        }
        return rotations;
    };

    const rotationSequence = generateRandomRotation();

    // Random scale sequence for chaotic deformation
    const generateRandomScale = () => {
        const scales = [1];
        for (let i = 0; i < fallSequence.length - 1; i++) {
            scales.push(0.5 + Math.random() * 0.8); // Random scales between 0.5-1.3
        }
        return scales;
    };

    const scaleSequence = generateRandomScale();

    return (
        <motion.div
            className="absolute"
            initial={{
                left: `${startX}%`,
                top: '-100px',
                scale: 1,
                rotate: 0,
            }}
            animate={isInView ? {
                top: fallSequence,
                left: fallSequence.map(() => `${Math.random() * 100}%`), // Random horizontal drift
                scale: scaleSequence,
                rotate: rotationSequence,
            } : {}}
            transition={{
                duration: bounceDuration,
                delay: fallDelay,
                ease: "easeOut",
                times: fallSequence.map((_, i) => i / (fallSequence.length - 1)),
            }}
        >
            <div className="relative group">
                <div className="flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-white/20 backdrop-blur-sm shadow-lg flex items-center justify-center overflow-hidden border border-white/50">
                        <img
                            src={tech.logo}
                            alt={tech.name}
                            className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain"
                            title={tech.name}
                            loading="lazy"
                        />
                    </div>
                </div>
                <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-[10px] font-secondary font-bold text-white/80 uppercase tracking-[0.1em] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {tech.name}
                </span>
            </div>
        </motion.div>
    );
};
