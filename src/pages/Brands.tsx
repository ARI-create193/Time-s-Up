import React from 'react';
import { Link } from 'react-router-dom';
import { watchesData } from '../lib/data';

export const Brands: React.FC = () => {
  // Extract unique brands
  const brands = Array.from(new Set(watchesData.map(w => w.brand)));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Brands</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <li key={brand}>
              <Link
                to={`/brands/${encodeURIComponent(brand)}`}
                className="block bg-white rounded-lg shadow-md p-6 text-xl font-semibold text-primary hover:text-primary-dark hover:shadow-lg transition"
              >
                {brand}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Brands; 