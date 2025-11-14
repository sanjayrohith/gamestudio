// Mock authentication service
export type UserRole = 'admin' | 'customer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@gamestudio.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as UserRole,
  },
];

export const login = (email: string, password: string): User | null => {
  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );
  
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  }
  
  return null;
};

export const logout = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('cart');
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};
