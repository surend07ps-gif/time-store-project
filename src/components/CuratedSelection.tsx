import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import WatchCard from "./WatchCard";
import WatchCardSkeleton from "./WatchCardSkeleton";
import WatchDetailModal from "./WatchDetailModal";
import ScrollReveal from "./ScrollReveal";
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
  const [loading, setLoading] = useState(true);
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
      setLoading(true);
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
      setLoading(false);
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
    <section className="py-10 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <ScrollReveal variant="fadeUp">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-12 gap-3 md:gap-4">
            <div className="text-center md:text-left">
              <h2 className="font-display text-2xl md:text-5xl mb-1 md:mb-4">Curated Selection</h2>
              <p className="text-muted-foreground text-xs md:text-base">
                Handpicked for their exceptional craftsmanship.
              </p>
            </div>
            <Link 
              to="/collection" 
              className="text-primary hover:text-luxury-gold-hover transition-colors tracking-wide text-xs md:text-base text-center md:text-right"
            >
              View All →
            </Link>
          </div>
        </ScrollReveal>
        
        {/* Watch Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <WatchCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {watches.slice(0, 6).map((watch, index) => (
              <ScrollReveal key={watch.id} variant="fadeUp" delay={index * 0.1}>
                <WatchCard 
                  {...watch}
                  onQuickView={handleQuickView}
                  onToggleWishlist={toggleWishlist}
                  isInWishlist={wishlist.includes(watch.id)}
                  isAuthenticated={!!user}
                />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>

      <WatchDetailModal
        watch={selectedWatch}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onToggleWishlist={toggleWishlist}
        isInWishlist={selectedWatch ? wishlist.includes(selectedWatch.id) : false}
        isAuthenticated={!!user}
      />
    </section>
  );
};

export default CuratedSelection;