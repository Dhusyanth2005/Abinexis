import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Save, X, Star, Upload } from 'lucide-react';

const ProductManagement = () => {
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

  const [products, setProducts] = useState(mockProducts);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    brand: '',
    category: '',
    subCategory: '',
    shippingCost: '',
    countInStock: '',
    features: [''],
            filters: [{ name: '', values: [''], priceAdjustments: [{ value: '', price: '', discountPrice: '' }] }],
    images: [''],
  });

  const categories = [
    'Kitchen', 'Health', 'Fashion', 'Beauty', 'Electronics',
    'Fitness', 'Spiritual', 'Kids', 'Pets', 'Stationery',
  ];

  const handleProductInputChange = (field, value) => {
    setProductForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a local URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);
      const newImages = [...productForm.images];
      newImages[index] = imageUrl;
      handleProductInputChange('images', newImages);
    }
  };

  const addImageSlot = () => {
    setProductForm((prev) => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImageSlot = (index) => {
    const newImages = productForm.images.filter((_, i) => i !== index);
    setProductForm((prev) => ({ ...prev, images: newImages }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...productForm.features];
    newFeatures[index] = value;
    setProductForm((prev) => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setProductForm((prev) => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index) => {
    const newFeatures = productForm.features.filter((_, i) => i !== index);
    setProductForm((prev) => ({ ...prev, features: newFeatures }));
  };

  const handleFilterChange = (filterIndex, field, value) => {
    const newFilters = [...productForm.filters];
    newFilters[filterIndex][field] = value;
    setProductForm((prev) => ({ ...prev, filters: newFilters }));
  };

  const addFilter = () => {
    setProductForm((prev) => ({
      ...prev,
      filters: [...prev.filters, { name: '', values: [''], priceAdjustments: [{ value: '', price: '', discountPrice: '' }] }],
    }));
  };

  const openProductModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({ ...product });
    } else {
      setEditingProduct(null);
      setProductForm({
        name: '',
        description: '',
        brand: '',
        category: '',
        subCategory: '',
        shippingCost: '',
        countInStock: '',
        features: [''],
        filters: [{ name: '', values: [''], priceAdjustments: [{ value: '', price: '', discountPrice: '' }] }],
        images: [''],
      });
    }
    setShowProductModal(true);
  };

  const validateNumericFields = () => {
    // Validate stock count
    if (productForm.countInStock && isNaN(Number(productForm.countInStock))) {
      alert('Please enter a valid number for Stock Count');
      return false;
    }
    
    // Validate shipping cost
    if (productForm.shippingCost && isNaN(Number(productForm.shippingCost))) {
      alert('Please enter a valid number for Shipping Cost');
      return false;
    }
    
    // Validate price fields in filters
    for (let filterIndex = 0; filterIndex < productForm.filters.length; filterIndex++) {
      const filter = productForm.filters[filterIndex];
      for (let adjIndex = 0; adjIndex < filter.priceAdjustments.length; adjIndex++) {
        const adjustment = filter.priceAdjustments[adjIndex];
        
        // Check if price is not a valid number
        if (adjustment.price && isNaN(Number(adjustment.price))) {
          alert(`Please enter a valid number for Price in ${filter.name || 'Filter ' + (filterIndex + 1)}`);
          return false;
        }
        
        // Check if discount price is not a valid number
        if (adjustment.discountPrice && isNaN(Number(adjustment.discountPrice))) {
          alert(`Please enter a valid number for Discount Price in ${filter.name || 'Filter ' + (filterIndex + 1)}`);
          return false;
        }
      }
    }
    return true;
  };

  const saveProduct = () => {
    // Validate all numeric fields before saving
    if (!validateNumericFields()) {
      return;
    }

    if (editingProduct) {
      setProducts((prev) => prev.map((p) => (p._id === editingProduct._id ? { ...productForm, _id: editingProduct._id } : p)));
    } else {
      const newProduct = {
        ...productForm,
        _id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        rating: 0,
        numReviews: 0,
      };
      setProducts((prev) => [...prev, newProduct]);
    }
    setShowProductModal(false);
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p._id !== productId));
  };

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Product Management</h1>
          <button
            onClick={() => openProductModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-white font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-2">{product.category} • {product.brand}</p>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-green-400 font-semibold">Stock: {product.countInStock}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-gray-400 text-sm">{product.rating} ({product.numReviews})</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openProductModal(product)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Product Modal */}
        {showProductModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <button
                    onClick={() => setShowProductModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Product Name</label>
                      <input
                        type="text"
                        value={productForm.name}
                        onChange={(e) => handleProductInputChange('name', e.target.value)}
                        className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
                      <textarea
                        value={productForm.description}
                        onChange={(e) => handleProductInputChange('description', e.target.value)}
                        rows={4}
                        className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Brand</label>
                      <input
                        type="text"
                        value={productForm.brand}
                        onChange={(e) => handleProductInputChange('brand', e.target.value)}
                        className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Category</label>
                      <select
                        value={productForm.category}
                        onChange={(e) => handleProductInputChange('category', e.target.value)}
                        className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Sub Category</label>
                      <input
                        type="text"
                        value={productForm.subCategory}
                        onChange={(e) => handleProductInputChange('subCategory', e.target.value)}
                        className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Stock Count</label>
                        <input
                          type="text"
                          value={productForm.countInStock}
                          onChange={(e) => handleProductInputChange('countInStock', e.target.value)}
                          placeholder="Stock Count"
                          className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Shipping Cost</label>
                        <input
                          type="text"
                          value={productForm.shippingCost}
                          onChange={(e) => handleProductInputChange('shippingCost', e.target.value)}
                          placeholder="Shipping Cost"
                          className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Product Features</label>
                      {productForm.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                            placeholder="Enter feature"
                            className="flex-1 p-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <button
                            onClick={() => removeFeature(index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={addFeature}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                      >
                        + Add Feature
                      </button>
                    </div>
                    
                    {/* Image Upload Section */}
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Product Images</label>
                      {productForm.images.map((image, index) => (
                        <div key={index} className="mb-3 p-3 bg-gray-900 border border-gray-600 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Image {index + 1}</span>
                            {productForm.images.length > 1 && (
                              <button
                                onClick={() => removeImageSlot(index)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(index, e)}
                              className="hidden"
                              id={`image-upload-${index}`}
                            />
                            <label
                              htmlFor={`image-upload-${index}`}
                              className="flex items-center justify-center w-full p-3 bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                            >
                              <div className="text-center">
                                <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                                <span className="text-gray-400 text-sm">Click to upload image</span>
                              </div>
                            </label>
                            
                            {image && (
                              <div className="mt-2">
                                <img
                                  src={image}
                                  alt={`Product ${index + 1}`}
                                  className="w-full h-32 object-cover rounded-lg border border-gray-600"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={addImageSlot}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center space-x-1"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Another Image</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Filters Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Product Filters & Pricing</h3>
                  {productForm.filters.map((filter, filterIndex) => (
                    <div key={filterIndex} className="bg-gray-900 p-4 rounded-lg mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2">Filter Name (e.g., Size, Color)</label>
                          <input
                            type="text"
                            value={filter.name}
                            onChange={(e) => handleFilterChange(filterIndex, 'name', e.target.value)}
                            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-gray-300 text-sm font-medium">Filter Values & Pricing</label>
                        {filter.priceAdjustments.map((adjustment, adjIndex) => (
                          <div key={adjIndex} className="grid grid-cols-1 md:grid-cols-4 gap-2">
                            <input
                              type="text"
                              value={adjustment.value}
                              onChange={(e) => {
                                const newFilters = [...productForm.filters];
                                newFilters[filterIndex].priceAdjustments[adjIndex].value = e.target.value;
                                handleProductInputChange('filters', newFilters);
                              }}
                              placeholder="Value (e.g., S, Red)"
                              className="p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <input
                              type="text"
                              value={adjustment.price}
                              onChange={(e) => {
                                const newFilters = [...productForm.filters];
                                newFilters[filterIndex].priceAdjustments[adjIndex].price = e.target.value;
                                handleProductInputChange('filters', newFilters);
                              }}
                              placeholder="Price"
                              className="p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <input
                              type="text"
                              value={adjustment.discountPrice}
                              onChange={(e) => {
                                const newFilters = [...productForm.filters];
                                newFilters[filterIndex].priceAdjustments[adjIndex].discountPrice = e.target.value;
                                handleProductInputChange('filters', newFilters);
                              }}
                              placeholder="Discount Price"
                              className="p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                              onClick={() => {
                                const newFilters = [...productForm.filters];
                                newFilters[filterIndex].priceAdjustments.splice(adjIndex, 1);
                                handleProductInputChange('filters', newFilters);
                              }}
                              className="text-red-400 hover:text-red-300 flex items-center justify-center"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newFilters = [...productForm.filters];
                            newFilters[filterIndex].priceAdjustments.push({ value: '', price: '', discountPrice: '' });
                            handleProductInputChange('filters', newFilters);
                          }}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                        >
                          + Add Value
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addFilter}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    + Add Filter
                  </button>
                </div>

                {/* Save Button */}
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setShowProductModal(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveProduct}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-5 w-5" />
                    <span>{editingProduct ? 'Update Product' : 'Save Product'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;