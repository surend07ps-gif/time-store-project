import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WatchCard from "@/components/WatchCard";
import WatchDetailModal from "@/components/WatchDetailModal";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/useWishlist";
import watchDiver from "@/assets/watch-diver.jpg";
import watchDress from "@/assets/watch-dress.jpg";
import watchSport from "@/assets/watch-sport.jpg";
import watchVintage from "@/assets/watch-vintage.jpg";

const topBrands = [
  "ROLEX", "PATEK PHILIPPE", "AUDEMARS PIGUET", "OMEGA", "CARTIER", "BREITLING"
];

const otherBrands = [
  "TAG HEUER", "IWC", "JAEGER-LECOULTRE", "HUBLOT", "CASIO", "FOSSIL", "G SHOCK", "OTHERS"
];

const watches = [
  { id: 1, name: "Seamaster Diver", category: "DIVER", price: 5600, image: watchDiver },
  { id: 2, name: "Calatrava", category: "DRESS", price: 32500, image: watchDress },
  { id: 3, name: "Big Bang", category: "SPORT", price: 12800, image: watchSport },
  { id: 4, name: "Tank Must", category: "VINTAGE", price: 3200, image: watchVintage },
];

const Brands = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [selectedWatch, setSelectedWatch] = useState<typeof watches[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
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

  const handleQuickView = (watchId: number) => {
    const watch = watches.find((w) => w.id === watchId);
    if (watch) {
      setSelectedWatch(watch);
      setModalOpen(true);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <h1 className="font-display text-6xl mb-4">Prestige Brands</h1>
            <p className="text-luxury-text-muted text-lg max-w-3xl mb-12">
              Browse our curated selection from the world's most renowned watchmakers.
            </p>
            
            <div className="mb-16">
              <div className="flex flex-wrap gap-4 items-center mb-4">
                <span className="text-sm tracking-wider font-semibold">TOP BRANDS:</span>
                {topBrands.map((brand) => (
                  <Button
                    key={brand}
                    variant="outline"
                    onClick={() => setActiveBrand(activeBrand === brand ? null : brand)}
                    className={`border-border hover:border-primary hover:text-primary ${
                      activeBrand === brand ? "border-primary text-primary" : ""
                    }`}
                  >
                    {brand}
                  </Button>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
                {otherBrands.map((brand) => (
                  <Button
                    key={brand}
                    variant="outline"
                    onClick={() => setActiveBrand(activeBrand === brand ? null : brand)}
                    className={`border-border hover:border-primary hover:text-primary ${
                      activeBrand === brand ? "border-primary text-primary" : ""
                    }`}
                  >
                    {brand}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        </section>
      </main>
      
      <Footer />

      <WatchDetailModal
        watch={selectedWatch}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onToggleWishlist={toggleWishlist}
        isInWishlist={selectedWatch ? wishlist.includes(selectedWatch.id) : false}
      />
    </div>
  );
};

export default Brands;
