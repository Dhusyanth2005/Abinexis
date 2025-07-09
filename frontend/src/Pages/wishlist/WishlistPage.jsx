import React, { useState } from 'react';
import { Heart, ShoppingCart, Trash2, Star, Plus, Minus, Share2, Filter, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 2847,
      inStock: true,
      category: "Electronics"
    },
    {
      id: 2,
      name: "Yoga Mat Premium",
      price: 89.99,
      originalPrice: 120.00,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 1203,
      inStock: true,
      category: "Fitness"
    },
    {
      id: 3,
      name: "Smart Fitness Watch",
      price: 249.99,
      originalPrice: 299.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 3421,
      inStock: false,
      category: "Electronics"
    },
    {
      id: 4,
      name: "Summer Floral Dress",
      price: 39.99,
      originalPrice: 59.99,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop",
      rating: 4.4,
      reviews: 892,
      inStock: true,
      category: "Fashion"
    },
    {
      id: 5,
      name: "Ceramic Coffee Mug Set",
      price: 45.99,
      originalPrice: 65.99,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 567,
      inStock: true,
      category: "Kitchen"
    },
    {
      id: 6,
      name: "Vitamin C Serum",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1556228578-dd6e4ced84a6?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 1456,
      inStock: true,
      category: "Beauty"
    },
    {
      id: 7,
      name: "Multivitamin Supplements",
      price: 24.99,
      originalPrice: 34.99,
      image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=300&fit=crop",
      rating: 4.3,
      reviews: 892,
      inStock: true,
      category: "Health"
    },
    {
      id: 8,
      name: "Meditation Cushion",
      price: 65.99,
      originalPrice: 89.99,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 654,
      inStock: true,
      category: "Spiritual"
    },
    {
      id: 9,
      name: "Educational Building Blocks",
      price: 35.99,
      originalPrice: 49.99,
      image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 1123,
      inStock: true,
      category: "Kids"
    },
    {
      id: 10,
      name: "Premium Dog Treats",
      price: 19.99,
      originalPrice: 29.99,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 743,
      inStock: true,
      category: "Pets"
    },
    {
      id: 11,
      name: "Elegant Notebook Set",
      price: 15.99,
      originalPrice: 24.99,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
      rating: 4.4,
      reviews: 456,
      inStock: true,
      category: "Stationery"
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quantities, setQuantities] = useState({});

  const categories = [
    'All',
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

  const filteredItems = selectedCategory === 'All' 
    ? wishlistItems 
    : wishlistItems.filter(item => item.category === selectedCategory);

  const removeFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, change) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change)
    }));
  };

  const addToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    // Cart logic would go here
    console.log(`Added ${quantity} of ${item.name} to cart`);
  };



  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Link 
                to="/"
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors mr-2"
              >
                <ArrowLeft className="h-6 w-6 text-gray-300 hover:text-white" />
              </Link>
              <Heart className="h-8 w-8" style={{ color: 'var(--brand-primary)' }} />
              <div>
                <h1 className="text-2xl font-bold text-white">My Wishlist</h1>
                <p className="text-sm text-gray-400">{filteredItems.length} items saved</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-gray-300 font-medium">Filter by category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                style={selectedCategory === category ? {
                  background: `linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))`,
                } : {}}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Wishlist Items */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-300 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500">Start adding items you love to see them here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-medium px-3 py-1 bg-red-600 rounded-full text-sm">
                        Out of Stock
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 bg-gray-900/80 hover:bg-red-600 rounded-full transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white leading-tight">{item.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300">
                      {item.category}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(item.rating)
                              ? 'fill-current'
                              : 'text-gray-600'
                          }`}
                          style={i < Math.floor(item.rating) ? { color: 'var(--primary-light-green)' } : {}}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      {item.rating} ({item.reviews.toLocaleString()} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-2xl font-bold" style={{ color: 'var(--brand-primary)' }}>
                      ${item.price}
                    </span>
                    <span className="text-gray-500 line-through text-sm">
                      ${item.originalPrice}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-900 text-green-300">
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-sm text-gray-300">Quantity:</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={!item.inStock}
                        className="p-1 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{quantities[item.id] || 1}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        disabled={!item.inStock}
                        className="p-1 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(item)}
                    disabled={!item.inStock}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
                      item.inStock
                        ? 'text-white hover:transform hover:scale-105 hover:shadow-lg'
                        : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    }`}
                    style={item.inStock ? {
                      background: `linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))`,
                    } : {}}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>{item.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;