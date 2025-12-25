import LandingHero from "@/components/landing/LandingHero";
import LandingIntro from "@/components/landing/LandingIntro";
import LandingExhibition from "@/components/landing/LandingExhibition";
import LandingServices from "@/components/landing/LandingServices";
import TextMarquee from "@/components/landing/TextMarquee";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHero />
      <LandingIntro />
      <TextMarquee text="Spatial Intelligence" />
      <LandingServices />
      <LandingExhibition />
      <TextMarquee text="Design for Future" />
      <Footer />
    </div>
  );
};

export default Index;
