import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Please enter your email",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmail("");
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-5 md:px-6 py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
          <div className="col-span-2 md:col-span-1 text-center md:text-left mb-4 md:mb-0">
            <h3 className="font-display text-xl md:text-2xl mb-3 md:mb-4">THE TIME STORE</h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xs mx-auto md:mx-0">
              Curators of exceptional timepieces for the discerning collector. 
              Defining luxury through precision and elegance since 1985.
            </p>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-3 md:mb-4 tracking-wide text-sm md:text-base">Collection</h4>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link to="/collection" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  All Watches
                </Link>
              </li>
              <li>
                <Link to="/brands" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Shop by Brand
                </Link>
              </li>
              <li>
                <Link to="/collection" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-3 md:mb-4 tracking-wide text-sm md:text-base">Contact</h4>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a href="mailto:akashverma23644@gmail.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  akashverma23644@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+917020466284" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  +91 7020466284
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-2 lg:col-span-1 text-center md:text-left">
            <h4 className="font-semibold mb-3 md:mb-4 tracking-wide text-sm md:text-base">Newsletter</h4>
            <p className="text-muted-foreground mb-3 md:mb-4 text-sm">
              Subscribe for updates on new arrivals.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm mx-auto md:mx-0">
              <Input 
                type="email" 
                placeholder="Email Address" 
                className="bg-secondary border-border text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 md:px-8 text-sm">
                JOIN
              </Button>
            </form>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 md:pt-8 border-t border-border">
          <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left order-2 md:order-1">
            © {new Date().getFullYear()} The Time Store. All rights reserved.
          </p>
          <div className="flex gap-6 order-1 md:order-2">
            <a href="https://www.instagram.com/thetimestore_1/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="mailto:akashverma23644@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;