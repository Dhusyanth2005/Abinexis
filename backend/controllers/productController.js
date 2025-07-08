const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

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
    const product = await Product.findById(req.params.id);
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
  const { name, description, price, discountPrice, brand, countInStock, category, subCategory } = req.body;
  try {
    const images = [];
    if (req.files && req.files.images) {
      const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: 'products',
        });
        images.push(result.secure_url);
      }
    }
    const product = await Product.create({
      name,
      description,
      price,
      discountPrice: discountPrice || 0,
      brand,
      images,
      countInStock,
      category,
      subCategory,
      createdBy: req.user._id,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      Object.assign(product, req.body);
      if (req.files && req.files.images) {
        const images = [];
        const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
        for (const file of files) {
          const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'products',
          });
          images.push(result.secure_url);
        }
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
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.findByIdAndDelete(req.params.id); // Updated to use findByIdAndDelete
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };