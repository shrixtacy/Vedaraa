import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useParallax } from "@/hooks/useParallax";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  const { elementRef, transform } = useParallax({ speed: 0.5 });
  const navigate = useNavigate();

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
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10">
        <div className="max-w-4xl animate-fade-in">
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading mb-4 sm:mb-6 leading-tight">
                Crafting Spaces<br />
                <span className="text-primary font-accent text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">That Speak Elegance</span>
              </h1>
              <p className="text-foreground/90 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl">
                At VEDARA, we believe every space tells a story. With meticulous attention to detail and 
                a passion for timeless design, we transform interiors into extraordinary experiences.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4">
              <Button 
                variant="luxury" 
                size="lg"
                onClick={() => navigate("/downloads")}
                className="shadow-gold w-full sm:w-auto"
              >
                <Download className="mr-2 w-4 h-4" />
                Download Portfolio
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/meeting")}
                className="border-primary/50 text-foreground hover:bg-primary/10 w-full sm:w-auto"
              >
                <Calendar className="mr-2 w-4 h-4" />
                Book Consultation
              </Button>
            </div>

            <div className="border-t border-primary/20 pt-6 sm:pt-8 mt-8 sm:mt-12">
              <p className="text-sm sm:text-base text-foreground/70 italic font-light">
                "Design is not just what it looks like and feels like. Design is how it works."
              </p>
              <p className="text-primary font-accent text-xl sm:text-2xl mt-2">— Surya, Founder & Principal Designer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
