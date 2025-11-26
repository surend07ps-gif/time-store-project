import { Link } from "react-router-dom";
import WatchCard from "./WatchCard";
import watchDiver from "@/assets/watch-diver.jpg";
import watchDress from "@/assets/watch-dress.jpg";
import watchSport from "@/assets/watch-sport.jpg";
import watchChronograph from "@/assets/watch-chronograph.jpg";
import watchSubmariner from "@/assets/watch-submariner.jpg";
import watchLadies from "@/assets/watch-ladies.jpg";
import watchSkeleton from "@/assets/watch-skeleton.jpg";
import watchPilot from "@/assets/watch-pilot.jpg";
import watchField from "@/assets/watch-field.jpg";

const watches = [
  {
    id: 1,
    name: "Seamaster Diver",
    category: "DIVER",
    price: 5600,
    image: watchDiver,
  },
  {
    id: 2,
    name: "Calatrava",
    category: "DRESS",
    price: 32500,
    image: watchDress,
  },
  {
    id: 3,
    name: "Big Bang",
    category: "SPORT",
    price: 12800,
    image: watchSport,
  },
  {
    id: 4,
    name: "Speedmaster",
    category: "CHRONOGRAPH",
    price: 18900,
    image: watchChronograph,
  },
  {
    id: 5,
    name: "Submariner",
    category: "DIVER",
    price: 24500,
    image: watchSubmariner,
  },
  {
    id: 6,
    name: "Constellation",
    category: "LADIES",
    price: 15200,
    image: watchLadies,
  },
  {
    id: 7,
    name: "Royal Oak",
    category: "SKELETON",
    price: 45000,
    image: watchSkeleton,
  },
  {
    id: 8,
    name: "Big Pilot",
    category: "AVIATION",
    price: 21500,
    image: watchPilot,
  },
  {
    id: 9,
    name: "Ranger",
    category: "FIELD",
    price: 8400,
    image: watchField,
  },
];

const CuratedSelection = () => {
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
            <WatchCard key={watch.id} {...watch} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratedSelection;
