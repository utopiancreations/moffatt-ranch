
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { Plus, Package, Search } from "lucide-react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/ImageUploader";

const ProductManager = () => {
  const supabase = useSupabaseClient();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    category: "merchandise",
    in_stock: true
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from("products")
        .select("*");
      
      if (searchTerm) {
        query = query.ilike("name", `%${searchTerm}%`);
      }
      
      const { data, error } = await query.order("name");
      
      if (error) throw error;
      
      setProducts(data || []);
    } catch (error: any) {
      console.error("Error loading products:", error);
      toast.error("Failed to load products", {
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setNewProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUploaded = (url: string) => {
    setNewProduct(prev => ({ ...prev, image_url: url }));
  };

  const handleAddProduct = async () => {
    try {
      if (!newProduct.name || !newProduct.price) {
        toast.error("Product name and price are required");
        return;
      }
      
      const { error } = await supabase
        .from("products")
        .insert([{
          name: newProduct.name,
          description: newProduct.description,
          price: newProduct.price,
          image_url: newProduct.image_url,
          category: newProduct.category,
          in_stock: newProduct.in_stock
        }]);
        
      if (error) throw error;
      
      toast.success("Product added successfully");
      setNewProduct({
        name: "",
        description: "",
        price: "",
        image_url: "",
        category: "merchandise",
        in_stock: true
      });
      setDialogOpen(false);
      fetchProducts();
      
    } catch (error: any) {
      toast.error("Failed to add product", {
        description: error.message
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error: any) {
      toast.error("Failed to delete product", {
        description: error.message
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-serif font-semibold text-ranch-dark">Product Management</h2>
        <p className="text-gray-500">Add and manage available products</p>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <form onSubmit={handleSearch} className="flex">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            type="submit" 
            variant="secondary" 
            className="ml-2"
          >
            Search
          </Button>
        </form>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Enter the details for the new product below.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Product name"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    value={newProduct.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="29.99"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProduct.description || ""}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Product description"
                  rows={3}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={newProduct.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  <option value="merchandise">Merchandise</option>
                  <option value="fruit">Fruit</option>
                </select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="in_stock">Availability</Label>
                <select
                  id="in_stock"
                  value={newProduct.in_stock ? "true" : "false"}
                  onChange={(e) => handleInputChange("in_stock", e.target.value === "true")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
              </div>
              
              <div className="grid gap-2">
                <Label>Product Image</Label>
                <ImageUploader 
                  path="products" 
                  onUploaded={handleImageUploaded} 
                  existingUrl={newProduct.image_url}
                />
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAddProduct}>
                Add Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-peach mb-4"></div>
                <p className="text-muted-foreground">Loading products...</p>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted rounded-full p-3 mb-4">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                {searchTerm ? "No matching products found" : "No products added yet"}
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mb-6">
                {searchTerm 
                  ? "Try adjusting your search or clear it to see all products." 
                  : "Start by adding your first product using the 'Add Product' button."}
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        {product.image_url ? (
                          <img 
                            src={product.image_url} 
                            alt={product.name} 
                            className="h-12 w-12 object-cover rounded"
                          />
                        ) : (
                          <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                            <Package className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {product.category === "merchandise" ? "Merchandise" : "Fruit"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={product.in_stock ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                        >
                          {product.in_stock ? "Available" : "Unavailable"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManager;
