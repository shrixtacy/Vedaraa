import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Clock, Video, User, Mail, Phone } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";
import meetingBackground from "@/assets/meeting-background.jpg";

const timeSlots = [
  "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

const Meeting = () => {
  const [scrollY, setScrollY] = useState(0);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    timeSlot: "",
    meetingType: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !formData.timeSlot || !formData.meetingType) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success(`Consultation scheduled for ${format(date, "PPP")} at ${formData.timeSlot}! We'll send you a confirmation email shortly.`);
    setFormData({ name: "", email: "", phone: "", timeSlot: "", meetingType: "" });
    setDate(undefined);
  };

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

        <Card className="bg-card/80 backdrop-blur-sm border-primary/20 p-10 shadow-gold animate-fade-in">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block p-4 border border-primary rounded-sm mb-4">
                <CalendarIcon className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-3xl font-heading text-foreground mb-4">
                Let's Discuss Your Vision
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Book a complimentary consultation with our design team to explore your project requirements.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>60 minutes</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Video className="w-4 h-4 text-primary" />
                  <span>Virtual or In-Person</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-input border-primary/30 text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-input border-primary/30 text-foreground"
                  />
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
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-input border-primary/30 text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    Meeting Type *
                  </Label>
                  <Select value={formData.meetingType} onValueChange={(value) => setFormData({ ...formData, meetingType: value })}>
                    <SelectTrigger className="bg-input border-primary/30 text-foreground">
                      <SelectValue placeholder="Select meeting type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="virtual">Virtual Meeting</SelectItem>
                      <SelectItem value="in-person">In-Person Meeting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    Select Date *
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-input border-primary/30"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-background border-primary/30">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Select Time *
                  </Label>
                  <Select value={formData.timeSlot} onValueChange={(value) => setFormData({ ...formData, timeSlot: value })}>
                    <SelectTrigger className="bg-input border-primary/30 text-foreground">
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" variant="luxury" size="lg" className="w-full bg-primary text-primary-foreground">
                Schedule Consultation
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Available Monday - Saturday, 10:00 AM - 6:00 PM IST
              </p>
            </form>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Meeting;
