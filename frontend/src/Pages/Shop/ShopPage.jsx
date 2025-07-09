import React, { useState, useEffect } from 'react';
import { Heart, Star, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams,useNavigate } from 'react-router-dom';

const ShopPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Kitchen');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [discountFilter, setDiscountFilter] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12); // You can make this configurable

  // Normalize category when params change
  useEffect(() => {
    const validCategories = [
      'Kitchen',
      'Health',
      'Fashion',
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
      
    if (newCategory !== selectedCategory) {
      setSelectedCategory(newCategory);
      // Reset filters when category changes
      setSelectedSubCategory('');
      setSelectedBrands([]);
      setPriceRange([0, 1000]);
      setDiscountFilter('');
      setCurrentPage(1); // Reset to first page
    }
  }, [category, selectedCategory]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubCategory, selectedBrands, priceRange, discountFilter]);

  const categories = {
    Kitchen: ['Cookware', 'Appliances', 'Utensils', 'Storage', 'Dinnerware'],
    Health: ['Supplements', 'Fitness Equipment', 'Personal Care', 'Medical Devices'],
    Fashion: ['Clothing', 'Accessories', 'Shoes', 'Bags'],
    Beauty: ['Skincare', 'Makeup', 'Haircare', 'Fragrances'],
    Electronics: ['Smartphones', 'Laptops', 'Audio', 'Gaming'],
    Fitness: ['Equipment', 'Apparel', 'Accessories', 'Supplements'],
    Spiritual: ['Books', 'Meditation', 'Crystals', 'Incense'],
    Kids: ['Toys', 'Clothing', 'Books', 'Education'],
    Pets: ['Food', 'Toys', 'Accessories', 'Health'],
    Stationery: ['Notebooks', 'Pens', 'Art Supplies', 'Office'],
  };

  const brands = {
    Kitchen: ['KitchenAid', 'Cuisinart', 'Instant Pot', 'Ninja', 'Breville'],
    Health: ['Nature\'s Way', 'Optimum Nutrition', 'Fitbit', 'Omron'],
    Fashion: ['Nike', 'Adidas', 'Levi\'s', 'Calvin Klein', 'Tommy Hilfiger'],
    Beauty: ['L\'Oreal', 'Maybelline', 'Clinique', 'MAC', 'Revlon'],
    Electronics: ['Apple', 'Samsung', 'Sony', 'LG', 'HP'],
    Fitness: ['Under Armour', 'Reebok', 'Puma', 'Adidas', 'Nike'],
    Spiritual: ['Hay House', 'Llewellyn', 'Sounds True', 'Chopra'],
    Kids: ['LEGO', 'Fisher-Price', 'Mattel', 'Hasbro', 'Melissa & Doug'],
    Pets: ['Hill\'s', 'Royal Canin', 'Purina', 'Blue Buffalo', 'KONG'],
    Stationery: ['Moleskine', 'Pilot', 'Staedtler', 'Faber-Castell', 'BIC'],
  };

  const sampleProducts = [
    // Kitchen
    { id: 1, name: 'Premium Non-Stick Pan', category: 'Kitchen', subCategory: 'Cookware', brand: 'KitchenAid', price: 89.99, rating: 4.5, image: '/api/placeholder/200/200', discount: 20 },
    { id: 2, name: 'Instant Pot Duo', category: 'Kitchen', subCategory: 'Appliances', brand: 'Instant Pot', price: 149.99, rating: 4.8, image: '/api/placeholder/200/200', discount: 15 },
    { id: 3, name: 'Ceramic Dinnerware Set', category: 'Kitchen', subCategory: 'Dinnerware', brand: 'Cuisinart', price: 79.99, rating: 4.3, image: '/api/placeholder/200/200', discount: 25 },
    { id: 4, name: 'Stainless Steel Utensils', category: 'Kitchen', subCategory: 'Utensils', brand: 'KitchenAid', price: 39.99, rating: 4.4, image: '/api/placeholder/200/200', discount: 18 },
    { id: 5, name: 'Glass Storage Containers', category: 'Kitchen', subCategory: 'Storage', brand: 'Cuisinart', price: 59.99, rating: 4.2, image: '/api/placeholder/200/200', discount: 22 },
    { id: 6, name: 'Electric Kettle', category: 'Kitchen', subCategory: 'Appliances', brand: 'Breville', price: 129.99, rating: 4.6, image: '/api/placeholder/200/200', discount: 12 },
    { id: 7, name: 'Cast Iron Skillet', category: 'Kitchen', subCategory: 'Cookware', brand: 'Ninja', price: 79.99, rating: 4.7, image: '/api/placeholder/200/200', discount: 25 },
    { id: 8, name: 'Silicone Baking Mat', category: 'Kitchen', subCategory: 'Utensils', brand: 'KitchenAid', price: 24.99, rating: 4.3, image: '/api/placeholder/200/200', discount: 30 },
    { id: 9, name: 'Ceramic Plates Set', category: 'Kitchen', subCategory: 'Dinnerware', brand: 'Cuisinart', price: 89.99, rating: 4.5, image: '/api/placeholder/200/200', discount: 20 },
    { id: 10, name: 'Vacuum Storage Bags', category: 'Kitchen', subCategory: 'Storage', brand: 'Instant Pot', price: 29.99, rating: 4.1, image: '/api/placeholder/200/200', discount: 35 },
    { id: 56, name: 'Chef\'s Knife Set', category: 'Kitchen', subCategory: 'Utensils', brand: 'KitchenAid', price: 199.99, rating: 4.8, image: '/api/placeholder/200/200', discount: 15 },
    { id: 57, name: 'Stand Mixer', category: 'Kitchen', subCategory: 'Appliances', brand: 'KitchenAid', price: 349.99, rating: 4.9, image: '/api/placeholder/200/200', discount: 10 },
    { id: 58, name: 'Bamboo Cutting Board', category: 'Kitchen', subCategory: 'Utensils', brand: 'Cuisinart', price: 34.99, rating: 4.4, image: '/api/placeholder/200/200', discount: 20 },
    { id: 59, name: 'Food Processor', category: 'Kitchen', subCategory: 'Appliances', brand: 'Ninja', price: 179.99, rating: 4.6, image: '/api/placeholder/200/200', discount: 18 },
    { id: 60, name: 'Spice Rack Set', category: 'Kitchen', subCategory: 'Storage', brand: 'Breville', price: 45.99, rating: 4.2, image: '/api/placeholder/200/200', discount: 25 },
    { id: 61, name: 'Non-Stick Cookware Set', category: 'Kitchen', subCategory: 'Cookware', brand: 'KitchenAid', price: 299.99, rating: 4.7, image: '/api/placeholder/200/200', discount: 30 },
    { id: 62, name: 'Coffee Maker', category: 'Kitchen', subCategory: 'Appliances', brand: 'Breville', price: 89.99, rating: 4.5, image: '/api/placeholder/200/200', discount: 12 },
    { id: 63, name: 'Measuring Cup Set', category: 'Kitchen', subCategory: 'Utensils', brand: 'Cuisinart', price: 19.99, rating: 4.3, image: '/api/placeholder/200/200', discount: 15 },
    { id: 64, name: 'Wine Glasses Set', category: 'Kitchen', subCategory: 'Dinnerware', brand: 'Ninja', price: 49.99, rating: 4.4, image: '/api/placeholder/200/200', discount: 22 },
    { id: 65, name: 'Pantry Organization', category: 'Kitchen', subCategory: 'Storage', brand: 'Instant Pot', price: 69.99, rating: 4.1, image: '/api/placeholder/200/200', discount: 28 },
    { id: 66, name: 'Blender Pro', category: 'Kitchen', subCategory: 'Appliances', brand: 'Ninja', price: 249.99, rating: 4.8, image: '/api/placeholder/200/200', discount: 20 },
    { id: 67, name: 'Stainless Steel Pots', category: 'Kitchen', subCategory: 'Cookware', brand: 'KitchenAid', price: 159.99, rating: 4.6, image: '/api/placeholder/200/200', discount: 25 },
    { id: 68, name: 'Kitchen Scale', category: 'Kitchen', subCategory: 'Utensils', brand: 'Breville', price: 39.99, rating: 4.5, image: '/api/placeholder/200/200', discount: 18 },
    { id: 69, name: 'Dinner Plates Set', category: 'Kitchen', subCategory: 'Dinnerware', brand: 'Cuisinart', price: 79.99, rating: 4.3, image: '/api/placeholder/200/200', discount: 15 },
    { id: 70, name: 'Refrigerator Organizer', category: 'Kitchen', subCategory: 'Storage', brand: 'Instant Pot', price: 35.99, rating: 4.2, image: '/api/placeholder/200/200', discount: 30 },
    { id: 71, name: 'Toaster Oven', category: 'Kitchen', subCategory: 'Appliances', brand: 'Breville', price: 199.99, rating: 4.7, image: '/api/placeholder/200/200', discount: 12 },
    { id: 72, name: 'Wok Pan', category: 'Kitchen', subCategory: 'Cookware', brand: 'Ninja', price: 89.99, rating: 4.4, image: '/api/placeholder/200/200', discount: 20 },
    { id: 73, name: 'Serving Utensils', category: 'Kitchen', subCategory: 'Utensils', brand: 'KitchenAid', price: 29.99, rating: 4.3, image: '/api/placeholder/200/200', discount: 25 },
    { id: 74, name: 'Soup Bowls Set', category: 'Kitchen', subCategory: 'Dinnerware', brand: 'Cuisinart', price: 54.99, rating: 4.5, image: '/api/placeholder/200/200', discount: 18 },
    { id: 75, name: 'Drawer Organizer', category: 'Kitchen', subCategory: 'Storage', brand: 'Instant Pot', price: 24.99, rating: 4.1, image: '/api/placeholder/200/200', discount: 35 },
    // Health
    { id: 11, name: 'Multivitamin Tablets', category: 'Health', subCategory: 'Supplements', brand: "Nature's Way", price: 19.99, rating: 4.4, image: '/api/placeholder/200/200', discount: 10 },
    { id: 12, name: 'Treadmill Pro', category: 'Health', subCategory: 'Fitness Equipment', brand: 'Fitbit', price: 499.99, rating: 4.7, image: '/api/placeholder/200/200', discount: 15 },
    { id: 13, name: 'Electric Toothbrush', category: 'Health', subCategory: 'Personal Care', brand: 'Omron', price: 59.99, rating: 4.5, image: '/api/placeholder/200/200', discount: 20 },
    { id: 14, name: 'Blood Pressure Monitor', category: 'Health', subCategory: 'Medical Devices', brand: 'Omron', price: 79.99, rating: 4.6, image: '/api/placeholder/200/200', discount: 12 },
    { id: 15, name: 'Protein Powder', category: 'Health', subCategory: 'Supplements', brand: 'Optimum Nutrition', price: 39.99, rating: 4.8, image: '/api/placeholder/200/200', discount: 18 },

    // Fashion
    { id: 16, name: 'Denim Jacket', category: 'Fashion', subCategory: 'Clothing', brand: "Levi's", price: 89.99, rating: 4.5, image: '/api/placeholder/200/200', discount: 20 },
    { id: 17, name: 'Leather Watch', category: 'Fashion', subCategory: 'Accessories', brand: 'Tommy Hilfiger', price: 149.99, rating: 4.6, image: '/api/placeholder/200/200', discount: 15 },
    { id: 18, name: 'Running Shoes', category: 'Fashion', subCategory: 'Shoes', brand: 'Nike', price: 129.99, rating: 4.7, image: '/api/placeholder/200/200', discount: 25 },
    { id: 19, name: 'Canvas Tote Bag', category: 'Fashion', subCategory: 'Bags', brand: 'Calvin Klein', price: 69.99, rating: 4.3, image: '/api/placeholder/200/200', discount: 10 },
    { id: 20, name: 'Sneakers', category: 'Fashion', subCategory: 'Shoes', brand: 'Adidas', price: 99.99, rating: 4.4, image: '/api/placeholder/200/200', discount: 18 },

    // Beauty
    { id: 21, name: 'Moisturizing Cream', category: 'Beauty', subCategory: 'Skincare', brand: "L'Oreal", price: 24.99, rating: 4.5, image: '/api/placeholder/200/200', discount: 15 },
    { id: 22, name: 'Lipstick Set', category: 'Beauty', subCategory: 'Makeup', brand: 'Maybelline', price: 19.99, rating: 4.3, image: '/api/placeholder/200/200', discount: 20 },
    { id: 23, name: 'Shampoo & Conditioner', category: 'Beauty', subCategory: 'Haircare', brand: 'Revlon', price: 29.99, rating: 4.4, image: '/api/placeholder/200/200', discount: 10 },
    { id: 24, name: 'Perfume', category: 'Beauty', subCategory: 'Fragrances', brand: 'MAC', price: 59.99, rating: 4.6, image: '/api/placeholder/200/200', discount: 12 },
    { id: 25, name: 'Facial Cleanser', category: 'Beauty', subCategory: 'Skincare', brand: 'Clinique', price: 34.99, rating: 4.5, image: '/api/placeholder/200/200', discount: 15 },

    // Electronics
    { id: 26, name: 'Smartphone 13', category: 'Electronics', subCategory: 'Smartphones', brand: 'Apple', price: 799.99, rating: 4.8, image: '/api/placeholder/200/200', discount: 10 },
    { id: 27, name: 'Ultrabook Laptop', category: 'Electronics', subCategory: 'Laptops', brand: 'HP', price: 999.99, rating: 4.7, image: '/api/placeholder/200/200', discount: 15 },
    { id: 28, name: 'Wireless Earbuds', category: 'Electronics', subCategory: 'Audio', brand: 'Sony', price: 149.99, rating: 4.6, image: '/api/placeholder/200/200', discount: 20 },
    { id: 29, name: 'Gaming Console', category: 'Electronics', subCategory: 'Gaming', brand: 'Sony', price: 499.99, rating: 4.9, image: '/api/placeholder/200/200', discount: 12 },
    { id: 30, name: 'Smart TV', category: 'Electronics', subCategory: 'Audio', brand: 'LG', price: 599.99, rating: 4.5, image: '/api/placeholder/200/200', discount: 18 },

    // Fitness
    { id: 31, name: 'Yoga Mat', category: 'Fitness', subCategory: 'Equipment', brand: 'Under Armour', price: 39.99, rating: 4.4, image: '/api/placeholder/200/200', discount: 10 },
    { id: 32, name: 'Running Shorts', category: 'Fitness', subCategory: 'Apparel', brand: 'Nike', price: 29.99, rating: 4.3, image: '/api/placeholder/200/200', discount: 15 },
    { id: 33, name: 'Fitness Tracker', category: 'Fitness', subCategory: 'Accessories', brand: 'Puma', price: 99.99, rating: 4.5, image: '/api/placeholder/200/200', discount: 20 },
    { id: 34, name: 'Whey Protein', category: 'Fitness', subCategory: 'Supplements', brand: 'Adidas', price: 49.99, rating: 4.6, image: '/api/placeholder/200/200', discount: 12 },
    { id: 35, name: 'Dumbb set', category: 'Fitness', subCategory: 'Equipment', brand: 'Reebok', price: 199.99, rating: 4.7, image: '/api/placeholder/200/200', discount: 18 },

    // Spiritual
    { id: 36, name: 'Meditation Guide Book', category: 'Spiritual', subCategory: 'Books', brand: 'Hay House', price: 14.99, rating: 4.3, image: '/api/placeholder/200/200', discount: 10 },
    { id: 37, name: 'Meditation Cushion', category: 'Spiritual', subCategory: 'Meditation', brand: 'Sounds True', price: 39.99, rating: 4.5, image: '/api/placeholder/200/200', discount: 15 },
    { id: 38, name: 'Amethyst Crystal', category: 'Spiritual', subCategory: 'Crystals', brand: 'Llewellyn', price: 24.99, rating: 4.4, image: '/api/placeholder/200/200', discount: 12 },
    { id: 39, name: 'Sandalwood Incense', category: 'Spiritual', subCategory: 'Incense', brand: 'Chopra', price: 9.99, rating: 4.6, image: '/api/placeholder/200/200', discount: 20 },
    { id: 40, name: 'Spiritual Journal', category: 'Spiritual', subCategory: 'Books', brand: 'Hay House', price: 19.99, rating: 4.5, image: '/api/placeholder/200/200', discount: 15 },

    // Kids
    { id: 41, name: 'Building Blocks Set', category: 'Kids', subCategory: 'Toys', brand: 'LEGO', price: 49.99, rating: 4.8, image: '/api/placeholder/200/200', discount: 10 },
    { id: 42, name: 'Kids Hoodie', category: 'Kids', subCategory: 'Clothing', brand: 'Melissa & Doug', price: 29.99, rating: 4.4, image: '/api/placeholder/200/200', discount: 15 },
    { id: 43, name: 'Picture Book', category: 'Kids', subCategory: 'Books', brand: 'Mattel', price: 14.99, rating: 4.5, image: '/api/placeholder/200/200', discount: 12 },
    { id: 44, name: 'Learning Tablet', category: 'Kids', subCategory: 'Education', brand: 'Fisher-Price', price: 59.99, rating: 4.6, image: '/api/placeholder/200/200', discount: 20 },
    { id: 45, name: 'Puzzle Set', category: 'Kids', subCategory: 'Toys', brand: 'Hasbro', price: 19.99, rating: 4.3, image: '/api/placeholder/200/200', discount: 18 },

    // Pets
    { id: 46, name: 'Premium Dog Food', category: 'Pets', subCategory: 'Food', brand: 'Hill\'s', price: 39.99, rating: 4.7, image: '/api/placeholder/200/200', discount: 10 },
    { id: 47, name: 'Chew Toy', category: 'Pets', subCategory: 'Toys', brand: 'KONG', price: 14.99, rating: 4.5, image: '/api/placeholder/200/200', discount: 15 },
    { id: 48, name: 'Pet Collar', category: 'Pets', subCategory: 'Accessories', brand: 'Blue Buffalo', price: 19.99, rating: 4.4, image: '/api/placeholder/200/200', discount: 12 },
    { id: 49, name: 'Pet Health Supplement', category: 'Pets', subCategory: 'Health', brand: 'Purina', price: 24.99, rating: 4.6, image: '/api/placeholder/200/200', discount: 20 },
    { id: 50, name: 'Cat Food', category: 'Pets', subCategory: 'Food', brand: 'Royal Canin', price: 34.99, rating: 4.5, image: '/api/placeholder/200/200', discount: 18 },

    // Stationery
    { id: 51, name: 'Leather Notebook', category: 'Stationery', subCategory: 'Notebooks', brand: 'Moleskine', price: 24.99, rating: 4.6, image: '/api/placeholder/200/200', discount: 10 },
    { id: 52, name: 'Gel Pens Set', category: 'Stationery', subCategory: 'Pens', brand: 'Pilot', price: 14.99, rating: 4.5, image: '/api/placeholder/200/200', discount: 15 },
    { id: 53, name: 'Watercolor Set', category: 'Stationery', subCategory: 'Art Supplies', brand: 'Faber-Castell', price: 29.99, rating: 4.7, image: '/api/placeholder/200/200', discount: 12 },
    { id: 54, name: 'Desk Organizer', category: 'Stationery', subCategory: 'Office', brand: 'BIC', price: 19.99, rating: 4.4, image: '/api/placeholder/200/200', discount: 20 },
    { id: 55, name: 'Sketchbook', category: 'Stationery', subCategory: 'Notebooks', brand: 'Staedtler', price: 12.99, rating: 4.3, image: '/api/placeholder/200/200', discount: 18 },
  ];
 const handleProductClick = (category, productId) => {
    navigate(`/shop/${category.toLowerCase()}/${productId}`);
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const getFilteredProducts = () => {
    let filtered = sampleProducts.filter((product) => product.category === selectedCategory);

    if (selectedSubCategory) {
      filtered = filtered.filter((product) => product.subCategory === selectedSubCategory);
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => selectedBrands.includes(product.brand));
    }

    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (discountFilter) {
      const minDiscount = parseInt(discountFilter);
      filtered = filtered.filter((product) => product.discount >= minDiscount);
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

  const totalPages = getTotalPages();
  const totalProducts = getFilteredProducts().length;
  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = Math.min(currentPage * productsPerPage, totalProducts);

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

              {brands[selectedCategory] && (
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
                        key={product.id}
                        className="group relative bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors"
                        onClick={() => handleProductClick(product.category, product.id)}
                      >
                        <div className="aspect-square bg-gray-800 relative overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.discount > 0 && (
                            <div
                              className="absolute top-2 left-2 text-white px-2 py-1 rounded text-xs font-bold"
                              style={{ backgroundColor: 'var(--brand-accent)' }}
                            >
                              -{product.discount}%
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
                                    i < Math.floor(product.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-400 ml-2">
                              ({product.rating})
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-white">
                                ${product.price}
                              </span>
                              {product.discount > 0 && (
                                <span className="text-sm text-gray-400 line-through">
                                  ${(product.price / (1 - product.discount / 100)).toFixed(2)}
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