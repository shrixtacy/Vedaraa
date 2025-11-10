import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import ErrorBoundary from "@/components/ErrorBoundary";
import Simple3DTest from "@/components/Simple3DTest";

// Lazy load the 3D viewer
const Model3DViewer = lazy(() => import("@/components/Model3DViewer"));

const Hero3DSimple = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,63,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,63,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Side - Text Content */}
          <ScrollAnimationWrapper animationType="slideRight" duration={1}>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 rounded-full bg-primary/5">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary uppercase tracking-wider">3D Visualization</span>
              </div>

              <div>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-heading mb-6 leading-tight">
                  Experience
                  <br />
                  <span className="text-primary font-accent text-5xl md:text-6xl lg:text-7xl">
                    Luxury in 3D
                  </span>
                </h1>
                <p className="text-foreground/80 text-lg md:text-xl leading-relaxed max-w-xl">
                  Explore our meticulously crafted furniture designs in stunning 3D detail. 
                  Interact with premium pieces and visualize how they'll transform your space.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2" />
                  <div>
                    <h3 className="text-primary font-heading mb-1">Interactive Experience</h3>
                    <p className="text-muted-foreground text-sm">
                      Rotate, zoom, and explore every angle of our luxury furniture
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2" />
                  <div>
                    <h3 className="text-primary font-heading mb-1">Premium Materials</h3>
                    <p className="text-muted-foreground text-sm">
                      Handcrafted with the finest materials and attention to detail
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2" />
                  <div>
                    <h3 className="text-primary font-heading mb-1">Bespoke Design</h3>
                    <p className="text-muted-foreground text-sm">
                      Customizable to match your unique vision and space
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
                  Explore Collection
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate("/contact")}
                  className="border-primary/50 text-foreground hover:bg-primary/10"
                >
                  Get Custom Quote
                </Button>
              </div>

              <div className="pt-8 border-t border-primary/20">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Featured Model
                </p>
                <h3 className="text-xl font-heading text-primary">
                  Mallory Tufted Upholstered Sectional
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Premium velvet upholstery with hand-tufted details
                </p>
              </div>
            </div>
          </ScrollAnimationWrapper>

          {/* Right Side - 3D Model */}
          <ScrollAnimationWrapper animationType="slideLeft" duration={1} delay={0.2}>
            <div className="relative h-[600px] lg:h-[700px]">
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 border border-primary/20 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 border border-primary/10 rounded-full" />
              
              {/* 3D Model Container */}
              <div className="relative h-full border border-primary/20 rounded-lg bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm overflow-hidden">
                <ErrorBoundary
                  fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
                        <p className="text-primary text-lg mb-2">3D Model Preview</p>
                        <p className="text-muted-foreground text-sm">Interactive 3D viewer</p>
                      </div>
                    </div>
                  }
                >
                  {/* Simple 3D Test - Replace with Model3DViewer once working */}
                  <Simple3DTest />
                  
                  {/* Original Model Viewer - Commented out for testing
                  <Suspense
                    fallback={
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                          <p className="text-primary text-sm">Loading 3D Model...</p>
                        </div>
                      </div>
                    }
                  >
                    <Model3DViewer 
                      modelPath="/mallory-sectional.glb"
                      autoRotate={true}
                    />
                  </Suspense>
                  */}
                </ErrorBoundary>
                
                {/* Interaction Hint */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/80 backdrop-blur-sm border border-primary/30 rounded-full z-20">
                  <p className="text-xs text-primary uppercase tracking-wider">
                    Drag to rotate • Scroll to zoom
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero3DSimple;