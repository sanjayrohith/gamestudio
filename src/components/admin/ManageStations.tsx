import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { STATIONS } from '@/lib/mockData';
import { Monitor, Wrench, Eye, IndianRupee } from 'lucide-react';
import { toast } from 'sonner';

export const ManageStations = () => {
  const handleToggleMaintenance = (stationId: string) => {
    toast.success('Station status updated');
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {STATIONS.map((station) => (
        <Card key={station.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5 text-primary" />
                {station.name}
              </CardTitle>
              <Badge variant={station.isAvailable ? 'default' : 'destructive'}>
                {station.isAvailable ? 'Available' : 'Occupied'}
              </Badge>
            </div>
            <CardDescription className="flex items-center gap-1">
              <IndianRupee className="h-3 w-3" />
              {station.hourlyRate}/hour
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {station.isUnderMaintenance && (
              <div className="rounded-lg bg-warning/10 border border-warning p-3 text-sm">
                <p className="font-semibold text-warning">Under Maintenance</p>
                <p className="text-muted-foreground">This station is currently unavailable</p>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Today's Schedule</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between rounded-lg bg-muted p-2">
                  <span className="text-muted-foreground">10:00 - 12:00</span>
                  <span className="text-success">Available</span>
                </div>
                <div className="flex justify-between rounded-lg bg-primary/10 p-2">
                  <span className="text-muted-foreground">14:00 - 16:00</span>
                  <span className="text-primary font-medium">Booked</span>
                </div>
                <div className="flex justify-between rounded-lg bg-muted p-2">
                  <span className="text-muted-foreground">18:00 - 20:00</span>
                  <span className="text-success">Available</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => handleToggleMaintenance(station.id)}
              >
                <Wrench className="mr-2 h-4 w-4" />
                {station.isUnderMaintenance ? 'Enable' : 'Maintenance'}
              </Button>
              <Button variant="outline" className="flex-1">
                <Eye className="mr-2 h-4 w-4" />
                View Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
