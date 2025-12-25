import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LandingHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-background">
            {/* Parallax Background */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-white/10 z-10" />
                <img
                    src="/hero-background.jpg"
                    alt="Abstract Architecture"
                    className="w-full h-full object-cover grayscale opacity-80"
                />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="text-[12vw] sm:text-[15vw] font-bold font-heading leading-none tracking-tighter text-foreground mix-blend-overlay"
                >
                    VEDARA
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                    className="mt-8 flex flex-col items-center gap-4"
                >
                    <p className="text-sm uppercase tracking-[0.2em] font-medium opacity-70">
                        Spatial Design & Architecture
                    </p>

                    <div className="h-12 w-[1px] bg-foreground/20 mt-8 relative overflow-hidden">
                        <motion.div
                            animate={{ y: ["-100%", "100%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 top-0 w-full h-full bg-foreground"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LandingHero;
