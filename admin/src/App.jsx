import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import HomepageManagement from './components/HomepageManagement';
import ProductManagement from './components/ProductManagement';
import OrderManagement from './components/OrderManagement';

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white">
        {/* Mobile Menu Button (shown only when sidebar is closed) */}
        {!isMobileMenuOpen && (
          <div className="lg:hidden fixed top-4 left-4 z-50">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="bg-gray-800 p-2 rounded-lg border border-gray-700"
            >
              <Menu className="h-6 w-6 text-white" />
            </button>
          </div>
        )}

        {/* Sidebar */}
        <Sidebar
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="lg:ml-64 min-h-screen">
          <div className="p-4 lg:p-8 pt-16 lg:pt-8">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/homepage-management" element={<HomepageManagement />} />
              <Route path="/product-management" element={<ProductManagement />} />
              <Route path="/order-management" element={<OrderManagement />} />
              <Route path="/" element={<Dashboard />} /> {/* Default route */}
            </Routes>
          </div>
        </div>

        <style jsx>{`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </Router>
  );
};

export default App;