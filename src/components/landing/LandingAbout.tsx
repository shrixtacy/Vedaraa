import { motion } from "framer-motion";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";

const contentBlocks = [
    {
        title: "OUR PHILOSOPHY",
        text: "Vedara is more than a design studio; it is a philosophy of living. We believe that spaces have souls, and our mission is to awaken them through meticulous craftsmanship and visionary design.",
        image: work1,
        align: "left"
    },
    {
        title: "SPATIAL INTELLIGENCE",
        text: "Our approach blends timeless elegance with modern spatial intelligence. Each project is a unique narrative, curated to reflect the distinct identity of those who inhabit it.",
        image: work2,
        align: "right"
    },
    {
        title: "MATERIAL HARMONY",
        text: "From the initial sketch to the final touch, we prioritize harmony, light, and materiality. Our work is a testament to the power of detail and the luxury of simplicity.",
        image: work3,
        align: "left"
    }
];

const LandingAbout = () => {
    return (
        <section className="py-32 px-6 md:px-12 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-32 text-center md:text-left"
                >
                    <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block">About the Studio</span>
                    <h2 className="text-5xl md:text-8xl font-heading leading-[0.9] tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#D4AF37]">
                        REDEFINING THE <br /> ESSENCE OF LUXURY
                    </h2>
                </motion.div>

                <div className="space-y-40">
                    {contentBlocks.map((block, index) => (
                        <div 
                            key={index} 
                            className={`flex flex-col ${block.align === "left" ? "md:flex-row" : "md:flex-row-reverse"} gap-12 md:gap-24 items-center`}
                        >
                            {/* Image Side */}
                            <motion.div 
                                initial={{ opacity: 0, x: block.align === "left" ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full md:w-1/2 aspect-[4/3] overflow-hidden rounded-sm border border-primary/10"
                            >
                                <motion.img 
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.6 }}
                                    src={block.image} 
                                    alt={block.title} 
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </motion.div>

                            {/* Text Side */}
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="w-full md:w-1/2 space-y-6"
                            >
                                <span className="text-xs font-mono text-primary/60">{`0${index + 1}`}</span>
                                <h3 className="text-3xl md:text-5xl font-heading">{block.title}</h3>
                                <div className="w-12 h-[1px] bg-primary/30" />
                                <p className="text-xl md:text-2xl font-light leading-relaxed text-foreground/70">
                                    {block.text}
                                </p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
            </div>
        </section>
    );
};

export default LandingAbout;
