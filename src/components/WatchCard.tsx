import { useState } from "react";
import { Eye, Phone } from "lucide-react";
import { Button } from "./ui/button";
import ContactPurchaseDialog from "./ContactPurchaseDialog";

interface WatchCardProps {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  onQuickView: (id: number) => void;
}

const WatchCard = ({ 
  id,
  name, 
  category, 
  price, 
  image,
  onQuickView,
}: WatchCardProps) => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setContactDialogOpen(true);
  };

  return (
    <>
      <div className="group cursor-pointer">
        <div className="relative overflow-hidden bg-card rounded-md md:rounded-lg mb-2 md:mb-4 aspect-square">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Hover Overlay with Specs and Actions - Hidden on mobile */}
          <div className="absolute inset-0 bg-background/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex flex-col items-center justify-center p-6 space-y-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Movement: Automatic</p>
              <p className="text-sm text-muted-foreground">Case: 42mm</p>
              <p className="text-sm text-muted-foreground">Water Resistance: 100m</p>
            </div>
            
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView(id);
                }}
              >
                <Eye className="mr-2 h-4 w-4" />
                Quick View
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={handleContactClick}
              >
                <Phone className="mr-2 h-4 w-4" />
                Contact
              </Button>
            </div>
          </div>

          {/* Mobile Quick Action Buttons */}
          <div className="absolute bottom-2 right-2 flex gap-1.5 md:hidden">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 bg-background/90 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(id);
              }}
            >
              <Eye className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 bg-background/90 backdrop-blur-sm"
              onClick={handleContactClick}
            >
              <Phone className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-0.5 md:space-y-1">
          <h3 className="font-display text-sm md:text-xl text-foreground line-clamp-1">{name}</h3>
          <p className="text-[10px] md:text-sm text-muted-foreground uppercase tracking-wider">{category}</p>
          <p className="text-sm md:text-lg font-semibold text-foreground">
            ₹{price.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      <ContactPurchaseDialog 
        open={contactDialogOpen} 
        onOpenChange={setContactDialogOpen}
        watchName={name}
      />
    </>
  );
};

export default WatchCard;
