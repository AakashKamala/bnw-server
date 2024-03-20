const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.post('/', async (req, res) => {
  try {
    const { userId, productId, size, quantity, totalPrice, name, address } = req.body;
    
    const order = new Order({
      userId,
      productId,
      size,
      quantity,
      totalPrice,
      name,
      address
    });

    await order.save();
    res.status(201).json({ message: 'Order saved successfully' });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/', async (req, res) => {
  try {
    const { userId, productId } = req.body;
    
    const updatedOrder = await Order.findOneAndUpdate(
      { userId, productId },
      req.body, 
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/', async(req,res)=>{
  res.json("hiii")
})

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId: userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
