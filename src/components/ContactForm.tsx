import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, MapPin } from "lucide-react";
import { toast } from "sonner";
import contactBackground from "@/assets/contact-background.jpg";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    brief: "",
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.brief.length > 2000) {
      toast.error("Brief exceeds 2000 words limit");
      return;
    }

    toast.success("Your project brief has been submitted successfully!");
    setFormData({ name: "", email: "", phone: "", location: "", brief: "" });
    setFiles(null);
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden min-h-screen flex items-center">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${contactBackground})`,
          transform: `translateY(${(scrollY - 4400) * 0.4}px)`,
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-primary font-accent text-4xl mb-4">Let's Collaborate</p>
          <h2 className="text-5xl font-heading mb-6">Client Brief Form</h2>
          <div className="w-24 h-[1px] bg-primary mx-auto" />
        </div>

        <Card className="bg-background border-primary/20 p-8 shadow-gold animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-input border-primary/30 text-foreground focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-input border-primary/30 text-foreground focus:border-primary"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-input border-primary/30 text-foreground focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-foreground">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Project Location *
                </Label>
                <Input
                  id="location"
                  required
                  placeholder="Enter address or Google Maps link"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-input border-primary/30 text-foreground focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brief" className="text-foreground">
                Project Brief * <span className="text-xs text-muted-foreground">(Max 2000 words)</span>
              </Label>
              <Textarea
                id="brief"
                required
                rows={8}
                maxLength={2000}
                value={formData.brief}
                onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                placeholder="Describe your project vision, requirements, style preferences, budget range, and timeline..."
                className="bg-input border-primary/30 text-foreground focus:border-primary resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">
                {formData.brief.length} / 2000 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="files" className="text-foreground">
                <Upload className="inline w-4 h-4 mr-1" />
                Upload Floor Plans (PDF/JPEG)
              </Label>
              <Input
                id="files"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="bg-input border-primary/30 text-foreground file:bg-primary file:text-primary-foreground file:border-0 file:px-4 file:py-2 file:rounded-sm file:mr-4"
              />
            </div>

            <Button type="submit" variant="luxury" size="lg" className="w-full">
              Submit Project Brief
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ContactForm;
