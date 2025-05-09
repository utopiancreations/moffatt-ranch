
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Edit, Trash, Plus, Minus, Package } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

type ProductVariant = {
  id?: string;
  product_id?: string;
  size: string;
  quantity: number;
};

type Product = {
  id?: string;
  name: string;
  description: string;
  price: string;
  image_url?: string;
  category: string;
  in_stock: boolean;
  variants?: ProductVariant[];
};

const SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];

const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    name: "",
    description: "",
    price: "",
    category: "merchandise",
    in_stock: true,
    variants: SIZES.map(size => ({ size, quantity: 0 }))
  });
  const [isEditing, setIsEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const supabase = useSupabaseClient();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // First fetch all products
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("*")
        .order("name");

      if (productsError) throw productsError;
      
      // Then fetch all variants for these products
      const productIds = productsData?.map(p => p.id) || [];
      let variants: any[] = [];
      
      if (productIds.length > 0) {
        const { data: variantsData, error: variantsError } = await supabase
          .from("product_variants")
          .select("*")
          .in("product_id", productIds);
          
        if (variantsError) throw variantsError;
        variants = variantsData || [];
      }
      
      // Combine products with their variants
      const productsWithVariants = productsData?.map(product => {
        const productVariants = variants.filter(v => v.product_id === product.id);
        return {
          ...product,
          variants: productVariants
        };
      });
      
      setProducts(productsWithVariants || []);
    } catch (error: any) {
      toast.error("Error fetching products", {
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProductChange = (field: keyof Product, value: string | boolean) => {
    setCurrentProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleVariantChange = (index: number, quantity: number) => {
    setCurrentProduct(prev => {
      const updatedVariants = [...(prev.variants || [])];
      updatedVariants[index] = { ...updatedVariants[index], quantity };
      return { ...prev, variants: updatedVariants };
    });
  };

  const handleSaveProduct = async () => {
    try {
      if (!currentProduct.name || !currentProduct.price) {
        toast.error("Product name and price are required");
        return;
      }
      
      let productId: string;
      
      if (isEditing && currentProduct.id) {
        // Update existing product
        const { error } = await supabase
          .from("products")
          .update({
            name: currentProduct.name,
            description: currentProduct.description,
            price: currentProduct.price,
            image_url: currentProduct.image_url,
            category: currentProduct.category,
            in_stock: currentProduct.in_stock
          })
          .eq("id", currentProduct.id);

        if (error) throw error;
        
        productId = currentProduct.id;
        
        toast.success("Product updated successfully");
      } else {
        // Create new product
        const { data, error } = await supabase
          .from("products")
          .insert([{
            name: currentProduct.name,
            description: currentProduct.description,
            price: currentProduct.price,
            image_url: currentProduct.image_url,
            category: currentProduct.category,
            in_stock: currentProduct.in_stock
          }])
          .select();

        if (error) throw error;
        
        productId = data[0].id;
        
        toast.success("Product created successfully");
      }
      
      // Handle variants
      if (currentProduct.variants && currentProduct.variants.length > 0) {
        // Delete existing variants if editing
        if (isEditing) {
          await supabase
            .from("product_variants")
            .delete()
            .eq("product_id", productId);
        }
        
        // Create new variants with quantities
        const variantsToInsert = currentProduct.variants
          .filter(v => v.quantity > 0) // Only insert variants with stock
          .map(variant => ({
            product_id: productId,
            size: variant.size,
            quantity: variant.quantity
          }));
          
        if (variantsToInsert.length > 0) {
          const { error: variantError } = await supabase
            .from("product_variants")
            .insert(variantsToInsert);
            
          if (variantError) throw variantError;
        }
      }
      
      // Reset form and refresh products
      setCurrentProduct({
        name: "",
        description: "",
        price: "",
        category: "merchandise",
        in_stock: true,
        variants: SIZES.map(size => ({ size, quantity: 0 }))
      });
      setIsEditing(false);
      setDialogOpen(false);
      fetchProducts();
      
    } catch (error: any) {
      toast.error("Error saving product", {
        description: error.message
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      // Delete product (cascade will handle variants)
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      toast.success("Product deleted successfully");
      
      fetchProducts();
    } catch (error: any) {
      toast.error("Error deleting product", {
        description: error.message
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    // Create a full variant set with all sizes
    const currentVariants = product.variants || [];
    
    const fullVariantSet = SIZES.map(size => {
      const existingVariant = currentVariants.find(v => v.size === size);
      return existingVariant || { size, quantity: 0 };
    });
    
    setCurrentProduct({
      ...product,
      variants: fullVariantSet
    });
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleAddNewProduct = () => {
    setCurrentProduct({
      name: "",
      description: "",
      price: "",
      category: "merchandise",
      in_stock: true,
      variants: SIZES.map(size => ({ size, quantity: 0 }))
    });
    setIsEditing(false);
    setDialogOpen(true);
  };

  const handleImageUploaded = (url: string) => {
    setCurrentProduct(prev => ({ ...prev, image_url: url }));
  };

  const getTotalStock = (variants?: ProductVariant[]) => {
    if (!variants || variants.length === 0) return 0;
    return variants.reduce((sum, variant) => sum + variant.quantity, 0);
  };

  const getSizeLabel = (variants?: ProductVariant[]) => {
    if (!variants || variants.length === 0) return "No sizes";
    
    const availableSizes = variants
      .filter(v => v.quantity > 0)
      .map(v => v.size)
      .sort((a, b) => SIZES.indexOf(a) - SIZES.indexOf(b));
      
    if (availableSizes.length === 0) return "Out of stock";
    return availableSizes.join(", ");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-cabin font-semibold text-ranch-dark">Product Manager</h2>
        <Button onClick={handleAddNewProduct} className="bg-peach hover:bg-peach/90">
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>

      <Tabs defaultValue="merchandise">
        <TabsList className="mb-6">
          <TabsTrigger value="merchandise">Merchandise</TabsTrigger>
          <TabsTrigger value="fruit">Fruit Products</TabsTrigger>
        </TabsList>
        
        <TabsContent value="merchandise">
          {loading ? (
            <div className="text-center py-12">Loading products...</div>
          ) : products.filter(p => p.category === "merchandise").length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">No merchandise products found.</p>
              <Button onClick={handleAddNewProduct} className="mt-4">
                Add Your First Product
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter(product => product.category === "merchandise")
                .map(product => (
                  <Card key={product.id} className="overflow-hidden">
                    {product.image_url ? (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={product.image_url} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gray-200 flex items-center justify-center">
                        <Package className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>{product.name}</span>
                        <span className="text-peach">${product.price}</span>
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-600 line-clamp-3">{product.description}</p>
                      
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Available Sizes:</span>
                          <span className="text-sm">{getSizeLabel(product.variants)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Total Stock:</span>
                          <span className={`text-sm ${getTotalStock(product.variants) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {getTotalStock(product.variants)} units
                          </span>
                        </div>
                        
                        <div className="mt-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${product.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {product.in_stock ? 'Active Listing' : 'Hidden'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => product.id && handleDeleteProduct(product.id)}
                      >
                        <Trash className="h-4 w-4 mr-2" /> Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="fruit">
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">Fruit product management coming soon.</p>
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription>
              Fill in the details for your product. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={currentProduct.name}
                  onChange={(e) => handleProductChange("name", e.target.value)}
                  placeholder="Product name"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  value={currentProduct.price}
                  onChange={(e) => handleProductChange("price", e.target.value)}
                  placeholder="29.99"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={currentProduct.description}
                onChange={(e) => handleProductChange("description", e.target.value)}
                placeholder="Product description"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={currentProduct.category}
                  onChange={(e) => handleProductChange("category", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  <option value="merchandise">Merchandise</option>
                  <option value="fruit">Fruit</option>
                </select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="in_stock">Listing Status</Label>
                <select
                  id="in_stock"
                  value={currentProduct.in_stock ? "true" : "false"}
                  onChange={(e) => handleProductChange("in_stock", e.target.value === "true")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  <option value="true">Active (Visible)</option>
                  <option value="false">Hidden</option>
                </select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Product Image</Label>
              <ImageUploader 
                path="products" 
                onUploaded={handleImageUploaded} 
                existingUrl={currentProduct.image_url}
              />
            </div>
            
            <Separator className="my-2" />
            
            <div className="grid gap-2">
              <Label>Inventory by Size</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {currentProduct.variants?.map((variant, index) => (
                  <div key={variant.size} className="flex flex-col items-center border rounded-md p-3">
                    <span className="font-semibold mb-2">{variant.size}</span>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => handleVariantChange(index, Math.max(0, variant.quantity - 1))}
                        className="p-1 border rounded-l-md hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <Input
                        type="number"
                        min="0"
                        value={variant.quantity}
                        onChange={(e) => handleVariantChange(index, parseInt(e.target.value) || 0)}
                        className="w-14 text-center rounded-none border-l-0 border-r-0"
                      />
                      <button
                        type="button"
                        onClick={() => handleVariantChange(index, variant.quantity + 1)}
                        className="p-1 border rounded-r-md hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveProduct} className="bg-peach hover:bg-peach/90">
              {isEditing ? 'Update Product' : 'Add Product'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Helper function for Supabase */}
      <Dialog>
        <DialogContent className="hidden">
          {/* 
            This SQL function helps find orders by partial ID.
            Add this to your Supabase SQL editor:
            
            CREATE OR REPLACE FUNCTION find_order_by_partial_id(partial_id TEXT)
            RETURNS UUID[] AS $$
            BEGIN
              RETURN ARRAY(
                SELECT id FROM public.orders
                WHERE id::text LIKE '%' || partial_id || '%'
              );
            END;
            $$ LANGUAGE plpgsql SECURITY DEFINER;
          */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManager;
