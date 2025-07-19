import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';

interface WatchCardProps {
  watch: any;
}

export const WatchCard: React.FC<WatchCardProps> = ({ watch }) => {
  const { addToCart } = useCartStore();
  const { user } = useAuthStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // No add to cart for now, since no id/stock
  };

  const stockImages = [
    "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
    "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg",
    "https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg",
    "https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg",
    "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg"
  ];

  // Use Model as name, Brand as brand, Price (USD) as price, support both JSON and TS data
  const name = watch["Model"] || watch.name || "Unknown Model";
  const brand = watch["Brand"] || watch.brand || "Unknown Brand";
  const priceStr = watch["Price (USD)"] || watch.price || "N/A";
  // Remove commas and $ if present, then parse
  const price = typeof priceStr === 'string' ? Number(priceStr.replace(/[^\d.]/g, '')) : priceStr;
  let image = watch["Image"] || watch["Image URL"] || watch.image_url;
  if (!image) {
    // Pick a random stock image for this card
    image = stockImages[Math.floor(Math.random() * stockImages.length)];
  }

  // Build a URL-safe path for the detail page
  const detailUrl = `/watch/${encodeURIComponent(brand)}/${encodeURIComponent(name)}`;

  return (
    <Link to={detailUrl} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={e => (e.currentTarget.src = "https://via.placeholder.com/400x400?text=No+Image")}
          />
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
              <Heart className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-2">
            <p className="text-sm text-gray-500 font-medium">{brand}</p>
            <h3 className="text-lg font-semibold text-primary group-hover:text-primary-dark transition-colors">
              {name}
            </h3>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-600 line-clamp-2">{watch["Complications"] || watch["Movement Type"] || ''}</p>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">
              <span className="block">{watch["Case Material"]}</span>
              <span className="block">{watch["Case Diameter (mm)"] ? `${watch["Case Diameter (mm)"]}mm` : ''}</span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                {isNaN(price) ? 'N/A' : `$${price.toLocaleString()}`}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="text-red-600 font-medium">Out of Stock</span>
            </div>
            {/* No add to cart button since no id/stock */}
          </div>
        </div>
      </div>
    </Link>
  );
};