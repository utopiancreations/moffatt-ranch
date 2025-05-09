
import { useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Package } from "lucide-react";

// Define the form schema
const formSchema = z.object({
  orderNumber: z.string().min(1, "Order number is required"),
  email: z.string().email("Please enter a valid email"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters")
});

type OrderTrackingForm = z.infer<typeof formSchema>;

const OrderTracking = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [searchedOrder, setSearchedOrder] = useState<any | null>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);

  const form = useForm<OrderTrackingForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderNumber: "",
      email: user?.email || "",
      zipCode: ""
    }
  });

  // Fetch user orders when component mounts
  const fetchUserOrders = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      
      setUserOrders(data || []);
    } catch (error: any) {
      toast.error("Failed to load orders", {
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: OrderTrackingForm) => {
    try {
      setLoading(true);
      
      // Check if the order ID is a valid UUID
      let orderQuery;
      if (data.orderNumber.length === 36) {
        // Full UUID
        orderQuery = data.orderNumber;
      } else {
        // Partial order number, need to do a LIKE query
        orderQuery = supabase.rpc('find_order_by_partial_id', {
          partial_id: data.orderNumber.toLowerCase()
        });
      }
      
      const { data: order, error } = await supabase
        .from("orders")
        .select("*")
        .eq("email", data.email)
        .eq(typeof orderQuery === "string" ? "id" : "id", orderQuery)
        .single();
        
      if (error) throw error;
      
      if (!order) {
        toast.error("Order not found");
        setSearchedOrder(null);
        setOrderItems([]);
        return;
      }
      
      // Verify zip code matches
      if (order.shipping_address.zip_code !== data.zipCode) {
        toast.error("ZIP code does not match our records");
        setSearchedOrder(null);
        setOrderItems([]);
        return;
      }
      
      // Fetch order items
      const { data: items, error: itemsError } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", order.id);
        
      if (itemsError) throw itemsError;
      
      setSearchedOrder(order);
      setOrderItems(items || []);
      
    } catch (error: any) {
      toast.error("Failed to find order", {
        description: error.message
      });
      setSearchedOrder(null);
      setOrderItems([]);
    } finally {
      setLoading(false);
    }
  };

  const renderOrderStatus = (status: string) => {
    const statusMap: Record<string, { color: string, label: string }> = {
      "pending": { color: "bg-yellow-500", label: "Payment Pending" },
      "paid": { color: "bg-green-500", label: "Paid" },
      "processing": { color: "bg-blue-500", label: "Processing" },
      "shipped": { color: "bg-purple-500", label: "Shipped" },
      "delivered": { color: "bg-green-700", label: "Delivered" },
      "cancelled": { color: "bg-red-500", label: "Cancelled" }
    };

    const statusInfo = statusMap[status] || { color: "bg-gray-500", label: "Unknown" };

    return (
      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full ${statusInfo.color} mr-2`}></div>
        <span>{statusInfo.label}</span>
      </div>
    );
  };

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 md:px-6">
      <h1 className="heading-medium mb-6">Track Your Order</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Guest Tracking Form */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-cabin mb-4">Guest Order Tracking</h2>
            <p className="text-muted-foreground mb-4">
              Enter your order details to check the status of your purchase.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="orderNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., 12345678" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="you@example.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing ZIP Code</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., 90210" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full bg-peach hover:bg-peach/90"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    "Track Order"
                  )}
                </Button>
              </form>
            </Form>
          </div>
          
          {searchedOrder && (
            <div className="bg-white p-6 rounded-lg shadow mt-6">
              <h2 className="text-xl font-cabin mb-4">Order #{searchedOrder.id.substring(0, 8).toUpperCase()}</h2>
              <p className="text-sm text-muted-foreground">
                Placed on {new Date(searchedOrder.created_at).toLocaleDateString()}
              </p>
              
              <div className="mt-4 mb-6">
                {renderOrderStatus(searchedOrder.status)}
              </div>
              
              <Separator className="my-4" />
              
              {orderItems.length > 0 && (
                <div className="space-y-4 mt-4">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.product_name} ({item.product_size})</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p>{formatCurrency(parseFloat(item.price) * item.quantity)}</p>
                    </div>
                  ))}
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-medium">
                    <p>Order Total</p>
                    <p>{formatCurrency(searchedOrder.amount / 100)}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* User Orders */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-cabin mb-4">My Orders</h2>
            
            {user ? (
              <>
                <p className="text-muted-foreground mb-6">
                  View and track all your previous orders.
                </p>
                
                <Button
                  onClick={fetchUserOrders}
                  variant="outline"
                  className="mb-6"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Load My Orders"
                  )}
                </Button>
                
                {userOrders.length > 0 ? (
                  <div className="space-y-6">
                    {userOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-medium">Order #{order.id.substring(0, 8).toUpperCase()}</p>
                            <p className="text-sm text-muted-foreground">
                              Placed on {new Date(order.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div>{renderOrderStatus(order.status)}</div>
                        </div>
                        
                        <Separator className="my-3" />
                        
                        {order.order_items && order.order_items.length > 0 ? (
                          <>
                            <div className="space-y-3 mb-3">
                              {order.order_items.slice(0, 2).map((item: any) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                  <p>
                                    {item.product_name} ({item.product_size}) x {item.quantity}
                                  </p>
                                  <p>{formatCurrency(parseFloat(item.price) * item.quantity)}</p>
                                </div>
                              ))}
                              
                              {order.order_items.length > 2 && (
                                <p className="text-sm text-muted-foreground">
                                  + {order.order_items.length - 2} more items
                                </p>
                              )}
                            </div>
                            
                            <div className="flex justify-between text-sm font-medium">
                              <p>Total</p>
                              <p>{formatCurrency(order.amount / 100)}</p>
                            </div>
                          </>
                        ) : (
                          <p className="text-sm text-muted-foreground">No items found</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-cabin mb-2">No orders found</h3>
                    <p className="text-muted-foreground">
                      When you place an order, it will appear here.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-lg font-cabin mb-2">Sign in to view your orders</h3>
                <p className="text-muted-foreground mb-4">
                  Create an account or sign in to track your orders easily.
                </p>
                <Button
                  className="bg-peach hover:bg-peach/90"
                  onClick={() => {/* Redirect to login page */}}
                >
                  Sign In
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
