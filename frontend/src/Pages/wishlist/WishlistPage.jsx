import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Trash2, Star, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [priceDetailsMap, setPriceDetailsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get current user ID from token
  const getCurrentUserId = useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found in localStorage');
      return null;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.userId || payload.id || payload._id;
      console.log('Decoded userId:', userId);
      return userId ? userId.toString() : null;
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }, []);

  // Fetch wishlist items
  const fetchWishlist = useCallback(async () => {
    const userId = getCurrentUserId();
    if (!userId) {
      setError('Please log in to view your wishlist');
      setLoading(false);
      navigate('/auth');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/products/wishlist`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log('Wishlist data:', response.data);

      // Fetch reviews for each wishlist item and calculate cumulative rating
      const itemsWithRatings = await Promise.all(response.data.map(async (item) => {
        try {
          const reviewsResponse = await axios.get(`${API_URL}/api/reviews/${item._id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          const reviews = reviewsResponse.data.filter(review => review.product.toString() === item._id);
          const cumulativeRating = reviews.length > 0
            ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
            : 0;
          return {
            ...item,
            cumulativeRating,
            numReviews: reviews.length,
          };
        } catch (err) {
          console.error(`Error fetching reviews for product ${item._id}:`, err);
          return {
            ...item,
            cumulativeRating: 0,
            numReviews: 0,
          };
        }
      }));

      setWishlistItems(itemsWithRatings);
      setError(null);
    } catch (err) {
      console.error('Error fetching wishlist:', err);
      setError(err.response?.data?.message || 'Error fetching wishlist');
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  }, [getCurrentUserId, navigate]);

  // Fetch price details for wishlist items
  const fetchPriceDetails = useCallback(async (item) => {
    try {
      const initialFilters = {};
      item.filters?.forEach(filter => {
        if (filter.values && filter.values.length > 0) {
          initialFilters[filter.name] = filter.values[0];
        }
      });
      const response = await axios.get(
        `${API_URL}/api/products/${item._id}/price-details`,
        {
          params: { selectedFilters: JSON.stringify(initialFilters) },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      console.log(`Price details for ${item._id}:`, response.data);
      return { id: item._id, ...response.data };
    } catch (err) {
      console.error(`Error fetching price details for ${item._id}:`, err);
      return { id: item._id, effectivePrice: 0, normalPrice: 0 };
    }
  }, []);

  // Fetch price details for all wishlist items
  useEffect(() => {
    const fetchAllPriceDetails = async () => {
      if (wishlistItems.length === 0) return;
      const priceDetailsPromises = wishlistItems.map(item => fetchPriceDetails(item));
      const priceDetailsResults = await Promise.all(priceDetailsPromises);
      const priceDetailsMap = priceDetailsResults.reduce((acc, details) => ({
        ...acc,
        [details.id]: details,
      }), {});
      setPriceDetailsMap(priceDetailsMap);
    };
    fetchAllPriceDetails();
  }, [wishlistItems, fetchPriceDetails]);

  // Toggle wishlist status (remove from wishlist)
  const toggleWishlist = useCallback(async (id) => {
    const userId = getCurrentUserId();
    if (!userId) {
      alert('Please log in to modify your wishlist');
      navigate('/login');
      return;
    }

    try {
      await axios.put(
        `${API_URL}/api/products/${id}/wishlist`,
        { isWishlist: false },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setWishlistItems(prev => prev.filter(item => item._id !== id));
      setPriceDetailsMap(prev => {
        const newMap = { ...prev };
        delete newMap[id];
        return newMap;
      });
      alert('Product removed from wishlist!');
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      alert(err.response?.data?.message || 'Error removing from wishlist');
    }
  }, [getCurrentUserId, navigate]);

  // Fetch wishlist on component mount
  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-950 text-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--brand-primary)]"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

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
                <p className="text-sm text-gray-400">{wishlistItems.length} items saved</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-300 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500">Start adding items you love to see them here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map(item => {
              const priceDetails = priceDetailsMap[item._id] || {};
              const effectivePrice = priceDetails.effectivePrice || 0;
              const normalPrice = priceDetails.normalPrice || 0;
              const discount = normalPrice > effectivePrice && effectivePrice > 0
                ? Math.round(((normalPrice - effectivePrice) / normalPrice) * 100)
                : 0;

              return (
                <div
                  key={item._id}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl"
                >
                  {/* Product Image */}
                  <div className="relative">
                    <Link to={`/shop/${item.category}/${item._id}`}>
                      <img
                        src={item.images?.[0] || 'https://via.placeholder.com/400x300'}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                    </Link>
                    {!item.countInStock && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-medium px-3 py-1 bg-red-600 rounded-full text-sm">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => toggleWishlist(item._id)}
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
                              i < Math.round(item.cumulativeRating || 0)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-400">
                        ({item.cumulativeRating || 0}) ({item.numReviews || 0} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-2xl font-bold" style={{ color: 'var(--brand-primary)' }}>
                        ₹{effectivePrice}
                      </span>
                      {discount > 0 && (
                        <span className="text-gray-500 line-through text-sm">
                          ₹{normalPrice}
                        </span>
                      )}
                      {discount > 0 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-900 text-green-300">
                          {discount}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;