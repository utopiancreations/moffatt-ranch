import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { Search, Package, ShoppingBag, Inbox } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { formatCurrency } from "@/lib/utils";
import OrderDetails from "@/components/admin/OrderDetails";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const OrderStatusBadge = ({ status }: { status: string }) => {
  let color = "";
  
  switch(status) {
    case "pending":
      color = "bg-yellow-100 text-yellow-800 border-yellow-200";
      break;
    case "paid":
      color = "bg-blue-100 text-blue-800 border-blue-200";
      break;
    case "processing":
      color = "bg-purple-100 text-purple-800 border-purple-200";
      break;
    case "shipped":
      color = "bg-indigo-100 text-indigo-800 border-indigo-200";
      break;
    case "delivered":
      color = "bg-green-100 text-green-800 border-green-200";
      break;
    case "cancelled":
      color = "bg-gray-100 text-gray-800 border-gray-200";
      break;
    case "refunded":
      color = "bg-red-100 text-red-800 border-red-200";
      break;
    default:
      color = "bg-gray-100 text-gray-800 border-gray-200";
  }
  
  return (
    <Badge className={`font-medium ${color}`} variant="outline">
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const EmptyOrdersState = ({ isFiltering }: { isFiltering: boolean }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="bg-muted rounded-full p-3 mb-4">
      {isFiltering ? (
        <Search className="h-8 w-8 text-muted-foreground" />
      ) : (
        <ShoppingBag className="h-8 w-8 text-muted-foreground" />
      )}
    </div>
    <h3 className="text-lg font-medium mb-2">
      {isFiltering ? "No matching orders found" : "No orders yet"}
    </h3>
    <p className="text-sm text-muted-foreground max-w-md mb-6">
      {isFiltering 
        ? "Try adjusting your search filters or clearing them to see all orders." 
        : "Orders will appear here once customers make purchases. Your online store is ready to receive orders."}
    </p>
    {isFiltering && (
      <Button variant="outline" size="sm" className="mt-2">
        Clear Filters
      </Button>
    )}
  </div>
);

const OrdersTable = ({ 
  orders, 
  loading, 
  isFiltering, 
  handleOrderClick 
}: { 
  orders: any[], 
  loading: boolean, 
  isFiltering: boolean,
  handleOrderClick: (id: string) => void 
}) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-peach mb-4"></div>
          <p className="text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return <EmptyOrdersState isFiltering={isFiltering} />;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleOrderClick(order.id)}>
              <TableCell className="font-medium">{order.id.substring(0, 8).toUpperCase()}</TableCell>
              <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell>{formatCurrency(order.amount / 100)}</TableCell>
              <TableCell>
                <OrderStatusBadge status={order.status} />
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOrderClick(order.id);
                  }}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const OrderManager = () => {
  const supabase = useSupabaseClient();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const ordersPerPage = 10;

  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from("orders")
        .select("*", { count: "exact" });
      
      if (searchTerm) {
        query = query.or(`email.ilike.%${searchTerm}%,id.ilike.%${searchTerm}%`);
      }
      
      if (statusFilter) {
        query = query.eq("status", statusFilter);
      }
      
      const startIndex = (currentPage - 1) * ordersPerPage;
      
      const { data, error, count } = await query
        .order("created_at", { ascending: false })
        .range(startIndex, startIndex + ordersPerPage - 1);
      
      console.log("Orders query result:", { data, error, count });
      
      if (error) throw error;
      
      setOrders(data || []);
      
      if (count !== null) {
        setTotalPages(Math.ceil(count / ordersPerPage));
      } else {
        setTotalPages(1);
      }
    } catch (error: any) {
      console.error("Error loading orders:", error);
      toast.error("Failed to load orders", {
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchOrders();
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setCurrentPage(1);
    fetchOrders();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOrderClick = (orderId: string) => {
    setSelectedOrder(orderId);
  };

  const handleOrderUpdate = () => {
    fetchOrders();
    setSelectedOrder(null);
  };

  // Determine if any filters are active
  const isFiltering = !!searchTerm || !!statusFilter;

  // Generate pagination
  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <PaginationItem key={i}>
        <PaginationLink 
          isActive={currentPage === i} 
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-serif font-semibold text-ranch-dark">Order Management</h2>
        <p className="text-gray-500">View and manage customer orders</p>
      </div>
      
      {selectedOrder ? (
        <OrderDetails 
          orderId={selectedOrder} 
          onBack={() => setSelectedOrder(null)}
          onUpdate={handleOrderUpdate}
        />
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <form onSubmit={handleSearch} className="flex w-full md:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search by email or order ID..."
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
            
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <Select 
                value={statusFilter} 
                onValueChange={handleStatusFilterChange}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                onClick={handleClearFilters}
                disabled={!isFiltering}
              >
                Reset
              </Button>
            </div>
          </div>
          
          <Card className="border-dashed bg-white">
            <CardContent className="p-0">
              <OrdersTable 
                orders={orders} 
                loading={loading} 
                isFiltering={isFiltering}
                handleOrderClick={handleOrderClick} 
              />
            </CardContent>
          </Card>
          
          {totalPages > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {paginationItems}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
      
      {/* Let's also add a helpful card to guide users when there are no orders */}
      {!loading && orders.length === 0 && !selectedOrder && (
        <Card className="mt-8 border-dashed">
          <CardHeader>
            <CardTitle>Getting Started with Orders</CardTitle>
            <CardDescription>
              Here are some tips to help you prepare for your first orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-peach/10 p-2 rounded-full mr-3">
                  <Package className="h-5 w-5 text-peach" />
                </div>
                <div>
                  <h3 className="text-base font-medium">Add Products</h3>
                  <p className="text-sm text-muted-foreground">
                    Make sure you have products available in your store with inventory set up.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-peach/10 p-2 rounded-full mr-3">
                  <Inbox className="h-5 w-5 text-peach" />
                </div>
                <div>
                  <h3 className="text-base font-medium">Set Up Stripe</h3>
                  <p className="text-sm text-muted-foreground">
                    Verify your Stripe integration is working correctly to process payments.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-peach/10 p-2 rounded-full mr-3">
                  <ShoppingBag className="h-5 w-5 text-peach" />
                </div>
                <div>
                  <h3 className="text-base font-medium">Test Your Checkout</h3>
                  <p className="text-sm text-muted-foreground">
                    Place a test order yourself to make sure the customer experience is smooth.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrderManager;