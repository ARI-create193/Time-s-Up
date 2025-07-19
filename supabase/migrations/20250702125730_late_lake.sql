/*
  # Create watches e-commerce schema

  1. New Tables
    - `watches`
      - `id` (uuid, primary key)
      - `name` (text)
      - `brand` (text)
      - `description` (text)
      - `price` (decimal)
      - `image_url` (text)
      - `images` (json array for multiple images)
      - `category` (text)
      - `movement` (text)
      - `case_material` (text)
      - `case_size` (text)
      - `water_resistance` (text)
      - `stock_quantity` (integer)
      - `is_featured` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `cart_items`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `watch_id` (uuid, foreign key)
      - `quantity` (integer)
      - `created_at` (timestamp)
    
    - `orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `total_amount` (decimal)
      - `status` (text)
      - `shipping_address` (json)
      - `created_at` (timestamp)
    
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `watch_id` (uuid, foreign key)
      - `quantity` (integer)
      - `price` (decimal)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public read access to watches
*/

-- Create watches table
CREATE TABLE IF NOT EXISTS watches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  brand text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  image_url text NOT NULL,
  images json DEFAULT '[]',
  category text NOT NULL DEFAULT 'luxury',
  movement text NOT NULL DEFAULT 'automatic',
  case_material text NOT NULL DEFAULT 'stainless steel',
  case_size text NOT NULL DEFAULT '40mm',
  water_resistance text NOT NULL DEFAULT '50m',
  stock_quantity integer NOT NULL DEFAULT 0,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  watch_id uuid REFERENCES watches(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  total_amount decimal(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  shipping_address json NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  watch_id uuid REFERENCES watches(id) ON DELETE CASCADE,
  quantity integer NOT NULL,
  price decimal(10,2) NOT NULL
);

-- Enable RLS
ALTER TABLE watches ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow public read access to watches" ON watches
  FOR SELECT TO public USING (true);

CREATE POLICY "Users can view their own cart items" ON cart_items
  FOR ALL TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own orders" ON orders
  FOR ALL TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own order items" ON order_items
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Insert sample watch data
INSERT INTO watches (name, brand, description, price, image_url, images, category, movement, case_material, case_size, water_resistance, stock_quantity, is_featured) VALUES
('Submariner Date', 'Rolex', 'The Rolex Submariner Date is a legendary diving watch with exceptional water resistance and iconic design.', 12950.00, 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg', '["https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg", "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg"]', 'luxury', 'automatic', 'stainless steel', '41mm', '300m', 5, true),
('Speedmaster Professional', 'Omega', 'The legendary Moonwatch worn by astronauts during the Apollo missions.', 6250.00, 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg', '["https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg", "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg"]', 'luxury', 'manual', 'stainless steel', '42mm', '50m', 8, true),
('Seamaster Diver 300M', 'Omega', 'Professional diving watch with exceptional water resistance and precision.', 4900.00, 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg', '["https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg"]', 'diving', 'automatic', 'stainless steel', '42mm', '300m', 12, false),
('Datejust 36', 'Rolex', 'Timeless elegance with the iconic Cyclops lens and Jubilee bracelet.', 8950.00, 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg', '["https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg"]', 'luxury', 'automatic', 'yellow gold', '36mm', '100m', 3, true),
('Royal Oak', 'Audemars Piguet', 'Iconic luxury sports watch with distinctive octagonal bezel and integrated bracelet.', 29500.00, 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg', '["https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg"]', 'luxury', 'automatic', 'stainless steel', '41mm', '50m', 2, true),
('Nautilus', 'Patek Philippe', 'Prestigious luxury sports watch with unparalleled craftsmanship and exclusivity.', 45900.00, 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg', '["https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg"]', 'luxury', 'automatic', 'stainless steel', '40mm', '120m', 1, true);