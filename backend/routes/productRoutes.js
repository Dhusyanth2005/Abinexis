const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, filterProducts, getFilters } = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.get('/filters',getFilters); // Specific route before :id
router.get('/filter', filterProducts);
router.get('/:id', getProductById); // Dynamic route last
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;