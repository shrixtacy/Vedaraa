import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, MapPin, Mail, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import contactBackground from "@/assets/contact-background.jpg";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().email("Invalid email address").max(255, "Email too long"),
  phone: z.string().optional(),
  location: z.string().min(3, "Location is required").max(200, "Location too long"),
  brief: z.string()
    .min(50, "Brief must be at least 50 characters")
    .max(2000, "Brief must be less than 2000 characters"),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const briefValue = watch("brief", "");

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Your project brief has been submitted successfully! We'll contact you within 24 hours.");
    reset();
    setFiles(null);
    setIsSubmitting(false);
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

        <Card className="bg-card/80 backdrop-blur-sm border-primary/20 p-8 shadow-gold animate-fade-in">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  className="bg-input border-primary/30 text-foreground focus:border-primary"
                />
                {errors.name && (
                  <p className="text-destructive text-xs">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="bg-input border-primary/30 text-foreground focus:border-primary"
                />
                {errors.email && (
                  <p className="text-destructive text-xs">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  className="bg-input border-primary/30 text-foreground focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Project Location *
                </Label>
                <Input
                  id="location"
                  placeholder="Enter address or Google Maps link"
                  {...register("location")}
                  className="bg-input border-primary/30 text-foreground focus:border-primary"
                />
                {errors.location && (
                  <p className="text-destructive text-xs">{errors.location.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brief" className="text-foreground">
                Project Brief * <span className="text-xs text-muted-foreground">(50-2000 characters)</span>
              </Label>
              <Textarea
                id="brief"
                rows={8}
                {...register("brief")}
                placeholder="Describe your project vision, requirements, style preferences, budget range, and timeline..."
                className="bg-input border-primary/30 text-foreground focus:border-primary resize-none"
              />
              <div className="flex justify-between items-center">
                {errors.brief && (
                  <p className="text-destructive text-xs">{errors.brief.message}</p>
                )}
                <p className="text-xs text-muted-foreground ml-auto">
                  {briefValue?.length || 0} / 2000 characters
                </p>
              </div>
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

            <Button 
              type="submit" 
              variant="luxury" 
              size="lg" 
              className="w-full bg-primary text-primary-foreground hover:shadow-gold" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="mr-2" />
                  Submit Project Brief
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ContactForm;
