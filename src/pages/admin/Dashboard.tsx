
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Edit as EditIcon, 
  Database as DatabaseIcon, 
  Tag as TagIcon, 
  Settings as SettingsIcon,
  Package as PackageIcon
} from "lucide-react";

const Dashboard = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [stats, setStats] = useState({
    orders: 0,
    pendingOrders: 0,
    contentPages: 4,
    fruitVarieties: 15,
    products: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total orders count
        const { count: ordersCount, error: ordersError } = await supabase
          .from("orders")
          .select("*", { count: "exact", head: true });
        
        if (ordersError) throw ordersError;
        
        // Get pending orders count
        const { count: pendingCount, error: pendingError } = await supabase
          .from("orders")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending");
          
        if (pendingError) throw pendingError;
        
        // Get products count
        const { count: productsCount, error: productsError } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true });
          
        if (productsError) throw productsError;
        
        setStats({
          ...stats,
          orders: ordersCount || 0,
          pendingOrders: pendingCount || 0,
          products: productsCount || 0
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, [supabase]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-serif font-semibold text-ranch-dark">Dashboard</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{loading ? "..." : stats.orders}</p>
            <p className="text-sm text-gray-500">All time orders</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{loading ? "..." : stats.pendingOrders}</p>
            <p className="text-sm text-gray-500">Awaiting processing</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Fruit Varieties</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.fruitVarieties}+</p>
            <p className="text-sm text-gray-500">Peaches, nectarines & pears</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{loading ? "..." : stats.products}</p>
            <p className="text-sm text-gray-500">Merchandise items</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Quick Access</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Button variant="outline" className="justify-start h-auto py-4 px-5" asChild>
            <Link to="/admin/orders">
              <PackageIcon className="mr-2 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Manage Orders</div>
                <div className="text-sm text-gray-500">View and process orders</div>
              </div>
            </Link>
          </Button>
          
          <Button variant="outline" className="justify-start h-auto py-4 px-5" asChild>
            <Link to="/admin/content">
              <EditIcon className="mr-2 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Edit Content</div>
                <div className="text-sm text-gray-500">Update page content</div>
              </div>
            </Link>
          </Button>
          
          <Button variant="outline" className="justify-start h-auto py-4 px-5" asChild>
            <Link to="/admin/fruit">
              <DatabaseIcon className="mr-2 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Manage Fruit</div>
                <div className="text-sm text-gray-500">Update fruit varieties & seasonality</div>
              </div>
            </Link>
          </Button>
          
          <Button variant="outline" className="justify-start h-auto py-4 px-5" asChild>
            <Link to="/admin/products">
              <TagIcon className="mr-2 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Manage Products</div>
                <div className="text-sm text-gray-500">Add or edit merchandise</div>
              </div>
            </Link>
          </Button>
          
          <Button variant="outline" className="justify-start h-auto py-4 px-5" asChild>
            <Link to="/admin/settings">
              <SettingsIcon className="mr-2 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Ranch Settings</div>
                <div className="text-sm text-gray-500">Hours, contact info & social links</div>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
