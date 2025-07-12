import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Star, Minus, Plus, Truck, Shield, RotateCcw, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Set the backend base URL (adjust port if different)
const API_URL = 'http://localhost:3000'; // Change to your backend port

const ProductPage = () => {
  const { category, productid } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(`Fetching product with ID: ${productid}`);
        const response = await axios.get(`${API_URL}/api/products/${productid}`);
        console.log('Response data:', response.data);
        setProduct(response.data);
        // Set initial color from features if available
        if (response.data.features && response.data.features.color) {
          setSelectedColor(response.data.features.color);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.response?.data?.message || 'Error fetching product');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productid]);

  // Rest of the code remains unchanged
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!product) {
    return <div className="text-center mt-10">Product not found</div>;
  }

  const features = product.features ? Object.fromEntries(Object.entries(product.features)) : {};
  const productImages = product.images || [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&h=600&fit=crop&crop=center'
  ];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = features.color ? [features.color] : ['Forest Green', 'Ocean Blue', 'Sage Green', 'Mint Teal'];

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    console.log('Added to cart:', { selectedSize, selectedColor, quantity });
    // Implement cart logic here
  };

  const handleBuyNow = () => {
    console.log('Buy now:', { selectedSize, selectedColor, quantity });
    navigate('/checkout');
  };

  return (
    <div className="bg-gray-950 min-h-screen text-white pt-30">
      <nav className="px-4 py-3 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>Home</span>
            <ChevronRight size={16} />
            <span>{product.category}</span>
            <ChevronRight size={16} />
            <span>{product.subCategory || 'N/A'}</span>
            <ChevronRight size={16} />
            <span className="text-white">{product.name}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
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
                  <img src={image || 'https://via.placeholder.com/200'} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
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
                  <span className="text-gray-400 ml-2">{product.rating ? `${product.rating} (${product.numReviews || 0} reviews)` : 'No reviews'}</span>
                </div>
                <span className="text-[var(--brand-primary)]">{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-white">
                ${product.discountPrice || product.price}
              </span>
              {product.discountPrice && product.price > product.discountPrice && (
                <span className="text-xl text-gray-400 line-through">${product.price}</span>
              )}
              {product.discountPrice && (
                <span className="bg-[var(--brand-primary)] text-gray-900 px-2 py-1 rounded-md text-sm font-medium">
                  {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                </span>
              )}
            </div>

            {Object.keys(features).length > 0 && (
              <>
                {features.color && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Color: {selectedColor || features.color}</h3>
                    <div className="flex space-x-3">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-12 h-12 rounded-full border-2 ${
                            selectedColor === color
                              ? 'border-[var(--brand-primary)] ring-2 ring-[var(--brand-primary)]/30'
                              : 'border-gray-600 hover:border-gray-500'
                          }`}
                          style={{
                            backgroundColor: color === 'Forest Green' ? '#52B69A' : 
                                           color === 'Ocean Blue' ? '#168AAD' :
                                           color === 'Sage Green' ? '#99D98C' : '#34A0A4'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold mb-3">Size: {selectedSize}</h3>
                  <div className="flex space-x-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg transition-colors ${
                          selectedSize === size
                            ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]'
                            : 'border-gray-600 hover:border-gray-500 text-gray-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </>
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
            {['description', 'reviews', 'shipping'].map((tab) => (
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
                {Object.keys(features).length > 0 && (
                  <ul className="list-disc list-inside space-y-2 text-gray-400">
                    {Object.entries(features).map(([key, value]) => (
                      <li key={key}><span className="font-semibold">{key}:</span> {value}</li>
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
                <p>We offer free standard shipping on all orders over $50. Express shipping options are available at checkout.</p>
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
            {[
              { id: 1, name: 'Premium Cotton Hoodie', price: 89.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop&crop=center' },
              { id: 2, name: 'Organic Bamboo Tee', price: 34.99, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=300&h=300&fit=crop&crop=center' },
              { id: 3, name: 'Sustainable Denim Jacket', price: 129.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop&crop=center' },
              { id: 4, name: 'Eco-Friendly Joggers', price: 69.99, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop&crop=center' }
            ].map((prod) => (
              <div key={prod.id} className="group cursor-pointer">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-800 mb-3">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-white font-medium mb-1">{prod.name}</h3>
                <p className="text-[var(--brand-primary)] font-semibold">${prod.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;