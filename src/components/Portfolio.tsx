import { useEffect, useState } from "react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";
import portfolioBackground from "@/assets/portfolio-background.jpg";

const portfolioItems = [
  { id: 1, title: "Luxury Living Room", category: "Residential", image: portfolio1 },
  { id: 2, title: "Premium Bedroom Suite", category: "Residential", image: portfolio2 },
  { id: 3, title: "Designer Kitchen", category: "Residential", image: portfolio3 },
  { id: 4, title: "Elegant Dining Space", category: "Residential", image: portfolio4 },
  { id: 5, title: "Executive Home Office", category: "Commercial", image: portfolio5 },
  { id: 6, title: "Spa-Inspired Bathroom", category: "Residential", image: portfolio6 },
];

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="portfolio" className="relative py-32 px-6 overflow-hidden min-h-screen flex items-center">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${portfolioBackground})`,
          transform: `translateY(${(scrollY - 1800) * 0.4}px)`,
        }}
      >
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-primary font-accent text-4xl mb-4">Our Work</p>
          <h2 className="text-5xl font-heading mb-6">Portfolio Showcase</h2>
          <div className="w-24 h-[1px] bg-primary mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-sm border border-primary/20 animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
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
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
