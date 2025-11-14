import { useEffect, useState, useRef } from "react";
import { Award, Users, Sparkles, Clock } from "lucide-react";
import StaggeredAnimation from "@/components/StaggeredAnimation";
import { useParallax } from "@/hooks/useParallax";
import aboutBackground from "@/assets/about-background.jpg";

const stats = [
  { icon: Award, label: "Years of Excellence", value: 15, suffix: "+" },
  { icon: Users, label: "Happy Clients", value: 200, suffix: "+" },
  { icon: Sparkles, label: "Projects Completed", value: 350, suffix: "+" },
  { icon: Clock, label: "On-Time Delivery", value: 98, suffix: "%" },
];

const About = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const { elementRef, transform } = useParallax({ speed: 0.4 });

  useEffect(() => {
    const handleScroll = () => {
      // Trigger counter animation when section is in view
      if (elementRef.current && !hasAnimated) {
        const rect = elementRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7) {
          setHasAnimated(true);
          animateCounters();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasAnimated, elementRef]);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      let start = 0;
      const end = stat.value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = end;
            return newCounts;
          });
          clearInterval(timer);
        } else {
          setCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = Math.floor(start);
            return newCounts;
          });
        }
      }, 16);
    });
  };

  return (
    <section 
      ref={elementRef} 
      id="about" 
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden min-h-screen flex items-center"
    >
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center parallax-bg"
        style={{ 
          backgroundImage: `url(${aboutBackground})`,
          transform: transform,
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <p className="text-primary font-accent text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">Our Philosophy</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading mb-4 sm:mb-6">The VEDARA Approach</h2>
            <div className="w-24 h-[1px] bg-primary mx-auto" />
          </div>

          {/* Stats Counter */}
          <StaggeredAnimation 
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16 md:mb-20"
            staggerDelay={0.1}
            animationType="scaleUp"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center p-4 sm:p-6 border border-primary/30 rounded-sm bg-card/50 backdrop-blur-sm hover:shadow-gold transition-smooth"
                >
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-3 sm:mb-4" />
                  <div className="text-2xl sm:text-3xl md:text-4xl font-heading text-primary mb-1 sm:mb-2">
                    {counts[index]}{stat.suffix}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </StaggeredAnimation>

          {/* Philosophy Cards */}
          <StaggeredAnimation 
            className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
            staggerDelay={0.15}
            animationType="fadeUp"
          >
            <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 border border-primary/20 rounded-sm bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-smooth">
              <h3 className="text-xl sm:text-2xl font-heading text-primary">Timeless Elegance</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                We create interiors that transcend trends, focusing on classic proportions, 
                premium materials, and sophisticated color palettes that stand the test of time.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 border border-primary/20 rounded-sm bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-smooth">
              <h3 className="text-xl sm:text-2xl font-heading text-primary">Bespoke Design</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Every project is uniquely tailored to our clients' vision, lifestyle, and aspirations. 
                We don't follow templates—we craft individualized spaces that reflect your personality.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 border border-primary/20 rounded-sm bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-smooth">
              <h3 className="text-xl sm:text-2xl font-heading text-primary">Premium Craftsmanship</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Our partnerships with master artisans and luxury suppliers ensure that every detail, 
                from custom furniture to finishing touches, exemplifies excellence.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 border border-primary/20 rounded-sm bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-smooth">
              <h3 className="text-xl sm:text-2xl font-heading text-primary">Seamless Execution</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                From concept to completion, we manage every aspect of your project with precision, 
                ensuring a stress-free experience and impeccable results.
              </p>
            </div>
          </StaggeredAnimation>
        </div>
      </div>
    </section>
  );
};

export default About;
