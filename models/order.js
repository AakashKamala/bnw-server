// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   userId: {
//     type: String,
//     required: true
//   },
//   productId: {
//     type: String,
//     required: true
//   },
//   size: {
//     type: String,
//     required: true
//   },
//   quantity: {
//     type: Number,
//     required: true
//   },
//   totalPrice: {
//     type: Number,
//     required: true
//   },
//   created_at: {
//     type: Date,
//     default: Date.now
//   }
// });

// const Order = mongoose.model('Order', orderSchema);

// module.exports = Order;


const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  name: {
    type: String,
  },
  address: {
    house: {
      type: String,
    },
    locality: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    pincode: {
      type: String,
    }
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
