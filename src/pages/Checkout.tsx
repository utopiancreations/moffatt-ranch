
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

const Checkout = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [stripeLoading, setStripeLoading] = useState(false);
  const [stripePublishableKey, setStripePublishableKey] = useState<string | null>(null);
  
  // Form fields
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  
  // Calculate shipping fee (flat rate for now)
  const shippingFee = 5.99;
  const orderTotal = cartTotal + shippingFee;
  
  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
    }
    
    // Pre-fill form with user data if available
    if (user) {
      setEmail(user.email || "");
    }
    
    // Fetch Stripe publishable key
    fetchStripeConfig();
  }, [user, cart.length, navigate]);
  
  const fetchStripeConfig = async () => {
    try {
      setStripeLoading(true);
      const { data, error } = await supabase
        .from("stripe_config")
        .select("publishable_key")
        .limit(1)
        .single();
        
      if (error) throw error;
      if (data && data.publishable_key) {
        setStripePublishableKey(data.publishable_key);
      } else {
        toast.error("Stripe is not configured properly. Please contact support.");
      }
    } catch (error: any) {
      console.error("Error fetching Stripe config:", error);
      toast.error("Failed to load payment configuration");
    } finally {
      setStripeLoading(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripePublishableKey) {
      toast.error("Payment system is not available right now");
      return;
    }
    
    try {
      setLoading(true);
      
      // Basic validation
      if (!email || !firstName || !lastName || !address || !city || !state || !zipCode) {
        toast.error("Please fill in all required fields");
        setLoading(false);
        return;
      }
      
      // Create order in database
      const orderData = {
        user_id: user?.id || null,
        email,
        status: "pending",
        amount: Math.round(orderTotal * 100), // Store in cents for Stripe
        shipping_address: {
          first_name: firstName,
          last_name: lastName,
          address,
          city,
          state,
          zip_code: zipCode,
          phone
        }
      };
      
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert(orderData)
        .select()
        .single();
        
      if (orderError) throw orderError;
      
      // Create order items
      const orderItems = cart.map(item => ({
        order_id: order.id,
        product_id: item.id,
        product_variant_id: item.variant_id,
        quantity: item.quantity,
        price: item.price,
        product_name: item.name,
        product_size: item.size
      }));
      
      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);
        
      if (itemsError) throw itemsError;
      
      // Initialize Stripe
      const stripe = await loadStripe(stripePublishableKey);
      if (!stripe) throw new Error("Failed to initialize Stripe");
      
      // Call backend to create Stripe checkout session
      const { data: sessionData, error: sessionError } = await supabase.functions.invoke('create-checkout', {
        body: {
          order_id: order.id,
          cart_items: cart.map(item => ({
            name: `${item.name} (${item.size})`,
            description: `Size: ${item.size}`,
            amount: Math.round(parseFloat(item.price) * 100),
            quantity: item.quantity
          })),
          shipping_fee: Math.round(shippingFee * 100),
          customer_email: email
        }
      });
      
      if (sessionError) throw sessionError;
      
      if (!sessionData || !sessionData.id) {
        throw new Error("Invalid response from payment service");
      }
      
      // Update order with session ID
      await supabase
        .from("orders")
        .update({ stripe_session_id: sessionData.id })
        .eq("id", order.id);
      
      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: sessionData.id
      });
      
      if (result.error) {
        throw new Error(result.error.message);
      }
      
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error("Checkout failed", {
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 md:px-6">
      <h1 className="heading-medium mb-6">Checkout</h1>
      
      {stripeLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-peach" />
          <span className="ml-2">Loading payment configuration...</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-cabin mb-4">Contact Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-cabin mb-4">Shipping Address</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Payment will be securely processed by Stripe on the next page.
              </p>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow sticky top-6">
                <h2 className="text-xl font-cabin mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.variant_id} className="flex justify-between">
                      <div>
                        <p className="font-medium">
                          {item.name} ({item.size}) x {item.quantity}
                        </p>
                      </div>
                      <p>{formatCurrency(parseFloat(item.price) * item.quantity)}</p>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{formatCurrency(cartTotal)}</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>{formatCurrency(shippingFee)}</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-medium">
                    <p>Total</p>
                    <p className="text-lg">{formatCurrency(orderTotal)}</p>
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-peach hover:bg-peach/90 mt-4"
                    disabled={loading || !stripePublishableKey}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Continue to Payment"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Checkout;
