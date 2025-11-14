import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, ShoppingCart, Calendar, Package } from 'lucide-react';
import { GameBooking } from '@/components/customer/GameBooking';
import { SnacksOrdering } from '@/components/customer/SnacksOrdering';
import { MyBookings } from '@/components/customer/MyBookings';
import { MyOrders } from '@/components/customer/MyOrders';

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('booking');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/90 to-background pt-32">
      <Navbar />
      
      <div className="container mx-auto px-4 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Customer Dashboard</h1>
          <p className="text-muted-foreground">Book your gaming session and order snacks</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="booking">
              <Play className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Game Booking</span>
            </TabsTrigger>
            <TabsTrigger value="snacks">
              <ShoppingCart className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Snacks</span>
            </TabsTrigger>
            <TabsTrigger value="mybookings">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">My Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="myorders">
              <Package className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">My Orders</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="booking">
            <GameBooking />
          </TabsContent>

          <TabsContent value="snacks" id="snacks">
            <SnacksOrdering />
          </TabsContent>

          <TabsContent value="mybookings">
            <MyBookings />
          </TabsContent>

          <TabsContent value="myorders">
            <MyOrders />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboard;
