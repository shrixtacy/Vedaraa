import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Downloads from "@/components/Downloads";
import ContactForm from "@/components/ContactForm";
import Meeting from "@/components/Meeting";
import Footer from "@/components/Footer";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <ScrollAnimationWrapper animationType="fadeIn" duration={1}>
          <Hero />
        </ScrollAnimationWrapper>
        
        <ScrollAnimationWrapper animationType="fadeUp" delay={0.1}>
          <About />
        </ScrollAnimationWrapper>
        
        <ScrollAnimationWrapper animationType="fadeUp" delay={0.2}>
          <Portfolio />
        </ScrollAnimationWrapper>
        
        <ScrollAnimationWrapper animationType="slideLeft" delay={0.1}>
          <Downloads />
        </ScrollAnimationWrapper>
        
        <ScrollAnimationWrapper animationType="fadeUp" delay={0.2}>
          <ContactForm />
        </ScrollAnimationWrapper>
        
        <ScrollAnimationWrapper animationType="slideRight" delay={0.1}>
          <Meeting />
        </ScrollAnimationWrapper>
      </main>
      
      <ScrollAnimationWrapper animationType="fadeUp">
        <Footer />
      </ScrollAnimationWrapper>
    </div>
  );
};

export default Index;
