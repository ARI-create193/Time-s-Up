import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-gray-900 text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg"
          alt="Luxury Watch"
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Timeless
            <span className="text-amber-400"> Luxury</span>
            <br />
            Exceptional Watches
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
            Discover our curated collection of the world's finest timepieces. 
            From classic elegance to modern innovation, find your perfect watch.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/watches"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors group"
            >
              Explore Collection
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/featured"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
            >
              Featured Watches
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </div>
  );
};