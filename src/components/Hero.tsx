import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
import { scrollToSection } from "@/lib/scroll";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  const { elementRef, transform } = useParallax({ speed: 0.5 });

  return (
    <section ref={elementRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center parallax-bg"
        style={{ 
          backgroundImage: `url(${heroBackground})`,
          transform: transform,
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>


      {/* Content */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl animate-fade-in">
          <div className="space-y-8">
            <div>
              <h1 className="text-7xl md:text-8xl font-heading mb-6 leading-tight">
                Crafting Spaces<br />
                <span className="text-primary font-accent text-6xl md:text-7xl">That Speak Elegance</span>
              </h1>
              <p className="text-foreground/90 text-xl leading-relaxed max-w-2xl">
                At VEDARA, we believe every space tells a story. With meticulous attention to detail and 
                a passion for timeless design, we transform interiors into extraordinary experiences.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                variant="luxury" 
                size="lg"
                onClick={() => scrollToSection("downloads")}
                className="shadow-gold"
              >
                <Download className="mr-2" />
                Download Portfolio
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection("meeting")}
                className="border-primary/50 text-foreground hover:bg-primary/10"
              >
                <Calendar className="mr-2" />
                Book Consultation
              </Button>
            </div>

            <div className="border-t border-primary/20 pt-8 mt-12">
              <p className="text-base text-foreground/70 italic font-light">
                "Design is not just what it looks like and feels like. Design is how it works."
              </p>
              <p className="text-primary font-accent text-2xl mt-2">— Surya, Founder & Principal Designer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
