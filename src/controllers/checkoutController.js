const Checkout = require('../models/checkoutModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getMyCheckouts = catchAsync(async (req, res, next) => {
  const { _id, role } = req.user

  const allCheckouts = role === 'admin' 
    ? await Checkout.find()
    : await Checkout.find({ user: _id })

  return res.status(200).json({
    status: 'success',
    data: {
      docs: allCheckouts
    }
  }) 
});

exports.isProductAlreadyHere = catchAsync(async (req, res, next) => {
  const { user } = req.user;
  console.log(user._id)

  next()
});

exports.createCheckout = factory.createOne(Checkout);
exports.getCheckout = factory.getOne(Checkout);
exports.getAllCheckouts = factory.getAll(Checkout);
exports.updateCheckout = factory.updateOne(Checkout);
exports.deleteCheckout = factory.deleteOne(Checkout);