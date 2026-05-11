import { motion } from "framer-motion";

const steps = [
    {
        title: "Consultation",
        description: "An in-depth dialogue to understand your vision, requirements, and the essence of the project.",
        id: "01"
    },
    {
        title: "Concept",
        description: "Translating ideas into visionary design concepts, mood boards, and spatial layouts.",
        id: "02"
    },
    {
        title: "Creation",
        description: "Meticulous technical planning and selection of the finest materials to bring the concept to life.",
        id: "03"
    },
    {
        title: "Curation",
        description: "The final orchestration of elements, ensuring every detail aligns with the original vision.",
        id: "04"
    }
];

const LandingProcess = () => {
    return (
        <section className="py-32 px-6 md:px-12 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div className="max-w-2xl">
                        <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block">The Journey</span>
                        <h2 className="text-5xl md:text-8xl font-heading leading-[0.9] tracking-tighter">
                            FROM CONCEPT <br /> TO <span className="text-primary italic font-serif">CURATION</span>
                        </h2>
                    </div>
                    <p className="text-muted-foreground text-lg max-w-sm pb-2">
                        Our structured approach ensures precision and excellence at every stage of the design process.
                    </p>
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-primary/20 -translate-x-1/2 hidden md:block" />

                    <div className="space-y-24">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-0 ${
                                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                }`}
                            >
                                {/* Step Content */}
                                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-24 md:text-right" : "md:pl-24"}`}>
                                    <span className="text-xs font-mono text-primary/60 mb-4 block">{step.id}</span>
                                    <h3 className="text-3xl md:text-5xl font-heading mb-6 group-hover:text-primary transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-muted-foreground text-lg max-w-md mx-auto md:mx-0">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Timeline Point */}
                                <div className="absolute left-0 md:left-1/2 top-0 md:top-12 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10 hidden md:block" />

                                <div className="w-full md:w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingProcess;
