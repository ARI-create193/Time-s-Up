import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { watchesData, Watch } from '../lib/data';
import { WatchCard } from '../components/WatchCard';

export const BrandWatches: React.FC = () => {
  const { brand } = useParams<{ brand: string }>();
  const decodedBrand = brand ? decodeURIComponent(brand) : '';
  const filteredWatches = watchesData.filter((w: Watch) => w.brand === decodedBrand);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">{decodedBrand} Watches</h1>
        <Link to="/brands" className="text-amber-600 hover:underline mb-6 inline-block">← Back to Brands</Link>
        {filteredWatches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No watches found for this brand.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredWatches.map((watch) => (
              <WatchCard key={watch.id} watch={watch} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandWatches; 