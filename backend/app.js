const express = require('express');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const fileUpload = require('express-fileupload');

dotenv.config();
const app = express();

app.use(express.json());
// app.use(fileUpload({ useTempFiles: false })); // Disable temp files, handle in-memory
app.use(fileUpload({ useTempFiles: false, limits: { fileSize: 5 * 1024 * 1024 } })); // 5MB limit
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/reviews', reviewRoutes);

app.use(express.static('public')); // Serve static files

app.use(errorHandler);

module.exports = app;