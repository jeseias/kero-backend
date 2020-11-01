const router = require('express').Router();
const contactController = require('./../controllers/contactController');
const authController = require('./../controllers/authController');

router 
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    contactController.getAllContacts
  )  
  .post(
    contactController.createContact
  )  

router.use(authController.protect, authController.restrictTo('admin'))

router
  .route('/:id')
  .patch(contactController.updateContact)
  .delete(contactController.deleteContact)

module.exports = router;
