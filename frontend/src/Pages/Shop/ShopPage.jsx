import React, { useState, useEffect } from 'react';
import { Heart, Star, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const ShopPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [discountFilter, setDiscountFilter] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  // Filter data from backend
  const [categories, setCategories] = useState({});
  const [brands, setBrands] = useState({});

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  // Backend API base URL
  const API_BASE_URL = 'http://localhost:3000/api';

  // Fetch filters from backend
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products/filters`);
        if (!response.ok) throw new Error('Failed to fetch filters');
        const data = await response.json();
        
        // Organize categories and subcategories
        const categoryMap = {};
        const brandMap = {};
        
        // Process subcategories
        data.subCategories.forEach(item => {
          if (!categoryMap[item.category]) {
            categoryMap[item.category] = [];
          }
          if (!categoryMap[item.category].includes(item.subCategory)) {
            categoryMap[item.category].push(item.subCategory);
          }
        });
        
        // Process brands
        data.brands.forEach(item => {
          if (!brandMap[item.category]) {
            brandMap[item.category] = [];
          }
          if (!brandMap[item.category].includes(item.brand)) {
            brandMap[item.category].push(item.brand);
          }
        });
        
        setCategories(categoryMap);
        setBrands(brandMap);
      } catch (err) {
        console.error('Error fetching filters:', err);
      }
    };

    fetchFilters();
  }, []);

  // Handle category normalization and data fetch
  useEffect(() => {
    const validCategories = [
      'Kitchen',
      'Health',
      'Clothing',
      'Beauty',
      'Electronics',
      'Fitness',
      'Spiritual',
      'Kids',
      'Pets',
      'Stationery',
    ];

    const normalizedCategory = category
      ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
      : 'Kitchen';
    
    const newCategory = validCategories.includes(normalizedCategory) 
      ? normalizedCategory 
      : 'Kitchen';

    // Only update state if category actually changed
    if (selectedCategory !== newCategory) {
      // Reset filters and pagination when category changes
      setSelectedCategory(newCategory);
      setSelectedSubCategory('');
      setSelectedBrands([]);
      setPriceRange([0, 1000]);
      setDiscountFilter('');
      setCurrentPage(1);
      setInitialLoad(true);
    }

    // Fetch products
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        // Prepare headers - include token if available
        const headers = {
          'Content-Type': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(`${API_BASE_URL}/products?category=${newCategory}`, {
          headers,
        });
        
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        
        // Filter products immediately by category to prevent flash
        const filteredData = data.filter(product => 
          product.category.toLowerCase() === newCategory.toLowerCase()
        );

        // Delay state update by 500ms for better UX
        setTimeout(() => {
          setProducts(filteredData);
          setInitialLoad(false);
          setLoading(false);
        }, 500);
      } catch (err) {
        // Delay error state update by 500ms
        setTimeout(() => {
          setError(err.message);
          setInitialLoad(false);
          setLoading(false);
        }, 500);
      }
    };

    fetchProducts();
  }, [category]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubCategory, selectedBrands, priceRange, discountFilter]);

  const handleProductClick = (category, productId) => {
    navigate(`/shop/${category.toLowerCase()}/${productId}`);
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const getFilteredProducts = () => {
    let filtered = [...products];

    if (selectedSubCategory) {
      filtered = filtered.filter((product) => 
        product.subCategory && product.subCategory.toLowerCase() === selectedSubCategory.toLowerCase()
      );
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => 
        product.brand && selectedBrands.includes(product.brand)
      );
    }

    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (discountFilter) {
      const minDiscount = parseInt(discountFilter);
      filtered = filtered.filter((product) => {
        const discount = product.discountPrice
          ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
          : 0;
        return discount >= minDiscount;
      });
    }

    return filtered;
  };

  const getPaginatedProducts = () => {
    const filteredProducts = getFilteredProducts();
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    const filteredProducts = getFilteredProducts();
    return Math.ceil(filteredProducts.length / productsPerPage);
  };

  const getPageNumbers = () => {
    const totalPages = getTotalPages();
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) pageNumbers.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const groupedProducts = () => {
    const paginatedProducts = getPaginatedProducts();
    
    if (selectedSubCategory) {
      return { [selectedSubCategory]: paginatedProducts };
    } else {
      return { [selectedCategory]: paginatedProducts };
    }
  };

  const clearFilters = () => {
    setSelectedSubCategory('');
    setSelectedBrands([]);
    setPriceRange([0, 1000]);
    setDiscountFilter('');
  };

  // Check if any filters are applied
  const hasFiltersApplied = () => {
    return selectedSubCategory !== '' || 
           selectedBrands.length > 0 || 
           priceRange[0] !== 0 || 
           priceRange[1] !== 1000 || 
           discountFilter !== '';
  };

  const totalPages = getTotalPages();
  const totalProducts = getFilteredProducts().length;
  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = Math.min(currentPage * productsPerPage, totalProducts);

  // Show loading state during initial load or when switching categories
  if (loading || initialLoad) {
    return (
      <div className="min-h-screen bg-gray-950 text-white pt-32 pb-16">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-lg">Loading {selectedCategory || 'products'}...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-white pt-32 pb-16">
        <div className="text-center py-10">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-32 pb-16">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div
            className={`${
              sidebarOpen ? 'block' : 'hidden'
            } lg:block fixed lg:static inset-0 z-40 w-80 bg-gray-900 lg:bg-transparent p-6 overflow-y-auto`}
          >
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <button
                onClick={clearFilters}
                className="w-full text-left hover:text-white text-sm transition-colors"
                style={{ color: 'var(--brand-accent)' }}
              >
                Clear all filters
              </button>

              <div>
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: 'var(--brand-primary)' }}
                >
                  {selectedCategory}
                </h3>
                <div className="w-full h-px bg-gray-800 mb-4"></div>
              </div>

              {/* Subcategories */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-300">Subcategories</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedSubCategory('')}
                    className={`w-full text-left py-2 px-3 rounded transition-colors ${
                      selectedSubCategory === ''
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                    style={
                      selectedSubCategory === ''
                        ? { backgroundColor: 'var(--brand-primary)' }
                        : {}
                    }
                  >
                    All {selectedCategory}
                  </button>
                  {categories[selectedCategory]?.map((subCategory) => (
                    <button
                      key={subCategory}
                      onClick={() => setSelectedSubCategory(subCategory)}
                      className={`w-full text-left py-2 px-3 rounded transition-colors ${
                        selectedSubCategory === subCategory
                          ? 'text-white'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }`}
                      style={
                        selectedSubCategory === subCategory
                          ? { backgroundColor: 'var(--brand-secondary)' }
                          : {}
                      }
                    >
                      {subCategory}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              {brands[selectedCategory] && brands[selectedCategory].length > 0 && (
                <div>
                  <h4 className="text-md font-medium mb-4 text-gray-300">Brands</h4>
                  <div className="space-y-2">
                    {brands[selectedCategory].map((brand) => (
                      <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandToggle(brand)}
                          className="w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-2"
                          style={{
                            accentColor: 'var(--brand-primary)',
                            '--tw-ring-color': 'var(--brand-primary)',
                          }}
                        />
                        <span className="text-gray-300 text-sm">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-300">Price Range</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">$</span>
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])
                      }
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                      placeholder="Min"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])
                      }
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>

              {/* Discount Filter */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-300">Discount</h4>
                <div className="space-y-2">
                  {['10', '20', '30', '40', '50'].map((discount) => (
                    <label key={discount} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="discount"
                        value={discount}
                        checked={discountFilter === discount}
                        onChange={(e) => setDiscountFilter(e.target.value)}
                        className="w-4 h-4 bg-gray-800 border-gray-600 focus:ring-2"
                        style={{
                          accentColor: 'var(--brand-primary)',
                          '--tw-ring-color': 'var(--brand-primary)',
                        }}
                      />
                      <span className="text-gray-300 text-sm">{discount}% & above</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">
                  {selectedCategory}
                  {selectedSubCategory && ` - ${selectedSubCategory}`}
                </h1>
                <p className="text-gray-400 mt-1">
                  {totalProducts > 0 && (
                    <>
                      Showing {startProduct}-{endProduct} of {totalProducts} products
                    </>
                  )}
                  {totalProducts === 0 && "No products found"}
                </p>
              </div>
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 rounded hover:opacity-90 transition-all text-white"
                style={{ backgroundColor: 'var(--brand-primary)' }}
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>

            {/* Products Grid */}
            <div className="space-y-12">
              {Object.entries(groupedProducts()).map(([groupName, products]) => (
                <div key={groupName}>
                  {selectedSubCategory && (
                    <>
                      <h2
                        className="text-2xl font-bold mb-6"
                        style={{ color: 'var(--brand-primary)' }}
                      >
                        {groupName}
                      </h2>
                      <div className="w-full h-px bg-gray-800 mb-8"></div>
                    </>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                    {products.map((product) => (
                      <div
                        key={product._id}
                        className="group relative bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors cursor-pointer"
                        onClick={() => handleProductClick(product.category, product._id)}
                      >
                        <div className="aspect-square bg-gray-800 relative overflow-hidden">
                          <img
                            src={product.images?.[0] || '/api/placeholder/200/200'}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => { e.target.src = '/api/placeholder/200/200'; }}
                          />
                          {product.discountPrice && product.discountPrice > 0 && (
                            <div
                              className="absolute top-2 left-2 text-white px-2 py-1 rounded text-xs font-bold"
                              style={{ backgroundColor: 'var(--brand-accent)' }}
                            >
                              -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                            </div>
                          )}
                          <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75">
                            <Heart className="w-4 h-4 text-white" />
                          </button>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-white mb-2 line-clamp-2">
                            {product.name}
                          </h3>
                          <div className="flex items-center mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.rating || 0)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-400 ml-2">
                              ({product.rating || 0})
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-white">
                                ${product.discountPrice && product.discountPrice > 0 ? product.discountPrice : product.price}
                              </span>
                              {product.discountPrice && product.discountPrice > 0 && (
                                <span className="text-sm text-gray-400 line-through">
                                  ${product.price}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* No Products Message */}
            {totalProducts === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">
                  No products found in {selectedCategory}
                  {selectedSubCategory && ` - ${selectedSubCategory}`}
                </div>
                {/* Only show Clear Filters button if filters are applied */}
                {hasFiltersApplied() && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 rounded hover:opacity-90 transition-all text-white"
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-12 gap-4">
                <div className="text-sm text-gray-400">
                  Showing {startProduct}-{endProduct} of {totalProducts} products
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      currentPage === 1
                        ? 'text-gray-500 cursor-not-allowed'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-1">
                    {getPageNumbers().map((pageNum, index) => (
                      <button
                        key={index}
                        onClick={() => typeof pageNum === 'number' && setCurrentPage(pageNum)}
                        disabled={pageNum === '...'}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          pageNum === currentPage
                            ? 'text-white'
                            : pageNum === '...'
                            ? 'text-gray-500 cursor-default'
                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                        }`}
                        style={
                          pageNum === currentPage
                            ? { backgroundColor: 'var(--brand-primary)' }
                            : {}
                        }
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      currentPage === totalPages
                        ? 'text-gray-500 cursor-not-allowed'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    );
  };

export default ShopPage;