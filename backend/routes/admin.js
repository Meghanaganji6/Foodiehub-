const express = require('express');
const Dish = require('../models/Dish');
const Order = require('../models/Order');
const Admin = require('../models/admin');
const router = express.Router();

// --- Menu Management ---

// Get all dishes
router.get('/dishes', async (req, res) => {
  const dishes = await Dish.find();
  res.json(dishes);
});

// Add new dish
router.post('/dishes', async (req, res) => {
  const { name, category, price, veg, imageUrl } = req.body;
  const dish = new Dish({ name, category, price, veg, imageUrl });
  await dish.save();
  res.json(dish);
});

// Update dish availability
router.patch('/dishes/:id', async (req, res) => {
  const { available } = req.body;
  const dish = await Dish.findByIdAndUpdate(req.params.id, { available }, { new: true });
  res.json(dish);
});

// --- Order Management ---

// Get all orders
router.get('/orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// Update order status
router.patch('/orders/:id', async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(order);
});

router.get('/stats', async (req, res) => {
  const admin = await Admin.findOne();
  res.json({ totalOrders: admin?.totalOrders || 0 });
});

// --- STATS Route ---
router.get('/stats', async (req, res) => {
  try {
    const admin = await Admin.findOne();
    const totalOrders = admin?.totalOrders || 0;
    const doneOrders = await Order.countDocuments({ status: 'done' });
    res.json({ totalOrders, doneOrders });
  } catch (error) {
    console.error("Stats fetch failed:", error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// GET - Admin stats (total orders and completed orders)
router.get('/stats', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const ordersDone = await Order.countDocuments({ status: 'Done' });

    res.json({ totalOrders, ordersDone });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
});


module.exports = router;