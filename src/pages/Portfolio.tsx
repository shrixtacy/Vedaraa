import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const portfolioItems = [
  { 
    id: 1, 
    title: "Luxury Living Room", 
    category: "Residential", 
    image: portfolio1,
    description: "A contemporary living space featuring custom Italian marble flooring, bespoke velvet furnishings, and curated art pieces.",
    area: "3,500 sq ft",
    year: "2024"
  },
  { 
    id: 2, 
    title: "Premium Bedroom Suite", 
    category: "Residential", 
    image: portfolio2,
    description: "Master bedroom sanctuary with walk-in closet and en-suite spa bathroom.",
    area: "1,200 sq ft",
    year: "2024"
  },
  { 
    id: 3, 
    title: "Designer Kitchen", 
    category: "Residential", 
    image: portfolio3,
    description: "A chef's dream kitchen with professional-grade appliances and custom cabinetry.",
    area: "800 sq ft",
    year: "2023"
  },
  { 
    id: 4, 
    title: "Elegant Dining Space", 
    category: "Residential", 
    image: portfolio4,
    description: "Formal dining room with statement chandelier and luxurious finishes.",
    area: "600 sq ft",
    year: "2023"
  },
  { 
    id: 5, 
    title: "Executive Home Office", 
    category: "Commercial", 
    image: portfolio5,
    description: "Professional workspace designed for productivity and style.",
    area: "400 sq ft",
    year: "2024"
  },
  { 
    id: 6, 
    title: "Spa-Inspired Bathroom", 
    category: "Residential", 
    image: portfolio6,
    description: "Luxurious bathroom retreat with natural stone and minimalist design.",
    area: "350 sq ft",
    year: "2023"
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
      <Navbar />
      
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

      <Footer />
    </div>
  );
};

export default Portfolio;