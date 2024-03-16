const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://kumar:HARHARMAHADEV@cluster5.tfxynkv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster5');

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const productRoutes = require('./routes/productRoutes');
const signupRoutes = require('./routes/signupRoutes');
const cartRoutes=require('./routes/cartRoutes');

app.use('/api/products', productRoutes);
app.use('/api/auth',signupRoutes);
app.use('/api/cart',cartRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});