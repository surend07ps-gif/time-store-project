import { Button } from "@/components/ui/button";
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
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>
      
      <div className="container relative z-10 mx-auto px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs md:text-sm tracking-[0.2em] text-primary uppercase font-medium">
            Excellence in Motion
          </p>
          
          <h1 className="mb-6 font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight md:leading-tight lg:leading-none">
            Timeless<br />Precision
          </h1>
          
          <p className="mb-8 md:mb-12 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Discover a curated collection of the world's most exceptional timepieces. 
            Where engineering meets artistry in perfect harmony.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-sm tracking-wide transition-all"
            >
              EXPLORE COLLECTION
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-border hover:bg-secondary px-8 py-6 text-sm tracking-wide transition-all"
            >
              OUR HERITAGE
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
