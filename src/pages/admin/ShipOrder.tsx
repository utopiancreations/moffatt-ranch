// src/pages/admin/ShipOrder.tsx
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Truck, 
  Package,
  AlertCircle,
  Loader2,
  CheckCircle,
} from "lucide-react";

interface Order {
  id: string;
  email: string;
  status: string;
  payment_status: string | null;
  stripe_payment_id: string | null;
  shipping_address: {
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
  };
}

const carriers = [
  { id: "usps", name: "USPS" },
  { id: "ups", name: "UPS" },
  { id: "fedex", name: "FedEx" },
  { id: "dhl", name: "DHL" },
  { id: "other", name: "Other" },
];

// Function to generate tracking URLs based on carrier
function getTrackingUrl(carrier: string, trackingNumber: string): string {
  carrier = carrier.toLowerCase();
  
  switch (carrier) {
    case 'usps':
      return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`;
    case 'ups':
      return `https://www.ups.com/track?tracknum=${trackingNumber}`;
    case 'fedex':
      return `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`;
    case 'dhl':
      return `https://www.dhl.com/en/express/tracking.html?AWB=${trackingNumber}`;
    default:
      // Generic tracking URL or the carrier's homepage
      return `https://www.google.com/search?q=${carrier}+tracking+${trackingNumber}`;
  }
}

export default function ShipOrder() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [carrier, setCarrier] = useState("");
  const [otherCarrierName, setOtherCarrierName] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [notes, setNotes] = useState("");

  // Load order details
  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (!data) throw new Error("Order not found");

        // Check if order can be shipped
        if (data.status === "shipped" || data.status === "delivered") {
          toast.error("This order has already been shipped");
          navigate(`/admin/orders/${id}`);
          return;
        }

        if (data.status === "cancelled") {
          toast.error("Cannot ship a cancelled order");
          navigate(`/admin/orders/${id}`);
          return;
        }

        if (data.payment_status !== "paid" && !data.stripe_payment_id) {
          toast.error("Cannot ship an unpaid order");
          navigate(`/admin/orders/${id}`);
          return;
        }

        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.error("Failed to load order details");
        navigate("/admin/orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!order) return;
    
    // Validate form
    if (!carrier) {
      toast.error("Please select a carrier");
      return;
    }
    
    if (carrier === "other" && !otherCarrierName.trim()) {
      toast.error("Please enter the carrier name");
      return;
    }
    
    if (!trackingNumber.trim()) {
      toast.error("Please enter a tracking number");
      return;
    }
    
    setSubmitting(true);
    
    try {
      const actualCarrier = carrier === "other" ? otherCarrierName : carriers.find(c => c.id === carrier)?.name || carrier;
      const trackingUrl = getTrackingUrl(actualCarrier, trackingNumber);
      
      // Update order in Supabase
      const { error: updateError } = await supabase
        .from("orders")
        .update({
          status: "shipped",
          tracking_number: trackingNumber,
          tracking_carrier: actualCarrier,
          tracking_url: trackingUrl,
          shipped_at: new Date().toISOString(),
          shipping_notes: notes || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", order.id);

      if (updateError) throw updateError;

      // If Stripe payment ID exists, update tracking in Stripe
      if (order.stripe_payment_id) {
        try {
          const response = await supabase.functions.invoke("stripe-tracking", {
            body: {
              order_id: order.id,
              payment_intent_id: order.stripe_payment_id,
              tracking_number: trackingNumber,
              carrier: actualCarrier,
            },
          });

          if (response.error) {
            console.error("Error updating Stripe tracking:", response.error);
            // We'll continue even if Stripe update fails
            toast.warning("Order marked as shipped, but Stripe tracking update failed", {
              description: "Customer will still be notified of shipping",
            });
          }
        } catch (stripeError) {
          console.error("Error invoking Stripe tracking function:", stripeError);
          // Continue with success, but show warning
          toast.warning("Order marked as shipped, but Stripe tracking update failed", {
            description: "Customer will still be notified of shipping",
          });
        }
      }

      setSuccess(true);
      
      toast.success("Order marked as shipped", {
        description: "Tracking information has been updated",
      });
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate(`/admin/orders/${order.id}`);
      }, 2000);
    } catch (error) {
      console.error("Error shipping order:", error);
      toast.error("Failed to update shipping information");
      setSubmitting(false);
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

  if (success) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-center">Order Shipped Successfully</CardTitle>
            <CardDescription className="text-center">
              Tracking information has been updated and the customer will be notified
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button onClick={() => navigate(`/admin/orders/${order.id}`)}>
              View Order Details
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="outline" className="mb-6" onClick={() => navigate(`/admin/orders/${order.id}`)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Order
      </Button>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="mr-2 h-5 w-5" />
            Ship Order #{order.id}
          </CardTitle>
          <CardDescription>
            Enter tracking information to mark this order as shipped
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start">
              <Truck className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-800">Shipping Address</h3>
                <p className="text-blue-700 mt-1">
                  {order.shipping_address.first_name} {order.shipping_address.last_name}<br />
                  {order.shipping_address.address}<br />
                  {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip_code}
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="carrier">Shipping Carrier</Label>
                <Select
                  value={carrier}
                  onValueChange={setCarrier}
                >
                  <SelectTrigger id="carrier">
                    <SelectValue placeholder="Select a carrier" />
                  </SelectTrigger>
                  <SelectContent>
                    {carriers.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {carrier === "other" && (
                <div>
                  <Label htmlFor="otherCarrier">Carrier Name</Label>
                  <Input
                    id="otherCarrier"
                    placeholder="Enter carrier name"
                    value={otherCarrierName}
                    onChange={(e) => setOtherCarrierName(e.target.value)}
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="trackingNumber">Tracking Number</Label>
                <Input
                  id="trackingNumber"
                  placeholder="Enter tracking number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="notes">Shipping Notes (Optional)</Label>
                <Input
                  id="notes"
                  placeholder="Add any additional notes or information"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-yellow-700 text-sm">
                <p className="font-medium">Important</p>
                <p>
                  Once marked as shipped, the order status will be updated and the customer may 
                  receive a notification with the tracking information. Make sure all details are correct.
                </p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate(`/admin/orders/${order.id}`)}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Truck className="mr-2 h-4 w-4" />
                  Mark as Shipped
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}