import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-primary/20 py-12 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-heading text-primary mb-4">VEDARA</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Crafting spaces that speak elegance. Premium interior design 
              solutions for discerning clients.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-heading text-foreground mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  123 Design Boulevard<br />
                  Mumbai, Maharashtra 400001<br />
                  India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">+91 98765 43210</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">hello@vedara.design</p>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-heading text-foreground mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-3 border border-primary rounded-sm hover:bg-primary hover:text-primary-foreground transition-smooth"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 border border-primary rounded-sm hover:bg-primary hover:text-primary-foreground transition-smooth"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 border border-primary rounded-sm hover:bg-primary hover:text-primary-foreground transition-smooth"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/20 pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} VEDARA Interior Design. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
