
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ShoppingBag, Plus, Minus } from "lucide-react";
import { useCart } from "@/hooks/useCart";

// Define proper types based on the database schema
type ProductVariant = {
  id: string;
  product_id: string;
  size: string;
  quantity: number;
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
  category: string;
  in_stock: boolean;
  variants: ProductVariant[];
};

const SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];

const Merchandise = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<Record<string, string>>({});
  const [productQuantities, setProductQuantities] = useState<Record<string, number>>({});
  
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Fetch all merchandise products
      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("*")
        .eq("category", "merchandise")
        .eq("in_stock", true);
      
      if (productError) throw productError;
      
      if (!productData || productData.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }
      
      // Fetch variants for these products
      const productIds = productData.map(p => p.id);
      
      // Type-safe query for product_variants
      const { data: variantData, error: variantError } = await supabase
        .from("product_variants")
        .select("*")
        .in("product_id", productIds)
        .gt("quantity", 0);
      
      if (variantError) throw variantError;
      
      // Combine products with their variants
      const productsWithVariants = productData.map(product => {
        // Filter variants for this specific product
        const variants = (variantData || []).filter(
          (v: any) => v.product_id === product.id
        );
        
        // Initialize with the first available size if any
        if (variants.length > 0) {
          setSelectedSize(prev => ({
            ...prev,
            [product.id]: variants[0].size
          }));
          
          // Initialize quantity to 1 for each product
          setProductQuantities(prev => ({
            ...prev,
            [product.id]: 1
          }));
        }
        
        // Return properly typed product with its variants
        return {
          ...product,
          variants: variants || []
        } as Product;
      });
      
      // Only show products that have at least one variant with stock
      const availableProducts = productsWithVariants.filter(
        product => product.variants && product.variants.length > 0
      );
      
      setProducts(availableProducts);
    } catch (error: any) {
      toast({
        title: "Error loading products",
        description: error.message,
        variant: "destructive"
      });
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSize(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const incrementQuantity = (productId: string) => {
    const currentProduct = products.find(p => p.id === productId);
    const currentSize = selectedSize[productId];
    
    if (!currentProduct || !currentSize) return;
    
    const variant = currentProduct.variants.find(v => v.size === currentSize);
    if (!variant) return;
    
    const currentQty = productQuantities[productId] || 0;
    if (currentQty < variant.quantity) {
      setProductQuantities(prev => ({
        ...prev,
        [productId]: currentQty + 1
      }));
    } else {
      toast({
        title: "Maximum quantity reached",
        description: `Only ${variant.quantity} items available in size ${currentSize}`,
      });
    }
  };

  const decrementQuantity = (productId: string) => {
    const currentQty = productQuantities[productId] || 0;
    if (currentQty > 1) {
      setProductQuantities(prev => ({
        ...prev,
        [productId]: currentQty - 1
      }));
    }
  };

  const handleAddToCart = (product: Product) => {
    const size = selectedSize[product.id];
    const quantity = productQuantities[product.id] || 1;
    
    const variant = product.variants.find(v => v.size === size);
    if (!variant) {
      toast({
        title: "Size not available",
        description: "Please select a different size",
        variant: "destructive"
      });
      return;
    }
    
    if (variant.quantity < quantity) {
      toast({
        title: "Not enough stock",
        description: `Only ${variant.quantity} items available in size ${size}`,
        variant: "destructive"
      });
      return;
    }
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      variant_id: variant.id,
      size,
      quantity
    });
    
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} (${size}) added to your cart`
    });
  };

  const getAvailableSizes = (product: Product) => {
    return SIZES.filter(size => 
      product.variants.some(v => v.size === size && v.quantity > 0)
    );
  };

  return (
    <div>
      <Hero
        backgroundVideo="/lovable-uploads/video_fx_undefined_2025_05_03_17_23.mp4"
        backgroundImage="/lovable-uploads/87ed0cf3-be46-4d35-945a-8b493c437024.png"
        title="Ranch Merchandise"
        subtitle="Show your support with our quality ranch apparel and gifts"
      />
      
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <h2 className="heading-medium text-center mb-10">Shop Our Collection</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No products currently available.</p>
              <p className="mt-4 text-gray-500">Check back soon for new merchandise!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={product.image_url || "/placeholder.svg"} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-cabin">{product.name}</h3>
                      <span className="text-peach font-medium">${product.price}</span>
                    </div>
                    
                    <p className="text-gray-700 mb-6">{product.description}</p>
                    
                    <div className="mt-auto">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                        <div className="flex flex-wrap gap-2">
                          {getAvailableSizes(product).map((size) => (
                            <button
                              key={size}
                              className={`px-3 py-1 text-sm border rounded ${
                                selectedSize[product.id] === size 
                                  ? 'bg-peach text-white border-peach' 
                                  : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                              }`}
                              onClick={() => handleSizeChange(product.id, size)}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border rounded-md">
                          <button 
                            className="px-2 py-1 text-gray-600 hover:text-gray-800"
                            onClick={() => decrementQuantity(product.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          
                          <span className="px-4 py-1">
                            {productQuantities[product.id] || 1}
                          </span>
                          
                          <button 
                            className="px-2 py-1 text-gray-600 hover:text-gray-800"
                            onClick={() => incrementQuantity(product.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <Button 
                          onClick={() => handleAddToCart(product)}
                          className="bg-peach hover:bg-peach/90"
                        >
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Merchandise;
