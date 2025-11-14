import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { getGames } from '@/lib/mockData';
import { addBooking } from '@/lib/mockData';
import { getCurrentUser } from '@/lib/auth';
import { toast } from 'sonner';
import { Clock, IndianRupee, Gamepad2, CalendarDays, Timer } from 'lucide-react';
import React from "react";

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
  const customerId = user?.id ?? 'guest';
  const customerName = user?.name ?? 'Guest Player';
  const games = getGames();

  const game = games.find((g) => g.id === selectedGame);
  const totalAmount = game ? game.price * Number.parseInt(duration, 10) : 0;

  const handleBooking = () => {
    if (!selectedGame || !selectedDate || !selectedTime || !duration) {
      toast.error('Please fill all booking details');
      return;
    }

    const booking = {
      id: `BK${Date.now()}`,
      customerId,
      customerName,
      gameId: selectedGame,
      gameName: game?.name || '',
      date: selectedDate.toISOString().split('T')[0],
      startTime: selectedTime,
      duration: Number.parseInt(duration, 10),
      amount: totalAmount,
      status: 'upcoming' as const,
      createdAt: new Date().toISOString(),
    };

    addBooking(booking);
    toast.success('Game booking confirmed!', {
      description: `${game?.name} - ${selectedDate.toLocaleString()} at ${selectedTime}`,
    });

    // Reset form
    setSelectedGame('');
    setSelectedDate(undefined);
    setSelectedTime('');
    setDuration('1');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-3 py-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Gamepad2 className="h-10 w-10 text-blue-500" />
            <h1 className="text-4xl font-bold text-white">Game Booking</h1>
          </div>
          <p className="text-slate-400 text-lg">Select your game and reserve your spot</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Games Section */}
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm shadow-2xl">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Gamepad2 className="h-6 w-6 text-blue-500" />
                Available Games
              </CardTitle>
              <CardDescription className="text-slate-400">Select a game and booking details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {games.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => setSelectedGame(game.id)}
                    className={`w-full p-5 rounded-xl border-2 text-left transition-all duration-300 ${
                      selectedGame === game.id
                        ? 'border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/20 scale-[1.02]'
                        : 'border-slate-700 bg-slate-800/50 hover:border-blue-400 hover:bg-slate-800'
                    } ${game.available ? '' : 'opacity-40 cursor-not-allowed'}`}
                    disabled={!game.available}
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={game.image}
                          alt={game.name}
                          className="h-20 w-20 rounded-lg object-cover shadow-lg"
                        />
                        {selectedGame === game.id && (
                          <div className="absolute -top-2 -right-2 h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg text-white">{game.name}</h3>
                          <Badge 
                            variant={game.available ? 'default' : 'secondary'}
                            className={game.available ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}
                          >
                            {game.available ? 'Available' : 'Unavailable'}
                          </Badge>
                        </div>
                        {game.description && (
                          <p className="text-sm text-slate-400 mb-3">{game.description}</p>
                        )}
                        <div className="flex items-center gap-1 text-blue-400 font-semibold">
                          <IndianRupee className="h-4 w-4" />
                          <span>{game.price}/hour</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {selectedGame && game && (
                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-500/30 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base font-semibold text-slate-200">Total Amount</span>
                    <div className="flex items-center gap-1 text-3xl font-bold text-white">
                      <IndianRupee className="h-7 w-7" />
                      {totalAmount}
                    </div>
                  </div>
                  <p className="text-sm text-slate-300">
                    {game.name} × {duration} hour{Number.parseInt(duration, 10) > 1 ? 's' : ''}
                  </p>
                </div>
              )}

              <Button
                onClick={handleBooking}
                disabled={!selectedGame || !selectedDate || !selectedTime}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 flex-shrink-0"
                size="lg"
              >
                <Clock className="mr-2 h-5 w-5" />
                Confirm Booking
              </Button>
            </CardContent>
          </Card>

          {/* Date & Time Section */}
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm shadow-2xl">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <CalendarDays className="h-6 w-6 text-blue-500" />
                Select Date & Time
              </CardTitle>
              <CardDescription className="text-slate-400">Choose your preferred date and time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  showOutsideDays={false}
                  className="rounded-lg w-full"
                  classNames={{
                    month: 'w-full space-y-4',
                    table: 'w-full table-fixed border-collapse',
                    caption_layout: 'flex items-center justify-between w-full px-2 py-4',
                    caption: 'text-white text-3xl font-bold',
                    caption_label: 'text-3xl',
                    nav_button: 'h-12 w-12 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors',
                    cell: 'h-16 w-full text-center text-lg p-0 relative',
                    day: 'h-16 w-full p-0 font-medium text-lg text-slate-300 hover:bg-blue-500/20 hover:text-white rounded-lg transition-all',
                    day_selected: 'bg-blue-600 text-white hover:bg-blue-500 hover:text-white font-bold',
                    day_today: 'bg-slate-700 text-white font-semibold',
                    day_disabled: 'text-slate-600 cursor-not-allowed hover:bg-transparent',
                    head_cell: 'text-slate-400 font-semibold text-lg w-full pt-4 pb-3',
                  }}
                />
              </div>
              
              <div className="space-y-5">
                <div className="space-y-3">
                  <label className="text-base font-semibold text-white flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    Select Time Slot
                  </label>
                  <div className="space-y-4 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Opening Time</span>
                      <span className="text-white font-bold text-2xl">
                        {selectedTime || '10:00'}
                      </span>
                      <span className="text-slate-400 text-sm">Closing Time</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="11"
                      value={selectedTime ? TIME_SLOTS.indexOf(selectedTime) : 0}
                      onChange={(e) => setSelectedTime(TIME_SLOTS[parseInt(e.target.value)])}
                      className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                      style={{
                        background: `linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(59, 130, 246) ${(selectedTime ? TIME_SLOTS.indexOf(selectedTime) : 0) * 9.09}%, rgb(51, 65, 85) ${(selectedTime ? TIME_SLOTS.indexOf(selectedTime) : 0) * 9.09}%, rgb(51, 65, 85) 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>10:00 AM</span>
                      <span>3:00 PM</span>
                      <span>9:00 PM</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-base font-semibold text-white flex items-center gap-2">
                    <Timer className="h-5 w-5 text-blue-500" />
                    Duration (hours)
                  </label>
                  <div className="space-y-4 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <div className="text-center">
                      <span className="text-white font-bold text-3xl">
                        {duration} {parseInt(duration) === 1 ? 'Hour' : 'Hours'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="4"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                      style={{
                        background: `linear-gradient(to right, rgb(168, 85, 247) 0%, rgb(168, 85, 247) ${((parseInt(duration) - 1) / 3) * 100}%, rgb(51, 65, 85) ${((parseInt(duration) - 1) / 3) * 100}%, rgb(51, 65, 85) 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>1 hr</span>
                      <span>2 hrs</span>
                      <span>3 hrs</span>
                      <span>4 hrs</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};