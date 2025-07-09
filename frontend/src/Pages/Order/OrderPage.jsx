import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, Search, Filter, ChevronDown, Eye, MapPin, ArrowLeft, ShoppingCart, Phone, MessageCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
const OrdersPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [trackingPopup, setTrackingPopup] = useState(null);

  // Sample orders data
  const orders = [
    {
      id: 'ORD-2024-001',
      date: '2024-12-15',
      status: 'delivered',
      total: 299.99,
      items: [
        { name: 'Wireless Headphones', price: 199.99, quantity: 1, image: '/api/placeholder/60/60' },
        { name: 'Phone Case', price: 29.99, quantity: 1, image: '/api/placeholder/60/60' },
        { name: 'Screen Protector', price: 19.99, quantity: 1, image: '/api/placeholder/60/60' }
      ],
      tracking: 'TRK123456789',
      deliveryAddress: '123 Main St, New York, NY 10001'
    },
    {
      id: 'ORD-2024-002',
      date: '2024-12-20',
      status: 'shipped',
      total: 89.99,
      items: [
        { name: 'Bluetooth Speaker', price: 89.99, quantity: 1, image: '/api/placeholder/60/60' }
      ],
      tracking: 'TRK987654321',
      deliveryAddress: '456 Oak Ave, Los Angeles, CA 90210'
    },
    {
      id: 'ORD-2024-003',
      date: '2024-12-22',
      status: 'processing',
      total: 159.97,
      items: [
        { name: 'Laptop Stand', price: 79.99, quantity: 1, image: '/api/placeholder/60/60' },
        { name: 'Wireless Mouse', price: 79.98, quantity: 1, image: '/api/placeholder/60/60' }
      ],
      tracking: null,
      deliveryAddress: '789 Pine Rd, Chicago, IL 60601'
    },
    {
      id: 'ORD-2024-004',
      date: '2024-12-25',
      status: 'cancelled',
      total: 49.99,
      items: [
        { name: 'USB Cable', price: 24.99, quantity: 2, image: '/api/placeholder/60/60' }
      ],
      tracking: null,
      deliveryAddress: '321 Elm St, Miami, FL 33101'
    }
  ];

  // Support contact number
  const supportPhone = '+91 82480 38528';

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5" style={{ color: 'var(--primary-light-green)' }} />;
      case 'shipped':
        return <Truck className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} />;
      case 'processing':
        return <Clock className="w-5 h-5" style={{ color: 'var(--primary-blue)' }} />;
      case 'cancelled':
        return <Package className="w-5 h-5 text-red-400" />;
      default:
        return <Package className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'var(--primary-light-green)';
      case 'shipped':
        return 'var(--brand-primary)';
      case 'processing':
        return 'var(--primary-blue)';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = selectedFilter === 'all' || order.status === selectedFilter;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const filterOptions = [
    { value: 'all', label: 'All Orders', count: orders.length },
    { value: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
    { value: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
    { value: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length },
    { value: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length }
  ];

  const handleTrackOrder = (order) => {
    setTrackingPopup(order);
  };

  const handleWhatsAppMessage = (orderId) => {
    const message = encodeURIComponent(`Hi, I need help with my order ${orderId}. Could you please provide an update on the tracking status?`);
    window.open(`https://wa.me/${supportPhone.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const handlePhoneCall = () => {
    window.open(`tel:${supportPhone}`, '_self');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">My Orders</h1>
                <p className="text-gray-400 mt-1">Track and manage your orders</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
                style={{ 
                  backgroundColor: 'var(--brand-primary)',
                  color: 'white'
                }}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Continue Shopping</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders by ID or product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 text-white placeholder-gray-400"
                style={{ focusRingColor: 'var(--brand-primary)' }}
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedFilter(option.value)}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedFilter === option.value
                        ? 'border-opacity-100 text-white'
                        : 'border-gray-700 hover:border-gray-600 text-gray-300'
                    }`}
                    style={{
                      borderColor: selectedFilter === option.value ? 'var(--brand-primary)' : undefined,
                      backgroundColor: selectedFilter === option.value ? 'rgba(82, 182, 154, 0.1)' : undefined
                    }}
                  >
                    <div className="text-sm font-medium">{option.label}</div>
                    <div className="text-xs text-gray-400">({option.count})</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No orders found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors">
                {/* Order Header */}
                <div className="px-6 py-4 border-b border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <span className="font-medium text-white">{order.id}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide"
                          style={{
                            backgroundColor: `${getStatusColor(order.status)}20`,
                            color: getStatusColor(order.status)
                          }}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-white">${order.total.toFixed(2)}</div>
                      <div className="text-sm text-gray-400">{new Date(order.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4">
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-white">{item.name}</div>
                          <div className="text-sm text-gray-400">Quantity: {item.quantity}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-white">${item.price.toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Details */}
                <div className="px-6 py-4 bg-gray-800 bg-opacity-50">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">{order.deliveryAddress}</span>
                  </div>
                </div>

                {/* Order Actions */}
                <div className="px-6 py-4 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">View Details</span>
                      </button>
                      {order.status === 'delivered' && (
                        <button 
                          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          style={{ 
                            backgroundColor: 'var(--brand-primary)',
                            color: 'white'
                          }}
                        >
                          Reorder
                        </button>
                      )}
                    </div>
                    {order.tracking && (
                      <button 
                        onClick={() => handleTrackOrder(order)}
                        className="px-4 py-2 rounded-lg border transition-colors text-sm"
                        style={{ 
                          borderColor: 'var(--brand-secondary)',
                          color: 'var(--brand-secondary)'
                        }}
                      >
                        Track Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Tracking Popup */}
      {trackingPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Track Order</h3>
              <button
                onClick={() => setTrackingPopup(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-300 mb-2">Order ID: <span className="font-medium">{trackingPopup.id}</span></p>
              <p className="text-gray-300 mb-4">Tracking: <span className="font-medium">{trackingPopup.tracking}</span></p>
              <p className="text-gray-400 text-sm">Need help with your order? Contact our support team:</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handlePhoneCall()}
                className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Phone className="w-5 h-5 text-green-400" />
                <span className="text-white">Call Support</span>
                <span className="text-gray-400 text-sm">{supportPhone}</span>
              </button>

              <button
                onClick={() => handleWhatsAppMessage(trackingPopup.id)}
                className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span className="text-white">Message on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;