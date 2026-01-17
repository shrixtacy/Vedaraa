import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  
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
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in required fields",
        description: "Name, email, and message are required.",
        variant: "destructive",
      });
      return;
    }

    console.log("Form submitted:", formData);
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });

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
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Header Section */}
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
            <div className="md:w-1/3">
              <span className="text-xs font-bold uppercase tracking-widest border-b border-foreground/20 pb-2">
                Contact
              </span>
            </div>

            <div className="md:w-2/3">
              <h1 className="text-3xl md:text-5xl font-heading font-medium leading-[1.15] mb-8">
                Let's Create Something Extraordinary
              </h1>
              <p className="text-foreground/70 leading-relaxed">
                Ready to transform your space? Share your vision with us and let's begin 
                the journey toward exceptional design.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section ref={containerRef} className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-foreground/10">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-2xl font-heading font-medium mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Studio</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      123 Design District<br />
                      New York, NY 10001
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Contact</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      hello@vedara.com<br />
                      +1 (555) 123-4567
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Hours</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      Monday - Friday: 9AM - 6PM<br />
                      Saturday: By Appointment
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="mt-2 bg-transparent border-foreground/20 focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="mt-2 bg-transparent border-foreground/20 focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="mt-2 bg-transparent border-foreground/20 focus:border-primary"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Project Type</Label>
                    <Select onValueChange={(value) => handleInputChange("projectType", value)}>
                      <SelectTrigger className="mt-2 bg-transparent border-foreground/20 focus:border-primary">
                        <SelectValue placeholder="Select type" />
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
                    <Label className="text-sm font-medium">Budget Range</Label>
                    <Select onValueChange={(value) => handleInputChange("budget", value)}>
                      <SelectTrigger className="mt-2 bg-transparent border-foreground/20 focus:border-primary">
                        <SelectValue placeholder="Select range" />
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
                  <Label className="text-sm font-medium">Timeline</Label>
                  <Select onValueChange={(value) => handleInputChange("timeline", value)}>
                    <SelectTrigger className="mt-2 bg-transparent border-foreground/20 focus:border-primary">
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
                  <Label htmlFor="message" className="text-sm font-medium">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="mt-2 bg-transparent border-foreground/20 focus:border-primary min-h-[120px] resize-none"
                    placeholder="Tell us about your project vision..."
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;