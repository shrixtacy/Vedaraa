import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
    {
        id: "01",
        title: "Architecture",
        description: "Designing spaces that inspire and endure. From residential villas to commercial landmarks.",
        image: "/portfolio-4.jpg"
    },
    {
        id: "02",
        title: "Interior Design",
        description: "Curating bespoke interiors that reflect your identity with a focus on luxury and comfort.",
        image: "/portfolio-5.jpg"
    },
    {
        id: "03",
        title: "Urban Planning",
        description: "Sustainable development strategies for modern communities and smart cities.",
        image: "/portfolio-6.jpg"
    },
    {
        id: "04",
        title: "Sustainability",
        description: "Eco-friendly solutions integrated into every aspect of the design process.",
        image: "/portfolio-3.jpg"
    }
];

const LandingServices = () => {
    const [hoveredService, setHoveredService] = useState<number | null>(null);

    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-background text-foreground">
            <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/3">
                    <span className="text-xs font-bold uppercase tracking-widest border-b border-foreground/20 pb-2">
                        Our Expertise
                    </span>
                    <p className="mt-8 text-lg opacity-70 max-w-xs">
                        We offer a comprehensive suite of design services tailored to elevate your vision.
                    </p>
                </div>

                <div className="md:w-2/3 flex flex-col">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className="group relative border-b border-foreground/20 py-12 transition-colors hover:bg-secondary/20 cursor-none"
                            onMouseEnter={() => setHoveredService(index)}
                            onMouseLeave={() => setHoveredService(null)}
                        >
                            <div className="flex items-baseline justify-between">
                                <div className="flex items-baseline gap-8">
                                    <span className="text-xs font-mono opacity-50">{service.id}</span>
                                    <h3 className="text-4xl md:text-6xl font-heading font-medium group-hover:pl-4 transition-all duration-300">
                                        {service.title}
                                    </h3>
                                </div>
                                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-2 group-hover:-translate-y-2" />
                            </div>

                            <AnimatePresence>
                                {hoveredService === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-4 pl-12 md:pl-20 flex gap-8 items-center">
                                            <p className="max-w-md text-muted-foreground">{service.description}</p>
                                            {/* Floating Image Preview on Hover (Mobile hidden) */}
                                            <motion.img
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                src={service.image}
                                                alt={service.title}
                                                className="hidden md:block w-48 h-32 object-cover rounded-sm grayscale"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LandingServices;
