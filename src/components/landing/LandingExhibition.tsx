import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

const projects = [
    {
        title: "VILLA AZURE",
        category: "Residential",
        image: "/portfolio-1.jpg",
        id: 1,
    },
    {
        title: "NEXUS TOWER",
        category: "Commercial",
        image: "/portfolio-2.jpg",
        id: 2,
    },
    {
        title: "OASIS RESORT",
        category: "Hospitality",
        image: "/portfolio-3.jpg",
        id: 3,
    },
    {
        title: "URBAN LOFT",
        category: "Interior",
        image: "/portfolio-4.jpg",
        id: 4,
    },
];

const LandingExhibition = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-background">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden pl-12 md:pl-24">
                <motion.div style={{ x }} className="flex gap-12 md:gap-24">
                    <div className="flex flex-col justify-center min-w-[30vw] md:min-w-[20vw]">
                        <h2 className="text-6xl md:text-8xl font-heading font-medium leading-none">
                            SELECTED <br /> WORKS
                        </h2>
                        <p className="mt-8 text-sm uppercase tracking-widest opacity-60">
                            Swipe to Explore
                        </p>
                    </div>

                    {projects.map((project) => (
                        <div key={project.id} className="relative group w-[80vw] md:w-[60vh] aspect-[3/4] overflow-hidden bg-secondary/50 grayscale hover:grayscale-0 transition-all duration-700">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.5 }}
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute bottom-0 left-0 w-full p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                <span className="text-white text-xs uppercase tracking-widest block mb-2">{project.category}</span>
                                <h3 className="text-white text-3xl font-heading">{project.title}</h3>
                            </div>
                        </div>
                    ))}

                    {/* End Spacer */}
                    <div className="w-[10vw]"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default LandingExhibition;
