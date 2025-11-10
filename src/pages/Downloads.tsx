import { Button } from "@/components/ui/button";
import { Download, FileText, Image, Video, Palette } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import StaggeredAnimation from "@/components/StaggeredAnimation";
import { useParallax } from "@/hooks/useParallax";
import aboutBackground from "@/assets/about-background.jpg";

const downloadItems = [
  {
    id: 1,
    title: "Complete Portfolio Brochure",
    description: "Our comprehensive portfolio showcasing luxury interior design projects with detailed case studies and client testimonials.",
    type: "PDF",
    size: "15.2 MB",
    icon: FileText,
    downloadUrl: "#"
  },
  {
    id: 2,
    title: "High-Resolution Project Images",
    description: "Professional photography collection of our finest interior design projects in high resolution for media use.",
    type: "ZIP",
    size: "125 MB",
    icon: Image,
    downloadUrl: "#"
  },
  {
    id: 3,
    title: "Design Process Video",
    description: "Behind-the-scenes video showcasing our design process from concept to completion.",
    type: "MP4",
    size: "89 MB",
    icon: Video,
    downloadUrl: "#"
  },
  {
    id: 4,
    title: "Color Palette Guide",
    description: "Curated color palettes and material samples that define the VEDARA aesthetic philosophy.",
    type: "PDF",
    size: "8.5 MB",
    icon: Palette,
    downloadUrl: "#"
  },
  {
    id: 5,
    title: "Services & Pricing Guide",
    description: "Detailed information about our services, process, and investment levels for different project types.",
    type: "PDF",
    size: "5.2 MB",
    icon: FileText,
    downloadUrl: "#"
  },
  {
    id: 6,
    title: "Client Testimonials",
    description: "Collection of client reviews, testimonials, and success stories from our luxury interior projects.",
    type: "PDF",
    size: "3.8 MB",
    icon: FileText,
    downloadUrl: "#"
  }
];

const Downloads = () => {
  const { elementRef, transform } = useParallax({ speed: 0.4 });

  const handleDownload = (item: typeof downloadItems[0]) => {
    // In a real application, this would trigger the actual download
    console.log(`Downloading: ${item.title}`);
    // You can implement actual download logic here
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main>
        <section 
          ref={elementRef} 
          className="relative py-32 px-6 overflow-hidden min-h-screen"
        >
          {/* Parallax Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center parallax-bg"
            style={{ 
              backgroundImage: `url(${aboutBackground})`,
              transform: transform,
            }}
          >
            <div className="absolute inset-0 bg-black/80" />
          </div>

          <div className="container mx-auto relative z-10">
            <div className="max-w-6xl mx-auto">
              <ScrollAnimationWrapper animationType="fadeUp">
                <div className="text-center mb-16">
                  <p className="text-primary font-accent text-4xl mb-4">Resources</p>
                  <h1 className="text-5xl font-heading mb-6">Download Center</h1>
                  <div className="w-24 h-[1px] bg-primary mx-auto mb-6" />
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Access our comprehensive collection of design resources, portfolios, and brand materials.
                  </p>
                </div>
              </ScrollAnimationWrapper>

              {/* Download Items Grid */}
              <StaggeredAnimation 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                staggerDelay={0.15}
                animationType="fadeUp"
              >
                {downloadItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="group p-6 border border-primary/20 rounded-sm bg-card/30 backdrop-blur-sm hover:border-primary/50 hover:shadow-gold transition-smooth"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-primary/10 rounded-sm">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                              {item.type}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {item.size}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-heading text-primary mb-3 group-hover:text-primary/80 transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {item.description}
                      </p>
                      
                      <Button
                        onClick={() => handleDownload(item)}
                        variant="outline"
                        className="w-full border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground transition-smooth"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  );
                })}
              </StaggeredAnimation>

              {/* Additional Information */}
              <ScrollAnimationWrapper animationType="fadeUp" delay={0.4}>
                <div className="mt-16 p-8 border border-primary/30 rounded-sm bg-card/20 backdrop-blur-sm text-center">
                  <h3 className="text-2xl font-heading text-primary mb-4">Need Something Specific?</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Can't find what you're looking for? Contact our team for custom resources, 
                    high-resolution images, or specific project documentation.
                  </p>
                  <Button variant="luxury" size="lg" className="shadow-gold">
                    Contact Our Team
                  </Button>
                </div>
              </ScrollAnimationWrapper>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Downloads;