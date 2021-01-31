const express = require('express');
const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/checkout-session/:productID', bookingController.getCheckoutSession);

router.use(authController.restrictTo('admin', 'user'));

router
  .route('/')
  .get(bookingController.getMyBookings)
  .post(bookingController.isProductAlreadyHere, bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
