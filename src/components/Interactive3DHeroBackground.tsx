
import { useEffect, useRef, useState } from 'react';

interface Particle {
    x: number;
    y: number;
    z: number;
    px: number;
    py: number;
    size: number;
    color: string;
}

export const Interactive3DHeroBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const mouse = { x: 0, y: 0, active: false };
        const rotation = { x: 0, y: 0 };
        const targetRotation = { x: 0, y: 0 };

        const PARTICLE_COUNT = window.innerWidth < 768 ? 400 : 1500;
        const FIELD_SIZE = 1200;
        const PROJECTION_DISTANCE = 800;

        setIsMobile(window.innerWidth < 768);

        const init = () => {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    x: (Math.random() - 0.5) * FIELD_SIZE * 2,
                    y: (Math.random() - 0.5) * FIELD_SIZE * 2,
                    z: (Math.random() - 0.5) * FIELD_SIZE * 2,
                    px: 0,
                    py: 0,
                    size: Math.random() * 2 + 1,
                    color: i % 5 === 0 ? 'rgba(184, 149, 81, 0.8)' : 'rgba(255, 255, 255, 0.4)'
                });
            }
        };

        const project = (p: Particle) => {
            // Rotation
            const cosX = Math.cos(rotation.x);
            const sinX = Math.sin(rotation.x);
            const cosY = Math.cos(rotation.y);
            const sinY = Math.sin(rotation.y);

            // Rotate Y
            let y1 = p.y * cosX - p.z * sinX;
            let z1 = p.z * cosX + p.y * sinX;

            // Rotate X
            let x1 = p.x * cosY - z1 * sinY;
            let z2 = z1 * cosY + p.x * sinY;

            // 3D to 2D Projection
            // Add safety offset to avoid division by zero or negative values when behind camera
            const zOffset = PROJECTION_DISTANCE + z2;
            if (zOffset <= 1) {
                p.px = -10000; // Move off screen
                p.py = -10000;
                return;
            }
            const factor = PROJECTION_DISTANCE / zOffset;
            p.px = x1 * factor + canvas.width / 2;
            p.py = y1 * factor + canvas.height / 2;

            // Repel from mouse
            if (mouse.active) {
                const dx = mouse.x - p.px;
                const dy = mouse.y - p.py;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const force = (150 - dist) / 150;
                    p.px -= dx * force * 0.5;
                    p.py -= dy * force * 0.5;
                }
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Smooth rotation transition
            rotation.x += (targetRotation.x - rotation.x) * 0.05;
            rotation.y += (targetRotation.y - rotation.y) * 0.05;

            // Sort by depth (Z) for correct layering paint-order
            // But for performance with many particles, we can skip or use simple opacity

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                project(p);

                // Only draw if on screen and in front of camera
                if (p.px > -100 && p.px < canvas.width + 100 && p.py > -100 && p.py < canvas.height + 100) {
                    const zScale = (p.z + FIELD_SIZE) / (FIELD_SIZE * 2);
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = zScale * 0.8;

                    // Safe size factor
                    const zOffset = PROJECTION_DISTANCE + p.z;
                    const sizeFactor = zOffset > 0 ? PROJECTION_DISTANCE / zOffset : 0;
                    const radius = Math.max(0.1, p.size * sizeFactor);

                    ctx.beginPath();
                    ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
                    ctx.fill();

                    // Optional: Lines between nearby particles
                    for (let j = i + 1; j < particles.length; j += 40) { // Step to keep performance high
                        const p2 = particles[j];
                        const dx = p.px - p2.px;
                        const dy = p.py - p2.py;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 100) {
                            ctx.strokeStyle = p.color;
                            ctx.globalAlpha = (1 - dist / 100) * zScale * 0.2;
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.moveTo(p.px, p.py);
                            ctx.lineTo(p2.px, p2.py);
                            ctx.stroke();
                        }
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            setIsMobile(window.innerWidth < 768);
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;

            // Map mouse position to rotation
            targetRotation.y = (e.clientX / window.innerWidth - 0.5) * 0.5;
            targetRotation.x = (e.clientY / window.innerHeight - 0.5) * -0.5;
        };

        const handleMouseLeave = () => {
            mouse.active = false;
            targetRotation.x = 0;
            targetRotation.y = 0;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        handleResize();
        draw();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
            style={{
                background: 'radial-gradient(circle at center, rgba(18, 18, 18, 0) 0%, rgba(10, 10, 10, 0.4) 100%)',
                filter: 'blur(0.8px)'
            }}
        />
    );
};
