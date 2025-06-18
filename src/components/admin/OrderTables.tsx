// src/components/admin/OrdersTable.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';
import { 
  MoreHorizontal, 
  Search, 
  ArrowUpDown, 
  Package, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Loader2 
} from 'lucide-react';

type Order = {
  id: string;
  created_at: string;
  email: string;
  status: string;
  payment_status: string | null;
  amount: number;
  shipping_address: any;
  stripe_payment_id: string | null;
  stripe_session_id: string | null;
  tracking_number: string | null;
  tracking_carrier: string | null;
};

export default function OrdersTable() {
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('orders')
        .select('*')
        .order(sortField, { ascending: sortDirection === 'asc' });
      
      if (searchTerm) {
        query = query.or(`email.ilike.%${searchTerm}%,id.ilike.%${searchTerm}%,stripe_payment_id.ilike.%${searchTerm}%,tracking_number.ilike.%${searchTerm}%`);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [searchTerm, sortField, sortDirection]);

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string, paymentStatus: string | null) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'paid':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Paid</Badge>;
      case 'shipped':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Shipped</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      case 'payment_failed':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Payment Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (paymentStatus: string | null, stripeId: string | null) => {
    if (!paymentStatus && !stripeId) {
      return <Badge variant="outline" className="bg-gray-100 text-gray-700">Awaiting Payment</Badge>;
    }
    
    switch (paymentStatus) {
      case 'paid':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Paid</Badge>;
      case 'refunded':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Refunded</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>;
      default:
        return stripeId 
          ? <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200">Processing</Badge>
          : <Badge variant="outline" className="bg-gray-100 text-gray-700">Not Paid</Badge>;
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId);
      
      if (error) throw error;
      
      // Refresh orders
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>Manage your customer orders and track their status</CardDescription>
        <div className="flex items-center space-x-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={fetchOrders}>Refresh</Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center">
                      Order ID
                      {sortField === 'id' && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('created_at')}
                  >
                    <div className="flex items-center">
                      Date
                      {sortField === 'created_at' && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('email')}
                  >
                    <div className="flex items-center">
                      Customer
                      {sortField === 'email' && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('amount')}
                  >
                    <div className="flex items-center">
                      Amount
                      {sortField === 'amount' && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Tracking</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium max-w-[120px] truncate">
                        {order.id}
                      </TableCell>
                      <TableCell>{formatDate(order.created_at)}</TableCell>
                      <TableCell className="max-w-[180px] truncate">
                        {order.email}
                        <div className="text-xs text-muted-foreground truncate">
                          {order.shipping_address?.first_name} {order.shipping_address?.last_name}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(order.status, order.payment_status)}</TableCell>
                      <TableCell>
                        {getPaymentStatusBadge(order.payment_status, order.stripe_payment_id)}
                        {order.stripe_payment_id && (
                          <div className="text-xs text-muted-foreground truncate max-w-[120px]">
                            {order.stripe_payment_id}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{formatCurrency(order.amount / 100)}</TableCell>
                      <TableCell>
                        {order.tracking_number ? (
                          <div>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {order.tracking_carrier}
                            </Badge>
                            <div className="text-xs text-muted-foreground mt-1">
                              {order.tracking_number}
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">Not shipped</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigate(`/admin/orders/${order.id}`)}>
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                            {order.status !== 'pending' && (
                              <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'pending')}>
                                <Clock className="mr-2 h-4 w-4" /> Mark as Pending
                              </DropdownMenuItem>
                            )}
                            {order.payment_status === 'paid' && order.status !== 'shipped' && (
                              <DropdownMenuItem onClick={() => navigate(`/admin/orders/${order.id}/ship`)}>
                                <Package className="mr-2 h-4 w-4" /> Ship Order
                              </DropdownMenuItem>
                            )}
                            {order.status !== 'delivered' && order.tracking_number && (
                              <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'delivered')}>
                                <CheckCircle className="mr-2 h-4 w-4" /> Mark as Delivered
                              </DropdownMenuItem>
                            )}
                            {order.status !== 'cancelled' && (
                              <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'cancelled')}>
                                <AlertCircle className="mr-2 h-4 w-4" /> Cancel Order
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}