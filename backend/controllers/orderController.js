const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
  const { orderItems, shippingInfo, paymentInfo } = req.body;
  try {
    let totalPrice = 0;
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product || product.countInStock < item.quantity) {
        return res.status(400).json({ message: `Product ${product?.name || 'unknown'} is out of stock` });
      }
      totalPrice += (product.discountPrice || product.price) * item.quantity;
      product.countInStock -= item.quantity;
      await product.save();
    }
    if (!paymentInfo || !paymentInfo.id || !paymentInfo.status) {
      return res.status(400).json({ message: 'Invalid payment information' });
    }
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingInfo,
      paymentInfo,
      totalPrice,
      isPaid: paymentInfo.status === 'succeeded',
      paidAt: paymentInfo.status === 'succeeded' ? Date.now() : null,
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('orderItems.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('orderItems.product');
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
};

module.exports = { createOrder, getUserOrders, getOrderById };