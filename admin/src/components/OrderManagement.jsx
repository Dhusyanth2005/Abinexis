import React, { useState, useMemo, useCallback } from 'react';
import { X, ShoppingCart, Package, Truck, CheckCircle, XCircle } from 'lucide-react';

const OrderManagement = () => {
  // Add custom styles for scrollbar
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: #4B5563 #1F2937;
      }
      
      .custom-scrollbar::-webkit-scrollbar {
        height: 6px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-track {
        background: #1F2937;
        border-radius: 3px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #4B5563;
        border-radius: 3px;
        transition: background 0.2s ease;
      }
      
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #6B7280;
      }
      
      .scroll-fade-right {
        background: linear-gradient(to left, #1F2937 0%, transparent 100%);
      }
      
      .scroll-fade-left {
        background: linear-gradient(to right, #1F2937 0%, transparent 100%);
      }
      
      @media (max-width: 640px) {
        .tab-scroll-container {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
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
    {
      _id: '3',
      user: { _id: '3', name: 'Mike Johnson' },
      personalInfo: {
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike@example.com',
      },
      orderItems: [
        {
          product: '3',
          name: 'Smart Watch',
          category: 'Electronics',
          quantity: 1,
          price: 4999,
          originalPrice: 5999,
          image: 'https://via.placeholder.com/100x100/168AAD/white?text=Product',
        },
      ],
      shippingInfo: {
        type: 'Home',
        address: '789 Tech Lane',
        city: 'Bangalore',
        state: 'Karnataka',
        postalCode: '560001',
        phone: '+91 9876543212',
      },
      paymentInfo: {
        method: 'upi',
        status: 'completed',
      },
      priceSummary: {
        subtotal: 4999,
        savings: 1000,
        shippingCost: 0,
        total: 4999,
      },
      orderStatus: 'delivered',
      isPaid: true,
      createdAt: new Date().toISOString(),
    },
  ];

  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [activeTab, setActiveTab] = useState('processing');
  const [tempStatus, setTempStatus] = useState('');
  const [showScrollIndicators, setShowScrollIndicators] = useState(false);
  const tabScrollRef = React.useRef(null);

  // Check if scroll indicators should be shown
  React.useEffect(() => {
    const checkScrollIndicators = () => {
      if (tabScrollRef.current) {
        const { scrollWidth, clientWidth } = tabScrollRef.current;
        setShowScrollIndicators(scrollWidth > clientWidth);
      }
    };

    checkScrollIndicators();
    window.addEventListener('resize', checkScrollIndicators);
    
    return () => {
      window.removeEventListener('resize', checkScrollIndicators);
    };
  }, [orders]);

  const orderStatuses = ['processing', 'shipped', 'out of delivery', 'delivered', 'cancelled'];

  const statusConfig = {
    processing: { 
      icon: Package, 
      color: 'text-yellow-400', 
      bgColor: 'bg-yellow-900',
      label: 'Processing'
    },
    shipped: { 
      icon: Truck, 
      color: 'text-blue-400', 
      bgColor: 'bg-blue-900',
      label: 'Shipped'
    },
    'out of delivery': { 
      icon: Truck, 
      color: 'text-purple-400', 
      bgColor: 'bg-purple-900',
      label: 'Out for Delivery'
    },
    delivered: { 
      icon: CheckCircle, 
      color: 'text-green-400', 
      bgColor: 'bg-green-900',
      label: 'Delivered'
    },
    cancelled: { 
      icon: XCircle, 
      color: 'text-red-400', 
      bgColor: 'bg-red-900',
      label: 'Cancelled'
    }
  };

  // Memoized order filtering for better performance
  const ordersByStatus = useMemo(() => {
    return orderStatuses.reduce((acc, status) => {
      acc[status] = orders.filter(order => order.orderStatus === status);
      return acc;
    }, {});
  }, [orders]);

  const updateOrderStatus = useCallback((orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order._id === orderId
          ? {
              ...order,
              orderStatus: newStatus,
              isDelivered: newStatus === 'delivered',
              deliveredAt: newStatus === 'delivered' ? new Date().toISOString() : order.deliveredAt,
            }
          : order
      )
    );
    
    // Switch to the new status tab
    setActiveTab(newStatus);
    setShowOrderModal(false);
  }, []);

  const openOrderModal = useCallback((order) => {
    setSelectedOrder(order);
    setTempStatus(order.orderStatus);
    setShowOrderModal(true);
  }, []);

  const handleStatusUpdate = () => {
    if (tempStatus && tempStatus !== selectedOrder.orderStatus) {
      updateOrderStatus(selectedOrder._id, tempStatus);
    }
  };

  const currentOrders = ordersByStatus[activeTab] || [];

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">Order Management</h1>

        {/* Status Tabs */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 mb-6">
          <div className="border-b border-gray-700">
            <div className="relative">
              <nav 
                ref={tabScrollRef}
                className="flex overflow-x-auto custom-scrollbar tab-scroll-container pb-2"
              >
                <div className="flex min-w-max px-2 sm:px-0">
                  {orderStatuses.map((status) => {
                    const config = statusConfig[status];
                    const Icon = config.icon;
                    const count = ordersByStatus[status]?.length || 0;
                    const isActive = activeTab === status;
                    
                    return (
                      <button
                        key={status}
                        onClick={() => setActiveTab(status)}
                        className={`flex items-center space-x-2 py-3 px-3 sm:px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-colors flex-shrink-0 mx-1 first:ml-0 last:mr-0 ${
                          isActive
                            ? `border-blue-500 ${config.color} bg-gray-700 rounded-t-lg`
                            : 'border-transparent text-gray-300 hover:text-white hover:border-blue-500 hover:bg-gray-750 rounded-t-lg'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="hidden sm:inline">{config.label}</span>
                        <span className="sm:hidden text-xs">{config.label.split(' ')[0]}</span>
                        <span className={`ml-1 ${config.color} font-semibold text-xs`}>({count})</span>
                      </button>
                    );
                  })}
                </div>
              </nav>
              
              {/* Scroll indicators for mobile */}
              {showScrollIndicators && (
                <>
                  <div className="absolute right-0 top-0 bottom-2 w-8 scroll-fade-right pointer-events-none sm:hidden opacity-80"></div>
                  <div className="absolute left-0 top-0 bottom-2 w-8 scroll-fade-left pointer-events-none sm:hidden opacity-80"></div>
                </>
              )}
              
              {/* Scroll hint text for mobile */}
              {showScrollIndicators && (
                <div className="absolute bottom-0 right-2 text-xs text-gray-500 sm:hidden">
                  Scroll →
                </div>
              )}
            </div>
          </div>

          {/* Orders List */}
          <div className="p-4 sm:p-6">
            {currentOrders.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No {statusConfig[activeTab]?.label.toLowerCase()} orders</p>
              </div>
            ) : (
              <div className="space-y-4">
                {currentOrders.map((order) => (
                  <OrderCard 
                    key={order._id} 
                    order={order} 
                    onViewDetails={openOrderModal}
                    statusConfig={statusConfig[order.orderStatus]}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Order Detail Modal */}
        {showOrderModal && selectedOrder && (
          <OrderModal 
            order={selectedOrder}
            tempStatus={tempStatus}
            setTempStatus={setTempStatus}
            onClose={() => setShowOrderModal(false)}
            onStatusUpdate={handleStatusUpdate}
            orderStatuses={orderStatuses}
            statusConfig={statusConfig}
          />
        )}
      </div>
    </div>
  );
};

// Memoized Order Card Component
const OrderCard = React.memo(({ order, onViewDetails, statusConfig }) => {
  const Icon = statusConfig.icon;
  
  return (
    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
        <div>
          <h3 className="text-white font-semibold text-lg">Order #{order._id}</h3>
          <p className="text-gray-400 text-sm">
            {order.personalInfo.firstName} {order.personalInfo.lastName} • {' '}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center justify-between sm:justify-end space-x-4">
          <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
            <Icon className="h-3 w-3" />
            <span>{statusConfig.label}</span>
          </span>
          <button
            onClick={() => onViewDetails(order)}
            className="text-blue-400 hover:text-blue-300 font-medium text-sm px-3 py-1 rounded border border-blue-400 hover:border-blue-300 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400 text-xs mb-2 font-medium">ITEMS</p>
          <div className="space-y-2">
            {order.orderItems.slice(0, 2).map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0" 
                />
                <div className="min-w-0 flex-1">
                  <p className="text-white text-sm font-medium truncate">{item.name}</p>
                  <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
            {order.orderItems.length > 2 && (
              <p className="text-gray-400 text-xs">+{order.orderItems.length - 2} more items</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 text-xs mb-1 font-medium">PAYMENT</p>
            <p className="text-white text-lg font-semibold">₹{order.priceSummary.total.toLocaleString()}</p>
            <p className={`text-xs font-medium ${order.isPaid ? 'text-green-400' : 'text-red-400'}`}>
              {order.isPaid ? '✓ Paid' : '⏳ Pending'}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1 font-medium">LOCATION</p>
            <p className="text-white text-sm font-medium">{order.shippingInfo.city}</p>
            <p className="text-gray-400 text-xs">{order.shippingInfo.state}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

// Order Modal Component
const OrderModal = ({ order, tempStatus, setTempStatus, onClose, onStatusUpdate, orderStatuses, statusConfig }) => {
  const hasStatusChanged = tempStatus !== order.orderStatus;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Order #{order._id}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Customer Information</h3>
              <div className="space-y-2">
                <p className="text-gray-300">
                  <span className="text-gray-400">Name:</span> {order.personalInfo.firstName} {order.personalInfo.lastName}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Email:</span> {order.personalInfo.email}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Phone:</span> {order.shippingInfo.phone}
                </p>
              </div>
            </div>
            
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Shipping Address</h3>
              <div className="space-y-1">
                <p className="text-gray-300">{order.shippingInfo.address}</p>
                <p className="text-gray-300">{order.shippingInfo.city}, {order.shippingInfo.state}</p>
                <p className="text-gray-300">{order.shippingInfo.postalCode}</p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Type:</span> {order.shippingInfo.type}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg">
                  <img src={item.image} alt={item.name} className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">{item.name}</h4>
                    <p className="text-gray-400 text-sm">{item.category}</p>
                    <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-white font-semibold">₹{item.price.toLocaleString()}</p>
                    <p className="text-gray-400 text-sm line-through">₹{item.originalPrice.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Payment Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal:</span>
                <span>₹{order.priceSummary.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-green-400">
                <span>Savings:</span>
                <span>-₹{order.priceSummary.savings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping:</span>
                <span>₹{order.priceSummary.shippingCost.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-700 pt-2">
                <div className="flex justify-between text-white font-semibold text-lg">
                  <span>Total:</span>
                  <span>₹{order.priceSummary.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="w-full sm:w-auto">
              <label className="block text-gray-300 text-sm font-medium mb-2">Update Order Status</label>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <select
                  value={tempStatus}
                  onChange={(e) => setTempStatus(e.target.value)}
                  className="p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0 flex-1"
                >
                  {orderStatuses.map((status) => (
                    <option key={status} value={status}>
                      {statusConfig[status]?.label || status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
                <button
                  onClick={onStatusUpdate}
                  disabled={!hasStatusChanged}
                  className={`px-6 py-3 rounded-lg font-medium text-sm transition-colors ${
                    hasStatusChanged
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Update Status
                </button>
              </div>
            </div>
            
            <div className="text-left sm:text-right">
              <p className="text-gray-400 text-sm">Order Date</p>
              <p className="text-white font-medium">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;