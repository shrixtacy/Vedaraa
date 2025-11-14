import { useEffect, useState, useRef, Suspense, lazy } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import ErrorBoundary from "@/components/ErrorBoundary";

const ModelViewer = lazy(() => import("@/components/ModelViewer"));

// Preload the model after initial page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = '/sofa_and_lamp.glb';
      link.as = 'fetch';
      document.head.appendChild(link);
    }, 1000);
  });
}

const HeroWithFlowingModel = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate progress through the entire container
      // 0 = top of container at top of viewport
      // 1 = bottom of container at bottom of viewport
      const scrolled = -rect.top;
      const total = containerHeight - windowHeight;
      const progress = Math.max(0, Math.min(1, scrolled / total));

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate model position and camera orbit based on scroll
  const getModelStyle = () => {
    const isMobile = window.innerWidth < 768;
    
    // On mobile, hide the flowing model completely
    if (isMobile) {
      return {
        display: 'none' as const,
      };
    }
    
    // Start animation earlier at 30% scroll instead of 50%
    const transitionProgress = Math.max(0, (scrollProgress - 0.3) * 1.43); // 0 to 1, starts at 30%
    
    // Once animation is complete (scrollProgress >= 1), switch to absolute positioning
    if (scrollProgress >= 1) {
      // Model is now stuck in the second section
      return {
        position: 'absolute' as const,
        top: '50%',
        left: '5%',
        transform: 'translateY(-50%)',
        width: '45%',
        maxWidth: '600px',
        height: '600px',
        zIndex: 20,
      };
    }
    
    // During animation - fixed position
    const translateX = transitionProgress * -110; // Move from 0% to -110% (right to left)

    return {
      position: 'fixed' as const,
      top: '45%',
      right: '5%',
      transform: `translateY(-50%) translateX(${translateX}%)`,
      width: '50%',
      maxWidth: '800px',
      height: '700px',
      zIndex: 20,
    };
  };

  // Calculate camera orbit for 3D rotation
  const getCameraOrbit = () => {
    const transitionProgress = Math.max(0, (scrollProgress - 0.3) * 1.43); // Start earlier at 30%, end at 100%
    
    // Rotate the camera around the model in 3D space
    // Start: 90deg (side view)
    // End: 45deg (angled front view)
    const azimuth = 90 - (transitionProgress * 45); // Horizontal rotation from 90 to 45 degrees
    const theta = 75; // Vertical angle (keep constant)
    const radius = 85; // Distance from model - closer for larger appearance
    
    return `${azimuth}deg ${theta}deg ${radius}%`;
  };

  return (
    <div ref={containerRef} className="relative" style={{ minHeight: '200vh' }}>
      {/* First Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,63,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,63,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Gradient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
            {/* Left Side - Minimal Text Content */}
            <ScrollAnimationWrapper animationType="slideRight" duration={1}>
              <div className="space-y-8 md:space-y-12 text-center md:text-left">
                <div>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading mb-6 md:mb-8 leading-none">
                    VEDARA
                  </h1>
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary/90 font-light italic leading-relaxed">
                    Where spaces become stories
                  </p>
                </div>

                <div className="w-24 h-[1px] bg-primary mx-auto md:mx-0" />

                <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center md:justify-start">
                  <Button 
                    variant="luxury" 
                    size="lg"
                    onClick={() => navigate("/portfolio")}
                    className="shadow-gold group w-full sm:w-auto"
                  >
                    Explore
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => navigate("/contact")}
                    className="border-primary/50 text-foreground hover:bg-primary/10 w-full sm:w-auto"
                  >
                    Connect
                  </Button>
                </div>
              </div>
            </ScrollAnimationWrapper>

            {/* Right Side - Placeholder for 3D Model (actual model is fixed) - Hidden on mobile */}
            <div className="relative h-[400px] md:h-[600px] lg:h-[700px] hidden md:block">
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 border border-primary/20 rounded-full animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 border border-primary/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 -right-5 w-20 h-20 border border-primary/10 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black" style={{ position: 'relative' }}>
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,63,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,63,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Gradient Glow */}
        <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
            {/* Left Side - 3D Model (stuck here after animation) - Hidden on mobile */}
            <div className="relative h-[400px] md:h-[500px] lg:h-[700px] xl:h-[800px] hidden md:block">
              {/* Decorative Elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 border border-primary/20 rounded-full" />
              <div className="absolute -bottom-10 -right-10 w-32 h-32 border border-primary/10 rounded-full" />
              
              {/* Model appears here when animation completes */}
              {scrollProgress >= 1 && (
                <div className="absolute inset-0">
                  <ErrorBoundary
                    fallback={
                      <div className="w-full h-full flex items-center justify-center">
                        <Sparkles className="w-24 h-24 text-primary" />
                      </div>
                    }
                  >
                    <Suspense fallback={null}>
                      <ModelViewer 
                        src="/sofa_and_lamp.glb"
                        alt="Luxury Sofa and Lamp"
                        autoRotate={false}
                        cameraControls={false}
                        cameraOrbit={getCameraOrbit()}
                        disableInteraction={true}
                      />
                    </Suspense>
                  </ErrorBoundary>
                </div>
              )}
            </div>

            {/* Right Side - Minimal Text Content */}
            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-primary mb-4">
                What we do?
              </h2>
              
              <div className="space-y-5">
                <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-2xl font-light mx-auto md:mx-0">
                  Crafting timeless interiors where every detail speaks of elegance and sophistication.
                </p>
                <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-2xl font-light mx-auto md:mx-0">
                  VEDARA transforms spaces into living art through bespoke design and uncompromising quality.
                </p>
                <p className="text-lg sm:text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-2xl font-light mx-auto md:mx-0">
                  From concept to completion, we curate experiences that reflect your unique vision while maintaining the highest standards of craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed/Sticky 3D Model that flows between sections */}
      {scrollProgress < 1 && (
        <div 
          style={getModelStyle()}
          className="transition-all duration-700 ease-out pointer-events-auto"
        >
        <ErrorBoundary
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <Sparkles className="w-24 h-24 text-primary" />
            </div>
          }
        >
          <Suspense fallback={null}>
            <ModelViewer 
              src="/sofa_and_lamp.glb"
              alt="Luxury Sofa and Lamp"
              autoRotate={false}
              cameraControls={false}
              cameraOrbit={getCameraOrbit()}
              disableInteraction={true}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
      )}
    </div>
  );
};

export default HeroWithFlowingModel;