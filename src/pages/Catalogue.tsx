import { useState, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, Building2, Palette, Lightbulb, Sofa, Ruler, ArrowUpRight, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    id: "01",
    title: "Residential Design",
    description: "Complete home interiors from concept to completion, tailored to your lifestyle and preferences.",
    icon: Home,
    features: ["Living Spaces", "Bedrooms & Bathrooms", "Kitchens & Dining", "Home Offices"],
    price: "$150",
    unit: "per sq ft",
    color: "from-amber-500/20 to-orange-500/20",
    image: "/portfolio-1.jpg"
  },
  {
    id: "02",
    title: "Commercial Design",
    description: "Professional spaces that enhance productivity and reflect your brand identity.",
    icon: Building2,
    features: ["Office Spaces", "Retail Stores", "Restaurants", "Hospitality"],
    price: "$200",
    unit: "per sq ft",
    color: "from-blue-500/20 to-cyan-500/20",
    image: "/portfolio-5.jpg"
  },
  {
    id: "03",
    title: "Space Planning",
    description: "Optimize your space with strategic layout planning and functional design solutions.",
    icon: Ruler,
    features: ["Layout Optimization", "Traffic Flow", "Zoning", "Functionality Analysis"],
    price: "$5,000",
    unit: "starting",
    color: "from-purple-500/20 to-pink-500/20",
    image: "/portfolio-3.jpg"
  },
  {
    id: "04",
    title: "Color Consultation",
    description: "Expert color guidance to create the perfect palette for your space and mood.",
    icon: Palette,
    features: ["Color Psychology", "Paint Selection", "Material Coordination", "Mood Boards"],
    price: "$1,500",
    unit: "starting",
    color: "from-green-500/20 to-emerald-500/20",
    image: "/portfolio-4.jpg"
  },
  {
    id: "05",
    title: "Lighting Design",
    description: "Comprehensive lighting solutions that enhance ambiance and functionality.",
    icon: Lightbulb,
    features: ["Ambient Lighting", "Task Lighting", "Accent Lighting", "Smart Controls"],
    price: "$3,000",
    unit: "starting",
    color: "from-yellow-500/20 to-amber-500/20",
    image: "/portfolio-2.jpg"
  },
  {
    id: "06",
    title: "Furniture Selection",
    description: "Curated furniture and decor selection that perfectly complements your design vision.",
    icon: Sofa,
    features: ["Custom Pieces", "Vintage Sourcing", "Art Curation", "Styling Services"],
    price: "$2,500",
    unit: "starting",
    color: "from-red-500/20 to-rose-500/20",
    image: "/portfolio-6.jpg"
  }
];

const Catalogue = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden" onMouseMove={handleMouseMove}>
      <Navbar />
      
      {/* Floating cursor follower */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-primary/30 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: useTransform(mouseX, (x) => x - 12),
          y: useTransform(mouseY, (y) => y - 12),
        }}
        animate={{
          scale: hoveredService !== null ? 2 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      
      <main className="flex-1 relative">
        {/* Animated background grid */}
        <div className="fixed inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Hero Section with Floating Elements */}
        <section className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto">
          {/* Floating decorative elements */}
          <motion.div
            className="absolute top-20 right-10 w-2 h-2 bg-primary rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 left-20 w-1 h-1 bg-primary rounded-full"
            animate={{
              y: [0, -15, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

          <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start relative z-10">
            <motion.div 
              className="md:w-1/3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Premium Services
                </span>
              </div>
              <div className="w-12 h-[1px] bg-gradient-to-r from-primary to-transparent" />
            </motion.div>

            <motion.div 
              className="md:w-2/3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-7xl font-heading font-medium leading-[0.9] mb-8 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Service
                <br />
                <span className="text-primary">Catalogue</span>
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl">
                Comprehensive interior design services tailored to transform your space 
                into something extraordinary. Each service is crafted with precision and attention to detail.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Modern Services Grid */}
        <section ref={containerRef} className="py-16 px-6 md:px-12 max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.16, 1, 0.3, 1], 
                    delay: index * 0.15 
                  }}
                  className="group relative"
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  {/* Background gradient on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
                    initial={false}
                  />
                  
                  {/* Main card */}
                  <div className="relative border border-foreground/10 rounded-2xl p-8 backdrop-blur-sm group-hover:border-primary/30 transition-all duration-500 overflow-hidden">
                    {/* Service number */}
                    <div className="absolute top-6 right-6 text-6xl font-heading font-bold text-foreground/5 group-hover:text-primary/10 transition-colors duration-500">
                      {service.id}
                    </div>
                    
                    {/* Icon and title */}
                    <div className="flex items-start justify-between mb-6 relative z-10">
                      <div className="flex items-center gap-4">
                        <motion.div 
                          className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Icon className="w-6 h-6 text-primary" />
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-heading font-medium mb-1 group-hover:text-primary transition-colors duration-300">
                            {service.title}
                          </h3>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-primary">{service.price}</span>
                            <span className="text-sm text-foreground/50">{service.unit}</span>
                          </div>
                        </div>
                      </div>
                      
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.2, rotate: 45 }}
                      >
                        <ArrowUpRight className="w-6 h-6 text-primary" />
                      </motion.div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-foreground/70 leading-relaxed mb-8 relative z-10">
                      {service.description}
                    </p>
                    
                    {/* Features with staggered animation */}
                    <div className="grid grid-cols-2 gap-3 mb-8 relative z-10">
                      {service.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={hoveredService === index ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <motion.div 
                            className="w-1.5 h-1.5 bg-primary rounded-full"
                            animate={hoveredService === index ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                          />
                          <span className="text-sm text-foreground/70">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative z-10"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-foreground/20 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group-hover:border-primary/50"
                      >
                        <span>Explore Service</span>
                        <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </Button>
                    </motion.div>

                    {/* Hover image preview */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-2xl overflow-hidden"
                      style={{
                        backgroundImage: `url(${service.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Enhanced Call to Action */}
        <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="text-center relative"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-3xl" />
            
            <div className="relative z-10 py-16">
              <motion.div
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Ready to Begin?</span>
              </motion.div>
              
              <h3 className="text-3xl md:text-5xl font-heading font-medium mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Transform Your Space Today
              </h3>
              
              <p className="text-lg text-foreground/70 mb-10 leading-relaxed max-w-2xl mx-auto">
                Let's discuss your project and create a custom solution that perfectly fits 
                your vision, budget, and timeline.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Schedule Consultation
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="border-foreground/30 hover:border-primary px-8 py-6 text-lg">
                    View Portfolio
                    <ArrowUpRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Catalogue;