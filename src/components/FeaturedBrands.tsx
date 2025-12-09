import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

const brands = [
  { name: "ROLEX", tagline: "Crown of Excellence" },
  { name: "OMEGA", tagline: "Precision Mastery" },
  { name: "PATEK PHILIPPE", tagline: "Timeless Heritage" },
  { name: "AUDEMARS PIGUET", tagline: "Bold Innovation" },
];

const FeaturedBrands = () => {
  return (
    <section className="py-8 md:py-16 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-6 md:mb-10">
            <p className="text-[10px] md:text-xs tracking-[0.2em] text-primary uppercase mb-2">
              Prestigious Partners
            </p>
            <h2 className="font-display text-xl md:text-4xl">Featured Brands</h2>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          {brands.map((brand, index) => (
            <ScrollReveal key={brand.name} variant="scale" delay={index * 0.1}>
              <Link 
                to="/brands"
                className="group relative bg-secondary/50 border border-border rounded-lg p-4 md:p-8 text-center hover:border-primary/50 transition-all duration-300 block"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                <h3 className="font-display text-xs md:text-lg mb-1 md:mb-2 relative z-10 group-hover:text-primary transition-colors">
                  {brand.name}
                </h3>
                <p className="text-[10px] md:text-sm text-muted-foreground relative z-10">
                  {brand.tagline}
                </p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        
        <ScrollReveal variant="fadeUp" delay={0.4}>
          <div className="text-center mt-6 md:mt-10">
            <Link 
              to="/brands" 
              className="inline-flex items-center text-xs md:text-sm text-primary hover:text-primary/80 transition-colors tracking-wide"
            >
              Explore All Brands →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FeaturedBrands;
