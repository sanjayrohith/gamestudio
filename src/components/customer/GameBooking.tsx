import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { getGames } from '@/lib/mockData';
import { addBooking } from '@/lib/mockData';
import { getCurrentUser } from '@/lib/auth';
import { toast } from 'sonner';
import { Clock, IndianRupee } from 'lucide-react';

const TIME_SLOTS = Array.from({ length: 12 }, (_, i) => {
  const hour = i + 10;
  return `${hour.toString().padStart(2, '0')}:00`;
});

export const GameBooking = () => {
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('1');
  const user = getCurrentUser();
  const games = getGames();

  const game = games.find((g) => g.id === selectedGame);
  const totalAmount = game ? game.price * parseInt(duration) : 0;

  const handleBooking = () => {
    if (!selectedGame || !selectedDate || !selectedTime || !duration) {
      toast.error('Please fill all booking details');
      return;
    }

    const booking = {
      id: `BK${Date.now()}`,
      customerId: user?.id || '',
      customerName: user?.name || '',
      gameId: selectedGame,
      gameName: game?.name || '',
      date: selectedDate.toISOString().split('T')[0],
      startTime: selectedTime,
      duration: parseInt(duration),
      amount: totalAmount,
      status: 'upcoming' as const,
      createdAt: new Date().toISOString(),
    };

    addBooking(booking);
    toast.success('Game booking confirmed!', {
      description: `${game?.name} - ${selectedDate.toLocaleDateString()} at ${selectedTime}`,
    });

    // Reset form
    setSelectedGame('');
    setSelectedDate(undefined);
    setSelectedTime('');
    setDuration('1');
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Available Games</CardTitle>
          <CardDescription>Select a game and booking details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => setSelectedGame(game.id)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  selectedGame === game.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                } ${!game.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!game.available}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{game.name}</h3>
                      <Badge variant={game.available ? 'default' : 'secondary'}>
                        {game.available ? 'Available' : 'Unavailable'}
                      </Badge>
                    </div>
                    {game.description && (
                      <p className="text-xs text-muted-foreground mb-2">{game.description}</p>
                    )}
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <IndianRupee className="h-3 w-3" />
                      {game.price}/hour
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Time Slot</label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose time slot" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Duration (hours)</label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4].map((hour) => (
                    <SelectItem key={hour} value={hour.toString()}>
                      {hour} {hour === 1 ? 'hour' : 'hours'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedGame && game && (
            <div className="p-4 rounded-lg bg-primary/10 border border-primary">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Total Amount</span>
                <div className="flex items-center gap-1 text-xl font-bold text-primary">
                  <IndianRupee className="h-5 w-5" />
                  {totalAmount}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {game.name} × {duration} hour{parseInt(duration) > 1 ? 's' : ''}
              </p>
            </div>
          )}

          <Button
            onClick={handleBooking}
            disabled={!selectedGame || !selectedDate || !selectedTime}
            className="w-full"
            size="lg"
          >
            <Clock className="mr-2 h-4 w-4" />
            Confirm Booking
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Select Date</CardTitle>
          <CardDescription>Choose your preferred date</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            className="rounded-md border"
          />
        </CardContent>
      </Card>
    </div>
  );
};
