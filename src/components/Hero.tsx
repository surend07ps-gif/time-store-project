import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-mechanism.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-background via-background/95 to-background/60 md:via-background/80 md:to-transparent" />
      </div>
      
      <div className="container relative z-10 mx-auto px-5 md:px-6 py-12 md:py-32 pt-20 md:pt-32">
        <div className="max-w-3xl text-center md:text-left mx-auto md:mx-0">
          <p className="mb-2 md:mb-4 text-[10px] md:text-sm tracking-[0.25em] text-primary uppercase font-medium">
            Excellence in Motion
          </p>
          
          <h1 className="mb-4 md:mb-6 font-display text-3xl leading-[1.15] md:text-6xl lg:text-7xl font-bold md:leading-tight lg:leading-none">
            Timeless<br />Precision
          </h1>
          
          <p className="mb-6 md:mb-12 text-sm md:text-lg text-muted-foreground max-w-xs md:max-w-2xl mx-auto md:mx-0 leading-relaxed">
            Discover a curated collection of the world's most exceptional timepieces.
          </p>
          
          <div className="flex flex-row gap-3 md:gap-4 justify-center md:justify-start">
            <Link to="/collection" className="flex-1 max-w-[140px] md:max-w-none md:flex-none">
              <Button 
                size="default" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-5 md:px-8 py-5 md:py-6 text-[10px] md:text-sm tracking-wider transition-all w-full"
              >
                EXPLORE
              </Button>
            </Link>
            <Link to="/brands" className="flex-1 max-w-[140px] md:max-w-none md:flex-none">
              <Button 
                size="default" 
                variant="outline"
                className="border-border hover:bg-secondary px-5 md:px-8 py-5 md:py-6 text-[10px] md:text-sm tracking-wider transition-all w-full"
              >
                BRANDS
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator for mobile */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden animate-bounce">
        <div className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
