import React, { useState, useEffect, useCallback } from 'react';
import { Heart, ShoppingCart, Star, Minus, Plus, Truck, Shield, RotateCcw, Share2, ChevronRight, Send, Edit2, Trash2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Function to generate consistent button styles for all filters
const getFilterStyles = () => ({
  component: 'button',
  className: (value, selected) =>
    `px-4 py-2 border rounded-lg transition-colors ${
      selected === value
        ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]'
        : 'border-gray-600 hover:border-gray-500 text-gray-300'
    }`,
});

const ProductPage = () => {
  const { category, productid } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState(null);
  const [priceDetails, setPriceDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedPriceDetailsMap, setRelatedPriceDetailsMap] = useState({});
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [reviewImages, setReviewImages] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Get current user ID from token
  const getCurrentUserId = () => {
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
  };
  const currentUserId = getCurrentUserId();

  // Initial 2-second loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Reset reviews when productid changes to prevent stale data
  useEffect(() => {
    setReviews([]);
    setLoading(true);
  }, [productid]);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(`Fetching product with ID: ${productid}`);
        const response = await axios.get(`${API_URL}/api/products/${productid}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('Product data:', response.data);
        setProduct(response.data);
        setIsWishlisted(response.data.isWishlist || false);
        const initialFilters = {};
        response.data.filters?.forEach(filter => {
          if (filter.values && filter.values.length > 0) {
            initialFilters[filter.name] = filter.values[0];
          }
        });
        setSelectedFilters(initialFilters);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.response?.data?.message || 'Error fetching product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productid]);

  // Fetch price details for main product
  useEffect(() => {
    const fetchPriceDetails = async () => {
      if (!product) return;
      try {
        const response = await axios.get(
          `${API_URL}/api/products/${productid}/price-details`,
          {
            params: { selectedFilters: JSON.stringify(selectedFilters) },
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );
        console.log('Price details:', response.data);
        setPriceDetails(response.data);
      } catch (err) {
        console.error('Error fetching price details:', err);
        setPriceDetails(null);
      }
    };
    fetchPriceDetails();
  }, [productid, selectedFilters, product]);

  // Fetch related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product) return;
      try {
        const response = await axios.get(`${API_URL}/api/products`, {
          params: { category: product.category },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const allProducts = response.data;
        const filteredProducts = allProducts
          .filter(p => p._id !== productid)
          .slice(0, 4);
        setRelatedProducts(filteredProducts);
      } catch (err) {
        console.error('Error fetching related products:', err);
        setRelatedProducts([]);
      }
    };
    fetchRelatedProducts();
  }, [product, productid]);

  // Fetch price details for related products
  const fetchRelatedPriceDetails = useCallback(async (prod) => {
    try {
      const initialFilters = {};
      prod.filters?.forEach(filter => {
        if (filter.values && filter.values.length > 0) {
          initialFilters[filter.name] = filter.values[0];
        }
      });
      const response = await axios.get(
        `${API_URL}/api/products/${prod._id}/price-details`,
        {
          params: { selectedFilters: JSON.stringify(initialFilters) },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      console.log(`Price details for related product ${prod._id}:`, response.data);
      return { id: prod._id, ...response.data };
    } catch (err) {
      console.error(`Error fetching price details for ${prod._id}:`, err);
      return { id: prod._id, effectivePrice: 0, normalPrice: 0 };
    }
  }, []);

  useEffect(() => {
    const fetchAllRelatedPriceDetails = async () => {
      if (relatedProducts.length === 0) return;
      const priceDetailsPromises = relatedProducts.map(prod => fetchRelatedPriceDetails(prod));
      const priceDetailsResults = await Promise.all(priceDetailsPromises);
      const priceDetailsMap = priceDetailsResults.reduce((acc, details) => ({
        ...acc,
        [details.id]: details,
      }), {});
      setRelatedPriceDetailsMap(priceDetailsMap);
    };
    fetchAllRelatedPriceDetails();
  }, [relatedProducts, fetchRelatedPriceDetails]);

  // Fetch product reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log(`Fetching reviews for product ID: ${productid}`);
        const response = await axios.get(`${API_URL}/api/reviews/${productid}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('Fetched reviews:', response.data);
        setReviews(response.data.filter(review => review.product.toString() === productid));
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setReviews([]);
      }
    };
    if (!initialLoading) {
      fetchReviews();
    }
  }, [productid, initialLoading]);

  // Toggle wishlist status
  const handleToggleWishlist = async () => {
    if (!currentUserId) {
      alert('Please log in to add to wishlist');
      navigate('/login');
      return;
    }
    try {
      const response = await axios.put(
        `${API_URL}/api/products/${productid}/wishlist`,
        { isWishlist: !isWishlisted },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setIsWishlisted(response.data.isWishlist);
      alert(`Product ${response.data.isWishlist ? 'added to' : 'removed from'} wishlist!`);
    } catch (err) {
      console.error('Error toggling wishlist:', err);
      alert(err.response?.data?.message || 'Error updating wishlist');
    }
  };

  const handleQuantityChange = (type) => {
    if (type === 'increment' && quantity < (product?.countInStock || 0)) {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/cart/add`,
        {
          productId: priceDetails.productId,
          quantity,
          filters: selectedFilters,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Added to cart:', response.data);
      alert('Product added to cart successfully!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert(err.response?.data?.message || 'Error adding to cart');
    }
  };

  const handleBuyNow = () => {
    const productDetails = {
      id: priceDetails.productId,
      name: product.name,
      price: priceDetails?.effectivePrice || 0,
      quantity,
      filters: selectedFilters,
      image: product.images?.[0] || 'https://via.placeholder.com/80',
    };
    navigate('/checkout', { state: { orderItems: [productDetails] } });
  };

  const handleFilterChange = (filterName, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: value,
    }));
  };

  // Handle review submission (create or update)
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.rating || newReview.rating < 1 || newReview.rating > 5) {
      alert('Please select a rating between 1 and 5 stars');
      return;
    }

    const formData = new FormData();
    formData.append('rating', newReview.rating);
    formData.append('comment', newReview.comment);
    reviewImages.forEach(image => formData.append('images', image));

    try {
      let response;
      if (editingReviewId) {
        response = await axios.put(`${API_URL}/api/reviews/${editingReviewId}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setReviews(reviews.map(r => (r._id === editingReviewId ? response.data : r)));
        alert('Review updated successfully!');
      } else {
        formData.append('productId', productid);
        response = await axios.post(`${API_URL}/api/reviews`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setReviews([...reviews, response.data]);
        alert('Review submitted successfully!');
      }
      setNewReview({ rating: 0, comment: '' });
      setReviewImages([]);
      setShowReviewForm(false);
      setEditingReviewId(null);
    } catch (err) {
      console.error('Error submitting review:', err);
      alert(err.response?.data?.message || 'Error submitting review');
    }
  };

  // Handle edit review
  const handleEditReview = (review) => {
    setNewReview({ rating: review.rating, comment: review.comment });
    setReviewImages([]);
    setEditingReviewId(review._id);
    setShowReviewForm(true);
  };

  // Handle delete review
  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      console.log(`Sending DELETE request for review ID: ${reviewId}`);
      await axios.delete(`${API_URL}/api/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setReviews(reviews.filter(r => r._id !== reviewId));
      alert('Review deleted successfully!');
    } catch (err) {
      console.error('Error deleting review:', err);
      alert(err.response?.data?.message || 'Error deleting review. Please try again.');
    }
  };

  // Handle image selection for review
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setReviewImages(files);
  };

  // Handle rating selection
  const handleRatingChange = (rating) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  // Calculate price details
  const calculatePriceDetails = () => {
    if (!product || !product.filters) return { effectivePrice: 0, originalPrice: 0, discount: 0 };

    let basePrice = 0;
    let totalAdjustment = 0;

    const firstFilter = product.filters[0];
    const firstValue = selectedFilters[firstFilter.name] || firstFilter.values[0];
    const firstAdjustment = firstFilter.priceAdjustments?.find(adj => adj.value === firstValue);
    basePrice = firstAdjustment?.price || 0;

    product.filters.forEach(filter => {
      const selectedValue = selectedFilters[filter.name] || filter.values[0];
      const adjustment = filter.priceAdjustments?.find(adj => adj.value === selectedValue);
      if (adjustment) {
        totalAdjustment += adjustment.discountPrice > 0 ? adjustment.discountPrice : adjustment.price;
      }
    });

    const effectivePrice = totalAdjustment > 0 ? totalAdjustment : basePrice;
    const originalPrice = product.filters.reduce((total, filter) => {
      const selectedValue = selectedFilters[filter.name] || filter.values[0];
      const adjustment = filter.priceAdjustments?.find(adj => adj.value === selectedValue);
      return total + (adjustment?.price || 0);
    }, 0);

    const discount = originalPrice > effectivePrice && effectivePrice > 0
      ? Math.round(((originalPrice - effectivePrice) / originalPrice) * 100)
      : 0;

    return {
      effectivePrice,
      originalPrice,
      discount,
    };
  };

  // Calculate cumulative rating
  const cumulativeRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-950 text-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--brand-primary)]"></div>
      </div>
    );
  }
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!product) {
    return <div className="text-center mt-10">Product not found</div>;
  }

  const productImages = product.images || [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&h=600&fit=crop&crop=center',
  ];

  const { effectivePrice, originalPrice, discount } = calculatePriceDetails();

  return (
    <div className="bg-gray-950 min-h-screen text-white pt-30">
      <nav className="px-4 py-3 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span
              onClick={() => navigate('/')}
              className="cursor-pointer hover:text-white transition-colors"
            >
              Home
            </span>
            <ChevronRight size={16} />
            <span
              onClick={() => navigate(`/shop/${category}`)}
              className="cursor-pointer hover:text-white transition-colors"
            >
              {product.category}
            </span>
            <ChevronRight size={16} />
            <span className="text-gray-400">
              {product.subCategory || 'N/A'}
            </span>
            <ChevronRight size={16} />
            <span className="text-white">{product.name}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-800">
              <img
                src={productImages[selectedImage] || 'https://via.placeholder.com/600'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={handleToggleWishlist}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800 transition-colors"
              >
                <Heart
                  size={24}
                  className={`${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                />
              </button>
            </div>

            <div className="flex space-x-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? 'border-[var(--brand-primary)]'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <img
                    src={image || 'https://via.placeholder.com/200'}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${i < Math.round(cumulativeRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                    />
                  ))}
                  <span className="text-gray-400 ml-2">
                    {cumulativeRating} ({reviews.length} reviews)
                  </span>
                </div>
                <span className={product.countInStock > 0 ? 'text-[var(--brand-primary)]' : 'text-red-500'}>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-white">
                ₹{effectivePrice || 0}
              </span>
              {discount > 0 && (
                <span className="text-xl text-gray-400 line-through">
                  ₹{originalPrice}
                </span>
              )}
              {discount > 0 && (
                <span className="bg-[var(--brand-primary)] text-gray-900 px-2 py-1 rounded-md text-sm font-medium">
                  {discount}% OFF
                </span>
              )}
            </div>

            {product.filters?.length > 0 && (
              <div className="space-y-4">
                {product.filters.map(filter => (
                  <div key={filter.name}>
                    <h3 className="text-lg font-semibold mb-3">
                      {filter.name.charAt(0).toUpperCase() + filter.name.slice(1)}: {selectedFilters[filter.name] || filter.values[0]}
                    </h3>
                    <div className="flex space-x-2 flex-wrap gap-2">
                      {filter.values.map(value => {
                        const filterStyle = getFilterStyles();
                        return (
                          <button
                            key={value}
                            onClick={() => handleFilterChange(filter.name, value)}
                            className={filterStyle.className(value, selectedFilters[filter.name])}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {product.countInStock > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-600 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange('decrement')}
                      className="p-2 hover:bg-gray-800 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus size={20} />
                    </button>
                    <span className="px-4 py-2 border-x border-gray-600">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange('increment')}
                      className="p-2 hover:bg-gray-800 transition-colors"
                      disabled={quantity >= product.countInStock}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {product.countInStock} available
                  </span>
                </div>
              </div>
            )}

            {product.countInStock > 0 && (
              <div className="space-y-3">
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-[var(--brand-primary)] text-gray-900 py-3 rounded-lg font-semibold hover:bg-[var(--primary-mint)] transition-colors"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className="w-full border border-[var(--brand-primary)] text-[var(--brand-primary)] py-3 rounded-lg font-semibold hover:bg-[var(--brand-primary)]/10 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>
              </div>
            )}

            <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <Share2 size={20} />
              <span>Share this product</span>
            </button>

            <div className="border-t border-gray-800 pt-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Truck size={24} className="mx-auto mb-2 text-[var(--brand-primary)]" />
                  <p className="text-sm text-gray-400">Free Shipping</p>
                </div>
                <div className="text-center">
                  <RotateCcw size={24} className="mx-auto mb-2 text-[var(--brand-primary)]" />
                  <p className="text-sm text-gray-400">30-Day Returns</p>
                </div>
                <div className="text-center">
                  <Shield size={24} className="mx-auto mb-2 text-[var(--brand-primary)]" />
                  <p className="text-sm text-gray-400">2-Year Warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-800 pt-8">
          <div className="flex space-x-8 mb-8">
            {['description', 'reviews', 'shipping'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 border-b-2 capitalize font-medium transition-colors ${
                  activeTab === tab
                    ? 'border-[var(--brand-primary)] text-[var(--brand-primary)]'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="min-h-[300px]">
            {activeTab === 'description' && (
              <div className="space-y-4 text-gray-300">
                <p>{product.description || 'No description available.'}</p>
                {product.features?.length > 0 && (
                  <ul className="list-disc list-inside space-y-2 text-gray-400">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Customer Reviews</h2>
                <button
                  onClick={() => {
                    setShowReviewForm(true);
                    setEditingReviewId(null);
                    setNewReview({ rating: 0, comment: '' });
                    setReviewImages([]);
                  }}
                  className="mb-6 flex items-center space-x-2 bg-[var(--brand-primary)] text-gray-900 py-2 px-4 rounded-lg font-semibold hover:bg-[var(--primary-mint)] transition-colors"
                >
                  <Send size={20} />
                  <span>Add Review</span>
                </button>
                {showReviewForm && (
                  <div className="mb-6 p-4 border border-gray-600 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">
                      {editingReviewId ? 'Edit Review' : 'Write a Review'}
                    </h3>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={24}
                            className={`cursor-pointer ${i < newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                            onClick={() => handleRatingChange(i + 1)}
                          />
                        ))}
                      </div>
                      <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                        placeholder="Write your review here..."
                        className="w-full p-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:border-[var(--brand-primary)]"
                        rows="4"
                      />
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="text-gray-400"
                      />
                      <div className="flex space-x-2">
                        <button
                          type="submit"
                          className="flex items-center space-x-2 bg-[var(--brand-primary)] text-gray-900 py-2 px-4 rounded-lg font-semibold hover:bg-[var(--primary-mint)] transition-colors"
                        >
                          <Send size={20} />
                          <span>{editingReviewId ? 'Update Review' : 'Submit Review'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowReviewForm(false);
                            setEditingReviewId(null);
                            setNewReview({ rating: 0, comment: '' });
                            setReviewImages([]);
                          }}
                          className="px-4 py-2 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                <div className="space-y-6">
                  {reviews.length > 0 ? (
                    reviews.map(review => (
                      <div key={review._id} className="border-b border-gray-800 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">
                              {review.user?.firstName
                                ? `${review.user.firstName} ${review.user.lastName || ''}`.trim()
                                : 'Anonymous'}
                            </span>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  className={`${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                                />
                              ))}
                            </div>
                          </div>
                          {review.user?._id && currentUserId && review.user._id.toString() === currentUserId && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditReview(review)}
                                className="text-gray-400 hover:text-[var(--brand-primary)] transition-colors"
                              >
                                <Edit2 size={20} />
                              </button>
                              <button
                                onClick={() => handleDeleteReview(review._id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-300 mb-2">{review.comment}</p>
                        {review.images && review.images.length > 0 && (
                          <div className="flex space-x-2 flex-wrap gap-2">
                            {review.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Review image ${index + 1}`}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                            ))}
                          </div>
                        )}
                        <p className="text-sm text-gray-400 mt-2">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No reviews available yet.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-6 text-gray-300">
                <p>Shipping cost: Rs. {product.shippingCost || 0}/-</p>
                <p>We offer free standard shipping on all orders over ₹50. Express shipping options are available at checkout.</p>
                <ul className="space-y-1 text-gray-400">
                  <li>• Standard Shipping: 5-7 business days</li>
                  <li>• Express Shipping: 2-3 business days</li>
                  <li>• Overnight Shipping: 1 business day</li>
                </ul>
                <p>We accept returns within 30 days of purchase. Items must be unused and in original packaging.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 border-t border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-white mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.length > 0 ? (
              relatedProducts.map(prod => {
                const priceDetails = relatedPriceDetailsMap[prod._id] || {};
                const effectivePrice = priceDetails.effectivePrice || 0;
                const normalPrice = priceDetails.normalPrice || 0;
                const discount = normalPrice > effectivePrice && effectivePrice > 0
                  ? Math.round(((normalPrice - effectivePrice) / normalPrice) * 100)
                  : 0;

                return (
                  <div
                    key={prod._id}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/shop/${product.category}/${prod._id}`)}
                  >
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-800 mb-3">
                      <img
                        src={prod.images?.[0] || 'https://via.placeholder.com/300'}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-white font-medium mb-1">{prod.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-[var(--brand-primary)] font-semibold">
                        ₹{effectivePrice}
                      </span>
                      {discount > 0 && (
                        <span className="text-gray-400 line-through text-sm">
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
                );
              })
            ) : (
              <p className="text-gray-400">No related products available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;