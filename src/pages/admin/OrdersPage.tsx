// src/pages/admin/OrdersPage.tsx
import OrdersTable from '@/components/admin/OrdersTable';

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>
      <OrdersTable />
    </div>
  );
}