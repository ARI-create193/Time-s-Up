import { create } from 'zustand';
import { User, storage, generateId } from '../lib/data';

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
  selectedAvatar: string;
  setSelectedAvatar: (avatar: string) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,

  signIn: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = storage.getItem('users') || [];
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    const { password: _, ...userWithoutPassword } = user;
    set({ user: userWithoutPassword });
    storage.setItem('currentUser', userWithoutPassword);
  },

  signUp: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = storage.getItem('users') || [];
    const existingUser = users.find((u: any) => u.email === email);
    
    if (existingUser) {
      throw new Error('User already exists with this email');
    }
    
    const newUser = {
      id: generateId(),
      email,
      password,
      created_at: new Date().toISOString()
    };
    
    users.push(newUser);
    storage.setItem('users', users);
    
    const { password: _, ...userWithoutPassword } = newUser;
    set({ user: userWithoutPassword });
    storage.setItem('currentUser', userWithoutPassword);
  },

  signOut: async () => {
    set({ user: null });
    storage.removeItem('currentUser');
  },

  initialize: async () => {
    try {
      const currentUser = storage.getItem('currentUser');
      set({ user: currentUser, loading: false });
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ loading: false });
    }
  },

  selectedAvatar: 'M1.svg', // default avatar
  setSelectedAvatar: (avatar) => set({ selectedAvatar: avatar }),
}));