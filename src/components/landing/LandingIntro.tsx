import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const LandingIntro = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });

    const text = "We craft digital experiences that merge spatial design with interactive technology. A new era of web architecture.";
    const words = text.split(" ");

    return (
        <section ref={containerRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
                <div className="md:w-1/3">
                    <span className="text-xs font-bold uppercase tracking-widest border-b border-foreground/20 pb-2">
                        About Us
                    </span>
                </div>

                <div className="md:w-2/3">
                    <p className="text-3xl md:text-5xl font-heading font-medium leading-[1.15] flex flex-wrap gap-x-3 gap-y-1">
                        {words.map((word, i) => (
                            <span key={i} className="relative overflow-hidden inline-block">
                                <motion.span
                                    initial={{ y: "100%" }}
                                    animate={isInView ? { y: 0 } : {}}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.02 }}
                                    className="inline-block"
                                >
                                    {word}
                                </motion.span>
                            </span>
                        ))}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default LandingIntro;
