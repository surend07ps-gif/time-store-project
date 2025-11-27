import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Heart, LogOut } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="font-display text-2xl tracking-tight">
            The Time Store
          </Link>
          
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm tracking-wider transition-colors ${
                isActive("/") ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              HOME
            </Link>
            <Link
              to="/collection"
              className={`text-sm tracking-wider transition-colors ${
                isActive("/collection") ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              COLLECTION
            </Link>
            <Link
              to="/brands"
              className={`text-sm tracking-wider transition-colors ${
                isActive("/brands") ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              BRANDS
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link 
                  to="/wishlist"
                  className={`text-sm tracking-wider transition-colors flex items-center gap-1 ${
                    isActive("/wishlist") ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  <Heart className="h-4 w-4" />
                  WISHLIST
                </Link>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
