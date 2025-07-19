// Local data storage and types
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

export interface User {
  id: string;
  email: string;
  created_at: string;
}

// Sample watch data
export const watchesData: Watch[] = [
  {
    id: '1',
    name: 'Submariner Date',
    brand: 'Rolex',
    description: 'The Rolex Submariner Date is a legendary diving watch with exceptional water resistance and iconic design.',
    price: 12950,
    image_url: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg',
    images: [
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg',
      'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg'
    ],
    category: 'luxury',
    movement: 'automatic',
    case_material: 'stainless steel',
    case_size: '41mm',
    water_resistance: '300m',
    stock_quantity: 5,
    is_featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Speedmaster Professional',
    brand: 'Omega',
    description: 'The legendary Moonwatch worn by astronauts during the Apollo missions.',
    price: 6250,
    image_url: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg',
    images: [
      'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg',
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg'
    ],
    category: 'luxury',
    movement: 'manual',
    case_material: 'stainless steel',
    case_size: '42mm',
    water_resistance: '50m',
    stock_quantity: 8,
    is_featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Seamaster Diver 300M',
    brand: 'Omega',
    description: 'Professional diving watch with exceptional water resistance and precision.',
    price: 4900,
    image_url: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg',
    images: ['https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg'],
    category: 'diving',
    movement: 'automatic',
    case_material: 'stainless steel',
    case_size: '42mm',
    water_resistance: '300m',
    stock_quantity: 12,
    is_featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Datejust 36',
    brand: 'Rolex',
    description: 'Timeless elegance with the iconic Cyclops lens and Jubilee bracelet.',
    price: 8950,
    image_url: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg',
    images: ['https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg'],
    category: 'luxury',
    movement: 'automatic',
    case_material: 'yellow gold',
    case_size: '36mm',
    water_resistance: '100m',
    stock_quantity: 3,
    is_featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    name: 'Royal Oak',
    brand: 'Audemars Piguet',
    description: 'Iconic luxury sports watch with distinctive octagonal bezel and integrated bracelet.',
    price: 29500,
    image_url: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg',
    images: ['https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg'],
    category: 'luxury',
    movement: 'automatic',
    case_material: 'stainless steel',
    case_size: '41mm',
    water_resistance: '50m',
    stock_quantity: 2,
    is_featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    name: 'Nautilus',
    brand: 'Patek Philippe',
    description: 'Prestigious luxury sports watch with unparalleled craftsmanship and exclusivity.',
    price: 45900,
    image_url: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg',
    images: ['https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg'],
    category: 'luxury',
    movement: 'automatic',
    case_material: 'stainless steel',
    case_size: '40mm',
    water_resistance: '120m',
    stock_quantity: 1,
    is_featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '7',
    name: 'GMT-Master II',
    brand: 'Rolex',
    description: 'Professional pilot watch with dual time zone functionality.',
    price: 15200,
    image_url: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg',
    images: ['https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg'],
    category: 'luxury',
    movement: 'automatic',
    case_material: 'stainless steel',
    case_size: '40mm',
    water_resistance: '100m',
    stock_quantity: 4,
    is_featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '8',
    name: 'Planet Ocean',
    brand: 'Omega',
    description: 'Deep-sea diving watch with exceptional water resistance.',
    price: 7800,
    image_url: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg',
    images: ['https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg'],
    category: 'diving',
    movement: 'automatic',
    case_material: 'stainless steel',
    case_size: '43.5mm',
    water_resistance: '600m',
    stock_quantity: 6,
    is_featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

// Local storage utilities
export const storage = {
  getItem: (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  setItem: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  
  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

// Generate unique IDs
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};