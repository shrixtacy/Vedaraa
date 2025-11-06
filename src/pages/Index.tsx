import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Downloads from "@/components/Downloads";
import ContactForm from "@/components/ContactForm";
import Meeting from "@/components/Meeting";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Downloads />
        <ContactForm />
        <Meeting />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
