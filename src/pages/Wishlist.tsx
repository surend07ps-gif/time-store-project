import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WatchCard from "@/components/WatchCard";
import WatchDetailModal from "@/components/WatchDetailModal";
import BackToTopButton from "@/components/BackToTopButton";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/useWishlist";
import watchDiver from "@/assets/watch-diver.jpg";
import watchDress from "@/assets/watch-dress.jpg";
import watchSport from "@/assets/watch-sport.jpg";
import watchVintage from "@/assets/watch-vintage.jpg";
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
  { id: 4, name: "Tank Must", category: "VINTAGE", brand: "CARTIER", price: 3200, image: watchVintage },
  { id: 5, name: "Speedmaster", category: "CHRONOGRAPH", brand: "OMEGA", price: 18900, image: watchChronograph },
  { id: 6, name: "Submariner", category: "DIVER", brand: "ROLEX", price: 24500, image: watchSubmariner },
  { id: 7, name: "Constellation", category: "LADIES", brand: "OMEGA", price: 15200, image: watchLadies },
  { id: 8, name: "Royal Oak", category: "SKELETON", brand: "AUDEMARS PIGUET", price: 45000, image: watchSkeleton },
  { id: 9, name: "Big Pilot", category: "AVIATION", brand: "IWC", price: 21500, image: watchPilot },
  { id: 10, name: "Ranger", category: "FIELD", brand: "TUDOR", price: 8400, image: watchField },
];

interface Watch {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  image: string;
}

const Wishlist = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [allWatches, setAllWatches] = useState<Watch[]>(staticWatches);
  const { wishlist, toggleWishlist, loading } = useWishlist(user);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchWatches = async () => {
      const { data, error } = await supabase
        .from("watches")
        .select("*");
      
      if (!error && data && data.length > 0) {
        setAllWatches(data.map(w => ({
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
    const watch = allWatches.find((w) => w.id === watchId);
    if (watch) {
      setSelectedWatch(watch);
      setModalOpen(true);
    }
  };

  const wishlistWatches = allWatches.filter((watch) => wishlist.includes(watch.id));

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading your wishlist...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 md:pt-24">
        <section className="py-6 md:py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            {/* Header - Mobile Optimized */}
            <div className="mb-6 md:mb-12">
              <h1 className="font-display text-3xl md:text-6xl mb-2 md:mb-4">Your Wishlist</h1>
              <p className="text-muted-foreground text-sm md:text-lg max-w-3xl">
                Your collection of favorite timepieces awaits.
              </p>
            </div>
            
            {wishlistWatches.length === 0 ? (
              <div className="text-center py-16 md:py-24">
                <p className="text-muted-foreground text-base md:text-lg mb-3 md:mb-4">
                  Your wishlist is empty
                </p>
                <p className="text-xs md:text-sm text-muted-foreground mb-5 md:mb-6">
                  Explore our collection and add your favorite watches
                </p>
                <Link to="/collection">
                  <Button size="sm" className="md:size-default">Browse Collection</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
                {wishlistWatches.map((watch) => (
                  <WatchCard 
                    key={watch.id} 
                    {...watch}
                    onQuickView={handleQuickView}
                    onToggleWishlist={toggleWishlist}
                    isInWishlist={true}
                    isAuthenticated={!!user}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
      <BackToTopButton />

      <WatchDetailModal
        watch={selectedWatch}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onToggleWishlist={toggleWishlist}
        isInWishlist={selectedWatch ? wishlist.includes(selectedWatch.id) : false}
        isAuthenticated={!!user}
      />
    </div>
  );
};

export default Wishlist;