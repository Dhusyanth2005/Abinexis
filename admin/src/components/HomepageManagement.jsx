import React, { useState } from 'react';
import { Search, Trash2, Upload, X, Edit2, Plus, Save } from 'lucide-react';

const HomepageManagement = () => {
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
    {
      _id: '3',
      name: 'Smart Fitness Watch',
      category: 'Electronics',
      subCategory: 'Wearables',
      brand: 'FitTech',
      description: 'Advanced fitness tracking with heart rate monitor',
      filters: [
        {
          name: 'color',
          values: ['Black', 'Silver'],
          priceAdjustments: [
            { value: 'Black', price: 15999, discountPrice: 12999 },
            { value: 'Silver', price: 15999, discountPrice: 12999 },
          ],
        },
      ],
      features: ['Heart Rate Monitor', 'GPS', 'Water Resistant'],
      images: ['https://via.placeholder.com/300x300/168AAD/white?text=Smart+Watch'],
      countInStock: 30,
      rating: 4.7,
      numReviews: 156,
      shippingCost: 0,
      createdAt: new Date().toISOString(),
    },
    {
      _id: '4',
      name: 'Gaming Mechanical Keyboard',
      category: 'Electronics',
      subCategory: 'Gaming',
      brand: 'GamePro',
      description: 'RGB mechanical keyboard for professional gaming',
      filters: [
        {
          name: 'switch',
          values: ['Blue', 'Red', 'Brown'],
          priceAdjustments: [
            { value: 'Blue', price: 8999, discountPrice: 7499 },
            { value: 'Red', price: 8999, discountPrice: 7499 },
            { value: 'Brown', price: 8999, discountPrice: 7499 },
          ],
        },
      ],
      features: ['RGB Backlight', 'Mechanical Switches', 'Anti-ghosting'],
      images: ['https://via.placeholder.com/300x300/B2435A/white?text=Keyboard'],
      countInStock: 25,
      rating: 4.6,
      numReviews: 92,
      shippingCost: 99,
      createdAt: new Date().toISOString(),
    },
  ];

  const initialBanners = [
    {
      id: '1',
      title: 'Welcome to Abinexis',
      image: 'https://via.placeholder.com/1200x400/34A0A4/white?text=Main+Banner',
      searchProduct: null,
    },
    {
      id: '2',
      title: 'Summer Sale',
      image: 'https://via.placeholder.com/1200x400/FF6B6B/white?text=Summer+Sale',
      searchProduct: mockProducts[0],
    },
  ];

  const mockHomepage = {
    banners: initialBanners,
    featuredProducts: mockProducts.slice(0, 2),
    todayOffers: mockProducts.slice(2, 4),
  };

  const [homepage, setHomepage] = useState(mockHomepage);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [offersSearchQuery, setOffersSearchQuery] = useState('');
  const [offersSearchResults, setOffersSearchResults] = useState([]);
  
  // Banner-specific states
  const [bannerSearchQueries, setBannerSearchQueries] = useState({});
  const [bannerSearchResults, setBannerSearchResults] = useState({});
  const [editingBanner, setEditingBanner] = useState(null);
  const [bannerForm, setBannerForm] = useState({ title: '', image: '' });
  const [showAddBannerModal, setShowAddBannerModal] = useState(false);
  const [newBannerForm, setNewBannerForm] = useState({ title: '', image: '' });
  const [newBannerSearch, setNewBannerSearch] = useState('');
  const [newBannerSearchResults, setNewBannerSearchResults] = useState([]);
  const [newBannerProduct, setNewBannerProduct] = useState(null);

  const searchProducts = (query, setter) => {
    if (query.trim()) {
      const results = mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase())
      );
      setter(results);
    } else {
      setter([]);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBannerForm(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewBannerImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewBannerForm(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Banner Management Functions
  const openAddBannerModal = () => {
    setShowAddBannerModal(true);
    setNewBannerForm({ title: '', image: '' });
    setNewBannerSearch('');
    setNewBannerSearchResults([]);
    setNewBannerProduct(null);
  };

  const closeAddBannerModal = () => {
    setShowAddBannerModal(false);
    setNewBannerForm({ title: '', image: '' });
    setNewBannerSearch('');
    setNewBannerSearchResults([]);
    setNewBannerProduct(null);
  };

  const addNewBanner = () => {
    if (!newBannerForm.title.trim()) {
      alert('Please enter a banner title');
      return;
    }
    
    const newBanner = {
      id: Date.now().toString(),
      title: newBannerForm.title,
      image: newBannerForm.image || 'https://via.placeholder.com/1200x400/666666/white?text=New+Banner',
      searchProduct: newBannerProduct,
    };
    
    setHomepage(prev => ({
      ...prev,
      banners: [...prev.banners, newBanner]
    }));
    
    closeAddBannerModal();
  };

  const handleNewBannerSearch = (query) => {
    setNewBannerSearch(query);
    searchProducts(query, setNewBannerSearchResults);
  };

  const addProductToNewBanner = (product) => {
    setNewBannerProduct(product);
    setNewBannerSearch('');
    setNewBannerSearchResults([]);
  };

  const removeProductFromNewBanner = () => {
    setNewBannerProduct(null);
  };

  const deleteBanner = (bannerId) => {
    setHomepage(prev => ({
      ...prev,
      banners: prev.banners.filter(banner => banner.id !== bannerId)
    }));
    // Clean up related states
    setBannerSearchQueries(prev => {
      const newQueries = { ...prev };
      delete newQueries[bannerId];
      return newQueries;
    });
    setBannerSearchResults(prev => {
      const newResults = { ...prev };
      delete newResults[bannerId];
      return newResults;
    });
  };

  const startEditingBanner = (banner) => {
    setEditingBanner(banner.id);
    setBannerForm({
      title: banner.title,
      image: banner.image
    });
  };

  const saveEditingBanner = () => {
    setHomepage(prev => ({
      ...prev,
      banners: prev.banners.map(banner =>
        banner.id === editingBanner
          ? { ...banner, title: bannerForm.title, image: bannerForm.image }
          : banner
      )
    }));
    setEditingBanner(null);
    setBannerForm({ title: '', image: '' });
  };

  const cancelEditingBanner = () => {
    setEditingBanner(null);
    setBannerForm({ title: '', image: '' });
  };

  const handleBannerSearch = (bannerId, query) => {
    setBannerSearchQueries(prev => ({ ...prev, [bannerId]: query }));
    searchProducts(query, (results) => {
      setBannerSearchResults(prev => ({ ...prev, [bannerId]: results }));
    });
  };

  const addBannerSearchProduct = (bannerId, product) => {
    setHomepage(prev => ({
      ...prev,
      banners: prev.banners.map(banner =>
        banner.id === bannerId
          ? { ...banner, searchProduct: product }
          : banner
      )
    }));
    setBannerSearchQueries(prev => ({ ...prev, [bannerId]: '' }));
    setBannerSearchResults(prev => ({ ...prev, [bannerId]: [] }));
  };

  const removeBannerSearchProduct = (bannerId) => {
    setHomepage(prev => ({
      ...prev,
      banners: prev.banners.map(banner =>
        banner.id === bannerId
          ? { ...banner, searchProduct: null }
          : banner
      )
    }));
  };

  // Featured Products Functions
  const addToFeatured = (product) => {
    if (!homepage.featuredProducts.find((p) => p._id === product._id)) {
      setHomepage((prev) => ({
        ...prev,
        featuredProducts: [...prev.featuredProducts, product],
      }));
    }
  };

  const removeFromFeatured = (productId) => {
    setHomepage((prev) => ({
      ...prev,
      featuredProducts: prev.featuredProducts.filter((p) => p._id !== productId),
    }));
  };

  // Today's Offers Functions
  const addToOffers = (product) => {
    if (!homepage.todayOffers.find((p) => p._id === product._id)) {
      setHomepage((prev) => ({
        ...prev,
        todayOffers: [...prev.todayOffers, product],
      }));
    }
  };

  const removeFromOffers = (productId) => {
    setHomepage((prev) => ({
      ...prev,
      todayOffers: prev.todayOffers.filter((p) => p._id !== productId),
    }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Homepage Management</h1>

      {/* Banner Management */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Main Banners</h2>
          <button
            onClick={openAddBannerModal}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Banner</span>
          </button>
        </div>

        <div className="space-y-6">
          {homepage.banners.map((banner, index) => (
            <div key={banner.id} className="bg-gray-900 rounded-lg border border-gray-600 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">Banner {index + 1}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => startEditingBanner(banner)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  {homepage.banners.length > 1 && (
                    <button
                      onClick={() => deleteBanner(banner.id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {editingBanner === banner.id ? (
                /* Edit Mode */
                <div className="space-y-4 mb-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Banner Title</label>
                    <input
                      type="text"
                      value={bannerForm.title}
                      onChange={(e) => setBannerForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Banner Image</label>
                    <div className="flex items-center space-x-4">
                      <label className="flex-1 cursor-pointer">
                        <div className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
                          <Upload className="h-5 w-5" />
                          <span>Upload Banner Image</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {bannerForm.image && (
                      <div className="mt-2">
                        <img src={bannerForm.image} alt="Banner preview" className="w-32 h-20 object-cover rounded-lg" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={saveEditingBanner}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={cancelEditingBanner}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div className="mb-4">
                  <p className="text-white font-medium mb-2">{banner.title}</p>
                </div>
              )}

              {/* Featured Product on Banner */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Featured Product on Banner</label>
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search product to feature on banner..."
                      value={bannerSearchQueries[banner.id] || ''}
                      onChange={(e) => handleBannerSearch(banner.id, e.target.value)}
                      className="w-full pl-10 p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Banner Search Results */}
                {bannerSearchResults[banner.id] && bannerSearchResults[banner.id].length > 0 && (
                  <div className="mt-2 bg-gray-800 rounded-lg border border-gray-600 max-h-40 overflow-y-auto">
                    {bannerSearchResults[banner.id].map((product) => (
                      <div key={product._id} className="flex items-center justify-between p-3 border-b border-gray-700 last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <img src={product.images[0]} alt={product.name} className="w-8 h-8 rounded object-cover" />
                          <div>
                            <p className="text-white text-sm font-medium">{product.name}</p>
                            <p className="text-gray-400 text-xs">{product.category}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => addBannerSearchProduct(banner.id, product)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          {banner.searchProduct ? 'Replace' : 'Add'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Current Banner Product */}
                {banner.searchProduct && (
                  <div className="mt-2 bg-gray-800 rounded-lg border border-gray-600 p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={banner.searchProduct.images[0]} alt={banner.searchProduct.name} className="w-10 h-10 rounded object-cover" />
                        <div>
                          <p className="text-white font-medium">{banner.searchProduct.name}</p>
                          <p className="text-gray-400 text-sm">{banner.searchProduct.category}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeBannerSearchProduct(banner.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Banner Preview */}
              <div className="mt-6">
                <h4 className="text-md font-medium text-white mb-2">Current Settings</h4>
                <div className="bg-gray-800 rounded-lg p-3 border border-gray-600">
                  <p className="text-white"><span className="text-gray-400">Title:</span> {banner.title}</p>
                  {banner.searchProduct && (
                    <p className="text-white mt-1">
                      <span className="text-gray-400">Featured Product:</span> {banner.searchProduct.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Banner Modal */}
        {showAddBannerModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Add New Banner</h3>
                <button
                  onClick={closeAddBannerModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Banner Title *</label>
                  <input
                    type="text"
                    value={newBannerForm.title}
                    onChange={(e) => setNewBannerForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter banner title"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Banner Image</label>
                  <div className="flex items-center space-x-4">
                    <label className="flex-1 cursor-pointer">
                      <div className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
                        <Upload className="h-5 w-5" />
                        <span>Upload Banner Image</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleNewBannerImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {newBannerForm.image && (
                    <div className="mt-2">
                      <img src={newBannerForm.image} alt="New banner preview" className="w-32 h-20 object-cover rounded-lg" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Featured Product (Optional)</label>
                  <div className="flex space-x-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search product to feature on banner..."
                        value={newBannerSearch}
                        onChange={(e) => handleNewBannerSearch(e.target.value)}
                        className="w-full pl-10 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* New Banner Search Results */}
                  {newBannerSearchResults.length > 0 && (
                    <div className="mt-2 bg-gray-900 rounded-lg border border-gray-600 max-h-40 overflow-y-auto">
                      {newBannerSearchResults.map((product) => (
                        <div key={product._id} className="flex items-center justify-between p-3 border-b border-gray-700 last:border-b-0">
                          <div className="flex items-center space-x-3">
                            <img src={product.images[0]} alt={product.name} className="w-8 h-8 rounded object-cover" />
                            <div>
                              <p className="text-white text-sm font-medium">{product.name}</p>
                              <p className="text-gray-400 text-xs">{product.category}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => addProductToNewBanner(product)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                            Select
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Selected Product for New Banner */}
                  {newBannerProduct && (
                    <div className="mt-2 bg-gray-900 rounded-lg border border-gray-600 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img src={newBannerProduct.images[0]} alt={newBannerProduct.name} className="w-10 h-10 rounded object-cover" />
                          <div>
                            <p className="text-white font-medium">{newBannerProduct.name}</p>
                            <p className="text-gray-400 text-sm">{newBannerProduct.category}</p>
                          </div>
                        </div>
                        <button
                          onClick={removeProductFromNewBanner}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-700">
                  <button
                    onClick={closeAddBannerModal}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addNewBanner}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Add Banner
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Featured Products */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Featured Products</h2>

        {/* Search and Add */}
        <div className="mb-6">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products to add as featured..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  searchProducts(e.target.value, setSearchResults);
                }}
                className="w-full pl-10 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mt-4 bg-gray-900 rounded-lg border border-gray-600 max-h-60 overflow-y-auto">
              {searchResults.map((product) => (
                <div key={product._id} className="flex items-center justify-between p-3 border-b border-gray-700 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <img src={product.images[0]} alt={product.name} className="w-10 h-10 rounded object-cover" />
                    <div>
                      <p className="text-white font-medium">{product.name}</p>
                      <p className="text-gray-400 text-sm">{product.category}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => addToFeatured(product)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Current Featured Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {homepage.featuredProducts.map((product) => (
            <div key={product._id} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <img src={product.images[0]} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-3" />
              <h3 className="text-white font-medium mb-1">{product.name}</h3>
              <p className="text-gray-400 text-sm mb-3">{product.category}</p>
              <button
                onClick={() => removeFromFeatured(product._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Offers */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Today's Offers</h2>

        {/* Search and Add for Offers */}
        <div className="mb-6">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products to add to today's offers..."
                value={offersSearchQuery}
                onChange={(e) => {
                  setOffersSearchQuery(e.target.value);
                  searchProducts(e.target.value, setOffersSearchResults);
                }}
                className="w-full pl-10 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Offers Search Results */}
          {offersSearchResults.length > 0 && (
            <div className="mt-4 bg-gray-900 rounded-lg border border-gray-600 max-h-60 overflow-y-auto">
              {offersSearchResults.map((product) => (
                <div key={product._id} className="flex items-center justify-between p-3 border-b border-gray-700 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <img src={product.images[0]} alt={product.name} className="w-10 h-10 rounded object-cover" />
                    <div>
                      <p className="text-white font-medium">{product.name}</p>
                      <p className="text-gray-400 text-sm">{product.category}</p>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="text-red-400 line-through">₹{product.filters[0]?.priceAdjustments[0]?.price}</span>
                        <span className="text-green-400">₹{product.filters[0]?.priceAdjustments[0]?.discountPrice}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => addToOffers(product)}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Current Today's Offers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {homepage.todayOffers.map((product) => (
            <div key={product._id} className="bg-gray-900 rounded-lg p-4 border border-gray-700 relative">
              <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                OFFER
              </div>
              <img src={product.images[0]} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-3" />
              <h3 className="text-white font-medium mb-1">{product.name}</h3>
              <p className="text-gray-400 text-sm mb-2">{product.category}</p>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-red-400 line-through text-sm">₹{product.filters[0]?.priceAdjustments[0]?.price}</span>
                <span className="text-green-400 font-bold">₹{product.filters[0]?.priceAdjustments[0]?.discountPrice}</span>
              </div>
              <button
                onClick={() => removeFromOffers(product._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomepageManagement;