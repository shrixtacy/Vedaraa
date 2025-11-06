import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // Use Lenis smooth scroll if available, fallback to native
    if (typeof window !== 'undefined' && (window as any).lenis) {
      (window as any).lenis.scrollTo(`#${id}`, { duration: 1.5 });
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        scrolled ? "bg-background/95 backdrop-blur-sm shadow-gold" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-heading text-primary tracking-wider">VEDARA</h1>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            {["about", "portfolio", "downloads", "contact", "meeting"].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item)}
                  className="relative text-sm uppercase tracking-wide text-foreground hover:text-primary transition-smooth after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-primary" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-primary/30 w-[300px]">
              <div className="flex flex-col gap-6 mt-8">
                <h2 className="text-2xl font-heading text-primary mb-4">Menu</h2>
                {["about", "portfolio", "downloads", "contact", "meeting"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="text-left text-lg uppercase tracking-wide text-foreground hover:text-primary transition-smooth py-2 border-b border-primary/20"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
