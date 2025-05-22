
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Hero from "@/components/Hero";
import { Package } from "lucide-react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
  category: string;
  in_stock: boolean;
};

const Merchandise = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Fetch all available merchandise products
      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("*")
        .eq("category", "merchandise")
        .eq("in_stock", true)
        .order("name");
      
      if (productError) throw productError;
      
      setProducts(productData || []);
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

  return (
    <div>
      <Hero
        backgroundVideo="/lovable-uploads/video_fx_undefined_2025_05_03_17_23.mp4"
        backgroundImage="/lovable-uploads/87ed0cf3-be46-4d35-945a-8b493c437024.png"
        title="Ranch Merchandise"
        subtitle="Quality ranch apparel and gifts available for purchase at our location"
      />
      
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <h2 className="heading-medium text-center mb-10">Our Products</h2>
          
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
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                        <Package className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-cabin">{product.name}</h3>
                      <span className="text-peach font-medium">${product.price}</span>
                    </div>
                    
                    <p className="text-gray-700 mb-6">{product.description}</p>
                    
                    <div className="mt-auto text-center">
                      <div className="inline-block px-4 py-2 bg-peach/10 text-peach rounded-md">
                        Available for purchase at our ranch
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-16 text-center">
            <h3 className="text-xl font-medium mb-4">Visit Us To Purchase</h3>
            <p className="max-w-2xl mx-auto text-gray-600">
              All of our merchandise is available for purchase at our ranch location. 
              Come visit us during our regular business hours to browse our selection.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Merchandise;
