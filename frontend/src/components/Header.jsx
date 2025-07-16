import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, User, Heart, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-container')) {
        setIsProfileOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const categories = [
    'Kitchen',
    'Health',
    'Fashion',
    'Beauty',
    'Electronics',
    'Fitness',
    'Spiritual',
    'Kids',
    'Pets',
    'Stationery',
  ];

  return (
    <>
      <style jsx>{`
        .brand-gradient {
          background: linear-gradient(135deg, var(--brand-primary), var(--brand-secondary));
        }
        
        .brand-text-gradient {
          background: linear-gradient(135deg, var(--brand-primary), var(--brand-accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .brand-border {
          border-color: var(--brand-primary);
        }
        
        .brand-hover:hover {
          color: var(--brand-primary);
        }
        
        .brand-accent-hover:hover {
          color: var(--brand-accent);
        }
        
        .search-input {
          background: rgba(31, 41, 55, 0.8);
          border: 1px solid rgba(75, 85, 99, 0.5);
          transition: all 0.3s ease;
        }
        
        .search-input:focus {
          background: rgba(31, 41, 55, 1);
          border-color: var(--brand-primary);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
        }
        
        .category-item {
          transition: all 0.3s ease;
          position: relative;
        }
        
        .category-item:hover {
          color: var(--brand-primary);
          transform: translateY(-1px);
        }
        
        .category-item::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, var(--brand-primary), var(--brand-accent));
          transition: width 0.3s ease;
        }
        
        .category-item:hover::after {
          width: 100%;
        }
        
        .profile-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: rgba(31, 41, 55, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(75, 85, 99, 0.5);
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          min-width: 200px;
          z-index: 1000;
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          pointer-events: none;
        }
        
        .profile-dropdown.show {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        
        .profile-dropdown-item {
          padding: 12px 16px;
          color: #d1d5db;
          text-decoration: none;
          display: block;
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(75, 85, 99, 0.3);
        }
        
        .profile-dropdown-item:last-child {
          border-bottom: none;
        }
        
        .profile-dropdown-item:hover {
          background: rgba(59, 130, 246, 0.1);
          color: var(--brand-primary);
          transform: translateX(4px);
        }
      `}</style>
      
      <header className="fixed top-0 w-full z-50 bg-gray-900 border-b border-gray-800">
        {/* Top Row - Logo, Search, Products, Icons */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group cursor-pointer">
              <div className="w-10 h-10 brand-gradient rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold brand-text-gradient">
                Abinexis
              </span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 search-input rounded-lg text-white placeholder-gray-400 outline-none"
                />
              </div>
            </div>

            {/* Products & Icons */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <Link to="/wishlist">
                  <Heart className="w-6 h-6 text-gray-300 brand-hover cursor-pointer transition-colors duration-300" />
                </Link>
                <div className="relative profile-container">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="bg-transparent border-none cursor-pointer"
                  >
                    <User className="w-6 h-6 text-gray-300 brand-hover cursor-pointer transition-colors duration-300" />
                  </button>
                  <div className={`profile-dropdown ${isProfileOpen ? 'show' : ''}`}>
                    <Link 
                      to="/profile" 
                      className="profile-dropdown-item"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link 
                      to="/order" 
                      className="profile-dropdown-item"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Orders
                    </Link>
                    <Link 
                      to="/cart" 
                      className="profile-dropdown-item"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Cart
                    </Link>
                    <Link 
                      to="/wishlist" 
                      className="profile-dropdown-item"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Wishlist
                    </Link>
                    
                  </div>
                </div>
                <Link to="/cart" className="relative">
                  <ShoppingCart className="w-6 h-6 text-gray-300 brand-hover cursor-pointer transition-colors duration-300" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 brand-gradient rounded-full flex items-center justify-center text-xs text-white font-bold">
                    3
                  </span>
                </Link>
                
                {/* Mobile Menu Button */}
                <button
                  className="md:hidden text-gray-300 hover:text-white bg-transparent border-none cursor-pointer"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Categories */}
        <div className="border-t border-gray-800 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="hidden md:flex items-center justify-center space-x-8 py-3">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/shop/${category.toLowerCase()}`}
                  className="category-item text-gray-300 hover:text-white transition-colors duration-300 bg-transparent border-none cursor-pointer text-sm font-medium px-2 py-1"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 search-input rounded-lg text-white placeholder-gray-400 outline-none"
                />
              </div>
              
              <div className="border-t border-gray-800 pt-4">
                <h3 className="text-gray-400 text-sm font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/${category.toLowerCase()}`}
                      className="block text-gray-300 hover:text-white transition-colors duration-300 bg-transparent border-none cursor-pointer w-full text-left py-1 text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;