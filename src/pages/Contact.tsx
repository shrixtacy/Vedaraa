import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import StaggeredAnimation from "@/components/StaggeredAnimation";
import { useParallax } from "@/hooks/useParallax";
import { useToast } from "@/hooks/use-toast";
import aboutBackground from "@/assets/about-background.jpg";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Studio",
    details: ["123 Design District", "Luxury Avenue, Suite 500", "New York, NY 10001"]
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543", "Mon-Fri: 9AM-6PM EST"]
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@vedara.com", "projects@vedara.com", "careers@vedara.com"]
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM", "Sunday: By Appointment"]
  }
];

const Contact = () => {
  const { elementRef, transform } = useParallax({ speed: 0.4 });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in required fields",
        description: "Name, email, and message are required.",
        variant: "destructive",
      });
      return;
    }

    // In a real application, you would send this data to your backend
    console.log("Form submitted:", formData);
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: ""
    });
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
                  <p className="text-primary font-accent text-4xl mb-4">Get In Touch</p>
                  <h1 className="text-5xl font-heading mb-6">Contact Us</h1>
                  <div className="w-24 h-[1px] bg-primary mx-auto mb-6" />
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Ready to transform your space? Let's discuss your vision and bring it to life.
                  </p>
                </div>
              </ScrollAnimationWrapper>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <ScrollAnimationWrapper animationType="slideRight">
                  <div className="space-y-8">
                    <h2 className="text-3xl font-heading text-primary mb-8">Let's Connect</h2>
                    
                    <StaggeredAnimation 
                      className="space-y-6"
                      staggerDelay={0.1}
                      animationType="fadeUp"
                    >
                      {contactInfo.map((info, index) => {
                        const Icon = info.icon;
                        return (
                          <div key={index} className="flex gap-4 p-4 border border-primary/20 rounded-sm bg-card/20 backdrop-blur-sm">
                            <div className="p-3 bg-primary/10 rounded-sm">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-heading text-primary mb-2">{info.title}</h3>
                              {info.details.map((detail, idx) => (
                                <p key={idx} className="text-muted-foreground text-sm">
                                  {detail}
                                </p>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </StaggeredAnimation>
                  </div>
                </ScrollAnimationWrapper>

                {/* Contact Form */}
                <ScrollAnimationWrapper animationType="slideLeft">
                  <div className="p-8 border border-primary/30 rounded-sm bg-card/20 backdrop-blur-sm">
                    <h2 className="text-3xl font-heading text-primary mb-8">Start Your Project</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-foreground">Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className="bg-background/50 border-primary/30 text-foreground"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-foreground">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="bg-background/50 border-primary/30 text-foreground"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-foreground">Phone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="bg-background/50 border-primary/30 text-foreground"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-foreground">Project Type</Label>
                          <Select onValueChange={(value) => handleInputChange("projectType", value)}>
                            <SelectTrigger className="bg-background/50 border-primary/30 text-foreground">
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="residential">Residential</SelectItem>
                              <SelectItem value="commercial">Commercial</SelectItem>
                              <SelectItem value="renovation">Renovation</SelectItem>
                              <SelectItem value="consultation">Consultation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-foreground">Budget Range</Label>
                          <Select onValueChange={(value) => handleInputChange("budget", value)}>
                            <SelectTrigger className="bg-background/50 border-primary/30 text-foreground">
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                              <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                              <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                              <SelectItem value="500k+">$500K+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label className="text-foreground">Timeline</Label>
                        <Select onValueChange={(value) => handleInputChange("timeline", value)}>
                          <SelectTrigger className="bg-background/50 border-primary/30 text-foreground">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asap">ASAP</SelectItem>
                            <SelectItem value="1-3months">1-3 Months</SelectItem>
                            <SelectItem value="3-6months">3-6 Months</SelectItem>
                            <SelectItem value="6months+">6+ Months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-foreground">Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          className="bg-background/50 border-primary/30 text-foreground min-h-[120px]"
                          placeholder="Tell us about your project vision..."
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        variant="luxury" 
                        size="lg" 
                        className="w-full shadow-gold"
                      >
                        Send Message
                      </Button>
                    </form>
                  </div>
                </ScrollAnimationWrapper>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;