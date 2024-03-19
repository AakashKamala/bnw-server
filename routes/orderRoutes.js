// const express = require('express');
// const router = express.Router();
// const Order = require('../models/order');

// router.post('/', async (req, res) => {
//   try {
//     const { userId, productId, size, quantity, totalPrice } = req.body;
    
//     const order = new Order({
//       userId,
//       productId,
//       size,
//       quantity,
//       totalPrice
//     });

//     await order.save();
//     res.status(201).json({ message: 'Order saved successfully' });
//   } catch (error) {
//     console.error('Error saving order:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// POST request to create a new order
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

// PUT request to update an existing order
router.put('/', async (req, res) => {
  try {
    const { userId, productId } = req.body;
    
    const updatedOrder = await Order.findOneAndUpdate(
      { userId, productId }, // Query criteria to find the order
      req.body, // Updated order details
      { new: true } // Option to return the updated document
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

module.exports = router;
