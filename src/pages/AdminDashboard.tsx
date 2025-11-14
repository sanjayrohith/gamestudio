import { Navbar } from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Calendar, Monitor, UtensilsCrossed, Package, Users, Joystick } from 'lucide-react';
import { AdminOverview } from '@/components/admin/AdminOverview';
import { ManageBookings } from '@/components/admin/ManageBookings';
import { ManageStations } from '@/components/admin/ManageStations';
import { ManageSnacks } from '@/components/admin/ManageSnacks';
import { ManageOrders } from '@/components/admin/ManageOrders';
import { ManageCustomers } from '@/components/admin/ManageCustomers';
import { ManageGames } from '@/components/admin/ManageGames';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/90 to-background pt-32">
      <Navbar />
      
      <div className="container mx-auto px-4 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your game studio operations</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
            <TabsTrigger value="overview">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="bookings">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="stations">
              <Monitor className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Stations</span>
            </TabsTrigger>
            <TabsTrigger value="games">
              <Joystick className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Games</span>
            </TabsTrigger>
            <TabsTrigger value="snacks">
              <UtensilsCrossed className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Snacks</span>
            </TabsTrigger>
            <TabsTrigger value="orders">
              <Package className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="customers">
              <Users className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Customers</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AdminOverview />
          </TabsContent>

          <TabsContent value="bookings">
            <ManageBookings />
          </TabsContent>

          <TabsContent value="stations">
            <ManageStations />
          </TabsContent>

          <TabsContent value="games">
            <ManageGames />
          </TabsContent>

          <TabsContent value="snacks">
            <ManageSnacks />
          </TabsContent>

          <TabsContent value="orders">
            <ManageOrders />
          </TabsContent>

          <TabsContent value="customers">
            <ManageCustomers />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
