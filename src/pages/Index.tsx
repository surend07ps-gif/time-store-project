import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CuratedSelection from "@/components/CuratedSelection";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <CuratedSelection />
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Index;
