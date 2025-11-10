import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "home", path: "/" },
    { name: "about", path: "/about" },
    { name: "portfolio", path: "/portfolio" },
    { name: "downloads", path: "/downloads" },
    { name: "contact", path: "/contact" },
    { name: "meeting", path: "/meeting" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        scrolled ? "bg-background/95 backdrop-blur-sm shadow-gold" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-heading text-primary tracking-wider">
            VEDARA
          </Link>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`relative text-sm uppercase tracking-wide transition-smooth after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-primary after:transition-all after:duration-300 ${
                    isActive(item.path)
                      ? "text-primary after:w-full"
                      : "text-foreground hover:text-primary after:w-0 hover:after:w-full"
                  }`}
                >
                  {item.name}
                </Link>
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
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`text-left text-lg uppercase tracking-wide transition-smooth py-2 border-b border-primary/20 ${
                      isActive(item.path)
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
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
