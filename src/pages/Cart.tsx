
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Trash, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 md:px-6">
      <h1 className="heading-medium mb-6">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex justify-center items-center w-16 h-16 bg-muted rounded-full mb-4">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-cabin mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Button onClick={() => navigate('/merchandise')} className="bg-peach hover:bg-peach/90">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cart.map(item => (
              <div key={item.variant_id} className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b">
                <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0 sm:mr-4 bg-muted rounded">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted rounded">
                      <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-lg font-cabin">{item.name}</h3>
                  <p className="text-muted-foreground">Size: {item.size}</p>
                  <p className="text-peach font-medium">{formatCurrency(parseFloat(item.price))}</p>
                </div>
                
                <div className="flex items-center mt-4 sm:mt-0">
                  <div className="flex items-center border rounded-md">
                    <button
                      className="px-2 py-1 text-gray-600 hover:text-gray-800"
                      onClick={() => updateQuantity(item.variant_id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    
                    <span className="px-4 py-1">{item.quantity}</span>
                    
                    <button
                      className="px-2 py-1 text-gray-600 hover:text-gray-800"
                      onClick={() => updateQuantity(item.variant_id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <button
                    className="ml-4 text-red-500 hover:text-red-700"
                    onClick={() => removeFromCart(item.variant_id)}
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
            
            <div className="flex justify-between items-center mt-6">
              <Button 
                variant="outline" 
                onClick={() => navigate('/merchandise')}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
              
              <Button variant="ghost" onClick={clearCart} className="text-red-500 hover:text-red-700">
                Clear Cart
              </Button>
            </div>
          </div>
          
          <div className="bg-muted p-6 rounded-lg h-fit">
            <h3 className="text-lg font-cabin mb-4">Order Summary</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-between font-medium mb-6">
              <span>Estimated Total</span>
              <span>{formatCurrency(cartTotal)}</span>
            </div>
            
            <Button 
              className="w-full bg-peach hover:bg-peach/90" 
              onClick={handleCheckout}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Proceed to Checkout"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
