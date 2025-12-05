import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "./ui/button";
import { Heart, LogOut, Settings, Menu, User as UserIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const { isAdmin, loading: adminLoading } = useAdmin();
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

  const MobileUserLinks = () => (
    <>
      {user ? (
        <>
          <Link 
            to="/wishlist"
            onClick={() => setOpen(false)}
            className={`text-sm tracking-wider transition-colors flex items-center gap-2 ${
              isActive("/wishlist") ? "text-primary" : "text-foreground hover:text-primary"
            }`}
          >
            <Heart className="h-4 w-4" />
            WISHLIST
          </Link>
          {isAdmin && (
            <Link 
              to="/admin"
              onClick={() => setOpen(false)}
              className={`text-sm tracking-wider transition-colors flex items-center gap-2 ${
                isActive("/admin") ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              <Settings className="h-4 w-4" />
              ADMIN
            </Link>
          )}
          <button 
            onClick={handleSignOut}
            className="text-sm tracking-wider transition-colors flex items-center gap-2 text-foreground hover:text-primary"
          >
            <LogOut className="h-4 w-4" />
            SIGN OUT
          </button>
        </>
      ) : (
        <Link to="/auth" onClick={() => setOpen(false)}>
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </Link>
      )}
    </>
  );

  const DesktopUserMenu = () => (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <UserIcon className="h-4 w-4" />
              Account
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link to="/wishlist" className="flex items-center gap-2 cursor-pointer">
                <Heart className="h-4 w-4" />
                Wishlist
              </Link>
            </DropdownMenuItem>
            {isAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/admin" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" />
                    Admin Panel
                  </Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 cursor-pointer">
              <LogOut className="h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/auth">
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
            <DesktopUserMenu />
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
                <MobileUserLinks />
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};

export default Header;