import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import StaggeredAnimation from "@/components/StaggeredAnimation";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { useParallax } from "@/hooks/useParallax";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";
import work7 from "@/assets/work-7.jpg";
import portfolioBackground from "@/assets/portfolio-background.jpg";

const portfolioItems = [
  { 
    id: 1, 
    title: "MODERN KITCHEN", 
    category: "Residential", 
    image: work1,
    description: "A sleek, contemporary kitchen design featuring teal cabinetry, minimalist hardware, and optimized spatial flow for modern culinary needs.",
    area: "450 sq ft",
    year: "2024"
  },
  { 
    id: 2, 
    title: "CONTEMPORARY BEDROOM", 
    category: "Residential", 
    image: work2,
    description: "A luxurious bedroom suite with custom wood paneling, integrated mood lighting, and a sophisticated color palette designed for tranquility.",
    area: "550 sq ft",
    year: "2024"
  },
  { 
    id: 3, 
    title: "MASTER SUITE", 
    category: "Residential", 
    image: work3,
    description: "Our signature master suite design focusing on layered lighting, high-end textures, and a seamless integration of storage and comfort.",
    area: "650 sq ft",
    year: "2024"
  },
  { 
    id: 4, 
    title: "LIVING SPACES", 
    category: "Residential", 
    image: work5,
    description: "An elegant living area featuring a custom-built TV unit with wood accents and ambient backlighting, creating a perfect space for relaxation.",
    area: "800 sq ft",
    year: "2024"
  },
  { 
    id: 5, 
    title: "CHIC INTERIORS", 
    category: "Residential", 
    image: work6,
    description: "A refined interior space that balances bold textures with soft lighting, creating an atmosphere of understated luxury.",
    area: "400 sq ft",
    year: "2024"
  },
  { 
    id: 6, 
    title: "MINIMALIST BEDROOM", 
    category: "Residential", 
    image: work7,
    description: "A clean, minimalist approach to bedroom design that prioritizes space, light, and essential forms for a peaceful living experience.",
    area: "500 sq ft",
    year: "2024"
  },
  { 
    id: 7, 
    title: "DESIGNER SUITE", 
    category: "Residential", 
    image: work4,
    description: "A versatile designer suite that showcases our ability to blend functionality with artistic expression in high-end residential projects.",
    area: "600 sq ft",
    year: "2024"
  },
];


const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof portfolioItems[0] | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const categories = ["All", "Residential", "Commercial"];
  const filteredItems = selectedCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEO 
        title="Our Portfolio"
        description="Explore VEDARA's collection of luxury residential and commercial interior design projects. Bespoke solutions for modern living."
      />
      
      <main className="flex-1">
        {/* Header Section */}
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
            <div className="md:w-1/3">
              <span className="text-xs font-bold uppercase tracking-widest border-b border-foreground/20 pb-2">
                Portfolio
              </span>
            </div>

            <div className="md:w-2/3">
              <h1 className="text-3xl md:text-5xl font-heading font-medium leading-[1.15] mb-8">
                Selected Works
              </h1>
              <p className="text-foreground/70 leading-relaxed mb-8">
                A curated collection of our finest spatial design projects, 
                showcasing our commitment to excellence and innovation.
              </p>

              {/* Category Filter */}
              <div className="flex gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-sm uppercase tracking-wider pb-2 border-b transition-colors ${
                      selectedCategory === category
                        ? "border-primary text-primary"
                        : "border-transparent text-foreground/50 hover:text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section ref={containerRef} className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-foreground/10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(item)}
              >
                <div className="relative overflow-hidden mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-heading font-medium group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xs text-foreground/50 uppercase tracking-wider">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/70">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Project Details Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-3xl bg-background border-foreground/20">
            <DialogHeader>
              <DialogTitle className="text-2xl font-heading">
                {selectedProject?.title}
              </DialogTitle>
            </DialogHeader>
            {selectedProject && (
              <div className="space-y-6">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-96 object-cover"
                />
                <div className="flex gap-6 text-sm text-foreground/70">
                  <div>
                    <span className="font-medium">Category:</span> {selectedProject.category}
                  </div>
                  <div>
                    <span className="font-medium">Area:</span> {selectedProject.area}
                  </div>
                  <div>
                    <span className="font-medium">Year:</span> {selectedProject.year}
                  </div>
                </div>
                <p className="text-foreground/80 leading-relaxed">{selectedProject.description}</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>

    </div>
  );
};

export default Portfolio;