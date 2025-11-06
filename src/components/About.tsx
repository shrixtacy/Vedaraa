import { useEffect, useState } from "react";
import aboutBackground from "@/assets/about-background.jpg";

const About = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden min-h-screen flex items-center">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${aboutBackground})`,
          transform: `translateY(${(scrollY - 800) * 0.4}px)`,
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-primary font-accent text-4xl mb-4">Our Philosophy</p>
          <h2 className="text-5xl font-heading mb-6">The VEDARA Approach</h2>
          <div className="w-24 h-[1px] bg-primary mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-2xl font-heading text-primary">Timeless Elegance</h3>
            <p className="text-muted-foreground leading-relaxed">
              We create interiors that transcend trends, focusing on classic proportions, 
              premium materials, and sophisticated color palettes that stand the test of time.
            </p>
          </div>

          <div className="space-y-4 animate-fade-in">
            <h3 className="text-2xl font-heading text-primary">Bespoke Design</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every project is uniquely tailored to our clients' vision, lifestyle, and aspirations. 
              We don't follow templates—we craft individualized spaces that reflect your personality.
            </p>
          </div>

          <div className="space-y-4 animate-fade-in">
            <h3 className="text-2xl font-heading text-primary">Premium Craftsmanship</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our partnerships with master artisans and luxury suppliers ensure that every detail, 
              from custom furniture to finishing touches, exemplifies excellence.
            </p>
          </div>

          <div className="space-y-4 animate-fade-in">
            <h3 className="text-2xl font-heading text-primary">Seamless Execution</h3>
            <p className="text-muted-foreground leading-relaxed">
              From concept to completion, we manage every aspect of your project with precision, 
              ensuring a stress-free experience and impeccable results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
