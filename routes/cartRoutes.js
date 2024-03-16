const express = require('express');
const router = express.Router();
const Cart=require("../models/cart")

router.post('/', async(req,res)=>{
      const {userId, productId}=req.body;
  
    try {
      let cartItem = await Cart.findOne({ userId, productId });
  
      if (cartItem) {
        res.status(204).json({cartItem});
        return;
      }
      else{
        const cartItem = new Cart({ userId, productId });
        await cartItem.save();
      }
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(400).json({message:error});
    }
  });
  
  router.get('/', async(req,res)=>{
    try {
      const carts=await Cart.find();
      res.json(carts);
    } catch (error) {
      res.status(500).json({ message: err.message });
    }
  });
  
  router.delete('/', async (req, res) => {
    const  userId  = req.body;
    const  productId  = req.body;
  
    try {
      await ShoppingCart.findOneAndDelete({ userId, productId });
      res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


//   router.get('/indi', (req, res) => {
//     const userId = req.query.userId;
//     const productIds = Cart.filter(item => item.userId === userId).map(item => item.productId);
//     res.json(productIds);
//   });

router.get('/indi', async (req, res) => {
    const userId = req.query.userId;
  
    try {
      const carts = await Cart.find({ userId }); // Fetching carts based on userId
      const productIds = carts.map(cart => cart.productId); // Extracting productIds
      res.json(productIds);
    } catch (error) {
      console.error('Error fetching product IDs:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  module.exports=router;