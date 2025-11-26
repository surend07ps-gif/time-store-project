import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface WatchDetailModalProps {
  watch: {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleWishlist: (watchId: number) => void;
  isInWishlist: boolean;
}

const WatchDetailModal = ({ 
  watch, 
  open, 
  onOpenChange, 
  onToggleWishlist,
  isInWishlist 
}: WatchDetailModalProps) => {
  if (!watch) return null;

  const specs = [
    { label: "Movement", value: "Automatic" },
    { label: "Case Size", value: "42mm" },
    { label: "Water Resistance", value: "100m" },
    { label: "Material", value: "Stainless Steel" },
    { label: "Crystal", value: "Sapphire" },
    { label: "Power Reserve", value: "48 hours" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl">{watch.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-card">
            <img
              src={watch.image}
              alt={watch.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {watch.category}
              </p>
              <p className="text-3xl font-semibold text-foreground">
                ${watch.price.toLocaleString()}
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl mb-4">Specifications</h3>
              <dl className="space-y-3">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between border-b border-border pb-2">
                    <dt className="text-muted-foreground">{spec.label}</dt>
                    <dd className="font-medium">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => onToggleWishlist(watch.id)}
                variant="outline"
                className="w-full"
              >
                <Heart
                  className={`mr-2 h-4 w-4 ${
                    isInWishlist ? "fill-current text-primary" : ""
                  }`}
                />
                {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
              
              <Button className="w-full">Contact for Purchase</Button>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>
                Each timepiece in our collection represents the pinnacle of horological
                craftsmanship. This exceptional watch combines traditional techniques
                with modern engineering.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WatchDetailModal;
