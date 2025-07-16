import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, ArrowLeft, MapPin, Calendar, CreditCard, Phone, MessageCircle, Download, RefreshCw, Star, ChevronRight, Copy, Check } from 'lucide-react';

const OrderDetailPage = () => {
  const [showTrackingDetails, setShowTrackingDetails] = useState(false);
  const [copiedTracking, setCopiedTracking] = useState(false);

  // Sample order data
  const order = {
    id: 'ORD-2024-002',
    date: '2024-12-20',
    status: 'shipped',
    total: 259.97,
    subtotal: 239.97,
    shipping: 15.00,
    tax: 5.00,
    discount: 0.00,
    items: [
      { 
        id: 1,
        name: 'Wireless Bluetooth Headphones Pro Max', 
        price: 199.99, 
        quantity: 1, 
        image: '/api/placeholder/80/80',
        sku: 'WBH-PRO-001',
        brand: 'TechAudio'
      },
      { 
        id: 2,
        name: 'Premium Phone Case with MagSafe', 
        price: 39.99, 
        quantity: 1, 
        image: '/api/placeholder/80/80',
        sku: 'PPC-MAG-002',
        brand: 'ProtectPro'
      }
    ],
    tracking: 'TRK987654321',
    deliveryAddress: {
      name: 'John Doe',
      street: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'United States'
    },
    billingAddress: {
      name: 'John Doe',
      street: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'United States'
    },
    paymentMethod: {
      type: 'Credit Card',
      last4: '4242',
      brand: 'Visa'
    },
    trackingSteps: [
      { status: 'Order Placed', date: '2024-12-20 10:30 AM', completed: true, description: 'Your order has been confirmed and payment processed.' },
      { status: 'Processing', date: '2024-12-20 02:15 PM', completed: true, description: 'Order is being prepared for shipment.' },
      { status: 'Shipped', date: '2024-12-21 09:45 AM', completed: true, description: 'Package has been dispatched and is on its way.' },
      { status: 'Out for Delivery', date: '2024-12-22 08:00 AM', completed: false, description: 'Package is out for delivery and will arrive today.' },
      { status: 'Delivered', date: 'Expected by 6:00 PM', completed: false, description: 'Package will be delivered to your address.' }
    ],
    estimatedDelivery: '2024-12-22',
    carrier: 'FedEx Express'
  };

  const supportPhone = '+91 82480 38528';

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-6 h-6" style={{ color: 'var(--primary-light-green)' }} />;
      case 'shipped':
        return <Truck className="w-6 h-6" style={{ color: 'var(--brand-primary)' }} />;
      case 'processing':
        return <Clock className="w-6 h-6" style={{ color: 'var(--primary-blue)' }} />;
      case 'cancelled':
        return <Package className="w-6 h-6 text-red-400" />;
      default:
        return <Package className="w-6 h-6 text-gray-400" />;
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

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(order.tracking);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  const handleWhatsAppMessage = () => {
    const message = encodeURIComponent(`Hi, I need help with my order ${order.id}. Could you please provide an update on the tracking status?`);
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
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Orders</span>
            </button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white">Order Details</h1>
              <p className="text-gray-400 mt-1">{order.id}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Status */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <h2 className="text-xl font-semibold text-white">Order Status</h2>
                    <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className="px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wide"
                    style={{
                      backgroundColor: `${getStatusColor(order.status)}20`,
                      color: getStatusColor(order.status)
                    }}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Tracking Information */}
              <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Tracking Number</span>
                  <button
                    onClick={handleCopyTracking}
                    className="flex items-center space-x-1 text-sm hover:text-white transition-colors"
                    style={{ color: 'var(--brand-secondary)' }}
                  >
                    {copiedTracking ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedTracking ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-white text-lg">{order.tracking}</span>
                  <span className="text-sm text-gray-400">via {order.carrier}</span>
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-gray-400">Estimated Delivery: </span>
                  <span className="font-medium text-white">{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Track Order Button */}
              <button
                onClick={() => setShowTrackingDetails(!showTrackingDetails)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border transition-colors"
                style={{ 
                  borderColor: 'var(--brand-secondary)',
                  color: 'var(--brand-secondary)'
                }}
              >
                <Truck className="w-5 h-5" />
                <span>View Detailed Tracking</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${showTrackingDetails ? 'rotate-90' : ''}`} />
              </button>

              {/* Detailed Tracking */}
              {showTrackingDetails && (
                <div className="mt-6 space-y-4">
                  {order.trackingSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`w-4 h-4 rounded-full border-2 mt-1 ${
                        step.completed 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-gray-600'
                      }`}>
                        {step.completed && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${step.completed ? 'text-white' : 'text-gray-400'}`}>
                            {step.status}
                          </h4>
                          <span className="text-sm text-gray-500">{step.date}</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Items */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-800 bg-opacity-50 rounded-lg">
                    <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{item.name}</h3>
                      <p className="text-sm text-gray-400">Brand: {item.brand}</p>
                      <p className="text-sm text-gray-400">SKU: {item.sku}</p>
                      <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">${item.price.toFixed(2)}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button className="text-sm hover:text-white transition-colors" style={{ color: 'var(--brand-secondary)' }}>
                          Write Review
                        </button>
                        <Star className="w-4 h-4" style={{ color: 'var(--brand-secondary)' }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Delivery Address</h2>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="font-medium text-white">{order.deliveryAddress.name}</p>
                  <p className="text-gray-300">{order.deliveryAddress.street}</p>
                  <p className="text-gray-300">
                    {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                  </p>
                  <p className="text-gray-300">{order.deliveryAddress.country}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-white">${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax</span>
                  <span className="text-white">${order.tax.toFixed(2)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Discount</span>
                    <span className="text-green-400">-${order.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-white">Total</span>
                    <span className="font-semibold text-white">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Payment Method</h2>
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-white">{order.paymentMethod.brand} ending in {order.paymentMethod.last4}</p>
                  <p className="text-sm text-gray-400">{order.paymentMethod.type}</p>
                </div>
              </div>
            </div>

            {/* Order Actions */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download Invoice</span>
                </button>
                <button 
                  className="w-full px-4 py-3 rounded-lg text-white font-medium transition-colors"
                  style={{ backgroundColor: 'var(--brand-primary)' }}
                >
                  <RefreshCw className="w-4 h-4 inline mr-2" />
                  Reorder Items
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Need Help?</h2>
              <div className="space-y-3">
                <button
                  onClick={handlePhoneCall}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Phone className="w-4 h-4 text-green-400" />
                  <span>Call Support</span>
                </button>
                <button
                  onClick={handleWhatsAppMessage}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;