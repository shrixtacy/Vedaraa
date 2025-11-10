import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Video, MapPin, Users, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import StaggeredAnimation from "@/components/StaggeredAnimation";
import { useParallax } from "@/hooks/useParallax";
import { useToast } from "@/hooks/use-toast";
import aboutBackground from "@/assets/about-background.jpg";

const meetingTypes = [
  {
    id: "consultation",
    title: "Initial Consultation",
    duration: "60 minutes",
    price: "Free",
    description: "Discuss your project vision, requirements, and explore how we can bring your ideas to life.",
    features: ["Project assessment", "Design direction", "Budget discussion", "Timeline planning"]
  },
  {
    id: "design-review",
    title: "Design Review Session",
    duration: "90 minutes",
    price: "$200",
    description: "Review design concepts, materials, and finalize project details with our design team.",
    features: ["Concept presentation", "Material selection", "3D visualization", "Detailed planning"]
  },
  {
    id: "site-visit",
    title: "On-Site Consultation",
    duration: "2 hours",
    price: "$350",
    description: "Comprehensive site evaluation with measurements, spatial analysis, and design recommendations.",
    features: ["Space measurement", "Structural assessment", "Lighting evaluation", "Custom recommendations"]
  }
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

const Meeting = () => {
  const { elementRef, transform } = useParallax({ speed: 0.4 });
  const { toast } = useToast();
  const [selectedMeeting, setSelectedMeeting] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    meetingType: "",
    location: "virtual",
    notes: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.date || !formData.time || !formData.meetingType) {
      toast({
        title: "Please fill in all required fields",
        description: "All fields marked with * are required to book your meeting.",
        variant: "destructive",
      });
      return;
    }

    // In a real application, you would send this data to your booking system
    console.log("Meeting booked:", formData);
    
    toast({
      title: "Meeting booked successfully!",
      description: "You'll receive a confirmation email with meeting details shortly.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      meetingType: "",
      location: "virtual",
      notes: ""
    });
    setSelectedMeeting("");
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
                  <p className="text-primary font-accent text-4xl mb-4">Schedule</p>
                  <h1 className="text-5xl font-heading mb-6">Book a Meeting</h1>
                  <div className="w-24 h-[1px] bg-primary mx-auto mb-6" />
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Choose the perfect meeting type for your project and schedule a time that works for you.
                  </p>
                </div>
              </ScrollAnimationWrapper>

              {/* Meeting Types */}
              <ScrollAnimationWrapper animationType="fadeUp" delay={0.2}>
                <h2 className="text-3xl font-heading text-primary mb-8 text-center">Choose Your Meeting Type</h2>
              </ScrollAnimationWrapper>

              <StaggeredAnimation 
                className="grid md:grid-cols-3 gap-6 mb-12"
                staggerDelay={0.15}
                animationType="fadeUp"
              >
                {meetingTypes.map((meeting) => (
                  <div
                    key={meeting.id}
                    className={`p-6 border rounded-sm cursor-pointer transition-all duration-300 ${
                      selectedMeeting === meeting.id
                        ? "border-primary bg-primary/10 shadow-gold"
                        : "border-primary/20 bg-card/20 backdrop-blur-sm hover:border-primary/50"
                    }`}
                    onClick={() => {
                      setSelectedMeeting(meeting.id);
                      handleInputChange("meetingType", meeting.id);
                    }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-heading text-primary">{meeting.title}</h3>
                      <span className="text-2xl font-bold text-primary">{meeting.price}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{meeting.duration}</span>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {meeting.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {meeting.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-3 h-3 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </StaggeredAnimation>

              {/* Booking Form */}
              {selectedMeeting && (
                <ScrollAnimationWrapper animationType="fadeUp">
                  <div className="max-w-2xl mx-auto p-8 border border-primary/30 rounded-sm bg-card/20 backdrop-blur-sm">
                    <h2 className="text-3xl font-heading text-primary mb-8 text-center">Book Your Meeting</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-foreground">Full Name *</Label>
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
                        <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="bg-background/50 border-primary/30 text-foreground"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date" className="text-foreground">Preferred Date *</Label>
                          <Input
                            id="date"
                            type="date"
                            value={formData.date}
                            onChange={(e) => handleInputChange("date", e.target.value)}
                            className="bg-background/50 border-primary/30 text-foreground"
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>
                        <div>
                          <Label className="text-foreground">Preferred Time *</Label>
                          <Select onValueChange={(value) => handleInputChange("time", value)} required>
                            <SelectTrigger className="bg-background/50 border-primary/30 text-foreground">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>{time}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label className="text-foreground">Meeting Location *</Label>
                        <Select onValueChange={(value) => handleInputChange("location", value)} defaultValue="virtual">
                          <SelectTrigger className="bg-background/50 border-primary/30 text-foreground">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="virtual">
                              <div className="flex items-center gap-2">
                                <Video className="w-4 h-4" />
                                Virtual Meeting (Zoom/Teams)
                              </div>
                            </SelectItem>
                            <SelectItem value="studio">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                Our Studio (NYC)
                              </div>
                            </SelectItem>
                            <SelectItem value="site">
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Your Location
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="notes" className="text-foreground">Additional Notes</Label>
                        <Input
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => handleInputChange("notes", e.target.value)}
                          className="bg-background/50 border-primary/30 text-foreground"
                          placeholder="Any specific topics you'd like to discuss..."
                        />
                      </div>

                      <Button 
                        type="submit" 
                        variant="luxury" 
                        size="lg" 
                        className="w-full shadow-gold"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Meeting
                      </Button>
                    </form>
                  </div>
                </ScrollAnimationWrapper>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Meeting;