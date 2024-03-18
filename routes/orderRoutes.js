const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.post('/', async (req, res) => {
  try {
    const { userId, productId, size, quantity, totalPrice } = req.body;
    
    const order = new Order({
      userId,
      productId,
      size,
      quantity,
      totalPrice
    });

    await order.save();
    res.status(201).json({ message: 'Order saved successfully' });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
