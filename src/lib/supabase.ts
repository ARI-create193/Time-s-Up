import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Watch {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  image_url: string;
  images: string[];
  category: string;
  movement: string;
  case_material: string;
  case_size: string;
  water_resistance: string;
  stock_quantity: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  watch_id: string;
  quantity: number;
  created_at: string;
  watch?: Watch;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  shipping_address: any;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  watch_id: string;
  quantity: number;
  price: number;
  watch?: Watch;
}