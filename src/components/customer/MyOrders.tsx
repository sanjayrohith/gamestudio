import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getOrders } from '@/lib/mockData';
import { getCurrentUser } from '@/lib/auth';
import { Package, IndianRupee, Clock } from 'lucide-react';

export const MyOrders = () => {
  const orders = getOrders();
  const user = getCurrentUser();

  const myOrders = orders.filter((o) => o.customerId === user?.id);

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
        <CardTitle>My Orders</CardTitle>
        <CardDescription>Track your snack orders</CardDescription>
      </CardHeader>
      <CardContent>
        {myOrders.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">No orders found</p>
        ) : (
          <div className="space-y-4">
            {myOrders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono text-sm">#{order.id}</span>
                      </div>
                      <Badge variant={getStatusColor(order.status)} className="capitalize">
                        {order.status}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.snackName} × {item.quantity}
                          </span>
                          <span className="flex items-center font-medium">
                            <IndianRupee className="h-3 w-3" />
                            {item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-border pt-3">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {new Date(order.createdAt).toLocaleString()}
                      </div>
                      <div className="flex items-center font-bold text-primary">
                        <IndianRupee className="h-4 w-4" />
                        {order.totalAmount}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
