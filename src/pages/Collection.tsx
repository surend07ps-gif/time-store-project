import { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WatchCard from "@/components/WatchCard";
import WatchDetailModal from "@/components/WatchDetailModal";
import BackToTopButton from "@/components/BackToTopButton";
import PullToRefresh from "@/components/PullToRefresh";
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

const Collection = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("featured");
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

  const fetchWatches = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("watches")
      .select("*");
    
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
  }, []);

  useEffect(() => {
    fetchWatches();
  }, [fetchWatches]);

  const handleRefresh = async () => {
    await fetchWatches();
  };

  const handleQuickView = (watchId: number) => {
    const watch = watches.find((w) => w.id === watchId);
    if (watch) {
      setSelectedWatch(watch);
      setModalOpen(true);
    }
  };

  const filteredWatches = activeFilter
    ? watches.filter((watch) => watch.category === activeFilter)
    : watches;

  const sortedWatches = [...filteredWatches].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });
  
  const WatchGrid = () => (
    <>
      {loading ? (
        <div className="text-center py-16 md:py-24">
          <p className="text-muted-foreground text-sm md:text-base">Loading watches...</p>
        </div>
      ) : sortedWatches.length === 0 ? (
        <div className="text-center py-16 md:py-24">
          <p className="text-muted-foreground text-base md:text-lg mb-2">
            No watches found in {activeFilter} category
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            Try selecting a different category or view all watches
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          {sortedWatches.map((watch) => (
            <WatchCard 
              key={watch.id} 
              {...watch}
              onQuickView={handleQuickView}
              onToggleWishlist={toggleWishlist}
              isInWishlist={wishlist.includes(watch.id)}
              isAuthenticated={!!user}
            />
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 md:pt-24">
        <section className="py-6 md:py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            {/* Page Header - Mobile Optimized */}
            <div className="mb-6 md:mb-12">
              <h1 className="font-display text-3xl md:text-6xl mb-2 md:mb-4">Our Collection</h1>
              <p className="text-muted-foreground text-sm md:text-lg max-w-3xl">
                Explore our complete range of luxury timepieces.
              </p>
            </div>
            
            {/* Filters - Mobile Optimized */}
            <div className="flex flex-col gap-4 mb-6 md:mb-12">
              {/* Sort - Mobile First */}
              <div className="flex items-center justify-between md:hidden">
                <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Sort by</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-36 h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured" className="text-xs">Featured</SelectItem>
                    <SelectItem value="price-low" className="text-xs">Price: Low to High</SelectItem>
                    <SelectItem value="price-high" className="text-xs">Price: High to Low</SelectItem>
                    <SelectItem value="name" className="text-xs">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filter Pills - Horizontal Scroll on Mobile */}
              <div className="w-full">
                <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase mb-2 block md:hidden">
                  Filter by category
                </span>
                <div className="flex md:flex-wrap gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveFilter(null)}
                    className={`shrink-0 h-8 text-xs md:text-sm px-3 md:px-4 ${!activeFilter ? "border-primary text-primary bg-primary/10" : ""}`}
                  >
                    All
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveFilter(category)}
                      className={`shrink-0 h-8 text-xs md:text-sm px-3 md:px-4 ${activeFilter === category ? "border-primary text-primary bg-primary/10" : ""}`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Desktop Sort */}
              <div className="hidden md:flex items-center gap-2 md:ml-auto md:-mt-12">
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
            
            {/* Pull to Refresh for Mobile */}
            <PullToRefresh onRefresh={handleRefresh}>
              <WatchGrid />
            </PullToRefresh>

            {/* Desktop Grid */}
            <div className="hidden md:block">
              <WatchGrid />
            </div>
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

export default Collection;