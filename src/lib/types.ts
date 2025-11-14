export interface PSStation {
  id: string;
  name: string;
  hourlyRate: number;
  isAvailable: boolean;
  isUnderMaintenance: boolean;
}

export interface TimeSlot {
  time: string;
  isBooked: boolean;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  gameId: string;
  gameName: string;
  date: string;
  startTime: string;
  duration: number;
  amount: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Snack {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  stock?: number;
}

export interface CartItem {
  snackId: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: Array<{
    snackId: string;
    snackName: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'preparing' | 'delivered';
  createdAt: string;
}

export interface Game {
  id: string;
  name: string;
  price: number;
  image: string;
  available: boolean;
  description?: string;
}
