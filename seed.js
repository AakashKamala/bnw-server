const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: 'T-Shirt',
    description: 'A comfortable cotton t-shirt.',
    price: 19.99,
    image: 'https://example.com/tshirt.jpg',
  },
  {
    name: 'Jeans',
    description: 'Stylish and durable jeans.',
    price: 49.99,
    image: 'https://example.com/jeans.jpg',
  },
];

mongoose
  .connect('mongodb+srv://kumar:HARHARMAHADEV@cluster5.tfxynkv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster5', {
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    return Product.deleteMany({});
  })
  .then(() => {
    console.log('Deleted existing products');
    return Product.insertMany(products);
  })
  .then(() => {
    console.log('Inserted sample products');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error:', err);
    mongoose.connection.close();
  });