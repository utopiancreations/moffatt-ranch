// src/pages/admin/OrderDetail.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Clock, 
  Package, 
  CheckCircle, 
  AlertCircle,
  CreditCard,
  Truck,
  MapPin,
  User,
  Loader2,
  ShoppingBag,
  Receipt,
  ExternalLink,
} from "lucide-react";

type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_size: string;
  quantity: number;
  price: string;
};

type Order = {
  id: string;
  created_at: string;
  email: string;
  status: string;
  payment_status: string | null;
  amount: number;
  shipping_address: {
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    phone?: string;
  };
  stripe_payment_id: string | null;
  stripe_session_id: string | null;
  tracking_number: string | null;
  tracking_carrier: string | null;
  tracking_url: string | null;
  updated_at: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
};

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const [order, setOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        // Fetch order
        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .select("*")
          .eq("id", id)
          .single();

        if (orderError) throw orderError;
        
        // Fetch order items
        const { data: itemsData, error: itemsError } = await supabase
          .from("order_items")
          .select("*")
          .eq("order_id", id);

        if (itemsError) throw itemsError;

        setOrder(orderData);
        setOrderItems(itemsData || []);
      } catch (error) {
        console.error("Error fetching order details:", error);
        toast.error("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrderDetails();
    }
  }, [id]);

  const updateOrderStatus = async (status: string) => {
    if (!order) return;
    
    setActionLoading(true);
    try {
      const updates: Record<string, any> = { 
        status,
        updated_at: new Date().toISOString()
      };
      
      // Add additional timestamp fields based on status
      if (status === 'shipped' && !order.shipped_at) {
        updates.shipped_at = new Date().toISOString();
      } else if (status === 'delivered' && !order.delivered_at) {
        updates.delivered_at = new Date().toISOString();
      }
      
      const { error } = await supabase
        .from("orders")
        .update(updates)
        .eq("id", order.id);

      if (error) throw error;
      
      // Update local state
      setOrder({
        ...order,
        status,
        updated_at: updates.updated_at,
        shipped_at: updates.shipped_at || order.shipped_at,
        delivered_at: updates.delivered_at || order.delivered_at
      });
      
      toast.success(`Order status updated to ${status}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case "paid":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Paid</Badge>;
      case "shipped":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Shipped</Badge>;
      case "delivered":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Delivered</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      case "payment_failed":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Payment Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (paymentStatus: string | null, stripeId: string | null) => {
    if (!paymentStatus && !stripeId) {
      return <Badge variant="outline" className="bg-gray-100 text-gray-700">Awaiting Payment</Badge>;
    }
    
    switch (paymentStatus) {
      case "paid":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Paid</Badge>;
      case "refunded":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Refunded</Badge>;
      case "failed":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>;
      default:
        return stripeId 
          ? <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200">Processing</Badge>
          : <Badge variant="outline" className="bg-gray-100 text-gray-700">Not Paid</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Order Not Found</CardTitle>
            <CardDescription>The requested order could not be found</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate("/admin/orders")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={() => navigate("/admin/orders")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
        
        <div className="flex space-x-2">
          {order.status !== "shipped" && order.payment_status === "paid" && (
            <Button 
              variant="outline" 
              className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
              disabled={actionLoading}
              onClick={() => navigate(`/admin/orders/${order.id}/ship`)}
            >
              <Package className="mr-2 h-4 w-4" />
              Ship Order
            </Button>
          )}
          
          {order.status !== "cancelled" && (
            <Button 
              variant="outline" 
              className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
              disabled={actionLoading}
              onClick={() => updateOrderStatus("cancelled")}
            >
              <AlertCircle className="mr-2 h-4 w-4" />
              Cancel Order
            </Button>
          )}
          
          {order.status === "shipped" && order.status !== "delivered" && (
            <Button 
              variant="outline"
              className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
              disabled={actionLoading}
              onClick={() => updateOrderStatus("delivered")}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Delivered
            </Button>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Order #{order.id}</h1>
        <div className="flex items-center space-x-3">
          {getStatusBadge(order.status)}
          {getPaymentStatusBadge(order.payment_status, order.stripe_payment_id)}
          <span className="text-muted-foreground">
            Placed on {formatDate(order.created_at)}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="items">
            <TabsList>
              <TabsTrigger value="items">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Order Items
              </TabsTrigger>
              <TabsTrigger value="timeline">
                <Clock className="h-4 w-4 mr-2" />
                Timeline
              </TabsTrigger>
              <TabsTrigger value="shipping">
                <Truck className="h-4 w-4 mr-2" />
                Shipping Info
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="items" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                  <CardDescription>Products ordered by the customer</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-2">
                        <div className="flex-1">
                          <h3 className="font-medium">{item.product_name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Size: {item.product_size} | Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {formatCurrency(parseFloat(item.price) * item.quantity)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatCurrency(parseFloat(item.price))} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatCurrency(order.amount / 100 - 5.99)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{formatCurrency(5.99)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{formatCurrency(order.amount / 100)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="timeline" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Order Timeline</CardTitle>
                  <CardDescription>History of order events and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="relative border-l border-gray-200 ml-3 space-y-6">
                    <li className="mb-6 ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 bg-green-100 rounded-full -left-4 ring-4 ring-white">
                        <Receipt className="h-4 w-4 text-green-600" />
                      </span>
                      <h3 className="flex items-center mb-1 text-lg font-semibold">
                        Order Placed
                      </h3>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                        {formatDate(order.created_at)}
                      </time>
                      <p className="text-base font-normal text-gray-600">
                        Order #{order.id} was placed by {order.email}
                      </p>
                    </li>
                    
                    {order.payment_status === "paid" && (
                      <li className="mb-6 ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-green-100 rounded-full -left-4 ring-4 ring-white">
                          <CreditCard className="h-4 w-4 text-green-600" />
                        </span>
                        <h3 className="flex items-center mb-1 text-lg font-semibold">
                          Payment Confirmed
                        </h3>
                        <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                          {formatDate(order.updated_at || order.created_at)}
                        </time>
                        <p className="text-base font-normal text-gray-600">
                          Payment confirmed via Stripe. 
                          {order.stripe_payment_id && (
                            <span className="block text-sm text-gray-500 mt-1">
                              Payment ID: {order.stripe_payment_id}
                            </span>
                          )}
                        </p>
                      </li>
                    )}
                    
                    {order.status === "shipped" && order.shipped_at && (
                      <li className="mb-6 ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                          <Package className="h-4 w-4 text-blue-600" />
                        </span>
                        <h3 className="flex items-center mb-1 text-lg font-semibold">
                          Order Shipped
                        </h3>
                        <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                          {formatDate(order.shipped_at)}
                        </time>
                        <p className="text-base font-normal text-gray-600">
                          Order shipped via {order.tracking_carrier || "courier"}
                          {order.tracking_number && (
                            <span className="block text-sm mt-1">
                              Tracking number: {order.tracking_number}
                              {order.tracking_url && (
                                <a 
                                  href={order.tracking_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center ml-2 text-blue-600 hover:underline"
                                >
                                  Track <ExternalLink className="h-3 w-3 ml-1" />
                                </a>
                              )}
                            </span>
                          )}
                        </p>
                      </li>
                    )}
                    
                    {order.status === "delivered" && order.delivered_at && (
                      <li className="mb-6 ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full -left-4 ring-4 ring-white">
                          <CheckCircle className="h-4 w-4 text-purple-600" />
                        </span>
                        <h3 className="flex items-center mb-1 text-lg font-semibold">
                          Order Delivered
                        </h3>
                        <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                          {formatDate(order.delivered_at)}
                        </time>
                        <p className="text-base font-normal text-gray-600">
                          Order was successfully delivered to the customer
                        </p>
                      </li>
                    )}
                    
                    {order.status === "cancelled" && (
                      <li className="mb-6 ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-red-100 rounded-full -left-4 ring-4 ring-white">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        </span>
                        <h3 className="flex items-center mb-1 text-lg font-semibold">
                          Order Cancelled
                        </h3>
                        <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                          {formatDate(order.updated_at || order.created_at)}
                        </time>
                        <p className="text-base font-normal text-gray-600">
                          Order was cancelled
                        </p>
                      </li>
                    )}
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                  <CardDescription>Delivery address and tracking details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                        Shipping Address
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="font-medium">
                          {order.shipping_address.first_name} {order.shipping_address.last_name}
                        </p>
                        <p>{order.shipping_address.address}</p>
                        <p>
                          {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip_code}
                        </p>
                        {order.shipping_address.phone && (
                          <p className="mt-2 text-gray-600">{order.shipping_address.phone}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <User className="h-5 w-5 mr-2 text-gray-500" />
                        Customer Details
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p>
                          <span className="text-gray-600">Email:</span> {order.email}
                        </p>
                        <p>
                          <span className="text-gray-600">Name:</span> {order.shipping_address.first_name} {order.shipping_address.last_name}
                        </p>
                        {order.shipping_address.phone && (
                          <p>
                            <span className="text-gray-600">Phone:</span> {order.shipping_address.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Truck className="h-5 w-5 mr-2 text-gray-500" />
                      Tracking Information
                    </h3>
                    
                    {order.tracking_number ? (
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p>
                          <span className="text-gray-600">Carrier:</span>{" "}
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 ml-2">
                            {order.tracking_carrier}
                          </Badge>
                        </p>
                        <p className="mt-2">
                          <span className="text-gray-600">Tracking Number:</span>{" "}
                          <span className="font-medium">{order.tracking_number}</span>
                        </p>
                        {order.tracking_url && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-3"
                            onClick={() => window.open(order.tracking_url, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Track Package
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-4 rounded-md text-gray-600">
                        {order.status === "cancelled" ? (
                          <p>This order was cancelled and has no tracking information.</p>
                        ) : order.payment_status !== "paid" ? (
                          <p>This order is awaiting payment and has not been shipped yet.</p>
                        ) : (
                          <div>
                            <p>This order has not been shipped yet.</p>
                            <Button 
                              variant="outline"
                              className="mt-3"
                              onClick={() => navigate(`/admin/orders/${order.id}/ship`)}
                            >
                              <Package className="h-4 w-4 mr-2" />
                              Ship Order Now
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>Details about the order payment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Payment Status</h3>
                  <div className="mt-1">
                    {getPaymentStatusBadge(order.payment_status, order.stripe_payment_id)}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                  <p className="mt-1 flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-gray-400" />
                    {order.payment_status === "paid" ? "Credit Card (Stripe)" : "Not paid yet"}
                  </p>
                </div>
                
                {order.stripe_payment_id && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Payment ID</h3>
                    <p className="mt-1 text-sm break-all">{order.stripe_payment_id}</p>
                    <a 
                      href={`https://dashboard.stripe.com/payments/${order.stripe_payment_id}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 mt-1 inline-flex items-center hover:underline"
                    >
                      View in Stripe Dashboard
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                  <p className="mt-1 text-2xl font-bold">{formatCurrency(order.amount / 100)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Order Actions</CardTitle>
              <CardDescription>Manage this order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {order.status !== "shipped" && order.payment_status === "paid" && (
                <Button 
                  className="w-full"
                  disabled={actionLoading}
                  onClick={() => navigate(`/admin/orders/${order.id}/ship`)}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Ship Order
                </Button>
              )}
              
              {order.status === "shipped" && order.status !== "delivered" && (
                <Button 
                  className="w-full"
                  disabled={actionLoading}
                  onClick={() => updateOrderStatus("delivered")}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Delivered
                </Button>
              )}
              
              {order.status !== "cancelled" && (
                <Button 
                  variant="outline"
                  className="w-full"
                  disabled={actionLoading}
                  onClick={() => updateOrderStatus("cancelled")}
                >
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Cancel Order
                </Button>
              )}
              
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => window.print()}
              >
                <Receipt className="mr-2 h-4 w-4" />
                Print Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}