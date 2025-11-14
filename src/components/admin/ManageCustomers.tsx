import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getBookings, getOrders } from '@/lib/mockData';
import { IndianRupee, Users } from 'lucide-react';

export const ManageCustomers = () => {
  const bookings = getBookings();
  const orders = getOrders();

  // Aggregate customer data
  const customerData = bookings.reduce((acc, booking) => {
    if (!acc[booking.customerId]) {
      acc[booking.customerId] = {
        id: booking.customerId,
        name: booking.customerName,
        email: `${booking.customerName.toLowerCase().replace(' ', '')}@example.com`,
        totalBookings: 0,
        totalSpent: 0,
      };
    }
    acc[booking.customerId].totalBookings++;
    acc[booking.customerId].totalSpent += booking.amount;
    return acc;
  }, {} as Record<string, any>);

  // Add order amounts
  orders.forEach((order) => {
    if (customerData[order.customerId]) {
      customerData[order.customerId].totalSpent += order.totalAmount;
    }
  });

  const customers = Object.values(customerData);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Customer Management
        </CardTitle>
        <CardDescription>View customer information and statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Total Bookings</TableHead>
                <TableHead>Total Spent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No customers found
                  </TableCell>
                </TableRow>
              ) : (
                customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-mono">{customer.id}</TableCell>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.totalBookings}</TableCell>
                    <TableCell className="font-semibold flex items-center">
                      <IndianRupee className="h-3 w-3" />
                      {customer.totalSpent}
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
