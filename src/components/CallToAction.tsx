import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const CallToAction = () => {
  return (
    <section className="py-10 md:py-20 bg-gradient-to-b from-card to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-primary rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <ScrollReveal variant="fadeUp">
          <p className="text-[10px] md:text-xs tracking-[0.2em] text-primary uppercase mb-3 md:mb-4">
            Start Your Journey
          </p>
          <h2 className="font-display text-2xl md:text-5xl mb-3 md:mb-6 max-w-xl mx-auto leading-tight">
            Find Your Perfect Timepiece
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg mb-6 md:mb-10 max-w-md mx-auto leading-relaxed">
            Explore our curated collection of exceptional watches from the world's most prestigious brands.
          </p>
        </ScrollReveal>
        
        <ScrollReveal variant="fadeUp" delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-sm mx-auto">
            <Link to="/collection" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 md:px-8 py-5 md:py-6 text-xs md:text-sm tracking-wider"
              >
                BROWSE COLLECTION
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CallToAction;
