const mongoose = require('mongoose');

const CheckoutProductSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Types.ObjectId,
    ref: 'Product'
  }, 
  quantity: {
    type: Number,
    default: 1
  },
  price: Number,
})

const CheckoutSchema = new mongoose.Schema({
  products: {
    type: [CheckoutProductSchema]
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  total: Number,
  state: {
    type: String,
    enum: ['sent', 'active', 'complete'],
    default: 'sent'
  },
  location: {
    block: Number,
    building: Number,
    entrace: String,
    apartment: String,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

CheckoutSchema.pre(/^find/, function(next) { 
  this
    .populate({
      path: 'productID',
      select: 'name photo'
    })
    .populate({
      path: 'user',
      select: 'name photo phone'
    }) 

  next();
});

const Checkout = mongoose.model('Checkout', CheckoutSchema);

module.exports = Checkout