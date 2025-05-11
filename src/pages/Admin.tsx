
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Separator } from "@/components/ui/separator";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { toast } from "sonner";

const Admin = () => {
  const user = useUser();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Check if Supabase is properly initialized
    if (!supabase) {
      toast.error("Cannot connect to Supabase. Please check your configuration.");
      navigate("/admin/login");
      setIsLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        // Check if user is authenticated
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth error:", error);
          toast.error("Authentication error. Please try logging in again.");
          navigate("/admin/login");
          return;
        }
        
        if (!data.session) {
          navigate("/admin/login");
          return;
        }

        console.log("User authenticated:", data.session.user.id);

        // Use a direct SQL query with service role to bypass RLS policies
        // This is a safer approach to prevent infinite recursion with RLS policies
        const { data: adminData, error: adminError } = await supabase.rpc(
          'is_user_admin',
          { user_id_param: data.session.user.id }
        );

        console.log("Admin check response:", { adminData, adminError });

        if (adminError) {
          console.error("Admin check error:", adminError);
          toast.error("Failed to verify admin permissions.");
          navigate("/admin/login");
          return;
        }

        // Check the result of the function call
        if (!adminData) {
          toast.error("You don't have admin permissions.");
          navigate("/");
          return;
        }

        console.log("Admin verification successful");
        setIsAdmin(true);
        
      } catch (error) {
        console.error("Auth check failed:", error);
        toast.error("Authentication check failed");
        navigate("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [user, navigate, supabase]);

  // Show loading state
  if (isLoading) return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <p className="text-xl text-gray-500">Loading admin panel...</p>
    </div>
  );

  // If no user or not an admin, don't render admin content
  if (!user || !isAdmin) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-serif font-bold text-ranch-dark">Moffatt Ranch Admin</h1>
          <p className="text-gray-500">Manage your website content and products</p>
        </div>
        <Separator className="my-6" />
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
