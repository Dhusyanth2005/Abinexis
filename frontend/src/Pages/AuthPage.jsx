import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Truck, Shield, Headphones, RefreshCcw, Zap, Globe } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Simulated success - in real app, handle actual API response
      console.log('Login successful');
    }, 2000);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Simulated success - in real app, handle actual API response
      console.log('Signup successful');
    }, 2000);
  };

  const benefits = [
    {
      icon: <Truck className="w-5 h-5" />,
      title: "Global Dropshipping"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Lightning Fast Processing"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure & Trusted Platform"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Multi-Currency Support"
    },
    {
      icon: <Headphones className="w-5 h-5" />,
      title: "24/7 Customer Support"
    },
    {
      icon: <RefreshCcw className="w-5 h-5" />,
      title: "Real-time Analytics"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-800/50 shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            
            {/* Left Side - Benefits */}
            <div className="relative p-8 lg:p-12 bg-gradient-to-br from-[#52B69A]/10 to-[#34A0A4]/10 border-r border-gray-800/50">
              <div className="absolute inset-0 bg-gradient-to-br from-[#52B69A]/5 to-[#168AAD]/5 rounded-l-3xl"></div>
              <div className="relative z-10">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#52B69A] to-[#34A0A4] rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">A</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white">Abinexis</h1>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    Revolutionize your 
                    <span className="block bg-gradient-to-r from-[#52B69A] to-[#34A0A4] bg-clip-text text-transparent">
                      e-commerce journey
                    </span>
                  </h2>
                  <p className="text-base text-gray-300 mb-8">
                    Join thousands of entrepreneurs who trust Abinexis for their e-commerce success.
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-800/40 "
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#52B69A] to-[#34A0A4] rounded-lg flex items-center justify-center">
                        {benefit.icon}
                      </div>
                      <span className="text-gray-200 font-medium">{benefit.title}</span>
                    </div>
                  ))}
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-r from-[#52B69A]/20 to-[#34A0A4]/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
                <div className="absolute top-1/4 right-0 w-24 h-24 bg-gradient-to-r from-[#168AAD]/20 to-[#1A759F]/20 rounded-full blur-2xl translate-x-1/2"></div>
              </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="p-8 lg:p-12 flex items-center justify-center bg-gray-800/50">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    <span className="block bg-gradient-to-r from-[#52B69A] to-[#34A0A4] bg-clip-text text-transparent">
                       {isLogin ? 'Welcome Back' : 'Join Abinexis'}
                    </span>
                   
                  </h2>
                  <p className="text-gray-400">
                    {isLogin ? 'Please login to your account' : 'Create your account to get started'}
                  </p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  </div>
                )}

                <div className="space-y-6">
                  {!isLogin && (
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#52B69A] transition-colors duration-300" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#52B69A] focus:ring-2 focus:ring-[#52B69A]/20 transition-all duration-300"
                        required
                      />
                    </div>
                  )}

                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#52B69A] transition-colors duration-300" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#52B69A] focus:ring-2 focus:ring-[#52B69A]/20 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#52B69A] transition-colors duration-300" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="w-full pl-12 pr-12 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#52B69A] focus:ring-2 focus:ring-[#52B69A]/20 transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#52B69A] transition-colors duration-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {!isLogin && (
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#52B69A] transition-colors duration-300" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        className="w-full pl-12 pr-12 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#52B69A] focus:ring-2 focus:ring-[#52B69A]/20 transition-all duration-300"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#52B69A] transition-colors duration-300"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  )}

                  {isLogin && (
                    <div className="text-right">
                      <button
                        type="button"
                        className="text-sm text-[#52B69A] hover:text-[#34A0A4] transition-colors duration-300"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={isLogin ? handleLogin : handleSignup}
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-[#52B69A] to-[#34A0A4] text-white font-semibold rounded-xl hover:from-[#34A0A4] hover:to-[#168AAD] focus:outline-none focus:ring-2 focus:ring-[#52B69A]/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-300"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        {isLogin ? 'Signing In...' : 'Creating Account...'}
                      </div>
                    ) : (
                      isLogin ? 'Sign In' : 'Create Account'
                    )}
                  </button>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-400">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    <button
                      onClick={toggleForm}
                      className="ml-2 text-[#52B69A] hover:text-[#34A0A4] font-semibold transition-colors duration-300"
                    >
                      {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                  </p>
                </div>

                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-gray-900/50 text-gray-400">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300 group">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Google</span>
                    </button>
                    <button className="flex items-center justify-center px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300 group">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Facebook</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}