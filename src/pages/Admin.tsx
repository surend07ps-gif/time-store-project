import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus } from "lucide-react";
import Header from "@/components/Header";

interface Watch {
  id: number;
  name: string;
  brand: string;
  price: number;
  description: string | null;
  image_url: string | null;
  category: string | null;
  movement: string | null;
  case_size: string | null;
  water_resistance: string | null;
}

const Admin = () => {
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [watches, setWatches] = useState<Watch[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingWatch, setEditingWatch] = useState<Watch | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    image_url: "",
    category: "",
    movement: "",
    case_size: "",
    water_resistance: "",
  });

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate("/");
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
    }
  }, [isAdmin, adminLoading, navigate, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchWatches();
    }
  }, [isAdmin]);

  const fetchWatches = async () => {
    try {
      const { data, error } = await supabase
        .from("watches")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setWatches(data || []);
    } catch (error) {
      console.error("Error fetching watches:", error);
      toast({
        title: "Error",
        description: "Failed to fetch watches.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      brand: "",
      price: "",
      description: "",
      image_url: "",
      category: "",
      movement: "",
      case_size: "",
      water_resistance: "",
    });
    setEditingWatch(null);
    setIsCreating(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const watchData = {
        ...formData,
        price: parseFloat(formData.price),
      };

      if (editingWatch) {
        const { error } = await supabase
          .from("watches")
          .update(watchData)
          .eq("id", editingWatch.id);

        if (error) throw error;
        toast({ title: "Success", description: "Watch updated successfully!" });
      } else {
        const { error } = await supabase.from("watches").insert([watchData]);

        if (error) throw error;
        toast({ title: "Success", description: "Watch created successfully!" });
      }

      resetForm();
      fetchWatches();
    } catch (error) {
      console.error("Error saving watch:", error);
      toast({
        title: "Error",
        description: "Failed to save watch.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (watch: Watch) => {
    setEditingWatch(watch);
    setIsCreating(true);
    setFormData({
      name: watch.name,
      brand: watch.brand,
      price: watch.price.toString(),
      description: watch.description || "",
      image_url: watch.image_url || "",
      category: watch.category || "",
      movement: watch.movement || "",
      case_size: watch.case_size || "",
      water_resistance: watch.water_resistance || "",
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this watch?")) return;

    try {
      const { error } = await supabase.from("watches").delete().eq("id", id);

      if (error) throw error;
      toast({ title: "Success", description: "Watch deleted successfully!" });
      fetchWatches();
    } catch (error) {
      console.error("Error deleting watch:", error);
      toast({
        title: "Error",
        description: "Failed to delete watch.",
        variant: "destructive",
      });
    }
  };

  if (adminLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-24 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-24">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your watch collection</p>
          </div>
          {!isCreating && (
            <Button onClick={() => setIsCreating(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Watch
            </Button>
          )}
        </div>

        {isCreating && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingWatch ? "Edit Watch" : "Create New Watch"}</CardTitle>
              <CardDescription>
                {editingWatch ? "Update watch details" : "Add a new watch to the collection"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Brand *</label>
                    <Input
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Price *</label>
                    <Input
                      name="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Input
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Movement</label>
                    <Input
                      name="movement"
                      value={formData.movement}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Case Size</label>
                    <Input
                      name="case_size"
                      value={formData.case_size}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Water Resistance</label>
                    <Input
                      name="water_resistance"
                      value={formData.water_resistance}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Image URL</label>
                    <Input
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>
                <div className="flex gap-4">
                  <Button type="submit">
                    {editingWatch ? "Update Watch" : "Create Watch"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 gap-4">
          {watches.map((watch) => (
            <Card key={watch.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold mb-2">
                      {watch.name}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Brand:</span>{" "}
                        <span className="font-medium">{watch.brand}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Price:</span>{" "}
                        <span className="font-medium">${watch.price.toLocaleString()}</span>
                      </div>
                      {watch.category && (
                        <div>
                          <span className="text-muted-foreground">Category:</span>{" "}
                          <span className="font-medium">{watch.category}</span>
                        </div>
                      )}
                      {watch.movement && (
                        <div>
                          <span className="text-muted-foreground">Movement:</span>{" "}
                          <span className="font-medium">{watch.movement}</span>
                        </div>
                      )}
                    </div>
                    {watch.description && (
                      <p className="text-muted-foreground mt-2 text-sm">{watch.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(watch)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(watch.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {watches.length === 0 && !isCreating && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No watches found</p>
              <Button onClick={() => setIsCreating(true)}>Add Your First Watch</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Admin;
