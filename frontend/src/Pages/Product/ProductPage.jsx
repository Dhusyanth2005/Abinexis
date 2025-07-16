import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Star, Minus, Plus, Truck, Shield, RotateCcw, Share2, ChevronRight } from 'lucide-react';
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
  const [relatedProducts, setRelatedProducts] = useState([]); // State for related products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true); // Added for 2-second delay
  
  // Initial 2-second loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 500); // 2-second delay
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(`Fetching product with ID: ${productid}`);
        const response = await axios.get(`${API_URL}/api/products/${productid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('Product data:', response.data);
        setProduct(response.data);
        const initialFilters = {};
        response.data.filters?.forEach(filter => {
          if (filter.values && filter.values.length > 0) {
            initialFilters[filter.name] = filter.values[0];
          }
        });
        setSelectedFilters(initialFilters);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.response?.data?.message || 'Error fetching product');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productid]);

  useEffect(() => {
    const fetchPriceDetails = async () => {
      if (!product) return;
      try {
        const response = await axios.get(
          `${API_URL}/api/products/${productid}/price-details`,
          {
            params: { selectedFilters: JSON.stringify(selectedFilters) },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
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

  // Fetch related products based on category
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product) return;
      try {
        const response = await axios.get(`${API_URL}/api/products`, {
          params: { category: product.category },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const allProducts = response.data;
        // Filter out the current product and limit to 4 related products
        const filteredProducts = allProducts
          .filter(p => p._id !== productid)
          .slice(0, 4); // Limit to 4 products
        setRelatedProducts(filteredProducts);
      } catch (err) {
        console.error('Error fetching related products:', err);
        setRelatedProducts([]); // Fallback to empty array if fetch fails
      }
    };
    fetchRelatedProducts();
  }, [product, productid]);

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
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

  // Calculate effective price and discount based on all selected filters
  const calculatePriceDetails = () => {
    if (!product || !product.filters) return { effectivePrice: 0, originalPrice: 0, discount: 0 };

    let basePrice = 0;
    let totalAdjustment = 0;

    // Find the base price from the first filter's default value (or product base price if available)
    const firstFilter = product.filters[0];
    const firstValue = selectedFilters[firstFilter.name] || firstFilter.values[0];
    const firstAdjustment = firstFilter.priceAdjustments?.find(adj => adj.value === firstValue);
    basePrice = firstAdjustment?.price || 0;

    // Aggregate adjustments from all filters
    product.filters.forEach(filter => {
      const selectedValue = selectedFilters[filter.name] || filter.values[0];
      const adjustment = filter.priceAdjustments?.find(adj => adj.value === selectedValue);
      if (adjustment) {
        totalAdjustment += adjustment.discountPrice > 0 ? adjustment.discountPrice : adjustment.price;
      }
    });

    // Effective price is the base price adjusted by all filter changes
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
            {/* Subcategory is not part of the route; use it as a label if present */}
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
                onClick={() => setIsWishlisted(!isWishlisted)}
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
                      className={`${i < (product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                    />
                  ))}
                  <span className="text-gray-400 ml-2">
                    {product.rating ? `${product.rating} (${product.numReviews || 0} reviews)`: 'No reviews'}
                  </span>
                </div>
                <span className="text-[var(--brand-primary)]">{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span>
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

            <div>
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-600 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange('decrement')}
                    className="p-2 hover:bg-gray-800 transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-600">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange('increment')}
                    className="p-2 hover:bg-gray-800 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleBuyNow}
                className="w-full bg-[var(--brand-primary)] text-gray-900 py-3 rounded-lg font-semibold hover:bg-[var(--primary-mint)] transition-colors"
                disabled={product.countInStock === 0}
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="w-full border border-[var(--brand-primary)] text-[var(--brand-primary)] py-3 rounded-lg font-semibold hover:bg-[var(--brand-primary)]/10 transition-colors flex items-center justify-center space-x-2"
                disabled={product.countInStock === 0}
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>
            </div>

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
                <p className="text-gray-400">No reviews available yet.</p>
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
              relatedProducts.map(prod => (
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
                  <p className="text-[var(--brand-primary)] font-semibold">
                    ₹{prod.price || 0}/-
                  </p>
                </div>
              ))
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