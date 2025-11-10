import { useEffect, useState, useRef, Suspense, lazy } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";

const ModelViewer = lazy(() => import("@/components/ModelViewer"));

const ScrollingModelSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress when section is in view
      // Progress goes from 0 (top of viewport) to 1 (bottom of viewport)
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      // Start animation when section enters viewport
      if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
        // Calculate progress: 0 when section top is at bottom of viewport, 1 when it's at top
        const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight / 2)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate model position and rotation based on scroll
  const modelTransform = {
    // Move from right (100%) to left (-50%)
    translateX: `${100 - (scrollProgress * 150)}%`,
    // Move down slightly
    translateY: `${scrollProgress * 20}%`,
    // Rotate 360 degrees
    rotateY: `${scrollProgress * 360}deg`,
    // Scale up slightly
    scale: 0.8 + (scrollProgress * 0.4),
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,63,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,63,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Side - 3D Model (animated) */}
          <div className="relative h-[600px] lg:h-[700px] order-2 lg:order-1">
            {/* Animated Model Container */}
            <div 
              className="absolute inset-0 transition-all duration-1000 ease-out"
              style={{
                transform: `translateX(${modelTransform.translateX}) translateY(${modelTransform.translateY}) rotateY(${modelTransform.rotateY}) scale(${modelTransform.scale})`,
                opacity: scrollProgress > 0.1 ? 1 : 0,
              }}
            >
              <ErrorBoundary
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <Sparkles className="w-24 h-24 text-primary" />
                  </div>
                }
              >
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  }
                >
                  <ModelViewer 
                    src="/sofa_and_lamp.glb"
                    alt="Luxury Sofa and Lamp"
                    autoRotate={false}
                    cameraControls={true}
                  />
                </Suspense>
              </ErrorBoundary>
            </div>

            {/* Decorative Elements */}
            <div 
              className="absolute -top-10 -left-10 w-40 h-40 border border-primary/20 rounded-full transition-opacity duration-1000"
              style={{ opacity: scrollProgress }}
            />
            <div 
              className="absolute -bottom-10 -right-10 w-32 h-32 border border-primary/10 rounded-full transition-opacity duration-1000"
              style={{ opacity: scrollProgress, transitionDelay: '200ms' }}
            />
          </div>

          {/* Right Side - Text Content */}
          <div 
            className="space-y-8 order-1 lg:order-2 transition-all duration-1000"
            style={{
              opacity: scrollProgress > 0.3 ? 1 : 0,
              transform: `translateX(${scrollProgress > 0.3 ? 0 : 50}px)`,
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 rounded-full bg-primary/5">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary uppercase tracking-wider">Craftsmanship</span>
            </div>

            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading mb-6 leading-tight">
                Designed for
                <br />
                <span className="text-primary font-accent text-4xl md:text-5xl lg:text-6xl">
                  Perfection
                </span>
              </h2>
              <p className="text-foreground/80 text-lg md:text-xl leading-relaxed max-w-xl">
                Every curve, every stitch, every detail is meticulously crafted to create 
                furniture that doesn't just fill a space—it transforms it into a masterpiece.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 border border-primary/20 rounded-lg bg-primary/5">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-heading text-xl">01</span>
                </div>
                <div>
                  <h3 className="text-primary font-heading mb-2 text-lg">Premium Materials</h3>
                  <p className="text-muted-foreground text-sm">
                    Sourced from the finest suppliers worldwide, ensuring unmatched quality and durability.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border border-primary/20 rounded-lg bg-primary/5">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-heading text-xl">02</span>
                </div>
                <div>
                  <h3 className="text-primary font-heading mb-2 text-lg">Artisan Craftsmanship</h3>
                  <p className="text-muted-foreground text-sm">
                    Hand-finished by master craftsmen with decades of experience in luxury furniture.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border border-primary/20 rounded-lg bg-primary/5">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-heading text-xl">03</span>
                </div>
                <div>
                  <h3 className="text-primary font-heading mb-2 text-lg">Timeless Design</h3>
                  <p className="text-muted-foreground text-sm">
                    Classic aesthetics that transcend trends, ensuring your investment lasts generations.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                variant="luxury" 
                size="lg"
                onClick={() => navigate("/portfolio")}
                className="shadow-gold group"
              >
                View Full Collection
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/contact")}
                className="border-primary/50 text-foreground hover:bg-primary/10"
              >
                Request Catalog
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="w-1 h-32 bg-primary/20 rounded-full overflow-hidden">
          <div 
            className="w-full bg-primary transition-all duration-300"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export default ScrollingModelSection;