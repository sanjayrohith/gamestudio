import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getBookings, updateBooking } from '@/lib/mockData';
import { getCurrentUser } from '@/lib/auth';
import { toast } from 'sonner';
import { Calendar, Clock, IndianRupee, X } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export const MyBookings = () => {
  const [bookings, setBookings] = useState(getBookings());
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);
  const user = getCurrentUser();
  const currentCustomerId = user?.id ?? 'guest';

  const myBookings = bookings.filter((b) => b.customerId === currentCustomerId);

  const handleCancelBooking = () => {
    if (cancelBookingId) {
      updateBooking(cancelBookingId, { status: 'cancelled' });
      setBookings(getBookings());
      toast.success('Booking cancelled successfully');
      setCancelBookingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'default';
      case 'completed':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Bookings</CardTitle>
        <CardDescription>View and manage your game bookings</CardDescription>
      </CardHeader>
      <CardContent>
        {myBookings.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">No bookings found</p>
        ) : (
          <div className="space-y-4">
            {myBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(booking.status)} className="capitalize">
                          {booking.status}
                        </Badge>
                        <span className="text-sm font-mono text-muted-foreground">#{booking.id}</span>
                      </div>
                      <h3 className="font-semibold">{booking.gameName}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(booking.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {booking.startTime} ({booking.duration}h)
                        </div>
                        <div className="flex items-center gap-1 font-semibold text-foreground">
                          <IndianRupee className="h-4 w-4" />
                          {booking.amount}
                        </div>
                      </div>
                    </div>
                    {booking.status === 'upcoming' && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setCancelBookingId(booking.id)}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <AlertDialog open={!!cancelBookingId} onOpenChange={() => setCancelBookingId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel this booking? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No, keep it</AlertDialogCancel>
              <AlertDialogAction onClick={handleCancelBooking}>Yes, cancel booking</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};
