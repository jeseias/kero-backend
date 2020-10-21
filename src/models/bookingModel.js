const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Booking must belong to a Tour!']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a User!']
  },
  price: {
    type: Number,
    require: [true, 'Booking must have a price.']
  },
  paid: {
    type: Boolean,
    default: true
  }  
}, {
  timestamps: true
});

bookingSchema.pre(/^find/, function(next) {
  this.populate('user').populate({
    path: 'product',
    select: 'name imageCover images price summary'
  });
  
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
