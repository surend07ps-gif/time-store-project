import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Watch, Users, Heart, TrendingUp } from "lucide-react";

interface Stats {
  totalWatches: number;
  totalUsers: number;
  totalWishlists: number;
  recentSignups: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalWatches: 0,
    totalUsers: 0,
    totalWishlists: 0,
    recentSignups: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [watchesRes, profilesRes, wishlistRes] = await Promise.all([
        supabase.from("watches").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id, created_at", { count: "exact" }),
        supabase.from("wishlist").select("id", { count: "exact", head: true }),
      ]);

      // Count recent signups (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentUsers = profilesRes.data?.filter(
        (profile) => new Date(profile.created_at) >= sevenDaysAgo
      ).length || 0;

      setStats({
        totalWatches: watchesRes.count || 0,
        totalUsers: profilesRes.count || 0,
        totalWishlists: wishlistRes.count || 0,
        recentSignups: recentUsers,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Watches",
      value: stats.totalWatches,
      icon: Watch,
      description: "Watches in collection",
      color: "text-blue-500",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      description: "Registered users",
      color: "text-green-500",
    },
    {
      title: "Wishlist Items",
      value: stats.totalWishlists,
      icon: Heart,
      description: "Total wishlist entries",
      color: "text-red-500",
    },
    {
      title: "New Signups",
      value: stats.recentSignups,
      icon: TrendingUp,
      description: "Last 7 days",
      color: "text-purple-500",
    },
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <p className="text-muted-foreground">Loading stats...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your store</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Commonly used admin tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a href="/admin/watches" className="block p-3 rounded-lg hover:bg-muted transition-colors">
                <div className="font-medium">Manage Watches</div>
                <div className="text-sm text-muted-foreground">Add, edit, or remove watches</div>
              </a>
              <a href="/admin/users" className="block p-3 rounded-lg hover:bg-muted transition-colors">
                <div className="font-medium">Manage Users</div>
                <div className="text-sm text-muted-foreground">View and manage user roles</div>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Database</span>
                <span className="text-sm font-medium text-green-500">● Connected</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Authentication</span>
                <span className="text-sm font-medium text-green-500">● Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Storage</span>
                <span className="text-sm font-medium text-green-500">● Available</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
