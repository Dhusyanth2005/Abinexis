const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');
const mongoose = require('mongoose');

const getProducts = async (req, res) => {
  const { category, subCategory } = req.query;
  const query = {};
  if (category) query.category = { $regex: category, $options: 'i' };
  if (subCategory) query.subCategory = { $regex: subCategory, $options: 'i' };
  try {
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

const createProduct = async (req, res) => {
  const { name, description, price, discountPrice, brand, countInStock, category, subCategory, features } = req.body;
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can create products' });
    }
    const images = [];
    if (req.files && req.files.images) {
      const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
      const uploadPromises = files.map(file => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: 'products' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          ).end(file.data);
        });
      });
      const uploadedImages = await Promise.all(uploadPromises);
      images.push(...uploadedImages);
    }
    const productData = {
      name,
      description,
      price,
      discountPrice: discountPrice || 0,
      brand,
      images,
      countInStock,
      category,
      subCategory,
      features: features ? new Map(Object.entries(features)) : new Map(),
      createdBy: req.user.id,
    };
    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Only admins can update products' });
      }
      const { name, description, price, discountPrice, brand, countInStock, category, subCategory, features } = req.body;
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice || 0;
      product.brand = brand || product.brand;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.subCategory = subCategory || product.subCategory;
      product.features = features ? new Map(Object.entries(features)) : product.features;
      if (req.files && req.files.images) {
        const images = [];
        const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
        const uploadPromises = files.map(file => {
          return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
              { folder: 'products' },
              (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
              }
            ).end(file.data);
          });
        });
        const uploadedImages = await Promise.all(uploadPromises);
        images.push(...uploadedImages);
        product.images = images;
      }
      await product.save();
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    const product = await Product.findById(id);
    if (product) {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Only admins can delete products' });
      }
      await Product.findByIdAndDelete(id);
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

const filterProducts = async (req, res) => {
  const { category, subCategory } = req.query;
  const query = {};
  if (category) query.category = { $regex: category, $options: 'i' };
  if (subCategory) query.subCategory = { $regex: subCategory, $options: 'i' };
  try {
    const products = await Product.find(query);
    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).json({ message: 'No products found for the given filters' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error filtering products', error: error.message });
  }
};

const getFilters = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    const subCategories = await Product.find({ subCategory: { $exists: true, $ne: null } })
      .select('category subCategory')
      .lean();
    const brands = await Product.find({ brand: { $exists: true, $ne: null } })
      .select('category brand')
      .lean();
    res.json({
      categories,
      subCategories: subCategories.map(({ category, subCategory }) => ({ category, subCategory })),
      brands: brands.map(({ category, brand }) => ({ category, brand })),
    });
  } catch (error) {
    console.error('Error in getFilters:', error);
    res.status(500).json({ message: 'Error fetching filters', error: error.message });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, filterProducts, getFilters };