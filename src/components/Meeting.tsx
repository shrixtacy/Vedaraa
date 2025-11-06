import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video } from "lucide-react";
import meetingBackground from "@/assets/meeting-background.jpg";

const Meeting = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="meeting" className="relative py-32 px-6 overflow-hidden min-h-screen flex items-center">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${meetingBackground})`,
          transform: `translateY(${(scrollY - 6000) * 0.4}px)`,
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-primary font-accent text-4xl mb-4">Schedule a Meeting</p>
          <h2 className="text-5xl font-heading mb-6">Book Your Consultation</h2>
          <div className="w-24 h-[1px] bg-primary mx-auto" />
        </div>

        <Card className="bg-card border-primary/20 p-10 text-center shadow-gold animate-fade-in">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="inline-block p-4 border border-primary rounded-sm mb-4">
              <Calendar className="w-12 h-12 text-primary" />
            </div>

            <h3 className="text-3xl font-heading text-foreground">
              Let's Discuss Your Vision
            </h3>
            
            <p className="text-muted-foreground leading-relaxed">
              Book a complimentary consultation with our design team to explore your project requirements, 
              discuss design possibilities, and understand how VEDARA can bring your vision to life.
            </p>

            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                <span>60 minutes</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Video className="w-4 h-4 text-primary" />
                <span>Virtual or In-Person</span>
              </div>
            </div>

            <Button variant="luxury" size="lg" className="mt-6">
              Schedule Consultation
            </Button>

            <p className="text-xs text-muted-foreground pt-4">
              Available Monday - Saturday, 10:00 AM - 6:00 PM IST
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Meeting;
