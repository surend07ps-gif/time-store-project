import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Facebook } from "lucide-react";
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
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="font-display text-2xl mb-4">THE TIME STORE</h3>
            <p className="text-muted-foreground leading-relaxed">
              Curators of exceptional timepieces for the discerning collector. 
              Defining luxury through precision and elegance since 1985.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 tracking-wide">Collection</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/collection" className="text-muted-foreground hover:text-primary transition-colors">
                  All Watches
                </Link>
              </li>
              <li>
                <Link to="/brands" className="text-muted-foreground hover:text-primary transition-colors">
                  Shop by Brand
                </Link>
              </li>
              <li>
                <Link to="/collection" className="text-muted-foreground hover:text-primary transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-muted-foreground hover:text-primary transition-colors">
                  My Wishlist
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 tracking-wide">Account</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-muted-foreground hover:text-primary transition-colors">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 tracking-wide">Newsletter</h4>
            <p className="text-muted-foreground mb-4">
              Subscribe to receive updates on new arrivals and exclusive events.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Email Address" 
                className="bg-secondary border-border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                JOIN
              </Button>
            </form>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} The Time Store. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;