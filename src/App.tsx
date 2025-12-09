import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./components/SplashScreen";
import PageTransition from "./components/PageTransition";
import MobileFAB from "./components/MobileFAB";
import Index from "./pages/Index";
import Collection from "./pages/Collection";
import Brands from "./pages/Brands";
import Auth from "./pages/Auth";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Watches from "./pages/admin/Watches";
import UserManagement from "./pages/admin/UserManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/collection" element={<PageTransition><Collection /></PageTransition>} />
        <Route path="/brands" element={<PageTransition><Brands /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="watches" element={<Watches />} />
          <Route path="users" element={<UserManagement />} />
        </Route>
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SplashScreen isVisible={showSplash} />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
          <MobileFAB />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
