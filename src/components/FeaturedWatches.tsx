import React, { useEffect, useState } from 'react';
import { watchesData, Watch } from '../lib/data';
import { WatchCard } from './WatchCard';
import { Loader2 } from 'lucide-react';
import Luxury3DWatch from './Luxury3DWatch';

export const FeaturedWatches: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Experience a Luxury 3D Watch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Rotate, zoom, and interact with a real 3D timepiece.
          </p>
        </div>
        <div className="flex justify-center items-center min-h-[400px]">
          <Luxury3DWatch />
        </div>
      </div>
    </section>
  );
};