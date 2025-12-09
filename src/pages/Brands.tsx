import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WatchCard from "@/components/WatchCard";
import WatchCardSkeleton from "@/components/WatchCardSkeleton";
import WatchDetailModal from "@/components/WatchDetailModal";
import BackToTopButton from "@/components/BackToTopButton";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
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

const staticWatches = [
  { id: 1, name: "Seamaster Diver", category: "DIVER", brand: "OMEGA", price: 5600, image: watchDiver },
  { id: 2, name: "Calatrava", category: "DRESS", brand: "PATEK PHILIPPE", price: 32500, image: watchDress },
  { id: 3, name: "Big Bang", category: "SPORT", brand: "HUBLOT", price: 12800, image: watchSport },
  { id: 4, name: "Tank Must", category: "VINTAGE", brand: "CARTIER", price: 3200, image: watchVintage },
];

interface Watch {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  image: string;
}

const Brands = () => {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [watches, setWatches] = useState<Watch[]>(staticWatches);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatches = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("watches")
        .select("*");
      
      if (!error && data && data.length > 0) {
        setWatches(data.map(w => ({
          id: w.id,
          name: w.name,
          category: w.category || "UNCATEGORIZED",
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

  // Filter watches by search and brand
  const filteredWatches = watches.filter((watch) => {
    const matchesSearch = searchQuery === "" || 
      watch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      watch.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBrand = !activeBrand || watch.brand.toUpperCase() === activeBrand;
    
    return matchesSearch && matchesBrand;
  });
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 md:pt-24">
        <section className="py-6 md:py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            {/* Header - Mobile Optimized */}
            <div className="mb-4 md:mb-8">
              <h1 className="font-display text-3xl md:text-6xl mb-2 md:mb-4">Prestige Brands</h1>
              <p className="text-muted-foreground text-sm md:text-lg max-w-3xl">
                Browse from the world's most renowned watchmakers.
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-4 md:mb-6">
              <SearchBar 
                value={searchQuery} 
                onChange={setSearchQuery}
                placeholder="Search by name or brand..."
              />
            </div>
            
            {/* Brand Filters - Mobile Optimized */}
            <div className="mb-6 md:mb-12">
              {/* Top Brands - Horizontal scroll on mobile */}
              <div className="mb-3">
                <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase mb-2 block">
                  Top Brands
                </span>
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap scrollbar-hide">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveBrand(null)}
                    className={`shrink-0 h-8 text-xs md:text-sm px-3 md:px-4 ${
                      !activeBrand ? "border-primary text-primary bg-primary/10" : ""
                    }`}
                  >
                    ALL
                  </Button>
                  {topBrands.map((brand) => (
                    <Button
                      key={brand}
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveBrand(activeBrand === brand ? null : brand)}
                      className={`shrink-0 h-8 text-xs md:text-sm px-3 md:px-4 ${
                        activeBrand === brand ? "border-primary text-primary bg-primary/10" : ""
                      }`}
                    >
                      {brand}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Other Brands */}
              <div>
                <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase mb-2 block">
                  Other Brands
                </span>
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap scrollbar-hide">
                  {otherBrands.map((brand) => (
                    <Button
                      key={brand}
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveBrand(activeBrand === brand ? null : brand)}
                      className={`shrink-0 h-8 text-xs md:text-sm px-3 md:px-4 ${
                        activeBrand === brand ? "border-primary text-primary bg-primary/10" : ""
                      }`}
                    >
                      {brand}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
                {Array.from({ length: 8 }).map((_, i) => (
                  <WatchCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredWatches.length === 0 ? (
              <div className="text-center py-16 md:py-24">
                <p className="text-muted-foreground text-base md:text-lg mb-2">
                  {searchQuery ? `No watches found for "${searchQuery}"` : `No watches found for ${activeBrand}`}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Try a different search term or brand
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
                {filteredWatches.map((watch) => (
                  <WatchCard 
                    key={watch.id} 
                    {...watch}
                    onQuickView={handleQuickView}
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
      />
    </div>
  );
};

export default Brands;