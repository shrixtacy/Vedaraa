import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-24 px-6 md:px-12 border-t border-primary/20">
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[50vh]">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <span className="text-xs uppercase tracking-widest opacity-60 block mb-8">Get in Touch</span>
            <div className="flex flex-col gap-4 items-start">
              <a href="mailto:hello@vedara.design" className="text-2xl md:text-4xl font-heading hover:opacity-70 transition-opacity">
                hello@vedara.design
              </a>
              <a href="tel:+919876543210" className="text-xl md:text-2xl font-heading opacity-80 hover:opacity-100 transition-opacity">
                +91 98765 43210
              </a>
            </div>
            <p className="mt-8 text-sm opacity-60 max-w-xs">
              123 Design Boulevard<br />
              Mumbai, Maharashtra 400001
            </p>
          </div>

          <div className="flex flex-col md:items-end">
            <span className="text-xs uppercase tracking-widest opacity-60 block mb-8">Socials</span>
            <div className="flex flex-col gap-2 md:text-right">
              {['Instagram', 'LinkedIn', 'Facebook'].map((social) => (
                <a key={social} href="#" className="flex items-center gap-2 group text-xl font-heading">
                  {social}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-end">
          <h1 className="text-[15vw] leading-none font-heading font-bold tracking-tighter mix-blend-difference select-none">
            VEDARA
          </h1>
          <div className="pb-4 text-xs opacity-40 uppercase tracking-widest">
            © {new Date().getFullYear()} Vedara Design
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
