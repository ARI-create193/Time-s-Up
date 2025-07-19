import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from "./components/Header";
import { Home } from './pages/Home';
import { WatchCatalog } from './pages/WatchCatalog';
import { Cart } from './pages/Cart';
import { AuthForm } from './components/AuthForm';
import { useAuthStore } from './stores/authStore';
import { Checkout } from './pages/Checkout';
import Profile from './pages/Profile';
import { WatchDetail } from './pages/WatchDetail';
import { Brands } from './pages/Brands';
import { BrandWatches } from './pages/BrandWatches';
import About from './pages/About';
import CustomCursor from './components/CustomCursor';

function App() {
  const { initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <>
      <CustomCursor />
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/watches" element={<WatchCatalog />} />
              <Route path="/search" element={<WatchCatalog />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/auth" element={<AuthForm />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/brands/:brand" element={<BrandWatches />} />
              <Route path="/watch/:brand/:model" element={<WatchDetail />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </>
  );
}

export default App;