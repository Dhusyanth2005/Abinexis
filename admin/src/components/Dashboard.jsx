import React from 'react';
import { Users, Package2, ShoppingBag, TrendingUp, Star, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const navigate = useNavigate();
  const mockProducts = [
    {
      _id: '1',
      name: 'Premium Wireless Headphones',
      category: 'Electronics',
      subCategory: 'Audio',
      brand: 'TechBrand',
      description: 'High-quality wireless headphones with noise cancellation',
      filters: [
        {
          name: 'color',
          values: ['Black', 'White', 'Blue'],
          priceAdjustments: [
            { value: 'Black', price: 2999, discountPrice: 2599 },
            { value: 'White', price: 2999, discountPrice: 2599 },
            { value: 'Blue', price: 3199, discountPrice: 2799 },
          ],
        },
      ],
      features: ['Noise Cancellation', 'Bluetooth 5.0', '30hr Battery'],
      images: ['https://via.placeholder.com/300x300/52B69A/white?text=Headphones'],
      countInStock: 50,
      rating: 4.5,
      numReviews: 128,
      shippingCost: 99,
      createdAt: new Date().toISOString(),
    },
    {
      _id: '2',
      name: 'Organic Face Cream',
      category: 'Beauty',
      subCategory: 'Skincare',
      brand: 'NaturalGlow',
      description: 'Organic anti-aging face cream with natural ingredients',
      filters: [
        {
          name: 'size',
          values: ['50ml', '100ml'],
          priceAdjustments: [
            { value: '50ml', price: 899, discountPrice: 749 },
            { value: '100ml', price: 1599, discountPrice: 1299 },
          ],
        },
      ],
      features: ['Organic', 'Anti-aging', 'Suitable for all skin types'],
      images: ['https://via.placeholder.com/300x300/76C893/white?text=Face+Cream'],
      countInStock: 75,
      rating: 4.3,
      numReviews: 89,
      shippingCost: 0,
      createdAt: new Date().toISOString(),
    },
  ];

  const mockOrders = [
    {
      _id: '1',
      user: { _id: '1', name: 'John Doe' },
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      },
      orderItems: [
        {
          product: '1',
          name: 'Premium Wireless Headphones',
          category: 'Electronics',
          quantity: 1,
          price: 2599,
          originalPrice: 2999,
          image: 'https://via.placeholder.com/100x100/52B69A/white?text=Product',
        },
      ],
      shippingInfo: {
        type: 'Home',
        address: '123 Main St',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400001',
        phone: '+91 9876543210',
      },
      paymentInfo: {
        method: 'razorpay',
        status: 'completed',
      },
      priceSummary: {
        subtotal: 2599,
        savings: 400,
        shippingCost: 99,
        total: 2698,
      },
      orderStatus: 'processing',
      isPaid: true,
      createdAt: new Date().toISOString(),
    },
    {
      _id: '2',
      user: { _id: '2', name: 'Jane Smith' },
      personalInfo: {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
      },
      orderItems: [
        {
          product: '2',
          name: 'Organic Face Cream',
          category: 'Beauty',
          quantity: 2,
          price: 1299,
          originalPrice: 1599,
          image: 'https://via.placeholder.com/100x100/76C893/white?text=Product',
        },
      ],
      shippingInfo: {
        type: 'Work',
        address: '456 Business Ave',
        city: 'Delhi',
        state: 'Delhi',
        postalCode: '110001',
        phone: '+91 9876543211',
      },
      paymentInfo: {
        method: 'cod',
        status: 'pending',
      },
      priceSummary: {
        subtotal: 2598,
        savings: 600,
        shippingCost: 0,
        total: 2598,
      },
      orderStatus: 'shipped',
      isPaid: false,
      createdAt: new Date().toISOString(),
    },
  ];

  const stats = {
    totalUsers: 1247,
    totalProducts: mockProducts.length,
    totalOrders: mockOrders.length,
    recentProducts: mockProducts.slice(-3),
  };

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Abinexis Admin
                  </h1>
                  <p className="text-gray-400 text-sm">Dashboard Overview</p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">Welcome back, Abinash</h2>
                <p className="text-gray-400">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
            
            <button onClick={()=>navigate("/product-management")} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg">
              <Plus className="h-5 w-5" />
              Add New Product
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Users</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.totalUsers}</p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-lg">
                <Users className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Products</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.totalProducts}</p>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-lg">
                <Package2 className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Orders</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.totalOrders}</p>
              </div>
              <div className="bg-purple-500/10 p-3 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
                <p className="text-2xl font-bold text-white mt-1">
                  ₹{mockOrders.reduce((sum, order) => sum + order.priceSummary.total, 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-yellow-500/10 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Recent Products */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Recent Products</h3>
              <button onClick={()=>navigate("/product-management")} className="text-blue-400 hover:text-blue-300 text-sm font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {stats.recentProducts.map((product) => (
                <div key={product._id} className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">{product.name}</h4>
                    <p className="text-gray-400 text-sm">{product.category} • {product.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-medium text-sm">Stock: {product.countInStock}</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-gray-400 text-sm">{product.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Recent Orders</h3>
              <button onClick={()=>navigate("/order-management")} className="text-blue-400 hover:text-blue-300 text-sm font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div key={order._id} className="p-4 bg-gray-900 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-white font-medium">{order.personalInfo.firstName} {order.personalInfo.lastName}</h4>
                      <p className="text-gray-400 text-sm">Order #{order._id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">₹{order.priceSummary.total.toLocaleString()}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.orderStatus === 'processing' 
                          ? 'bg-yellow-500/10 text-yellow-400' 
                          : 'bg-green-500/10 text-green-400'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{order.orderItems.length} item(s)</span>
                    <span className="text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;