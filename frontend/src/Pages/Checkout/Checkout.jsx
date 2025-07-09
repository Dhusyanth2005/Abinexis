import React, { useState } from 'react';
import { CreditCard, MapPin, User, ShoppingBag, Lock, Check } from 'lucide-react';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Shipping Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    
    // Payment
    paymentMethod: 'razorpay',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const [orderItems] = useState([
    { id: 1, name: 'Premium Wireless Headphones', price: 4999, quantity: 1, image: '/api/placeholder/80/80' },
    { id: 2, name: 'Smart Watch Series 7', price: 12999, quantity: 1, image: '/api/placeholder/80/80' },
    { id: 3, name: 'Bluetooth Speaker', price: 2499, quantity: 2, image: '/api/placeholder/80/80' }
  ]);

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStepClick = (stepId) => {
    setCurrentStep(stepId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 299;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (formData.paymentMethod === 'razorpay') {
      // Razorpay integration would go here
      alert('Redirecting to Razorpay payment gateway...');
    }
    
    setIsProcessing(false);
    
  };

  const steps = [
    { id: 1, title: 'Information', icon: User },
    { id: 2, title: 'Shipping', icon: MapPin },
    { id: 3, title: 'Payment', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <style jsx>{`
        :root {
          /* Primary Brand Colors from Color Palette */
          --primary-light-green: #D9ED92;
          --primary-green: #B5E48C;
          --primary-sage: #99D98C;
          --primary-teal: #76C893;
          --primary-mint: #52B69A;
          --primary-turquoise: #34A0A4;
          --primary-blue: #168AAD;
          --primary-ocean: #1A759F;
          --primary-navy: #1E6091;
          --primary-deep-blue: #184E77;
          
          /* Brand Color Variants */
          --brand-primary: #52B69A;
          --brand-secondary: #34A0A4;
          --brand-accent: #168AAD;
        }
        
        .brand-primary {
          color: var(--brand-primary);
        }
        
        .bg-brand-primary {
          background-color: var(--brand-primary);
        }
        
        .bg-brand-primary-hover:hover {
          background-color: var(--primary-turquoise);
        }
        
        .border-brand-primary {
          border-color: var(--brand-primary);
        }
        
        .bg-brand-primary-opacity {
          background-color: rgba(82, 182, 154, 0.1);
        }
        
        .focus-brand-primary:focus {
          outline: none;
          ring: 2px solid var(--brand-primary);
          border-color: var(--brand-primary);
        }
        
        .spinner-border {
          border-color: transparent;
          border-top-color: white;
        }
      `}</style>
      
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 brand-primary" />
              <h1 className="text-2xl font-bold">Checkout</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-400">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center space-x-8 mb-8">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div 
                key={step.id} 
                className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleStepClick(step.id)}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-brand-primary border-brand-primary'
                      : isActive
                      ? 'border-brand-primary bg-gray-800'
                      : 'border-gray-600 bg-gray-800'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <Icon className={`h-5 w-5 ${isActive ? 'brand-primary' : 'text-gray-400'}`} />
                  )}
                </div>
                <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-lg p-6 space-y-6">
              
              {/* Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                    <User className="h-5 w-5 brand-primary" />
                    <span>Personal Information</span>
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus-brand-primary"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus-brand-primary"
                        placeholder="Enter last name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus-brand-primary"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus-brand-primary"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-2 bg-brand-primary text-white rounded-md bg-brand-primary-hover transition-colors"
                    >
                      Continue to Shipping
                    </button>
                  </div>
                </div>
              )}

              {/* Shipping Address */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                    <MapPin className="h-5 w-5 brand-primary" />
                    <span>Shipping Address</span>
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Street Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus-brand-primary"
                        placeholder="Enter your address"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus-brand-primary"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus-brand-primary"
                          placeholder="State"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">ZIP Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus-brand-primary"
                          placeholder="ZIP Code"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-2 bg-brand-primary text-white rounded-md bg-brand-primary-hover transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {/* Payment Information */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 brand-primary" />
                    <span>Payment Information</span>
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div 
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                          formData.paymentMethod === 'razorpay' 
                            ? 'border-brand-primary bg-brand-primary-opacity' 
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'razorpay' }))}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full border-2 border-brand-primary flex items-center justify-center">
                            {formData.paymentMethod === 'razorpay' && (
                              <div className="w-2 h-2 rounded-full bg-brand-primary" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-white">Razorpay</h3>
                            <p className="text-sm text-gray-400">Pay securely with Razorpay</p>
                          </div>
                        </div>
                      </div>
                      
                      <div 
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                          formData.paymentMethod === 'card' 
                            ? 'border-brand-primary bg-brand-primary-opacity' 
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full border-2 border-brand-primary flex items-center justify-center">
                            {formData.paymentMethod === 'card' && (
                              <div className="w-2 h-2 rounded-full bg-brand-primary" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-white">Credit/Debit Card</h3>
                            <p className="text-sm text-gray-400">Pay with your card</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {formData.paymentMethod === 'card' && (
                      <div className="space-y-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus-brand-primary"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus-brand-primary"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">CVV</label>
                            <input
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus-brand-primary"
                              placeholder="123"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Cardholder Name</label>
                            <input
                              type="text"
                              name="cardName"
                              value={formData.cardName}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus-brand-primary"
                              placeholder="John Doe"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gray-800 rounded-md flex items-center justify-center">
                      <ShoppingBag className="h-8 w-8 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-white">{item.name}</h3>
                      <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-800 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-white">₹{shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tax</span>
                  <span className="text-white">₹{tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-800 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-white">Total</span>
                    <span className="text-lg font-semibold text-white">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing || currentStep !== 3}
                className="w-full mt-6 py-3 rounded-lg font-medium text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-brand-primary bg-brand-primary-hover"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Place Order'
                )}
              </button>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-400">
                  <Lock className="inline h-3 w-3 mr-1" />
                  Your payment information is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;