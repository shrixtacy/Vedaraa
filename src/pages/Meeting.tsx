import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Video, MapPin, Users, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const meetingTypes = [
  {
    id: "consultation",
    title: "Initial Consultation",
    duration: "60 minutes",
    price: "Free",
    description: "Discuss your project vision and explore design possibilities.",
    features: ["Project assessment", "Design direction", "Budget discussion", "Timeline planning"]
  },
  {
    id: "design-review",
    title: "Design Review Session",
    duration: "90 minutes",
    price: "$200",
    description: "Review design concepts and finalize project details.",
    features: ["Concept presentation", "Material selection", "3D visualization", "Detailed planning"]
  },
  {
    id: "site-visit",
    title: "On-Site Consultation",
    duration: "2 hours",
    price: "$350",
    description: "Comprehensive site evaluation with design recommendations.",
    features: ["Space measurement", "Structural assessment", "Lighting evaluation", "Custom recommendations"]
  }
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

const Meeting = () => {
  const { toast } = useToast();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  
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

    console.log("Meeting booked:", formData);
    
    toast({
      title: "Meeting booked successfully!",
      description: "You'll receive a confirmation email with meeting details shortly.",
    });

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
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Header Section */}
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
            <div className="md:w-1/3">
              <span className="text-xs font-bold uppercase tracking-widest border-b border-foreground/20 pb-2">
                Schedule
              </span>
            </div>

            <div className="md:w-2/3">
              <h1 className="text-3xl md:text-5xl font-heading font-medium leading-[1.15] mb-8">
                Book a Meeting
              </h1>
              <p className="text-foreground/70 leading-relaxed">
                Choose the perfect meeting type for your project and schedule a time that works for you.
              </p>
            </div>
          </div>
        </section>

        {/* Meeting Types */}
        <section ref={containerRef} className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-foreground/10">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {meetingTypes.map((meeting, index) => (
              <motion.div
                key={meeting.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                className={`p-6 border cursor-pointer transition-all duration-300 ${
                  selectedMeeting === meeting.id
                    ? "border-primary bg-primary/5"
                    : "border-foreground/20 hover:border-foreground/40"
                }`}
                onClick={() => {
                  setSelectedMeeting(meeting.id);
                  handleInputChange("meetingType", meeting.id);
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-heading font-medium">{meeting.title}</h3>
                  <span className="text-lg font-bold text-primary">{meeting.price}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-3 text-foreground/70">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{meeting.duration}</span>
                </div>
                
                <p className="text-foreground/70 text-sm mb-4 leading-relaxed">
                  {meeting.description}
                </p>
                
                <ul className="space-y-2">
                  {meeting.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-foreground/70">
                      <CheckCircle className="w-3 h-3 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Booking Form */}
          {selectedMeeting && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl mx-auto border border-foreground/20 p-8"
            >
              <h2 className="text-2xl font-heading font-medium mb-8">Book Your Meeting</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
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
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="mt-2 bg-transparent border-foreground/20 focus:border-primary"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-sm font-medium">Preferred Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      className="mt-2 bg-transparent border-foreground/20 focus:border-primary"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Preferred Time *</Label>
                    <Select onValueChange={(value) => handleInputChange("time", value)} required>
                      <SelectTrigger className="mt-2 bg-transparent border-foreground/20 focus:border-primary">
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
                  <Label className="text-sm font-medium">Meeting Location *</Label>
                  <Select onValueChange={(value) => handleInputChange("location", value)} defaultValue="virtual">
                    <SelectTrigger className="mt-2 bg-transparent border-foreground/20 focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="virtual">
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4" />
                          Virtual Meeting
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
                  <Label htmlFor="notes" className="text-sm font-medium">Additional Notes</Label>
                  <Input
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="mt-2 bg-transparent border-foreground/20 focus:border-primary"
                    placeholder="Any specific topics you'd like to discuss..."
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Meeting
                </Button>
              </form>
            </motion.div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Meeting;