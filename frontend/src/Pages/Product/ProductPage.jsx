import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Minus, Plus, Truck, Shield, RotateCcw, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Forest Green');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();
  const productImages = [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&h=600&fit=crop&crop=center'
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Forest Green', 'Ocean Blue', 'Sage Green', 'Mint Teal'];

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      date: '2 days ago',
      comment: 'Amazing quality and perfect fit! The color is exactly as shown in the pictures.',
      verified: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: 4,
      date: '1 week ago',
      comment: 'Great product, fast shipping. Only minor issue is that it runs slightly small.',
      verified: true
    },
    {
      id: 3,
      name: 'Emma Davis',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Exceeded my expectations! The material feels premium and very comfortable.',
      verified: true
    }
  ];

  const relatedProducts = [
    { id: 1, name: 'Premium Cotton Hoodie', price: 89.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop&crop=center' },
    { id: 2, name: 'Organic Bamboo Tee', price: 34.99, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=300&h=300&fit=crop&crop=center' },
    { id: 3, name: 'Sustainable Denim Jacket', price: 129.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop&crop=center' },
    { id: 4, name: 'Eco-Friendly Joggers', price: 69.99, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop&crop=center' }
  ];

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', { selectedSize, selectedColor, quantity });
  };

  const handleBuyNow = () => {
    // Buy now logic here
    console.log('Buy now:', { selectedSize, selectedColor, quantity });
    navigate('/checkout');
  };

  return (
    <div className="bg-gray-950 min-h-screen text-white pt-30">
      {/* Navigation Breadcrumb */}
      <nav className="px-4 py-3 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>Home</span>
            <ChevronRight size={16} />
            <span>Clothing</span>
            <ChevronRight size={16} />
            <span>T-Shirts</span>
            <ChevronRight size={16} />
            <span className="text-white">Organic Cotton T-Shirt</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-800">
              <img
                src={productImages[selectedImage]}
                alt="Product"
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
            
            {/* Thumbnail Gallery */}
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
                  <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Title & Rating */}
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Premium Organic Cotton T-Shirt
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                    />
                  ))}
                  <span className="text-gray-400 ml-2">4.8 (124 reviews)</span>
                </div>
                <span className="text-[var(--brand-primary)]">In Stock</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-white">$49.99</span>
              <span className="text-xl text-gray-400 line-through">$69.99</span>
              <span className="bg-[var(--brand-primary)] text-gray-900 px-2 py-1 rounded-md text-sm font-medium">
                29% OFF
              </span>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Color: {selectedColor}</h3>
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

            {/* Size Selection */}
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

            {/* Quantity */}
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

            {/* Action Buttons */}
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

            {/* Share Button */}
            <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <Share2 size={20} />
              <span>Share this product</span>
            </button>

            {/* Features */}
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

        {/* Product Information Tabs */}
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

          {/* Tab Content */}
          <div className="min-h-[300px]">
            {activeTab === 'description' && (
              <div className="space-y-4 text-gray-300">
                <p>
                  Our Premium Organic Cotton T-Shirt is crafted from 100% certified organic cotton, 
                  providing unmatched comfort and sustainability. This versatile piece features a 
                  classic fit that works for any occasion, whether you're lounging at home or 
                  heading out for a casual day.
                </p>
                <p>
                  The fabric is pre-shrunk and garment-dyed for a soft, lived-in feel that only 
                  gets better with each wash. Our commitment to sustainable fashion means this 
                  t-shirt is produced using eco-friendly processes that minimize environmental impact.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>100% Organic Cotton</li>
                  <li>Pre-shrunk for perfect fit</li>
                  <li>Garment-dyed for softness</li>
                  <li>Reinforced seams for durability</li>
                  <li>Machine washable</li>
                  <li>GOTS certified sustainable production</li>
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-800 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold text-white">{review.name}</span>
                        {review.verified && (
                          <span className="text-xs bg-[var(--brand-primary)] text-gray-900 px-2 py-1 rounded">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-400">{review.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-6 text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Shipping Information</h3>
                  <p>We offer free standard shipping on all orders over $50. Express shipping options are available at checkout.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Delivery Times</h3>
                  <ul className="space-y-1 text-gray-400">
                    <li>• Standard Shipping: 5-7 business days</li>
                    <li>• Express Shipping: 2-3 business days</li>
                    <li>• Overnight Shipping: 1 business day</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Return Policy</h3>
                  <p>We accept returns within 30 days of purchase. Items must be unused and in original packaging.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 border-t border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-white mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-800 mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-white font-medium mb-1">{product.name}</h3>
                <p className="text-[var(--brand-primary)] font-semibold">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;