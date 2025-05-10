
import { NavLink } from "react-router-dom";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Edit as EditIcon,
  Database as DatabaseIcon,
  Tag as TagIcon,
  Settings as SettingsIcon,
  LayoutDashboard as DashboardIcon,
  LogOut as LogOutIcon,
  CreditCard as CreditCardIcon,
  Package as PackageIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminSidebar = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
      });
      navigate("/admin/login");
    } catch (error: any) {
      toast({
        title: "Error logging out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-cabin font-bold text-ranch-dark">Admin Panel</h2>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-peach/10 text-peach"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <DashboardIcon className="mr-3 h-5 w-5" />
              Dashboard
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-peach/10 text-peach"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <PackageIcon className="mr-3 h-5 w-5" />
              Orders
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/admin/content"
              className={({ isActive }) =>
                `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-peach/10 text-peach"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <EditIcon className="mr-3 h-5 w-5" />
              Edit Content
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/admin/fruit"
              className={({ isActive }) =>
                `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-peach/10 text-peach"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <DatabaseIcon className="mr-3 h-5 w-5" />
              Manage Fruit
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-peach/10 text-peach"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <TagIcon className="mr-3 h-5 w-5" />
              Products
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/admin/stripe"
              className={({ isActive }) =>
                `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-peach/10 text-peach"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <CreditCardIcon className="mr-3 h-5 w-5" />
              Stripe Setup
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-peach/10 text-peach"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <SettingsIcon className="mr-3 h-5 w-5" />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t mt-auto">
        {user && (
          <div className="mb-4 px-4 py-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-800">{user.email}</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        )}
        <Button 
          variant="outline" 
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
