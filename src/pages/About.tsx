import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Users, Sparkles, Clock } from "lucide-react";
import SEO from "@/components/SEO";
import StaggeredAnimation from "@/components/StaggeredAnimation";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { useParallax } from "@/hooks/useParallax";
import aboutBackground from "@/assets/about-background.jpg";

const stats = [
  { icon: Award, label: "Years of Excellence", value: 15, suffix: "+" },
  { icon: Users, label: "Happy Clients", value: 200, suffix: "+" },
  { icon: Sparkles, label: "Projects Completed", value: 350, suffix: "+" },
  { icon: Clock, label: "On-Time Delivery", value: 98, suffix: "%" },
];

const About = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const text = "We craft digital experiences that merge spatial design with interactive technology. Our philosophy centers on minimalism, precision, and timeless elegance.";
  const words = text.split(" ");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEO 
        title="About Our Philosophy"
        description="Learn about the VEDARA approach to luxury interior design, focusing on timeless elegance and bespoke craftsmanship."
      />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
            <div className="md:w-1/3">
              <span className="text-xs font-bold uppercase tracking-widest border-b border-foreground/20 pb-2">
                About Us
              </span>
            </div>

            <div className="md:w-2/3">
              <h1 className="text-3xl md:text-5xl font-heading font-medium leading-[1.15] flex flex-wrap gap-x-3 gap-y-1 mb-12">
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
              </h1>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section ref={containerRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-foreground/10">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
            <div className="md:w-1/3">
              <span className="text-xs font-bold uppercase tracking-widest border-b border-foreground/20 pb-2">
                Philosophy
              </span>
            </div>

            <div className="md:w-2/3 space-y-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-heading font-medium">Timeless Design</h2>
                <p className="text-foreground/70 leading-relaxed">
                  We create spaces that transcend trends, focusing on classic proportions, 
                  premium materials, and sophisticated aesthetics that stand the test of time.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-heading font-medium">Bespoke Approach</h2>
                <p className="text-foreground/70 leading-relaxed">
                  Every project is uniquely tailored to our clients' vision, lifestyle, and aspirations. 
                  We don't follow templates—we craft individualized experiences.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-heading font-medium">Precision Execution</h2>
                <p className="text-foreground/70 leading-relaxed">
                  From concept to completion, we manage every detail with precision, 
                  ensuring a seamless experience and impeccable results.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default About;