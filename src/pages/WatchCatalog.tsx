import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { watchesData, Watch } from '../lib/data';
import { WatchCard } from '../components/WatchCard';
import { Loader2, Filter } from 'lucide-react';

export const WatchCatalog: React.FC = () => {
  const [watches, setWatches] = useState<Watch[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    brand: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    movement: '',
  });

  useEffect(() => {
    fetchWatches();
    // eslint-disable-next-line
  }, [page]);

  const fetchWatches = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://time-s-up.onrender.com/api/watches?page=${page}&limit=${limit}`);
      const result = await response.json();
      setWatches(result.data);
      setTotal(result.total);
    } catch (error) {
      console.error('Error fetching watches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      brand: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      movement: '',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {searchParams.get('q') ? `Search Results for "${searchParams.get('q')}"` : 'Watch Collection'}
          </h1>
          <p className="text-gray-600">
            {watches.length} {watches.length === 1 ? 'watch' : 'watches'} found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:text-primary-dark"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                  <select
                    value={filters.brand}
                    onChange={(e) => handleFilterChange('brand', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">All Brands</option>
                    <option value="Rolex">Rolex</option>
                    <option value="Omega">Omega</option>
                    <option value="Audemars Piguet">Audemars Piguet</option>
                    <option value="Patek Philippe">Patek Philippe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">All Categories</option>
                    <option value="luxury">Luxury</option>
                    <option value="diving">Diving</option>
                    <option value="sport">Sport</option>
                    <option value="dress">Dress</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Movement</label>
                  <select
                    value={filters.movement}
                    onChange={(e) => handleFilterChange('movement', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">All Movements</option>
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                    <option value="quartz">Quartz</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Watches Grid */}
          <div className="flex-1">
            {watches.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No watches found matching your criteria.</p>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {watches.map((watch) => (
                    <WatchCard key={watch.id} watch={watch} />
                  ))}
                </div>
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span>Page {page} of {Math.ceil(total / limit)}</span>
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page * limit >= total}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};