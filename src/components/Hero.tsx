import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-mechanism.jpg";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Trigger entrance animations
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative h-[calc(100vh-56px)] md:min-h-screen flex items-center justify-center md:justify-start overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 z-0 scale-110"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: `translateY(${scrollY * 0.4}px)`,
          willChange: 'transform',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-background via-background/95 to-background/60 md:via-background/80 md:to-transparent" />
      </div>
      
      <div className="container relative z-10 mx-auto px-5 md:px-6">
        <div className="max-w-3xl text-center md:text-left mx-auto md:mx-0">
          {/* Animated subtitle */}
          <p 
            className={`mb-2 md:mb-4 text-[10px] md:text-sm tracking-[0.25em] text-primary uppercase font-medium transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Excellence in Motion
          </p>
          
          {/* Animated heading */}
          <h1 
            className={`mb-4 md:mb-6 font-display text-3xl leading-[1.15] md:text-6xl lg:text-7xl font-bold md:leading-tight lg:leading-none transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <span className="inline-block">Timeless</span><br />
            <span className="inline-block">Precision</span>
          </h1>
          
          {/* Animated description */}
          <p 
            className={`mb-6 md:mb-12 text-sm md:text-lg text-muted-foreground max-w-xs md:max-w-2xl mx-auto md:mx-0 leading-relaxed transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            Discover a curated collection of the world's most exceptional timepieces.
          </p>
          
          {/* Animated buttons */}
          <div 
            className={`flex flex-row gap-3 md:gap-4 justify-center md:justify-start transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <Link to="/collection" className="flex-1 max-w-[140px] md:max-w-none md:flex-none">
              <Button 
                size="default" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 px-5 md:px-8 py-5 md:py-6 text-[10px] md:text-sm tracking-wider transition-all duration-300 w-full"
              >
                EXPLORE
              </Button>
            </Link>
            <Link to="/brands" className="flex-1 max-w-[140px] md:max-w-none md:flex-none">
              <Button 
                size="default" 
                variant="outline"
                className="border-border hover:bg-secondary hover:scale-105 px-5 md:px-8 py-5 md:py-6 text-[10px] md:text-sm tracking-wider transition-all duration-300 w-full"
              >
                BRANDS
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator for mobile with enhanced animation */}
      <div 
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '1000ms' }}
      >
        <div className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-1.5 animate-bounce">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
