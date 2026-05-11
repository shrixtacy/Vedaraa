import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
    { label: "Completed Projects", value: 10, suffix: "+" },
    { label: "Years of Experience", value: 15, suffix: "+" },
    { label: "Design Concepts", value: 25, suffix: "+" },
    { label: "Happy Clients", value: 300, suffix: "+" }
];


const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 2000;
            const increment = end / (duration / 16);
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <span ref={ref} className="text-6xl md:text-8xl font-heading font-medium text-primary">
            {count}{suffix}
        </span>
    );
};

const LandingStats = () => {
    return (
        <section className="py-32 px-6 md:px-12 bg-background border-y border-primary/10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center"
                        >
                            <Counter value={stat.value} suffix={stat.suffix} />
                            <span className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="mt-32 p-12 border border-primary/20 rounded-sm relative overflow-hidden group"
                >
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-2xl">
                            <h3 className="text-3xl md:text-5xl font-heading mb-6">Uncompromising Quality in Every Detail</h3>
                            <p className="text-muted-foreground text-lg">
                                We hold ourselves to the highest standards of architectural integrity and design excellence, 
                                ensuring that every square inch of your project is a masterpiece.
                            </p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-5 bg-primary text-primary-foreground text-xs uppercase tracking-widest font-bold hover:shadow-gold transition-all duration-300"
                        >
                            Explore Our Process
                        </motion.button>
                    </div>
                    
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                </motion.div>
            </div>
        </section>
    );
};

export default LandingStats;
