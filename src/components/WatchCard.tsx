import { Heart, Eye } from "lucide-react";
import { Button } from "./ui/button";

interface WatchCardProps {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  onQuickView: (id: number) => void;
  onToggleWishlist: (id: number) => void;
  isInWishlist: boolean;
}

const WatchCard = ({ 
  id,
  name, 
  category, 
  price, 
  image,
  onQuickView,
  onToggleWishlist,
  isInWishlist
}: WatchCardProps) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden bg-card rounded-lg mb-4 aspect-square">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Hover Overlay with Specs and Actions */}
        <div className="absolute inset-0 bg-background/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 space-y-4">
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
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(id);
              }}
            >
              <Heart
                className={`h-4 w-4 ${
                  isInWishlist ? "fill-current text-primary" : ""
                }`}
              />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="font-display text-xl text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground uppercase tracking-wider">{category}</p>
        <p className="text-lg font-semibold text-foreground">
          ${price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default WatchCard;
