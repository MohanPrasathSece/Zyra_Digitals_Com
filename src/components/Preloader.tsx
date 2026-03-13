import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const duration = 1000; // Fast loading
        const intervalTime = duration / 100;

        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 1;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (count === 100) {
            const timeout = setTimeout(() => {
                setIsExiting(true);
                setTimeout(() => {
                    setIsVisible(false);
                    onComplete();
                }, 600);
            }, 200);
            return () => clearTimeout(timeout);
        }
    }, [count, onComplete]);

    if (!isVisible) return null;

    return (
        <div
            className={cn(
                "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] transition-all duration-700 ease-in-out overflow-hidden",
                isExiting ? "translate-y-[-100%]" : "translate-y-0"
            )}
        >
            {/* Film Grain / Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Vintage Border/Frame */}
            <div className="absolute inset-8 border border-white/5 pointer-events-none" />
            <div className="absolute inset-12 border border-white/10 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
                {/* Top Ornament */}
                <div className="mb-12 flex items-center gap-4 opacity-40">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-white" />
                    <div className="w-2 h-2 rounded-full border border-white rotate-45" />
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-white" />
                </div>

                {/* Counter - Clean Sans Font */}
                <div className="relative mb-4">
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-secondary text-[10px] tracking-[0.5em] uppercase text-white/30">
                        Initialising
                    </span>
                    <h2 className="font-subheading text-[10rem] md:text-[14rem] font-bold text-[#f5f5f5] leading-none tracking-tighter selection:bg-none">
                        {count.toString().padStart(2, "0")}
                    </h2>
                    <span className="absolute -bottom-4 right-0 font-secondary text-sm text-white/40">
                        EST. 2024
                    </span>
                </div>

                {/* Brand Label */}
                <div className="mt-8 flex flex-col items-center">
                    <span className="font-heading text-xl md:text-2xl text-white/80 tracking-widest uppercase mb-2">
                        Zyra Digitals
                    </span>
                    <p className="font-secondary text-[10px] tracking-[0.3em] text-white/30 uppercase">
                        Creative Agency
                    </p>
                </div>

                {/* Bottom Ornament */}
                <div className="mt-12 flex items-center gap-4 opacity-40">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-white" />
                    <div className="w-2 h-2 rounded-full border border-white rotate-45" />
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-white" />
                </div>
            </div>
            {/* Side Numbers (Vintage Aesthetic) */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-8 opacity-5 font-secondary text-[10px] tracking-widest vertical-text hidden md:flex">
                <span>001 - BRANDING</span>
                <span>002 - DESIGN</span>
                <span>003 - CODE</span>
            </div>
        </div>
    );
};
