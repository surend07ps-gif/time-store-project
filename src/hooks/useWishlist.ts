import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";

export const useWishlist = (user: User | null) => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlist([]);
      setLoading(false);
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const { data, error } = await supabase
        .from("wishlist")
        .select("watch_id")
        .eq("user_id", user?.id);

      if (error) throw error;
      setWishlist(data?.map((item) => item.watch_id) || []);
    } catch (error: any) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = async (watchId: number) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your wishlist",
      });
      return;
    }

    const isInWishlist = wishlist.includes(watchId);

    try {
      if (isInWishlist) {
        const { error } = await supabase
          .from("wishlist")
          .delete()
          .eq("user_id", user.id)
          .eq("watch_id", watchId);

        if (error) throw error;
        setWishlist(wishlist.filter((id) => id !== watchId));
        toast({ title: "Removed from wishlist" });
      } else {
        const { error } = await supabase
          .from("wishlist")
          .insert({ user_id: user.id, watch_id: watchId });

        if (error) throw error;
        setWishlist([...wishlist, watchId]);
        toast({ title: "Added to wishlist" });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return { wishlist, toggleWishlist, loading };
};
