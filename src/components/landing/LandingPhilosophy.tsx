import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LandingPhilosophy = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1.2]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="relative h-[120vh] overflow-hidden flex items-center justify-center">
            {/* Background Image with Parallax */}
            <motion.div 
                style={{ y, scale }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-black/60 z-10" />
                <img 
                    src="/hero-background.jpg" 
                    alt="Philosophy Background" 
                    className="w-full h-[140%] object-cover"
                />
            </motion.div>

            <motion.div 
                style={{ opacity }}
                className="relative z-20 text-center px-6 max-w-5xl"
            >
                <span className="text-xs uppercase tracking-[0.5em] text-primary/80 mb-8 block">Our Philosophy</span>
                <h2 className="text-6xl md:text-9xl font-heading font-bold text-white mb-12 leading-[0.9] tracking-tighter">
                    SPATIAL <br /> <span className="text-primary italic font-serif">POETRY</span>
                </h2>
                <div className="w-24 h-[1px] bg-primary mx-auto mb-12" />
                <p className="text-xl md:text-3xl font-light text-white/80 max-w-3xl mx-auto leading-relaxed">
                    We don't just build structures; we curate experiences that resonate with the human spirit, 
                    blending the tangible and intangible into a harmonious whole.
                </p>
            </motion.div>

            {/* Decorative Borders */}
            <div className="absolute inset-12 border border-primary/20 pointer-events-none z-30" />
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-40" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-40" />
        </section>
    );
};

export default LandingPhilosophy;
