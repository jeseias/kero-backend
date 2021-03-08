const router = require('express').Router();
const authController = require('../controllers/authController')
const checkoutController = require('../controllers/checkoutController')

router.use(authController.protect, authController.restrictTo('admin', 'user'))

router
  .route('/')
  .get(checkoutController.getMyCheckouts)
  .post(checkoutController.createCheckout)

router
  .route('/:id')
  .get(checkoutController.getCheckout)
  .patch(checkoutController.updateCheckout)
  .delete(checkoutController.deleteCheckout)

module.exports = router