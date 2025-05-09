
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);
  
  const sessionId = searchParams.get("session_id");
  
  useEffect(() => {
    // Clear the cart once we're on the success page
    clearCart();
    
    if (sessionId) {
      verifyOrder();
    } else {
      setLoading(false);
    }
  }, [sessionId, clearCart]);
  
  const verifyOrder = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-checkout', {
        body: { session_id: sessionId }
      });
      
      if (error) throw error;
      
      if (data?.order) {
        setOrder(data.order);
      }
    } catch (error) {
      console.error("Error verifying order:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const orderNumber = order?.id?.substring(0, 8).toUpperCase() || "Unknown";
  
  return (
    <div className="container mx-auto max-w-3xl py-16 px-4 text-center">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-peach mb-4" />
          <h2 className="text-xl font-cabin">Verifying your order...</h2>
        </div>
      ) : (
        <>
          <div className="mb-8 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="heading-medium mb-4">Thank You for Your Order!</h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            Your order has been received and is being processed.
          </p>
          
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-cabin mb-4">Order Details</h2>
            <p className="text-muted-foreground mb-2">Order Number: <span className="font-medium text-foreground">{orderNumber}</span></p>
            {order?.email && <p className="text-muted-foreground">Confirmation sent to: <span className="font-medium text-foreground">{order.email}</span></p>}
            
            <div className="my-6 border-t border-b py-4">
              <p className="text-lg">
                We'll send you shipping confirmation and tracking details once your order ships.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/order-tracking")}
            >
              Track My Order
            </Button>
            
            <Button
              className="bg-peach hover:bg-peach/90"
              onClick={() => navigate("/merchandise")}
            >
              Continue Shopping
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSuccess;
