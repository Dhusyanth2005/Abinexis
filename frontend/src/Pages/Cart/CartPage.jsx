import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Heart, 
  ArrowLeft, 
  ShoppingBag,
  Tag,
  Truck,
  Shield,
  Clock,
  Gift
} from 'lucide-react';
import { Link } from 'react-router-dom';
const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 199.99,
      originalPrice: 249.99,
      quantity: 1,
      image: '/api/placeholder/150/150',
      color: 'Midnight Black',
      size: 'One Size',
      inStock: true,
      category: 'Electronics'
    },
    {
      id: 2,
      name: 'Premium Smartphone Case',
      price: 29.99,
      originalPrice: 39.99,
      quantity: 2,
      image: '/api/placeholder/150/150',
      color: 'Ocean Blue',
      size: 'iPhone 14 Pro',
      inStock: true,
      category: 'Accessories'
    },
    {
      id: 3,
      name: 'USB-C Fast Charging Cable',
      price: 19.99,
      originalPrice: 24.99,
      quantity: 1,
      image: '/api/placeholder/150/150',
      color: 'White',
      size: '6ft',
      inStock: true,
      category: 'Electronics'
    },
    {
      id: 4,
      name: 'Wireless Mouse',
      price: 49.99,
      originalPrice: 59.99,
      quantity: 1,
      image: '/api/placeholder/150/150',
      color: 'Space Gray',
      size: 'Standard',
      inStock: false,
      category: 'Electronics'
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const moveToWishlist = (item) => {
    setWishlistItems(prev => [...prev, item]);
    removeItem(item.id);
  };

  const applyCoupon = () => {
    const validCoupons = {
      'SAVE10': { discount: 0.10, type: 'percentage', description: '10% off' },
      'FLAT50': { discount: 50, type: 'fixed', description: '$50 off' },
      'WELCOME': { discount: 0.15, type: 'percentage', description: '15% off first order' }
    };

    if (validCoupons[couponCode.toUpperCase()]) {
      setAppliedCoupon({
        code: couponCode.toUpperCase(),
        ...validCoupons[couponCode.toUpperCase()]
      });
    } else {
      alert('Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  
  let discount = 0;
  if (appliedCoupon) {
    discount = appliedCoupon.type === 'percentage' 
      ? subtotal * appliedCoupon.discount 
      : appliedCoupon.discount;
  }
  
  const tax = (subtotal - discount) * 0.08;
  const shipping = subtotal > 75 ? 0 : 9.99;
  const total = subtotal - discount + tax + shipping;

  const CartItem = ({ item }) => (
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="relative">
          <div className="w-32 h-32 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
            <ShoppingBag className="w-12 h-12 text-[var(--brand-primary)]" />
          </div>
          {!item.inStock && (
            <div className="absolute inset-0 bg-red-500/20 rounded-lg flex items-center justify-center">
              <span className="text-red-400 font-medium text-sm">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-white">{item.name}</h3>
            <button
              onClick={() => moveToWishlist(item)}
              className="text-gray-400 hover:text-red-400 transition-colors"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-sm text-gray-400 mb-3">{item.category}</p>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="text-sm">
              <span className="text-gray-400">Color: </span>
              <span className="text-white">{item.color}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-400">Size: </span>
              <span className="text-white">{item.size}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[var(--brand-primary)]">
                  ${item.price.toFixed(2)}
                </span>
                {item.originalPrice > item.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${item.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={!item.inStock}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    item.inStock 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={!item.inStock}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    item.inStock 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-400 hover:text-red-300 transition-colors p-2"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-[var(--brand-primary)]" />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--primary-light-green)] to-[var(--brand-primary)] bg-clip-text text-transparent">
                Shopping Cart
              </h1>
              <p className="text-gray-400">{cartItems.length} items in your cart</p>
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-16 h-16 text-gray-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Add some items to get started!</p>
            <button className="px-8 py-3 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white rounded-lg font-medium hover:from-[var(--brand-secondary)] hover:to-[var(--brand-accent)] transition-all">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
              
              {/* Bulk Actions */}
              <div className="bg-gray-900 rounded-xl p-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setCartItems([])}
                    className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear Cart
                  </button>
                </div>
                <div className="text-sm text-gray-400">
                  {wishlistItems.length > 0 && (
                    <span>{wishlistItems.length} items in wishlist</span>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-xl p-6 shadow-2xl sticky top-4">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-[var(--brand-primary)]" />
                  Order Summary
                </h2>

                {/* Coupon Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] text-sm"
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-4 py-2 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white rounded-lg text-sm font-medium hover:from-[var(--brand-secondary)] hover:to-[var(--brand-accent)] transition-all"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedCoupon && (
                    <div className="mt-2 flex items-center justify-between bg-green-900/20 border border-green-500/30 rounded-lg p-2">
                      <span className="text-green-400 text-sm">
                        {appliedCoupon.code} - {appliedCoupon.description}
                      </span>
                      <button
                        onClick={removeCoupon}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Order Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>You Save</span>
                      <span>-${savings.toFixed(2)}</span>
                    </div>
                  )}
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-400">
                      <span>Coupon Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-400">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-gray-700 pt-3">
                    <span>Total</span>
                    <span className="text-[var(--brand-primary)]">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-4 h-4 text-[var(--brand-primary)]" />
                    <span className="text-sm font-medium">Shipping</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {shipping === 0 
                      ? 'Free shipping on orders over $75' 
                      : `Add $${(75 - subtotal).toFixed(2)} more for free shipping`
                    }
                  </p>
                </div>

                {/* Checkout Button */}
                <button className="w-full py-4 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white rounded-lg font-medium hover:from-[var(--brand-secondary)] hover:to-[var(--brand-accent)] transition-all mb-4">
                  Proceed to Checkout
                </button>

                {/* Security Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Shield className="w-4 h-4 text-[var(--brand-primary)]" />
                    <span>Secure 256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4 text-[var(--brand-primary)]" />
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Gift className="w-4 h-4 text-[var(--brand-primary)]" />
                    <span>Free gift wrapping available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;