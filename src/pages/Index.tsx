import SEO from "@/components/SEO";
import LandingHero from "@/components/landing/LandingHero";
import LandingIntro from "@/components/landing/LandingIntro";
import LandingAbout from "@/components/landing/LandingAbout";
import TextMarquee from "@/components/landing/TextMarquee";
import LandingServices from "@/components/landing/LandingServices";
import LandingPhilosophy from "@/components/landing/LandingPhilosophy";
import LandingExhibition from "@/components/landing/LandingExhibition";
import LandingStats from "@/components/landing/LandingStats";
import LandingProcess from "@/components/landing/LandingProcess";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="VEDARA - Luxury Interior Design Agency"
        description="Crafting spaces that speak elegance. Premium interior design by VEDARA."
      />
      <LandingHero />
      <LandingIntro />
      <LandingAbout />
      <TextMarquee text="Spatial Intelligence" />
      <LandingServices />
      <LandingPhilosophy />
      <LandingExhibition />
      <LandingStats />
      <LandingProcess />
      <TextMarquee text="Design for Future" />
    </div>
  );
};

export default Index;
