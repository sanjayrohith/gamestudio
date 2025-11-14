import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getBookings, getOrders } from '@/lib/mockData';
import { TrendingUp, IndianRupee, Clock, Package } from 'lucide-react';

export const AdminOverview = () => {
  const bookings = getBookings();
  const orders = getOrders();

  const today = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter((b) => b.date === today);
  const todayRevenue = todayBookings.reduce((sum, b) => sum + b.amount, 0);
  const activeSession = bookings.filter((b) => b.status === 'upcoming').length;
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;

  const stats = [
    {
      title: 'Total Bookings Today',
      value: todayBookings.length,
      icon: Clock,
      color: 'text-primary',
    },
    {
      title: 'Revenue Today',
      value: `₹${todayRevenue}`,
      icon: IndianRupee,
      color: 'text-success',
    },
    {
      title: 'Active Sessions',
      value: activeSession,
      icon: TrendingUp,
      color: 'text-accent',
    },
    {
      title: 'Pending Orders',
      value: pendingOrders,
      icon: Package,
      color: 'text-warning',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest bookings and orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                <div>
                  <p className="font-medium">{booking.customerName}</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.gameName} - {booking.date} at {booking.startTime}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold flex items-center justify-end">
                    <IndianRupee className="h-3 w-3" />
                    {booking.amount}
                  </p>
                  <p className="text-sm text-muted-foreground capitalize">{booking.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
