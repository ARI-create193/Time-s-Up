import { create } from 'zustand';
import { CartItem, Watch, storage, generateId, watchesData } from '../lib/data';
import toast from 'react-hot-toast';

interface CartState {
  items: CartItem[];
  loading: boolean;
  fetchCartItems: () => Promise<void>;
  addToCart: (watchId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getItemCount: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  loading: false,

  fetchCartItems: async () => {
    try {
      set({ loading: true });
      const currentUser = storage.getItem('currentUser');
      if (!currentUser) return;

      const cartItems = storage.getItem('cartItems') || [];
      const userCartItems = cartItems.filter((item: CartItem) => item.user_id === currentUser.id);
      
      // Attach watch data to cart items
      const itemsWithWatches = userCartItems.map((item: CartItem) => ({
        ...item,
        watch: watchesData.find(watch => watch.id === item.watch_id)
      }));

      set({ items: itemsWithWatches });
    } catch (error) {
      console.error('Error fetching cart items:', error);
      toast.error('Failed to load cart items');
    } finally {
      set({ loading: false });
    }
  },

  addToCart: async (watchId: string, quantity = 1) => {
    try {
      const currentUser = storage.getItem('currentUser');
      if (!currentUser) {
        toast.error('Please sign in to add items to cart');
        return;
      }

      const cartItems = storage.getItem('cartItems') || [];
      const existingItemIndex = cartItems.findIndex(
        (item: CartItem) => item.user_id === currentUser.id && item.watch_id === watchId
      );

      if (existingItemIndex >= 0) {
        // Update quantity
        cartItems[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        const newItem: CartItem = {
          id: generateId(),
          user_id: currentUser.id,
          watch_id: watchId,
          quantity,
          created_at: new Date().toISOString()
        };
        cartItems.push(newItem);
      }

      storage.setItem('cartItems', cartItems);
      await get().fetchCartItems();
      toast.success('Added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    }
  },

  updateQuantity: async (itemId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        await get().removeFromCart(itemId);
        return;
      }

      const cartItems = storage.getItem('cartItems') || [];
      const itemIndex = cartItems.findIndex((item: CartItem) => item.id === itemId);
      
      if (itemIndex >= 0) {
        cartItems[itemIndex].quantity = quantity;
        storage.setItem('cartItems', cartItems);
        await get().fetchCartItems();
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  },

  removeFromCart: async (itemId: string) => {
    try {
      const cartItems = storage.getItem('cartItems') || [];
      const filteredItems = cartItems.filter((item: CartItem) => item.id !== itemId);
      
      storage.setItem('cartItems', filteredItems);
      await get().fetchCartItems();
      toast.success('Removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove from cart');
    }
  },

  clearCart: async () => {
    try {
      const currentUser = storage.getItem('currentUser');
      if (!currentUser) return;

      const cartItems = storage.getItem('cartItems') || [];
      const filteredItems = cartItems.filter((item: CartItem) => item.user_id !== currentUser.id);
      
      storage.setItem('cartItems', filteredItems);
      set({ items: [] });
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  },

  getItemCount: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotal: () => {
    return get().items.reduce((total, item) => {
      const price = item.watch?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  },
}));