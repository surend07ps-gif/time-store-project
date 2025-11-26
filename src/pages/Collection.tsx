import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WatchCard from "@/components/WatchCard";
import WatchDetailModal from "@/components/WatchDetailModal";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

const categories = ["DIVER", "DRESS", "SPORT", "CHRONOGRAPH", "LADIES", "SKELETON", "AVIATION", "FIELD", "VINTAGE"];

const allWatches = [
  { id: 1, name: "Seamaster Diver", category: "DIVER", price: 5600, image: watchDiver },
  { id: 2, name: "Calatrava", category: "DRESS", price: 32500, image: watchDress },
  { id: 3, name: "Big Bang", category: "SPORT", price: 12800, image: watchSport },
  { id: 4, name: "Tank Must", category: "VINTAGE", price: 3200, image: watchVintage },
  { id: 5, name: "Speedmaster", category: "CHRONOGRAPH", price: 18900, image: watchChronograph },
  { id: 6, name: "Submariner", category: "DIVER", price: 24500, image: watchSubmariner },
  { id: 7, name: "Constellation", category: "LADIES", price: 15200, image: watchLadies },
  { id: 8, name: "Royal Oak", category: "SKELETON", price: 45000, image: watchSkeleton },
  { id: 9, name: "Big Pilot", category: "AVIATION", price: 21500, image: watchPilot },
  { id: 10, name: "Ranger", category: "FIELD", price: 8400, image: watchField },
];

const Collection = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [selectedWatch, setSelectedWatch] = useState<typeof allWatches[0] | null>(null);
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
    const watch = allWatches.find((w) => w.id === watchId);
    if (watch) {
      setSelectedWatch(watch);
      setModalOpen(true);
    }
  };

  const filteredWatches = activeFilter
    ? allWatches.filter((watch) => watch.category === activeFilter)
    : allWatches;

  const sortedWatches = [...filteredWatches].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <h1 className="font-display text-6xl mb-4">Our Collection</h1>
            <p className="text-luxury-text-muted text-lg max-w-3xl mb-12">
              Explore our complete range of luxury timepieces, from classic dress watches to robust divers.
            </p>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm tracking-wider">Filter:</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveFilter(null)}
                  className={`${!activeFilter ? "border-primary text-primary" : ""}`}
                >
                  All
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveFilter(category)}
                    className={`${activeFilter === category ? "border-primary text-primary" : ""}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm tracking-wider">Sort:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sortedWatches.map((watch) => (
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

export default Collection;
