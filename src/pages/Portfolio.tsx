import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StaggeredAnimation from "@/components/StaggeredAnimation";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { useParallax } from "@/hooks/useParallax";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";
import portfolioBackground from "@/assets/portfolio-background.jpg";

const portfolioItems = [
  { 
    id: 1, 
    title: "Luxury Living Room", 
    category: "Residential", 
    image: portfolio1,
    description: "A contemporary living space featuring custom Italian marble flooring, bespoke velvet furnishings, and curated art pieces. The design emphasizes natural light with floor-to-ceiling windows and integrates smart home technology seamlessly.",
    area: "3,500 sq ft",
    year: "2024"
  },
  { 
    id: 2, 
    title: "Premium Bedroom Suite", 
    category: "Residential", 
    image: portfolio2,
    description: "Master bedroom sanctuary with walk-in closet and en-suite spa bathroom. Features include handcrafted wooden paneling, luxury bedding, and ambient lighting systems for the perfect retreat.",
    area: "1,200 sq ft",
    year: "2024"
  },
  { 
    id: 3, 
    title: "Designer Kitchen", 
    category: "Residential", 
    image: portfolio3,
    description: "A chef's dream kitchen with professional-grade appliances, marble countertops, and custom cabinetry. The open layout encourages entertaining while maintaining functionality.",
    area: "800 sq ft",
    year: "2023"
  },
  { 
    id: 4, 
    title: "Elegant Dining Space", 
    category: "Residential", 
    image: portfolio4,
    description: "Formal dining room with statement chandelier, custom dining table, and luxurious window treatments. Perfect for intimate dinners and grand celebrations alike.",
    area: "600 sq ft",
    year: "2023"
  },
  { 
    id: 5, 
    title: "Executive Home Office", 
    category: "Commercial", 
    image: portfolio5,
    description: "Professional workspace designed for productivity and style. Features built-in storage, ergonomic furniture, and sophisticated finishes that inspire success.",
    area: "400 sq ft",
    year: "2024"
  },
  { 
    id: 6, 
    title: "Spa-Inspired Bathroom", 
    category: "Residential", 
    image: portfolio6,
    description: "Luxurious bathroom retreat with freestanding tub, rain shower, heated floors, and premium fixtures. Natural stone and minimalist design create a serene atmosphere.",
    area: "350 sq ft",
    year: "2023"
  },
];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof portfolioItems[0] | null>(null);
  const { elementRef, transform } = useParallax({ speed: 0.3 });

  const categories = ["All", "Residential", "Commercial"];
  const filteredItems = selectedCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main>
        <section ref={elementRef} className="relative py-32 px-6 overflow-hidden min-h-screen flex items-center">
          {/* Parallax Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center parallax-bg"
            style={{ 
              backgroundImage: `url(${portfolioBackground})`,
              transform: transform,
            }}
          >
            <div className="absolute inset-0 bg-black/75" />
          </div>

          <div className="container mx-auto relative z-10">
            <ScrollAnimationWrapper animationType="fadeUp">
              <div className="text-center mb-12">
                <p className="text-primary font-accent text-4xl mb-4">Our Work</p>
                <h1 className="text-5xl font-heading mb-6">Portfolio Showcase</h1>
                <div className="w-24 h-[1px] bg-primary mx-auto" />
              </div>
            </ScrollAnimationWrapper>

            {/* Category Filter */}
            <ScrollAnimationWrapper animationType="fadeIn" delay={0.2}>
              <div className="flex justify-center gap-4 mb-12">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "luxury" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-primary text-primary-foreground" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </ScrollAnimationWrapper>

            <StaggeredAnimation 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              staggerDelay={0.15}
              animationType="fadeUp"
            >
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-sm border border-primary/20 cursor-pointer"
                  onClick={() => setSelectedProject(item)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6">
                    <p className="text-primary text-sm uppercase tracking-wider mb-2">{item.category}</p>
                    <h3 className="text-foreground text-2xl font-heading text-center mb-4">{item.title}</h3>
                    <button className="border border-primary px-6 py-2 text-foreground hover:bg-primary hover:text-primary-foreground transition-smooth">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </StaggeredAnimation>

            {/* Project Details Modal */}
            <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
              <DialogContent className="max-w-3xl bg-background border-primary/30">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-heading text-primary">
                    {selectedProject?.title}
                  </DialogTitle>
                </DialogHeader>
                {selectedProject && (
                  <div className="space-y-6">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-96 object-cover rounded-sm"
                    />
                    <div className="flex gap-6 text-sm text-muted-foreground">
                      <div>
                        <span className="text-primary font-semibold">Category:</span> {selectedProject.category}
                      </div>
                      <div>
                        <span className="text-primary font-semibold">Area:</span> {selectedProject.area}
                      </div>
                      <div>
                        <span className="text-primary font-semibold">Year:</span> {selectedProject.year}
                      </div>
                    </div>
                    <p className="text-foreground leading-relaxed">{selectedProject.description}</p>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;