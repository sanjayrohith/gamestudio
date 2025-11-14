import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getOrders, updateOrder } from '@/lib/mockData';
import { IndianRupee, Package } from 'lucide-react';
import { toast } from 'sonner';

export const ManageOrders = () => {
  const [orders, setOrders] = useState(getOrders());
  const tableHeaders = [
    { label: 'Order ID' },
    { label: 'Customer' },
    { label: 'Items' },
    { label: 'Amount' },
    { label: 'Time' },
    { label: 'Status' },
    { label: 'Actions', className: 'text-right' },
  ];

  const handleStatusChange = (orderId: string, newStatus: 'pending' | 'preparing' | 'delivered') => {
    updateOrder(orderId, { status: newStatus });
    setOrders(getOrders());
    toast.success('Order status updated');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'default';
      case 'preparing':
        return 'default';
      case 'delivered':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Orders</CardTitle>
        <CardDescription>View and update snack orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {tableHeaders.map(({ label, className }) => (
                  <TableHead
                    key={label}
                    className={`text-primary font-semibold tracking-wide ${className ?? ''}`.trim()}
                  >
                    {label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        {order.items.map((item, i) => (
                          <div key={i} className="text-sm text-muted-foreground">
                            {item.snackName} × {item.quantity}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold flex items-center">
                      <IndianRupee className="h-3 w-3" />
                      {order.totalAmount}
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(order.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(order.status)} className="capitalize">
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Select
                        value={order.status}
                        onValueChange={(value: any) => handleStatusChange(order.id, value)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">
                            <Package className="mr-2 h-3 w-3 inline" />
                            Pending
                          </SelectItem>
                          <SelectItem value="preparing">
                            <Package className="mr-2 h-3 w-3 inline" />
                            Preparing
                          </SelectItem>
                          <SelectItem value="delivered">
                            <Package className="mr-2 h-3 w-3 inline" />
                            Delivered
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
