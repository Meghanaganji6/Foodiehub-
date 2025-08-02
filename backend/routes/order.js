const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Admin = require('../models/admin'); 


// POST - Place a new order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    // Increment totalOrders for Admin
    await Admin.findOneAndUpdate({}, { $inc: { totalOrders: 1 } });

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
});


// GET - Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// PATCH - Update order status
router.patch('/:id', async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, { status: req.body.status });
    res.json({ message: 'Order updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

module.exports = router;
