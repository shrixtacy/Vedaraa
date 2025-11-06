import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import downloadsBackground from "@/assets/downloads-background.jpg";

const downloads = [
  {
    id: 1,
    title: "VEDARA Portfolio 2025",
    description: "Complete showcase of our luxury interior design projects",
    size: "12.5 MB",
  },
  {
    id: 2,
    title: "Design Services Brochure",
    description: "Comprehensive overview of our design services and process",
    size: "4.2 MB",
  },
  {
    id: 3,
    title: "Material Selection Guide",
    description: "Premium materials and finishes catalog for luxury interiors",
    size: "8.7 MB",
  },
];

const Downloads = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="downloads" className="relative py-32 px-6 overflow-hidden min-h-screen flex items-center">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${downloadsBackground})`,
          transform: `translateY(${(scrollY - 3200) * 0.4}px)`,
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-primary font-accent text-4xl mb-4">Resources</p>
          <h2 className="text-5xl font-heading mb-6">Download Center</h2>
          <div className="w-24 h-[1px] bg-primary mx-auto" />
        </div>

        <div className="space-y-6">
          {downloads.map((item, index) => (
            <Card
              key={item.id}
              className="bg-card border-primary/20 p-6 hover:shadow-gold transition-smooth animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 border border-primary rounded-sm">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-heading mb-2 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                    <p className="text-primary text-xs">{item.size}</p>
                  </div>
                </div>
                <Button variant="luxury" size="default">
                  <Download className="mr-2" />
                  Download
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Downloads;
