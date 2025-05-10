
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ArrowLeft, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatCurrency } from "@/lib/utils";

interface OrderDetailsProps {
  orderId: string;
  onBack: () => void;
  onUpdate: () => void;
}

const OrderDetails = ({ orderId, onBack, onUpdate }: OrderDetailsProps) => {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [refundAmount, setRefundAmount] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [status, setStatus] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingUrl, setTrackingUrl] = useState("");
  const [notes, setNotes] = useState("");

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      
      // Fetch order details
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();
        
      if (orderError) throw orderError;
      
      // Fetch order items
      const { data: itemsData, error: itemsError } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderId);
        
      if (itemsError) throw itemsError;
      
      setOrder(orderData);
      setOrderItems(itemsData || []);
      
      // Set form fields from order data
      setStatus(orderData.status);
      setTrackingNumber(orderData.tracking_number || "");
      setTrackingUrl(orderData.tracking_url || "");
      setNotes(orderData.notes || "");
      setRefundAmount(orderData.refund_amount ? (orderData.refund_amount / 100).toString() : "");
      setRefundReason(orderData.refund_reason || "");
      
    } catch (error: any) {
      toast.error("Failed to load order details", {
        description: error.message
      });
      console.error("Error loading order details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const handleUpdateOrder = async () => {
    try {
      setUpdating(true);
      
      const updates = {
        status,
        tracking_number: trackingNumber || null,
        tracking_url: trackingUrl || null,
        notes: notes || null,
        updated_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from("orders")
        .update(updates)
        .eq("id", orderId);
        
      if (error) throw error;
      
      toast.success("Order updated successfully");
      onUpdate();
    } catch (error: any) {
      toast.error("Failed to update order", {
        description: error.message
      });
      console.error("Error updating order:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleRefund = async () => {
    try {
      setUpdating(true);
      
      // Convert refund amount to cents
      const refundAmountCents = Math.round(parseFloat(refundAmount) * 100);
      
      if (isNaN(refundAmountCents)) {
        throw new Error("Please enter a valid refund amount");
      }
      
      if (refundAmountCents > order.amount) {
        throw new Error("Refund amount cannot exceed the order amount");
      }
      
      if (!refundReason.trim()) {
        throw new Error("Please provide a reason for the refund");
      }
      
      const updates = {
        status: "refunded",
        refund_amount: refundAmountCents,
        refund_reason: refundReason,
        updated_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from("orders")
        .update(updates)
        .eq("id", orderId);
        
      if (error) throw error;
      
      toast.success("Refund processed successfully");
      fetchOrderDetails();
    } catch (error: any) {
      toast.error("Failed to process refund", {
        description: error.message
      });
      console.error("Error processing refund:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelOrder = async () => {
    try {
      setUpdating(true);
      
      const updates = {
        status: "cancelled",
        updated_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from("orders")
        .update(updates)
        .eq("id", orderId);
        
      if (error) throw error;
      
      toast.success("Order cancelled successfully");
      fetchOrderDetails();
    } catch (error: any) {
      toast.error("Failed to cancel order", {
        description: error.message
      });
      console.error("Error cancelling order:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-peach" />
        <p className="mt-2">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div>
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
        <div className="text-center">
          <p>Order not found</p>
        </div>
      </div>
    );
  }

  const shippingAddress = order.shipping_address;

  return (
    <div>
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Orders
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Order Details</span>
                <span className="text-sm font-normal bg-slate-100 px-2 py-1 rounded">
                  Order #{order.id.substring(0, 8)}
                </span>
              </CardTitle>
              <CardDescription>
                Placed on {format(new Date(order.created_at), "MMMM d, yyyy 'at' h:mm a")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Order Status</Label>
                <Select 
                  value={status} 
                  onValueChange={setStatus} 
                  disabled={order.status === "refunded"}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tracking">Tracking Number</Label>
                <Input
                  id="tracking"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number"
                  disabled={["cancelled", "refunded"].includes(order.status)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="trackingUrl">Tracking URL</Label>
                <Input
                  id="trackingUrl"
                  value={trackingUrl}
                  onChange={(e) => setTrackingUrl(e.target.value)}
                  placeholder="Enter tracking URL"
                  disabled={["cancelled", "refunded"].includes(order.status)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Order Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add internal notes about this order"
                  rows={3}
                />
              </div>
              
              <Button 
                onClick={handleUpdateOrder} 
                disabled={updating || order.status === "refunded"}
                className="w-full md:w-auto"
              >
                {updating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Order"
                )}
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.product_name}</TableCell>
                      <TableCell>{item.product_size}</TableCell>
                      <TableCell>{formatCurrency(parseFloat(item.price))}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(parseFloat(item.price) * item.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 text-right">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(order.amount / 100)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="font-medium">Email:</p>
                <p className="text-gray-600">{order.email}</p>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-1">
                <p className="font-medium">Shipping Address:</p>
                <p className="text-gray-600">{shippingAddress.first_name} {shippingAddress.last_name}</p>
                <p className="text-gray-600">{shippingAddress.address}</p>
                <p className="text-gray-600">
                  {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip_code}
                </p>
                {shippingAddress.phone && <p className="text-gray-600">Phone: {shippingAddress.phone}</p>}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.status !== "refunded" && order.status !== "cancelled" && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full">Cancel Order</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will mark the order as cancelled. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCancelOrder}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              
              {order.status !== "refunded" && (
                <Card className="border-dashed">
                  <CardHeader>
                    <CardTitle className="text-base">Process Refund</CardTitle>
                    <CardDescription>
                      Issue a refund for this order
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="refundAmount">Refund Amount ($)</Label>
                      <Input
                        id="refundAmount"
                        value={refundAmount}
                        onChange={(e) => setRefundAmount(e.target.value)}
                        placeholder={`${order.amount / 100}`}
                        type="number"
                        step="0.01"
                        min="0"
                        max={order.amount / 100}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="refundReason">Refund Reason</Label>
                      <Textarea
                        id="refundReason"
                        value={refundReason}
                        onChange={(e) => setRefundReason(e.target.value)}
                        placeholder="Reason for refund"
                        rows={2}
                      />
                    </div>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="w-full">
                          Process Refund
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Refund</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will mark the order as refunded and record the refund details.
                            Are you sure you want to continue?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleRefund}>Confirm Refund</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
