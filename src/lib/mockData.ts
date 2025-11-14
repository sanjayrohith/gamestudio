import { PSStation, Booking, Snack, Order, Game } from './types';

export const STATIONS: PSStation[] = [
  {
    id: 'ps1',
    name: 'PS5 Station 1',
    hourlyRate: 100,
    isAvailable: true,
    isUnderMaintenance: false,
  },
  {
    id: 'ps2',
    name: 'PS5 Station 2',
    hourlyRate: 100,
    isAvailable: true,
    isUnderMaintenance: false,
  },
];

export const GAMES: Game[] = [
  {
    id: 'game1',
    name: 'God of War Ragnarök',
    price: 150,
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f',
    available: true,
    description: 'Epic action-adventure game',
  },
  {
    id: 'game2',
    name: 'Spider-Man 2',
    price: 120,
    image: 'https://images.unsplash.com/photo-1578373388656-33863dd28bb4',
    available: true,
    description: 'Open-world superhero adventure',
  },
  {
    id: 'game3',
    name: 'Gran Turismo 7',
    price: 100,
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c',
    available: true,
    description: 'Racing simulation game',
  },
  {
    id: 'game4',
    name: 'FIFA 24',
    price: 80,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018',
    available: true,
    description: 'Football sports game',
  },
  {
    id: 'game5',
    name: 'Call of Duty',
    price: 130,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
    available: true,
    description: 'First-person shooter',
  },
];

export const SNACKS: Snack[] = [
  {
    id: 'snack1',
    name: 'Chicken Nuggets',
    price: 150,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710',
    inStock: true,
    stock: 50,
  },
  {
    id: 'snack2',
    name: 'Popcorn',
    price: 80,
    image: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330',
    inStock: true,
    stock: 100,
  },
  {
    id: 'snack3',
    name: 'French Fries',
    price: 100,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877',
    inStock: true,
    stock: 75,
  },
  {
    id: 'snack4',
    name: 'Cold Drinks',
    price: 50,
    image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a',
    inStock: true,
    stock: 200,
  },
  {
    id: 'snack5',
    name: 'Pizza Slice',
    price: 120,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    inStock: true,
    stock: 40,
  },
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'BK001',
    customerId: 'guest',
    customerName: 'Guest Player',
    gameId: 'game1',
    gameName: 'God of War Ragnarök',
    date: new Date().toISOString().split('T')[0],
    startTime: '14:00',
    duration: 2,
    amount: 300,
    status: 'upcoming',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'BK002',
    customerId: 'guest',
    customerName: 'Guest Player',
    gameId: 'game2',
    gameName: 'Spider-Man 2',
    date: '2025-11-10',
    startTime: '16:00',
    duration: 3,
    amount: 360,
    status: 'completed',
    createdAt: '2025-11-10T12:00:00',
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD001',
    customerId: 'guest',
    customerName: 'Guest Player',
    items: [
      {
        snackId: 'snack1',
        snackName: 'Chicken Nuggets',
        quantity: 2,
        price: 150,
      },
      {
        snackId: 'snack4',
        snackName: 'Cold Drinks',
        quantity: 2,
        price: 50,
      },
    ],
    totalAmount: 400,
    status: 'delivered',
    createdAt: new Date().toISOString(),
  },
];

let bookingsStore = [...MOCK_BOOKINGS];
let ordersStore = [...MOCK_ORDERS];
let gamesStore = [...GAMES];

export const getBookings = () => bookingsStore;
export const addBooking = (booking: Booking) => {
  bookingsStore.push(booking);
};
export const updateBooking = (id: string, updates: Partial<Booking>) => {
  const index = bookingsStore.findIndex((b) => b.id === id);
  if (index !== -1) {
    bookingsStore[index] = { ...bookingsStore[index], ...updates };
  }
};

export const getOrders = () => ordersStore;
export const addOrder = (order: Order) => {
  ordersStore.push(order);
};
export const updateOrder = (id: string, updates: Partial<Order>) => {
  const index = ordersStore.findIndex((o) => o.id === id);
  if (index !== -1) {
    ordersStore[index] = { ...ordersStore[index], ...updates };
  }
};

export const getGames = () => gamesStore;
export const addGame = (game: Game) => {
  gamesStore.push(game);
};
export const updateGame = (id: string, updates: Partial<Game>) => {
  const index = gamesStore.findIndex((g) => g.id === id);
  if (index !== -1) {
    gamesStore[index] = { ...gamesStore[index], ...updates };
  }
};
export const deleteGame = (id: string) => {
  gamesStore = gamesStore.filter((g) => g.id !== id);
};
