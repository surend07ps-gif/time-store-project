import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import WatchCard from "./WatchCard";
import WatchDetailModal from "./WatchDetailModal";
import { useWishlist } from "@/hooks/useWishlist";
import watchDiver from "@/assets/watch-diver.jpg";
import watchDress from "@/assets/watch-dress.jpg";
import watchSport from "@/assets/watch-sport.jpg";
import watchChronograph from "@/assets/watch-chronograph.jpg";
import watchSubmariner from "@/assets/watch-submariner.jpg";
import watchLadies from "@/assets/watch-ladies.jpg";
import watchSkeleton from "@/assets/watch-skeleton.jpg";
import watchPilot from "@/assets/watch-pilot.jpg";
import watchField from "@/assets/watch-field.jpg";

const staticWatches = [
  { id: 1, name: "Seamaster Diver", category: "DIVER", brand: "OMEGA", price: 5600, image: watchDiver },
  { id: 2, name: "Calatrava", category: "DRESS", brand: "PATEK PHILIPPE", price: 32500, image: watchDress },
  { id: 3, name: "Big Bang", category: "SPORT", brand: "HUBLOT", price: 12800, image: watchSport },
  { id: 4, name: "Speedmaster", category: "CHRONOGRAPH", brand: "OMEGA", price: 18900, image: watchChronograph },
  { id: 5, name: "Submariner", category: "DIVER", brand: "ROLEX", price: 24500, image: watchSubmariner },
  { id: 6, name: "Constellation", category: "LADIES", brand: "OMEGA", price: 15200, image: watchLadies },
  { id: 7, name: "Royal Oak", category: "SKELETON", brand: "AUDEMARS PIGUET", price: 45000, image: watchSkeleton },
  { id: 8, name: "Big Pilot", category: "AVIATION", brand: "IWC", price: 21500, image: watchPilot },
  { id: 9, name: "Ranger", category: "FIELD", brand: "TUDOR", price: 8400, image: watchField },
];

interface Watch {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  image: string;
}

const CuratedSelection = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [watches, setWatches] = useState<Watch[]>(staticWatches);
  const { wishlist, toggleWishlist } = useWishlist(user);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchWatches = async () => {
      const { data, error } = await supabase
        .from("watches")
        .select("*")
        .limit(9);
      
      if (!error && data && data.length > 0) {
        setWatches(data.map(w => ({
          id: w.id,
          name: w.name,
          category: w.category?.toUpperCase() || "UNCATEGORIZED",
          brand: w.brand,
          price: w.price,
          image: w.image_url || watchDiver,
        })));
      }
    };
    fetchWatches();
  }, []);

  const handleQuickView = (watchId: number) => {
    const watch = watches.find((w) => w.id === watchId);
    if (watch) {
      setSelectedWatch(watch);
      setModalOpen(true);
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-display text-5xl mb-4">Curated Selection</h2>
            <p className="text-luxury-text-muted">
              Handpicked for their exceptional craftsmanship.
            </p>
          </div>
          <Link 
            to="/collection" 
            className="text-primary hover:text-luxury-gold-hover transition-colors tracking-wide"
          >
            View All Collection
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {watches.map((watch) => (
            <WatchCard 
              key={watch.id} 
              {...watch}
              onQuickView={handleQuickView}
              onToggleWishlist={toggleWishlist}
              isInWishlist={wishlist.includes(watch.id)}
            />
          ))}
        </div>
      </div>

      <WatchDetailModal
        watch={selectedWatch}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onToggleWishlist={toggleWishlist}
        isInWishlist={selectedWatch ? wishlist.includes(selectedWatch.id) : false}
      />
    </section>
  );
};

export default CuratedSelection;