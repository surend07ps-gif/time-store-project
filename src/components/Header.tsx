import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "./ui/button";
import { Heart, LogOut, Settings, Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const Header = () => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const { isAdmin } = useAdmin();
  const [open, setOpen] = useState(false);

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
    setOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <Link
        to="/"
        onClick={() => mobile && setOpen(false)}
        className={`text-sm tracking-wider transition-colors ${
          isActive("/") ? "text-primary" : "text-foreground hover:text-primary"
        }`}
      >
        HOME
      </Link>
      <Link
        to="/collection"
        onClick={() => mobile && setOpen(false)}
        className={`text-sm tracking-wider transition-colors ${
          isActive("/collection") ? "text-primary" : "text-foreground hover:text-primary"
        }`}
      >
        COLLECTION
      </Link>
      <Link
        to="/brands"
        onClick={() => mobile && setOpen(false)}
        className={`text-sm tracking-wider transition-colors ${
          isActive("/brands") ? "text-primary" : "text-foreground hover:text-primary"
        }`}
      >
        BRANDS
      </Link>
    </>
  );

  const UserLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {user ? (
        <>
          <Link 
            to="/wishlist"
            onClick={() => mobile && setOpen(false)}
            className={`text-sm tracking-wider transition-colors flex items-center gap-1 ${
              isActive("/wishlist") ? "text-primary" : "text-foreground hover:text-primary"
            }`}
          >
            <Heart className="h-4 w-4" />
            WISHLIST
          </Link>
          {isAdmin && (
            <Link 
              to="/admin"
              onClick={() => mobile && setOpen(false)}
              className={`text-sm tracking-wider transition-colors flex items-center gap-1 ${
                isActive("/admin") ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              <Settings className="h-4 w-4" />
              ADMIN
            </Link>
          )}
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-1" />
            Sign Out
          </Button>
        </>
      ) : (
        <Link to="/auth" onClick={() => mobile && setOpen(false)}>
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </Link>
      )}
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="font-display text-2xl tracking-tight">
            The Time Store
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLinks />
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <UserLinks />
          </div>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] pt-12">
              <nav className="flex flex-col gap-6">
                <NavLinks mobile />
                <hr className="border-border" />
                <UserLinks mobile />
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};

export default Header;