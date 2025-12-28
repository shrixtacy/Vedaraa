import { useEffect, useRef } from "react";

const GoldenDust = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const particles: Particle[] = [];
        const particleCount = 200; // Adjust density

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
            alpha: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                // Horizontal flow
                this.vx = Math.random() * 0.5 + 0.2;
                this.vy = Math.random() * 0.2 - 0.1;
                this.size = Math.random() * 2.5; // Varied sizes
                this.alpha = Math.random() * 0.5 + 0.2;

                // Golden palette
                const colors = [
                    "212, 175, 55", // Metallic Gold
                    "255, 215, 0",  // Gold
                    "184, 134, 11", // Dark Goldenrod
                    "238, 232, 170" // Pale Goldenrod
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Wave motion
                this.y += Math.sin(this.x * 0.005) * 0.2;

                // Reset if out of bounds
                if (this.x > width) {
                    this.x = -10;
                    this.y = Math.random() * height;
                }
                if (this.y > height) this.y = 0;
                if (this.y < 0) this.y = height;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
                ctx.fill();

                // Add a slight glow to some particles
                if (this.size > 2) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = `rgba(${this.color}, 0.5)`;
                } else {
                    ctx.shadowBlur = 0;
                }
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            // Create a trail effect by not fully clearing
            // But user wanted "clean" black background, so maybe full clear is better
            // Let's try slight trails for "water" feel
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Very transparent black to create trails
            // Actually strictly clearing is safer for performance and cleanliness if we want crisp dust
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p) => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ background: 'transparent' }}
        />
        // Parent should provide background color (black)
    );
};

export default GoldenDust;
