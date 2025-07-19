import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';

const stockImages = [
  "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
  "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg",
  "https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg",
  "https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg",
  "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg"
];

export const WatchDetail: React.FC = () => {
  const { brand, model } = useParams();
  const [watch, setWatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCartStore();
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatch = async () => {
      setLoading(true);
      const response = await fetch(`https://time-s-up.onrender.com/api/watches?page=1&limit=1000`);
      const result = await response.json();
      const found = result.data.find((w: any) =>
        (w["Brand"] || '').toLowerCase() === decodeURIComponent(brand || '').toLowerCase() &&
        (w["Model"] || '').toLowerCase() === decodeURIComponent(model || '').toLowerCase()
      );
      setWatch(found);
      // Set main image
      let img = found?.["Image"] || found?.["Image URL"];
      if (!img && found?.["Images"] && Array.isArray(found["Images"])) {
        img = found["Images"][0];
      }
      if (!img) img = stockImages[Math.floor(Math.random() * stockImages.length)];
      setMainImage(img);
      setLoading(false);
    };
    fetchWatch();
  }, [brand, model]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!watch) return <div className="min-h-screen flex items-center justify-center">Watch not found.</div>;

  const name = watch["Model"] || "Unknown Model";
  const brandName = watch["Brand"] || "Unknown Brand";
  const priceStr = watch["Price (USD)"] || "N/A";
  const price = typeof priceStr === 'string' ? Number(priceStr.replace(/[^\d.]/g, '')) : priceStr;
  let images: string[] = [];
  if (watch["Images"] && Array.isArray(watch["Images"])) {
    images = watch["Images"];
  } else if (watch["Image"] || watch["Image URL"]) {
    images = [watch["Image"] || watch["Image URL"]];
  } else {
    images = [mainImage!];
  }

  const handleAddToCart = () => {
    addToCart(`${brandName}__${name}`);
    setAdded(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-5xl w-full flex flex-col md:flex-row gap-10">
        {/* Left: Images */}
        <div className="flex flex-col items-center md:w-1/2">
          <div className="w-full flex justify-center mb-4">
            <img src={mainImage!} alt={name} className="w-80 h-80 object-cover rounded shadow" />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 mt-2">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  className={`w-16 h-16 object-cover rounded cursor-pointer border ${mainImage === img ? 'border-primary' : 'border-gray-200'}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          )}
        </div>
        {/* Right: Info */}
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{brandName} {name}</h1>
            <p className="text-xl text-gray-700 mb-2">{isNaN(price) ? 'N/A' : `$${price.toLocaleString()}`}</p>
            <div className="mb-4 text-green-700 font-medium">In stock</div>
            <button
              onClick={handleAddToCart}
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors text-lg mb-4"
              disabled={added}
            >
              {added ? 'Added to Cart' : 'Add to Cart'}
            </button>
            <div className="mb-4 text-gray-600">
              <span className="font-semibold">Delivery:</span> Free delivery in 3-5 days (demo info)
            </div>
          </div>
          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold mb-2">Product Details</h2>
            <table className="w-full text-sm text-left">
              <tbody>
                {Object.entries(watch).map(([k, v]) => (
                  (typeof v === 'string' || typeof v === 'number') && k !== 'Image' && k !== 'Image URL' && k !== 'Images' ? (
                    <tr key={k} className="border-b last:border-b-0">
                      <td className="py-1 pr-4 font-medium text-gray-700 whitespace-nowrap">{k}</td>
                      <td className="py-1 text-gray-900">{v}</td>
                    </tr>
                  ) : null
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}; 